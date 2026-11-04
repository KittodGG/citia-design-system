using System.Globalization;
using System.Net;
using Citia.DesignSystem.Icons;
using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>Shared plumbing of the form tag helpers (batch A4): names, ids, model state, ISO values, native inputs.</summary>
static class FormMarkup
{
    static readonly CultureInfo Inv = CultureInfo.InvariantCulture;

    public static string FullName(ViewContext vc, ModelExpression? f, string? name) =>
        f is not null ? vc.ViewData.TemplateInfo.GetFullHtmlFieldName(f.Name) : name ?? "";

    public static string IdFor(string fullName, string? id, string fallback) =>
        !string.IsNullOrEmpty(id) ? id : fullName.Length > 0 ? TagBuilder.CreateSanitizedId(fullName, "_") : fallback;

    public static bool Invalid(ViewContext vc, string fullName) =>
        fullName.Length > 0 && vc.ViewData.ModelState.TryGetValue(fullName, out var entry) && entry?.Errors.Count > 0;

    /// <summary>yyyy-MM-dd for DateOnly, DateTime, DateTimeOffset or an ISO string.</summary>
    public static string? IsoDate(object? model) => model switch
    {
        DateOnly d => d.ToString("yyyy-MM-dd", Inv),
        DateTime d => d.ToString("yyyy-MM-dd", Inv),
        DateTimeOffset d => d.ToString("yyyy-MM-dd", Inv),
        string s when s.Length >= 10 => s[..10],
        _ => null,
    };

    /// <summary>HH:mm (or HH:mm:ss) for TimeOnly, TimeSpan, DateTime or a string.</summary>
    public static string? IsoTime(object? model, bool seconds) => model switch
    {
        TimeOnly t => t.ToString(seconds ? "HH:mm:ss" : "HH:mm", Inv),
        TimeSpan t => t.ToString(seconds ? @"hh\:mm\:ss" : @"hh\:mm", Inv),
        DateTime d => d.ToString(seconds ? "HH:mm:ss" : "HH:mm", Inv),
        DateTimeOffset d => d.ToString(seconds ? "HH:mm:ss" : "HH:mm", Inv),
        string s => s,
        _ => null,
    };

    /// <summary>
    /// The native input: with asp-for through IHtmlGenerator (name, id, data-val-*, attempted value, input-validation-error),
    /// otherwise a plain tag. Attributes in <paramref name="attrs"/> win over generated ones except name.
    /// </summary>
    public static TagBuilder Input(IHtmlGenerator generator, ViewContext vc, ModelExpression? f, string? name, string type, string? value, Dictionary<string, object> attrs)
    {
        attrs["type"] = type;
        TagBuilder tag;
        if (f is not null)
        {
            tag = generator.GenerateTextBox(vc, f.ModelExplorer, f.Name, value, null, attrs);
        }
        else
        {
            tag = new TagBuilder("input") { TagRenderMode = TagRenderMode.SelfClosing };
            tag.MergeAttributes(attrs.ToDictionary(p => p.Key, p => (object?)p.Value), replaceExisting: true);
            if (!string.IsNullOrEmpty(name)) tag.MergeAttribute("name", name);
            if (value is not null) tag.MergeAttribute("value", value, replaceExisting: true);
        }
        if (type == "file") tag.Attributes.Remove("value");
        tag.TagRenderMode = TagRenderMode.SelfClosing;
        return tag;
    }

    /// <summary>Move pass-through attributes (everything but class) from the tag helper element to the control.</summary>
    public static Dictionary<string, object> TakeAttributes(TagHelperOutput output)
    {
        var extra = new Dictionary<string, object>();
        foreach (var a in output.Attributes.ToList())
        {
            if (a.Name == "class") continue;
            extra[a.Name] = a.Value?.ToString() ?? "";
            output.Attributes.Remove(a);
        }
        return extra;
    }

