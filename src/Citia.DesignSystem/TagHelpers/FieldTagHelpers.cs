using System.Globalization;
using Citia.DesignSystem.Icons;
using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>
/// One complete field: label, control, hint, help, counter and error, wired with ids and <c>aria-describedby</c>.
/// <code>&lt;ds-field asp-for="Email" type="email" hint="We send the invoice here." icon="mail" clearable /&gt;</code>
/// Types: <c>text</c> (default), <c>email</c>, <c>tel</c>, <c>url</c>, <c>search</c>, <c>password</c>, <c>number</c>, <c>textarea</c>, <c>select</c>
/// (with <c>asp-items</c>). Without <c>asp-for</c>, give <c>name</c> (and optionally <c>value</c>). Child content replaces the generated control
/// (a combobox, a date picker); the field still renders label, hint and error with the ids <c>{id}-hint</c> and <c>{id}-error</c>.
/// Attributes that are not listed here (pattern, data-*, step…) go to the control; <c>class</c> goes to the field wrapper.
/// </summary>
[HtmlTargetElement("ds-field")]
public sealed class FieldTagHelper : TagHelper
{
    readonly IHtmlGenerator _generator;

    public FieldTagHelper(IHtmlGenerator generator) => _generator = generator;

    [HtmlAttributeNotBound, ViewContext]
    public ViewContext ViewContext { get; set; } = default!;

    [HtmlAttributeName("asp-for")] public ModelExpression? For { get; set; }
    [HtmlAttributeName("asp-items")] public IEnumerable<SelectListItem>? Items { get; set; }

    public string? Name { get; set; }
    public string? Id { get; set; }
    public string? Value { get; set; }
    public string? Label { get; set; }
    public string? Hint { get; set; }
    /// <summary>Longer help opened by a small button next to the label.</summary>
    public string? Help { get; set; }
    public string? Placeholder { get; set; }
    public string Type { get; set; } = "text";
    [HtmlAttributeName("icon")] public string? IconName { get; set; }
    public string? Prefix { get; set; }
    public string? Suffix { get; set; }
    /// <summary>Unit after a number (kg, %, USD). Same as suffix; read by assistive technology as part of the value.</summary>
    public string? Unit { get; set; }
    /// <summary><c>sm</c> or <c>lg</c>; medium by default.</summary>
    public string? Size { get; set; }
    public bool Clearable { get; set; }
    public bool Loading { get; set; }
    public bool Success { get; set; }
    public string? SuccessText { get; set; }
    /// <summary>Explicit error text (use when there is no model); with asp-for the model state supplies it.</summary>
    public string? Error { get; set; }
    public bool Counter { get; set; }
    [HtmlAttributeName("maxlength")] public int? Maxlength { get; set; }
    public bool Horizontal { get; set; }
    public bool Wide { get; set; }
    public bool Readonly { get; set; }
    public bool Disabled { get; set; }
    /// <summary>Force the required state; otherwise the model metadata decides.</summary>
    public bool Required { get; set; }
    /// <summary><c>optional</c> (default: optional fields say so), <c>required</c> (required fields get an asterisk) or <c>none</c>.</summary>
    public string Marker { get; set; } = "optional";
    public string? Autocomplete { get; set; }
    public string? Inputmode { get; set; }
    public int Rows { get; set; } = 3;
    public bool Autogrow { get; set; }

    // password
    public bool ShowToggle { get; set; } = true;
    public bool CapsWarning { get; set; } = true;
    public bool Strength { get; set; }

    // number
    public double? Min { get; set; }
    public double? Max { get; set; }
    public double? Step { get; set; }
    public bool Stepper { get; set; } = true;
    public bool Trailing { get; set; }
    public bool Locale { get; set; }