    public static void Wrapper(TagHelperOutput output, string css)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, css);
    }

    public static string Bytes(string? size)
    {
        if (string.IsNullOrWhiteSpace(size)) return "";
        var s = size.Trim();
        return s.Any(char.IsLetter) ? s.Replace(" ", " ") : FormatBytes(long.TryParse(s, NumberStyles.Integer, Inv, out var n) ? n : 0);
    }

    static string FormatBytes(long bytes) => bytes switch
    {
        >= 1L << 30 => $"{(bytes / (double)(1L << 30)).ToString("0.#", CultureInfo.CurrentCulture)} GB",
        >= 1L << 20 => $"{(bytes / (double)(1L << 20)).ToString("0.#", CultureInfo.CurrentCulture)} MB",
        >= 1L << 10 => $"{(bytes / 1024d).ToString("0", CultureInfo.CurrentCulture)} KB",
        _ => $"{bytes} B",
    };

    /// <summary>".pdf,.xlsx,image/*" → "PDF, XLSX, images".</summary>
    public static string Types(string? accept)
    {
        if (string.IsNullOrWhiteSpace(accept)) return "";
        var list = new List<string>();
        foreach (var raw in accept.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var label = raw.StartsWith('.') ? raw[1..].ToUpperInvariant()
                : raw.EndsWith("/*", StringComparison.Ordinal) ? (raw.StartsWith("image", StringComparison.OrdinalIgnoreCase) ? DsText.T("forms.upload.images") : raw)
                : (raw.Split('/').LastOrDefault() ?? raw).ToUpperInvariant();
            if (!list.Contains(label)) list.Add(label);
        }
        return string.Join(", ", list);
    }
}

/// <summary>
/// Date picker: a native <c>input type="date"</c> (posts yyyy-MM-dd) that ds.js turns into a typed field with a calendar popover.
/// <code>&lt;ds-field asp-for="DueDate"&gt;&lt;ds-date-picker asp-for="DueDate" min="2026-01-01" /&gt;&lt;/ds-field&gt;</code>
/// Options: <c>min</c>, <c>max</c>, <c>disabled-dates</c> ("2026-12-25 2026-12-26"), <c>disable-weekends</c>, <c>time-zone</c>
/// (today in that IANA zone), <c>size</c> (sm, lg), <c>placeholder</c>, <c>required</c>, <c>disabled</c>, <c>readonly</c>.
/// Without asp-for give <c>name</c> and <c>value</c>. Other attributes go to the input; <c>class</c> stays on the wrapper.
/// </summary>
[HtmlTargetElement("ds-date-picker", TagStructure = TagStructure.WithoutEndTag)]
public sealed class DatePickerTagHelper(IHtmlGenerator generator) : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    [HtmlAttributeName("asp-for")] public ModelExpression? For { get; set; }
    public string? Name { get; set; }
    public string? Id { get; set; }
    public string? Value { get; set; }
    public string? Min { get; set; }
    public string? Max { get; set; }
    public string? DisabledDates { get; set; }
    public bool DisableWeekends { get; set; }
    public string? TimeZone { get; set; }
    public string? Size { get; set; }
    public string? Placeholder { get; set; }
    public bool Required { get; set; }
    public bool Disabled { get; set; }
    public bool Readonly { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var extra = FormMarkup.TakeAttributes(output);
        var full = FormMarkup.FullName(ViewContext, For, Name);
        var id = FormMarkup.IdFor(full, Id, "ds-date-" + context.UniqueId);
        FormMarkup.Wrapper(output, "ds-date-picker");
        output.Attributes.SetAttribute("data-ds-date-picker", "");
        if (!string.IsNullOrEmpty(DisabledDates)) output.Attributes.SetAttribute("data-ds-disabled-dates", DisabledDates);
        if (DisableWeekends) output.Attributes.SetAttribute("data-ds-disable-weekends", "");
        if (!string.IsNullOrEmpty(TimeZone)) output.Attributes.SetAttribute("data-ds-time-zone", TimeZone);

        var attrs = new Dictionary<string, object>(extra)
        {
            ["id"] = id,
            ["class"] = string.IsNullOrEmpty(Size) ? "input" : $"input input-{Size}",
        };
        if (!extra.ContainsKey("aria-describedby")) attrs["aria-describedby"] = $"{id}-hint {id}-error";
        if (!string.IsNullOrEmpty(Min)) attrs["min"] = Min;
        if (!string.IsNullOrEmpty(Max)) attrs["max"] = Max;
        if (!string.IsNullOrEmpty(Placeholder)) attrs["placeholder"] = Placeholder;
        if (Required) attrs["required"] = "required";
        if (Disabled) attrs["disabled"] = "disabled";
        if (Readonly) attrs["readonly"] = "readonly";
        if (FormMarkup.Invalid(ViewContext, full)) attrs["aria-invalid"] = "true";
        var value = Value ?? FormMarkup.IsoDate(For?.Model);
        output.Content.SetHtmlContent(FormMarkup.Input(generator, ViewContext, For, full, "date", value, attrs));
    }
}

/// <summary>
/// Date range picker: a fieldset with two native date inputs (start, end; each posts yyyy-MM-dd) that ds.js joins into one
/// field with a two-month calendar and presets.
/// <code>&lt;ds-date-range-picker start-for="From" end-for="To" legend="Billing period" presets="last7,last30,thisMonth" /&gt;</code>
/// Presets: today, yesterday, last7, last30, next7, thisWeek, thisMonth, lastMonth, thisYear, or <c>none</c>.
/// </summary>
[HtmlTargetElement("ds-date-range-picker", TagStructure = TagStructure.WithoutEndTag)]
public sealed class DateRangePickerTagHelper(IHtmlGenerator generator) : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    [HtmlAttributeName("start-for")] public ModelExpression? StartFor { get; set; }
    [HtmlAttributeName("end-for")] public ModelExpression? EndFor { get; set; }
    public string? StartName { get; set; }
    public string? EndName { get; set; }
    public string? StartValue { get; set; }
    public string? EndValue { get; set; }
    public string? Legend { get; set; }
    public string? Hint { get; set; }
    public string? Min { get; set; }
    public string? Max { get; set; }
    public string? Presets { get; set; }
    public bool Autosubmit { get; set; }
    public string? TimeZone { get; set; }
    public bool Required { get; set; }
    public bool Disabled { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "fieldset";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-fieldset ds-date-range");
        output.Attributes.SetAttribute("data-ds-date-range", "");
        if (Presets is not null) output.Attributes.SetAttribute("data-ds-presets", Presets);
        if (Autosubmit) output.Attributes.SetAttribute("data-ds-autosubmit", "");
        if (!string.IsNullOrEmpty(TimeZone)) output.Attributes.SetAttribute("data-ds-time-zone", TimeZone);
        var baseId = "ds-range-" + context.UniqueId;

        var html = new HtmlContentBuilder();
        html.AppendHtml("<legend>").Append(Legend ?? DsText.T("forms.range.legend")).AppendHtml("</legend>");
        if (!string.IsNullOrEmpty(Hint)) html.AppendHtml($"<p class=\"ds-fieldset-help\" id=\"{baseId}-hint\">").Append(Hint).AppendHtml("</p>");
        html.AppendHtml("<div class=\"ds-date-range__fields\">");
        AppendField(html, StartFor, StartName, StartValue, DsText.T("forms.range.start"), baseId + "-start");
        AppendField(html, EndFor, EndName, EndValue, DsText.T("forms.range.end"), baseId + "-end");
        html.AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }

    void AppendField(HtmlContentBuilder html, ModelExpression? f, string? name, string? value, string fallbackLabel, string fallbackId)
    {
        var full = FormMarkup.FullName(ViewContext, f, name);
        var id = FormMarkup.IdFor(full, null, fallbackId);
        var invalid = FormMarkup.Invalid(ViewContext, full);
        var attrs = new Dictionary<string, object> { ["id"] = id, ["class"] = "input", ["aria-describedby"] = $"{id}-error" };
        if (!string.IsNullOrEmpty(Min)) attrs["min"] = Min;
        if (!string.IsNullOrEmpty(Max)) attrs["max"] = Max;
        if (Required) attrs["required"] = "required";
        if (Disabled) attrs["disabled"] = "disabled";
        if (invalid) attrs["aria-invalid"] = "true";
        var label = f?.Metadata.DisplayName ?? fallbackLabel;
        html.AppendHtml("<div class=\"ds-field\">");
        html.AppendHtml($"<label for=\"{WebUtility.HtmlEncode(id)}\">").Append(label).AppendHtml("</label>");
        html.AppendHtml(FormMarkup.Input(generator, ViewContext, f, full, "date", value ?? FormMarkup.IsoDate(f?.Model), attrs));
        if (f is not null)
        {
            var span = generator.GenerateValidationMessage(ViewContext, f.ModelExplorer, f.Name, null, "p", new Dictionary<string, object> { ["class"] = "ds-field-error", ["id"] = id + "-error" });
            if (span is not null) html.AppendHtml(span);
            else html.AppendHtml($"<p class=\"ds-field-error\" id=\"{WebUtility.HtmlEncode(id)}-error\"></p>");
        }
        else html.AppendHtml($"<p class=\"ds-field-error\" id=\"{WebUtility.HtmlEncode(id)}-error\"></p>");
        html.AppendHtml("</div>");
    }
}