    // search
    public string? Shortcut { get; set; }
    public int? Recent { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var childContent = await output.GetChildContentAsync();
        var custom = !string.IsNullOrWhiteSpace(childContent.GetContent());

        var fieldName = For is not null ? ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(For.Name) : (Name ?? Id ?? "");
        var id = Id ?? (fieldName.Length > 0 ? TagBuilder.CreateSanitizedId(fieldName, "_") : "ds-f-" + context.UniqueId);
        var type = (Type ?? "text").ToLowerInvariant();
        var isArea = type == "textarea";
        var isSelect = type == "select";
        var isPassword = type == "password";
        var isNumber = type == "number";
        var isSearch = type == "search";

        var required = Required || (For?.Metadata.IsRequired ?? false);
        var invalid = !string.IsNullOrEmpty(Error)
            || (For is not null && ViewContext.ViewData.ModelState.TryGetValue(fieldName, out var entry) && entry.Errors.Count > 0);

        var hintId = id + "-hint";
        var errorId = id + "-error";
        var helpId = id + "-help-text";
        var capsId = id + "-caps";
        var counterId = id + "-counter";

        var label = Label ?? For?.Metadata.DisplayName ?? For?.Metadata.PropertyName ?? fieldName;

        // Pass-through attributes: class belongs to the wrapper, everything else to the control.
        var extra = new Dictionary<string, object>();
        string? wrapperClass = null;
        foreach (var a in output.Attributes)
        {
            if (a.Name == "class") wrapperClass = a.Value?.ToString();
            else extra[a.Name] = a.Value?.ToString() ?? "";
        }

        var describedBy = new List<string>();
        if (!string.IsNullOrEmpty(Hint)) describedBy.Add(hintId);
        if (!string.IsNullOrEmpty(Help)) describedBy.Add(helpId);
        if (isPassword && CapsWarning) describedBy.Add(capsId);
        describedBy.Add(errorId);

        var attrs = new Dictionary<string, object>(extra) { ["id"] = id };
        if (For is null) attrs["name"] = Name ?? id;
        attrs["aria-describedby"] = string.Join(' ', describedBy);
        if (invalid) attrs["aria-invalid"] = "true";
        if (required) attrs["required"] = "required";
        if (Readonly) attrs["readonly"] = "readonly";
        if (Disabled) attrs["disabled"] = "disabled";
        if (!string.IsNullOrEmpty(Placeholder) && !isSelect) attrs["placeholder"] = Placeholder;
        if (Maxlength is int max) attrs["maxlength"] = max.ToString(CultureInfo.InvariantCulture);
        if (!string.IsNullOrEmpty(Inputmode)) attrs["inputmode"] = Inputmode;
        if (!string.IsNullOrEmpty(Autocomplete)) attrs["autocomplete"] = Autocomplete;
        if (Counter && (Maxlength is not null || extra.ContainsKey("data-ds-max")))
            attrs["data-ds-counter"] = "#" + counterId;
        if (Success && !invalid && (isArea || isSelect)) attrs["data-state"] = "success";

        var content = new HtmlContentBuilder();

        // ---- label row
        var labelTag = new TagBuilder("label");
        labelTag.Attributes["for"] = id;
        labelTag.InnerHtml.Append(label);
        if (Marker == "optional" && !required)
            labelTag.InnerHtml.AppendHtml("<span class=\"ds-label-note\">").Append(DsText.T("fields.optional")).AppendHtml("</span>");
        else if (Marker == "required" && required)
            labelTag.InnerHtml.AppendHtml("<span class=\"ds-required\" aria-hidden=\"true\">*</span>");

        if (!string.IsNullOrEmpty(Help))
        {
            content.AppendHtml("<div class=\"ds-field__label-row\">").AppendHtml(labelTag);
            content.AppendHtml($"<button type=\"button\" class=\"ds-field__help\" data-ds-field-help aria-expanded=\"false\" aria-controls=\"{helpId}\" aria-label=\"")
                .Append(DsText.T("fields.help")).AppendHtml("\">")
                .AppendHtml(Icon.Svg("help-circle", "ds-icon is-md")).AppendHtml("</button></div>");
            content.AppendHtml($"<div class=\"ds-field__help-text\" id=\"{helpId}\" data-state=\"closed\"><p>").Append(Help).AppendHtml("</p></div>");
        }
        else
        {
            content.AppendHtml(labelTag);
        }

        // ---- control
        if (custom)
        {
            content.AppendHtml(childContent);
        }
        else if (isArea)
        {
            attrs["class"] = "textarea";
            if (Autogrow) attrs["data-ds-autogrow"] = "";
            if (Size == "sm") attrs["class"] = "textarea textarea-sm";
            var area = For is not null
                ? _generator.GenerateTextArea(ViewContext, For.ModelExplorer, For.Name, Math.Max(1, Rows), 0, attrs)
                : Manual("textarea", attrs, Value);
            content.AppendHtml(area);
        }
        else if (isSelect)
        {
            attrs["class"] = Size == "sm" ? "select select-sm" : Size == "lg" ? "select select-lg" : "select";
            if (For is not null)
                content.AppendHtml(_generator.GenerateSelect(ViewContext, For.ModelExplorer, Placeholder, For.Name, Items ?? Array.Empty<SelectListItem>(), false, attrs));
            else
            {
                var select = new TagBuilder("select");
                select.MergeAttributes(attrs.ToDictionary(p => p.Key, p => (string?)(p.Value?.ToString() ?? "")));
                if (!string.IsNullOrEmpty(Placeholder))
                    select.InnerHtml.AppendHtml("<option value=\"\">").Append(Placeholder).AppendHtml("</option>");
                foreach (var item in Items ?? Array.Empty<SelectListItem>())
                {
                    var option = new TagBuilder("option");
                    option.Attributes["value"] = item.Value ?? "";
                    if (item.Selected || (Value is not null && Value == item.Value)) option.Attributes["selected"] = "selected";
                    if (item.Disabled) option.Attributes["disabled"] = "disabled";
                    option.InnerHtml.Append(item.Text ?? "");
                    select.InnerHtml.AppendHtml(option);
                }
                content.AppendHtml(select);
            }
        }
        else
        {
            attrs["class"] = "ds-input__control";
            var inputType = isNumber ? "text" : type;
            attrs["type"] = inputType;
            if (isNumber)
            {
                if (!attrs.ContainsKey("inputmode")) attrs["inputmode"] = (Step ?? 1) % 1 == 0 ? "numeric" : "decimal";
                if (Min is double min) attrs["data-ds-min"] = min.ToString(CultureInfo.InvariantCulture);
                if (Max is double maxValue) attrs["data-ds-max"] = maxValue.ToString(CultureInfo.InvariantCulture);
                if (Step is double step) attrs["data-ds-step"] = step.ToString(CultureInfo.InvariantCulture);
            }
            if (isPassword)
            {
                attrs["autocomplete"] = Autocomplete ?? "current-password";
                attrs["autocapitalize"] = "off";
                attrs["spellcheck"] = "false";
                if (CapsWarning) attrs["data-ds-capslock"] = "";
                if (Strength) attrs["data-ds-strength"] = "";
            }
            if (isSearch)
            {
                attrs["enterkeyhint"] = "search";
                if (!string.IsNullOrEmpty(Shortcut)) attrs["data-ds-shortcut"] = Shortcut;
                if (Recent is int recent) attrs["data-ds-recent"] = recent.ToString(CultureInfo.InvariantCulture);
            }

            TagBuilder input;
            if (For is null) input = Manual("input", attrs, Value, selfClosing: true);
            else if (isPassword) input = _generator.GeneratePassword(ViewContext, For.ModelExplorer, For.Name, null, attrs);
            else input = _generator.GenerateTextBox(ViewContext, For.ModelExplorer, For.Name, null, null, attrs);

            var wrapper = new TagBuilder("div");
            wrapper.AddCssClass("ds-input");
            if (Size == "sm") wrapper.AddCssClass("is-sm");
            if (Size == "lg") wrapper.AddCssClass("is-lg");
            if (isPassword) wrapper.AddCssClass("ds-password");
            if (isSearch) wrapper.AddCssClass("ds-search");
            var steppers = isNumber && Stepper;
            if (steppers)
            {
                wrapper.AddCssClass("ds-number");
                if (Trailing) wrapper.AddCssClass("is-trailing");
                if (Locale) wrapper.Attributes["data-ds-locale"] = "";
            }
            if (Loading) wrapper.Attributes["aria-busy"] = "true";
            if (Success && !invalid) wrapper.Attributes["data-state"] = "success";
            if (Disabled) wrapper.Attributes["aria-disabled"] = "true";

            var iconName = IconName ?? (isSearch ? "search" : null);
            if (!string.IsNullOrEmpty(iconName)) wrapper.InnerHtml.AppendHtml(Icon.Svg(iconName, "ds-icon ds-input__icon"));
            if (!string.IsNullOrEmpty(Prefix))
                wrapper.InnerHtml.AppendHtml("<span class=\"ds-input__affix\">").Append(Prefix).AppendHtml("</span>");
            if (steppers)
                wrapper.InnerHtml.AppendHtml(StepButton("-1", DsText.T("fields.decrease"), "minus", id));
            wrapper.InnerHtml.AppendHtml(input);
            var suffix = Suffix ?? Unit;
            if (!string.IsNullOrEmpty(suffix))
                wrapper.InnerHtml.AppendHtml("<span class=\"ds-input__affix is-end\">").Append(suffix).AppendHtml("</span>");
            if (steppers)
                wrapper.InnerHtml.AppendHtml(StepButton("1", DsText.T("fields.increase"), "plus", id));
            if ((Clearable || isSearch) && !isNumber && !isPassword)
                wrapper.InnerHtml.AppendHtml("<button type=\"button\" class=\"ds-input__clear\" tabindex=\"-1\" aria-label=\"")
                    .Append(DsText.T("fields.clear")).AppendHtml("\">").AppendHtml(Icon.Svg("x", "ds-icon")).AppendHtml("</button>");
            if (isPassword && ShowToggle)
            {
                var eye = Icon.Svg("eye", "ds-icon").ToString()!.Replace("<svg ", "<svg data-ds-password-icon=\"hidden\" ", StringComparison.Ordinal);
                var eyeOff = Icon.Svg("eye-off", "ds-icon").ToString()!.Replace("<svg ", "<svg data-ds-password-icon=\"shown\" hidden ", StringComparison.Ordinal);
                wrapper.InnerHtml.AppendHtml($"<button type=\"button\" class=\"ds-password-toggle\" data-ds-password-toggle aria-controls=\"{id}\" aria-pressed=\"false\" aria-label=\"")
                    .Append(DsText.T("fields.showPassword")).AppendHtml("\">").AppendHtml(eye).AppendHtml(eyeOff).AppendHtml("</button>");
            }
            if (isSearch && !string.IsNullOrEmpty(Shortcut))
                wrapper.InnerHtml.AppendHtml("<kbd class=\"ds-kbd ds-search__kbd\" aria-hidden=\"true\">").Append(Shortcut).AppendHtml("</kbd>");

            if (isSearch && Recent is not null)
            {
                content.AppendHtml("<div class=\"ds-search-box\">").AppendHtml(wrapper)
                    .AppendHtml("<div class=\"ds-search__recent\" data-state=\"closed\"></div></div>");
            }
            else content.AppendHtml(wrapper);
        }

        // ---- password extras
        if (isPassword && CapsWarning)
            content.AppendHtml($"<p class=\"ds-password__caps\" id=\"{capsId}\" role=\"status\" aria-live=\"polite\"></p>");
        if (isPassword && Strength)
            content.AppendHtml("<div class=\"ds-strength\" data-level=\"0\"><div class=\"ds-strength__bars\" aria-hidden=\"true\"><i></i><i></i><i></i><i></i></div><span class=\"ds-strength__label\"></span></div>");

        // ---- hint, success, error, counter
        var messages = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Hint))
            messages.AppendHtml($"<p class=\"ds-hint\" id=\"{hintId}\">").Append(Hint).AppendHtml("</p>");
        if (Success && !invalid && !string.IsNullOrEmpty(SuccessText))
            messages.AppendHtml("<p class=\"ds-field-success\" role=\"status\">").AppendHtml(Icon.Svg("check-circle", "ds-icon is-md")).Append(SuccessText).AppendHtml("</p>");
        if (For is not null && string.IsNullOrEmpty(Error))
        {
            var message = _generator.GenerateValidationMessage(ViewContext, For.ModelExplorer, For.Name, null, "span",
                new Dictionary<string, object> { ["id"] = errorId, ["class"] = "ds-field-error", ["aria-live"] = "polite" });
            messages.AppendHtml(message);
        }
        else
        {
            messages.AppendHtml($"<p class=\"ds-field-error\" id=\"{errorId}\" aria-live=\"polite\">").Append(Error ?? "").AppendHtml("</p>");
        }

        if (Counter && (Maxlength is not null || extra.ContainsKey("data-ds-max")))
        {
            var limit = Maxlength?.ToString(CultureInfo.InvariantCulture) ?? extra["data-ds-max"].ToString();
            var length = For?.Model?.ToString()?.Length ?? Value?.Length ?? 0;
            content.AppendHtml("<div class=\"ds-field__meta\"><div>").AppendHtml(messages).AppendHtml("</div>")
                .AppendHtml($"<span class=\"ds-counter\" id=\"{counterId}\" aria-hidden=\"true\">")
                .Append(DsText.T("fields.count", length, limit)).AppendHtml("</span></div>");
        }
        else content.AppendHtml(messages);

        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.Clear();
        Classes.Add(output, "ds-field" + (Horizontal ? " is-horizontal" : "") + (Wide ? " is-wide" : "") + (wrapperClass is { Length: > 0 } ? " " + wrapperClass : ""));
        output.Content.SetHtmlContent(content);
    }

    static TagBuilder Manual(string tag, Dictionary<string, object> attrs, string? value, bool selfClosing = false)
    {
        var builder = new TagBuilder(tag);
        if (selfClosing) builder.TagRenderMode = TagRenderMode.SelfClosing;
        foreach (var (key, val) in attrs) builder.Attributes[key] = val?.ToString() ?? "";
        if (selfClosing) { if (value is not null) builder.Attributes["value"] = value; }
        else if (value is not null) builder.InnerHtml.Append(value);
        return builder;
    }

    static IHtmlContent StepButton(string direction, string label, string icon, string controls)
    {
        var html = new HtmlContentBuilder();
        html.AppendHtml($"<button type=\"button\" class=\"ds-number__step\" data-ds-step=\"{direction}\" tabindex=\"-1\" aria-controls=\"{controls}\" aria-label=\"")
            .Append(label).AppendHtml("\">").AppendHtml(Icon.Svg(icon, "ds-icon is-md")).AppendHtml("</button>");
        return html;
    }
}