/// <summary>
/// Time picker: a native <c>input type="time"</c> (posts HH:mm, or HH:mm:ss with <c>seconds</c>) that ds.js turns into hour, minute,
/// (second) and AM/PM segments; 12 or 24 hours follow the page language unless <c>hour-cycle="12|24"</c>.
/// <code>&lt;ds-field asp-for="StartTime"&gt;&lt;ds-time-picker asp-for="StartTime" step="900" /&gt;&lt;/ds-field&gt;</code>
/// </summary>
[HtmlTargetElement("ds-time-picker", TagStructure = TagStructure.WithoutEndTag)]
public sealed class TimePickerTagHelper(IHtmlGenerator generator) : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    [HtmlAttributeName("asp-for")] public ModelExpression? For { get; set; }
    public string? Name { get; set; }
    public string? Id { get; set; }
    public string? Value { get; set; }
    public string? Min { get; set; }
    public string? Max { get; set; }
    /// <summary>Step in seconds (900 = 15 minutes). Below 60 the seconds segment appears.</summary>
    public int? Step { get; set; }
    public bool Seconds { get; set; }
    public string? HourCycle { get; set; }
    public string? Size { get; set; }
    public bool Required { get; set; }
    public bool Disabled { get; set; }
    public bool Readonly { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var extra = FormMarkup.TakeAttributes(output);
        var full = FormMarkup.FullName(ViewContext, For, Name);
        var id = FormMarkup.IdFor(full, Id, "ds-time-" + context.UniqueId);
        FormMarkup.Wrapper(output, "ds-time-picker");
        output.Attributes.SetAttribute("data-ds-time-picker", "");
        if (Seconds) output.Attributes.SetAttribute("data-ds-seconds", "");
        if (HourCycle is "12" or "24") output.Attributes.SetAttribute("data-ds-hour-cycle", HourCycle);

        var attrs = new Dictionary<string, object>(extra)
        {
            ["id"] = id,
            ["class"] = string.IsNullOrEmpty(Size) ? "input" : $"input input-{Size}",
        };
        if (!extra.ContainsKey("aria-describedby")) attrs["aria-describedby"] = $"{id}-hint {id}-error";
        if (!string.IsNullOrEmpty(Min)) attrs["min"] = Min;
        if (!string.IsNullOrEmpty(Max)) attrs["max"] = Max;
        var step = Step ?? (Seconds ? 1 : null);
        if (step is int s) attrs["step"] = s.ToString(CultureInfo.InvariantCulture);
        if (Required) attrs["required"] = "required";
        if (Disabled) attrs["disabled"] = "disabled";
        if (Readonly) attrs["readonly"] = "readonly";
        if (FormMarkup.Invalid(ViewContext, full)) attrs["aria-invalid"] = "true";
        var value = Value ?? FormMarkup.IsoTime(For?.Model, Seconds || step < 60);
        output.Content.SetHtmlContent(FormMarkup.Input(generator, ViewContext, For, full, "time", value, attrs));
    }
}