/// <summary>
/// Group of related controls under a legend, with optional help and a group error:
/// <code>&lt;ds-fieldset legend="Delivery" help="We deliver on weekdays." error="Choose one option."&gt;…&lt;/ds-fieldset&gt;</code>
/// <c>disabled</c> disables every control inside; <c>boxed</c> draws a hairline frame. The fieldset is described by its help and error.
/// </summary>
[HtmlTargetElement("ds-fieldset")]
public sealed class FieldsetTagHelper : TagHelper
{
    public string? Legend { get; set; }
    public string? Help { get; set; }
    public string? Error { get; set; }
    public bool Disabled { get; set; }
    public bool Boxed { get; set; }
    public string? Id { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        var id = Id ?? "ds-fs-" + context.UniqueId;
        var describedBy = new List<string>();
        var content = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Legend)) content.AppendHtml("<legend>").Append(Legend).AppendHtml("</legend>");
        if (!string.IsNullOrEmpty(Help))
        {
            content.AppendHtml($"<p class=\"ds-fieldset-help\" id=\"{id}-help\">").Append(Help).AppendHtml("</p>");
            describedBy.Add(id + "-help");
        }
        if (!string.IsNullOrEmpty(Error))
        {
            content.AppendHtml($"<p class=\"ds-field-error\" id=\"{id}-error\" aria-live=\"polite\">").Append(Error).AppendHtml("</p>");
            describedBy.Add(id + "-error");
        }
        content.AppendHtml(child);

        output.TagName = "fieldset";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", id);
        if (describedBy.Count > 0) output.Attributes.SetAttribute("aria-describedby", string.Join(' ', describedBy));
        if (!string.IsNullOrEmpty(Error)) output.Attributes.SetAttribute("aria-invalid", "true");
        if (Disabled) output.Attributes.SetAttribute("disabled", "disabled");
        Classes.Add(output, "ds-fieldset" + (Boxed ? " is-boxed" : ""));
        output.Content.SetHtmlContent(content);
    }
}