/// <summary>
/// Color picker: a native <c>input type="color"</c> (posts #rrggbb) with a hex field, preset swatches, the EyeDropper where the
/// browser has it, and an optional contrast note.
/// <code>&lt;ds-color-picker asp-for="BrandColor" swatches="Teal #0f766e, Indigo #4338ca, Amber #b45309" contrast-against="#ffffff" /&gt;</code>
/// </summary>
[HtmlTargetElement("ds-color-picker", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ColorPickerTagHelper(IHtmlGenerator generator) : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    [HtmlAttributeName("asp-for")] public ModelExpression? For { get; set; }
    public string? Name { get; set; }
    public string? Id { get; set; }
    public string? Value { get; set; }
    /// <summary>"Name #hex, Name #hex"; the name is optional and becomes the swatch's accessible name.</summary>
    public string? Swatches { get; set; }
    /// <summary>A hex color, or <c>auto</c> (best of white and black).</summary>
    public string? ContrastAgainst { get; set; }
    public bool NoEyedropper { get; set; }
    public bool Disabled { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var extra = FormMarkup.TakeAttributes(output);
        var full = FormMarkup.FullName(ViewContext, For, Name);
        var id = FormMarkup.IdFor(full, Id, "ds-color-" + context.UniqueId);
        FormMarkup.Wrapper(output, "ds-color-picker");
        output.Attributes.SetAttribute("data-ds-color-picker", "");
        if (!string.IsNullOrEmpty(Swatches)) output.Attributes.SetAttribute("data-ds-swatches", Swatches);
        if (!string.IsNullOrEmpty(ContrastAgainst)) output.Attributes.SetAttribute("data-ds-contrast-against", ContrastAgainst);
        if (NoEyedropper) output.Attributes.SetAttribute("data-ds-no-eyedropper", "");

        var attrs = new Dictionary<string, object>(extra) { ["id"] = id };
        if (!extra.ContainsKey("aria-describedby")) attrs["aria-describedby"] = $"{id}-hint {id}-error";
        if (Disabled) attrs["disabled"] = "disabled";
        if (FormMarkup.Invalid(ViewContext, full)) attrs["aria-invalid"] = "true";
        var value = (Value ?? For?.Model?.ToString())?.Trim().ToLowerInvariant();
        output.Content.SetHtmlContent(FormMarkup.Input(generator, ViewContext, For, full, "color", value, attrs));
    }
}

/// <summary>
/// File upload: a dropzone around a native file input. Without JavaScript the input posts the files; with ds.js files can be
/// dropped, pasted, checked (type, size, count), listed with thumbnails, removed, and, with <c>upload-url</c>, uploaded one by
/// one with progress (the form then posts the returned ids as <c>upload-field</c>).
/// <code>&lt;ds-file-upload asp-for="Attachments" accept=".pdf,.xlsx,image/*" max-size="10 MB" max-files="5" multiple /&gt;</code>
/// </summary>
[HtmlTargetElement("ds-file-upload", TagStructure = TagStructure.WithoutEndTag)]
public sealed class FileUploadTagHelper : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    [HtmlAttributeName("asp-for")] public ModelExpression? For { get; set; }
    public string? Name { get; set; }
    public string? Id { get; set; }
    public string? Accept { get; set; }
    /// <summary>"10 MB", "500 KB" or bytes.</summary>
    public string? MaxSize { get; set; }
    public int? MaxFiles { get; set; }
    public bool Multiple { get; set; }
    public string? UploadUrl { get; set; }
    public string? UploadField { get; set; }
    public string? UploadParam { get; set; }
    /// <summary>Accept pasted files anywhere on the page (only when this is the page's single uploader).</summary>
    public bool PastePage { get; set; }
    public string? Title { get; set; }
    public string? Hint { get; set; }
    public string Icon { get; set; } = "cloud-upload";
    public bool Compact { get; set; }
    public bool Required { get; set; }
    public bool Disabled { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var extra = FormMarkup.TakeAttributes(output);
        var full = FormMarkup.FullName(ViewContext, For, Name);
        var id = FormMarkup.IdFor(full, Id, "ds-upload-" + context.UniqueId);
        var multiple = Multiple || (MaxFiles ?? 1) > 1 || (For?.Metadata.IsEnumerableType ?? false);
        FormMarkup.Wrapper(output, "ds-file-upload");
        output.Attributes.SetAttribute("data-ds-upload", "");
        if (!string.IsNullOrEmpty(MaxSize)) output.Attributes.SetAttribute("data-ds-upload-max-size", MaxSize);
        if (MaxFiles is int mf) output.Attributes.SetAttribute("data-ds-upload-max-files", mf.ToString(CultureInfo.InvariantCulture));
        if (!string.IsNullOrEmpty(UploadUrl)) output.Attributes.SetAttribute("data-ds-upload-url", UploadUrl);
        if (!string.IsNullOrEmpty(UploadField)) output.Attributes.SetAttribute("data-ds-upload-field", UploadField);
        if (!string.IsNullOrEmpty(UploadParam)) output.Attributes.SetAttribute("data-ds-upload-param", UploadParam);
        if (PastePage) output.Attributes.SetAttribute("data-ds-upload-paste", "page");

        var types = FormMarkup.Types(Accept);
        var size = FormMarkup.Bytes(MaxSize);
        var hint = Hint ?? (types.Length > 0 && size.Length > 0 ? DsText.T(multiple ? "forms.upload.hint" : "forms.upload.hintOne", types, size)
            : size.Length > 0 ? DsText.T(multiple ? "forms.upload.hintSize" : "forms.upload.hintSizeOne", size)
            : types);
        var hintId = id + "-dropzone-hint";

        var input = new TagBuilder("input") { TagRenderMode = TagRenderMode.SelfClosing };
        foreach (var (k, v) in extra) input.MergeAttribute(k, v?.ToString() ?? "");
        input.MergeAttribute("type", "file", true);
        input.MergeAttribute("id", id, true);
        if (full.Length > 0) input.MergeAttribute("name", full, true);
        input.AddCssClass("ds-dropzone__input");
        if (!string.IsNullOrEmpty(Accept)) input.MergeAttribute("accept", Accept);
        if (multiple) input.MergeAttribute("multiple", "multiple");
        if (Required) input.MergeAttribute("required", "required");
        if (Disabled) input.MergeAttribute("disabled", "disabled");
        var describedBy = extra.TryGetValue("aria-describedby", out var d) ? d.ToString() : $"{id}-hint {id}-error";
        input.MergeAttribute("aria-describedby", hint.Length > 0 ? $"{hintId} {describedBy}" : describedBy!, true);
        if (FormMarkup.Invalid(ViewContext, full)) { input.MergeAttribute("aria-invalid", "true"); input.AddCssClass("input-validation-error"); }

        var html = new HtmlContentBuilder();
        html.AppendHtml(Compact ? "<label class=\"ds-dropzone is-compact\">" : "<label class=\"ds-dropzone\">");
        html.AppendHtml(input);
        html.AppendHtml("<span class=\"ds-dropzone__icon\">").AppendHtml(Icons.Icon.Svg(Icon)).AppendHtml("</span>");
        html.AppendHtml("<span class=\"ds-dropzone__text\"><span class=\"ds-dropzone__title\">");
        if (!string.IsNullOrEmpty(Title)) html.Append(Title);
        else
        {
            html.AppendHtml("<span class=\"ds-dropzone__browse\">").Append(DsText.T(multiple ? "forms.upload.browse" : "forms.upload.browseOne")).AppendHtml("</span>");
            html.Append(DsText.T(multiple ? "forms.upload.drag" : "forms.upload.dragOne"));
        }
        html.AppendHtml("</span>");
        if (hint.Length > 0) html.AppendHtml($"<span class=\"ds-dropzone__hint\" id=\"{WebUtility.HtmlEncode(hintId)}\">").Append(hint).AppendHtml("</span>");
        html.AppendHtml("</span></label>");
        html.AppendHtml($"<ul class=\"ds-file-list\" aria-label=\"{WebUtility.HtmlEncode(DsText.T("forms.upload.list"))}\"></ul>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Avatar upload: round preview, a "Change photo" button around the file input, and Remove (posts <c>remove-name</c>=true).
/// <code>&lt;ds-avatar-upload asp-for="Photo" src="@Model.PhotoUrl" initials="AL" remove-name="RemovePhoto" max-size="2 MB" /&gt;</code>
/// </summary>
[HtmlTargetElement("ds-avatar-upload", TagStructure = TagStructure.WithoutEndTag)]
public sealed class AvatarUploadTagHelper : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    [HtmlAttributeName("asp-for")] public ModelExpression? For { get; set; }
    public string? Name { get; set; }
    public string? Id { get; set; }
    public string? Src { get; set; }
    public string? Initials { get; set; }
    public string? Title { get; set; }
    public string? Hint { get; set; }
    public string Accept { get; set; } = "image/jpeg,image/png,image/webp";
    public string MaxSize { get; set; } = "2 MB";
    public string? RemoveName { get; set; }
    public bool Large { get; set; }
    public bool Disabled { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        FormMarkup.TakeAttributes(output);
        var full = FormMarkup.FullName(ViewContext, For, Name);
        var id = FormMarkup.IdFor(full, Id, "ds-avatar-" + context.UniqueId);
        FormMarkup.Wrapper(output, Large ? "ds-avatar-upload is-lg" : "ds-avatar-upload");
        output.Attributes.SetAttribute("data-ds-upload", "avatar");
        output.Attributes.SetAttribute("data-ds-upload-max-size", MaxSize);
        var hasImage = !string.IsNullOrEmpty(Src);
        var titleId = id + "-title";
        var hintId = id + "-hint";
        var invalid = FormMarkup.Invalid(ViewContext, full);

        var html = new HtmlContentBuilder();
        html.AppendHtml("<span class=\"ds-avatar-upload__preview\"").AppendHtml(hasImage ? " data-state=\"filled\">" : ">");
        if (hasImage) html.AppendHtml($"<img src=\"{WebUtility.HtmlEncode(Src)}\" alt=\"\">");
        if (!string.IsNullOrEmpty(Initials)) html.AppendHtml("<span aria-hidden=\"true\">").Append(Initials).AppendHtml("</span>");
        else html.AppendHtml(Icons.Icon.Svg("user", "ds-icon"));
        html.AppendHtml("</span><div class=\"ds-avatar-upload__body\">");
        html.AppendHtml($"<p class=\"ds-avatar-upload__title\" id=\"{WebUtility.HtmlEncode(titleId)}\">").Append(Title ?? For?.Metadata.DisplayName ?? DsText.T("forms.avatar.title")).AppendHtml("</p>");
        html.AppendHtml($"<p class=\"ds-hint\" id=\"{WebUtility.HtmlEncode(hintId)}\">").Append(Hint ?? DsText.T("forms.avatar.hint", FormMarkup.Bytes(MaxSize))).AppendHtml("</p>");
        html.AppendHtml("<div class=\"ds-avatar-upload__actions\"><label class=\"btn btn-sm\">");
        html.AppendHtml($"<input type=\"file\" id=\"{WebUtility.HtmlEncode(id)}\" name=\"{WebUtility.HtmlEncode(full)}\" accept=\"{WebUtility.HtmlEncode(Accept)}\" aria-describedby=\"{WebUtility.HtmlEncode(hintId)} {WebUtility.HtmlEncode(id)}-error\" aria-labelledby=\"{WebUtility.HtmlEncode(id)}-action {WebUtility.HtmlEncode(titleId)}\"");
        if (invalid) html.AppendHtml(" aria-invalid=\"true\" class=\"input-validation-error\"");
        if (Disabled) html.AppendHtml(" disabled");
        html.AppendHtml(">");
        html.AppendHtml(Icons.Icon.Svg("camera")).AppendHtml($"<span id=\"{WebUtility.HtmlEncode(id)}-action\">").Append(DsText.T(hasImage ? "forms.avatar.change" : "forms.avatar.choose")).AppendHtml("</span></label>");
        html.AppendHtml("<button type=\"button\" class=\"btn btn-ghost btn-sm\" data-ds-upload-remove").AppendHtml(hasImage ? ">" : " hidden>").Append(DsText.T("forms.avatar.remove")).AppendHtml("</button>");
        if (!string.IsNullOrEmpty(RemoveName)) html.AppendHtml($"<input type=\"hidden\" name=\"{WebUtility.HtmlEncode(RemoveName)}\" value=\"false\" data-ds-upload-removed>");
        html.AppendHtml("</div>");
        html.AppendHtml($"<p class=\"ds-field-error\" id=\"{WebUtility.HtmlEncode(id)}-error\">");
        if (invalid && ViewContext.ViewData.ModelState.TryGetValue(full, out var entry)) html.Append(entry?.Errors.FirstOrDefault()?.ErrorMessage ?? "");
        html.AppendHtml("</p></div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Error summary from model state, with a link to each field (same look as the client summary). Renders a hidden container
/// when the model is valid, so ds.js fills it on a failed client check. Place it first inside the form.
/// <code>&lt;ds-error-summary /&gt;</code> · <c>exclude-model-errors</c> leaves out errors without a field.
/// </summary>
[HtmlTargetElement("ds-error-summary", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ErrorSummaryTagHelper : TagHelper
{
    [HtmlAttributeNotBound, ViewContext] public ViewContext ViewContext { get; set; } = default!;
    public string? Title { get; set; }
    public bool ExcludeModelErrors { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-error-summary");
        output.Attributes.SetAttribute("data-ds-error-summary", "");
        var items = new List<(string? Id, string Message)>();
        foreach (var (key, entry) in ViewContext.ViewData.ModelState)
        {
            if (entry is null || entry.Errors.Count == 0 || (ExcludeModelErrors && key.Length == 0)) continue;
            foreach (var error in entry.Errors)
                if (!string.IsNullOrWhiteSpace(error.ErrorMessage))
                    items.Add((key.Length > 0 ? TagBuilder.CreateSanitizedId(key, "_") : null, error.ErrorMessage));
        }
        if (items.Count == 0)
        {
            output.Attributes.SetAttribute("hidden", "hidden");
            return;
        }
        var titleId = "ds-summary-" + context.UniqueId;
        output.Attributes.SetAttribute("role", "alert");
        output.Attributes.SetAttribute("tabindex", "-1");
        output.Attributes.SetAttribute("aria-labelledby", titleId);
        output.Attributes.SetAttribute("data-ds-autofocus", "");
        var html = new HtmlContentBuilder();
        html.AppendHtml($"<h2 id=\"{titleId}\">").Append(Title ?? DsText.T("forms.summary.title")).AppendHtml("</h2><p>")
            .Append(items.Count == 1 ? DsText.T("forms.summary.one") : DsText.T("forms.summary.many", items.Count)).AppendHtml("</p><ul>");
        foreach (var (id, message) in items)
        {
            html.AppendHtml("<li>");
            if (id is not null) html.AppendHtml($"<a href=\"#{WebUtility.HtmlEncode(id)}\">").Append(message).AppendHtml("</a>");
            else html.Append(message);
            html.AppendHtml("</li>");
        }
        html.AppendHtml("</ul>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Form section: title and description on the start, fields on the end (side by side from 52rem of form width).
/// <code>&lt;ds-form-section title="Billing" description="Shown on every invoice."&gt;…fields…&lt;/ds-form-section&gt;</code>
/// Options: <c>card</c> (fields on a surface), <c>stacked</c> (title above at every width), <c>level</c> (heading 2–4), <c>grid</c> (wrap the
/// fields in a two-column .ds-form-grid).
/// </summary>
[HtmlTargetElement("ds-form-section")]
public sealed class FormSectionTagHelper : TagHelper
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public bool Card { get; set; }
    public bool Stacked { get; set; }
    public bool Grid { get; set; }
    public int Level { get; set; } = 2;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var body = await output.GetChildContentAsync();
        output.TagName = "section";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-form-section" + (Card ? " is-card" : "") + (Stacked ? " is-stacked" : ""));
        var titleId = "ds-section-" + context.UniqueId;
        output.Attributes.SetAttribute("aria-labelledby", titleId);
        var level = Math.Clamp(Level, 2, 4);
        var html = new HtmlContentBuilder();
        html.AppendHtml("<div class=\"ds-form-section__header\">");
        html.AppendHtml($"<h{level} class=\"ds-form-section__title\" id=\"{titleId}\">").Append(Title).AppendHtml($"</h{level}>");
        if (!string.IsNullOrEmpty(Description)) html.AppendHtml("<p class=\"ds-form-section__description\">").Append(Description).AppendHtml("</p>");
        html.AppendHtml("</div><div class=\"ds-form-section__body\">");
        if (Grid) html.AppendHtml("<div class=\"ds-form-grid\">");
        html.AppendHtml(body);
        if (Grid) html.AppendHtml("</div>");
        html.AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Sticky action bar at the end of a form: unsaved-changes status on the start, actions (child content) on the end.
/// <code>&lt;ds-form-bar dirty-only&gt;&lt;a class="btn" href="/projects" data-ds-guard-skip&gt;Cancel&lt;/a&gt;&lt;button class="btn btn-primary"&gt;Save&lt;/button&gt;&lt;/ds-form-bar&gt;</code>
/// The status reads <c>[data-ds-dirty-status]</c>; it needs <c>data-ds-guard</c> on the form. <c>floating</c> detaches the bar as a panel.
/// </summary>
[HtmlTargetElement("ds-form-bar")]
public sealed class FormBarTagHelper : TagHelper
{
    public bool DirtyOnly { get; set; }
    public bool Floating { get; set; }
    public string? DirtyText { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var actions = await output.GetChildContentAsync();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-form-bar" + (DirtyOnly ? " is-dirty-only" : "") + (Floating ? " is-floating" : ""));
        var html = new HtmlContentBuilder();
        html.AppendHtml("<p class=\"ds-form-bar__status\" data-ds-dirty-status aria-live=\"polite\"");
        if (!string.IsNullOrEmpty(DirtyText)) html.AppendHtml($" data-ds-dirty-text=\"{WebUtility.HtmlEncode(DirtyText)}\"");
        html.AppendHtml("></p><div class=\"ds-form-bar__actions\">").AppendHtml(actions).AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}
