using System.Collections;
using System.Globalization;
using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>One option of <c>&lt;ds-radio-group&gt;</c> or <c>&lt;ds-checkbox-group&gt;</c> with an optional description.</summary>
public sealed record ChoiceItem(string Value, string Label, string? Description = null, bool Disabled = false);

/// <summary>
/// Shared plumbing for the choice tag helpers: <c>asp-for</c> (name, id, value, validation state), <c>name</c>, <c>id</c>,
/// <c>disabled</c>, <c>required</c>. Names follow ASP.NET Core model binding, so every control posts in a normal form.
/// </summary>
public abstract class ChoiceTagHelperBase : TagHelper
{
    [HtmlAttributeName("asp-for")]
    public ModelExpression? For { get; set; }

    public string? Name { get; set; }
    public string? Id { get; set; }
    public bool Disabled { get; set; }
    public bool Required { get; set; }

    [HtmlAttributeNotBound]
    [ViewContext]
    public ViewContext ViewContext { get; set; } = default!;

    protected string FieldName(ModelExpression? expression, string? name) =>
        name ?? (expression is null ? "" : ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(expression.Name));

    protected string FieldName() => FieldName(For, Name);

    protected static string SanitizedId(string name) => TagBuilder.CreateSanitizedId(name, "_");

    protected string FieldId() => Id ?? SanitizedId(FieldName());

    protected IReadOnlyList<string> Errors(string name)
    {
        if (string.IsNullOrEmpty(name) || !ViewContext.ViewData.ModelState.TryGetValue(name, out var entry) || entry is null
            || entry.ValidationState != ModelValidationState.Invalid)
            return Array.Empty<string>();
        return entry.Errors.Select(e => e.ErrorMessage).Where(m => !string.IsNullOrWhiteSpace(m)).ToList();
    }

    protected static string Invariant(object? value) => value switch
    {
        null => "",
        IFormattable formattable => formattable.ToString(null, CultureInfo.InvariantCulture),
        _ => value.ToString() ?? "",
    };

    protected static IEnumerable<string> Values(object? model) => model switch
    {
        null => Array.Empty<string>(),
        string text => new[] { text },
        IEnumerable many => many.Cast<object?>().Select(Invariant),
        _ => new[] { Invariant(model) },
    };

    protected static decimal? Number(object? model)
    {
        if (model is null) return null;
        try { return Convert.ToDecimal(model, CultureInfo.InvariantCulture); }
        catch (Exception e) when (e is FormatException or InvalidCastException or OverflowException) { return null; }
    }

    protected static TagBuilder Tag(string name, string? css = null)
    {
        var tag = new TagBuilder(name);
        if (!string.IsNullOrEmpty(css)) tag.AddCssClass(css);
        return tag;
    }

    protected static TagBuilder Input(string type, string? css = null)
    {
        var tag = Tag("input", css);
        tag.TagRenderMode = TagRenderMode.SelfClosing;
        tag.MergeAttribute("type", type);
        return tag;
    }

    protected static void Flag(TagBuilder tag, string attribute, bool on)
    {
        if (on) tag.MergeAttribute(attribute, attribute, true);
    }

    /// <summary>Moves data-* and aria-* attributes written on the tag helper element to the real control.</summary>
    protected static void MoveDataAttributes(TagHelperOutput output, TagBuilder target)
    {
        foreach (var attribute in output.Attributes.Where(a => a.Name.StartsWith("data-", StringComparison.Ordinal) || a.Name.StartsWith("aria-", StringComparison.Ordinal)).ToList())
        {
            target.MergeAttribute(attribute.Name, attribute.Value?.ToString() ?? "", true);
            output.Attributes.Remove(attribute);
        }
    }

    /// <summary>Error paragraph (ds-field-error) linked by id, or null when the field is valid.</summary>
    protected static TagBuilder? ErrorText(IReadOnlyList<string> errors, string id)
    {
        if (errors.Count == 0) return null;
        var p = Tag("p", "ds-field-error");
        p.MergeAttribute("id", id);
        p.InnerHtml.Append(string.Join(" ", errors));
        return p;
    }

    protected static string SizeClass(string? size, string prefix = "is-") => size?.ToLowerInvariant() switch
    {
        "sm" or "small" => $"{prefix}sm",
        "lg" or "large" => $"{prefix}lg",
        _ => "",
    };
}

/// <summary>
/// Checkbox row: <c>&lt;ds-checkbox asp-for="AcceptTerms" label="I accept the terms" description="…" /&gt;</c>.
/// Flags: <c>card</c> (selectable card), <c>indeterminate</c>, <c>end</c> (label first, control at the end), <c>size="sm|lg"</c>.
/// Bool models post <c>true</c>/<c>false</c> (a hidden <c>false</c> input follows the checkbox, like the built-in helper).
/// data-* and aria-* attributes move to the input. Child content is used as the label when <c>label</c> is empty.
/// </summary>
[HtmlTargetElement("ds-checkbox")]
public class CheckboxTagHelper : ChoiceTagHelperBase
{
    public string? Label { get; set; }
    public string? Description { get; set; }
    public string Value { get; set; } = "true";
    public bool? Checked { get; set; }
    public bool Indeterminate { get; set; }
    public bool Card { get; set; }
    public bool End { get; set; }
    public string? Size { get; set; }

    protected virtual string ControlClass => "checkbox";
    protected virtual bool IsSwitch => false;

    protected virtual void Decorate(TagBuilder input) { }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        var name = FieldName();
        var id = FieldId();
        var errors = Errors(name);
        var model = For?.Model;
        var isBool = For is not null && For.Metadata.UnderlyingOrModelType == typeof(bool);
        var on = Checked ?? (isBool ? model is true : Values(model).Contains(Value, StringComparer.Ordinal));

        var input = Input("checkbox", ControlClass);
        var sizeClass = SizeClass(Size);
        if (sizeClass.Length > 0) input.AddCssClass(sizeClass);
        if (IsSwitch) input.MergeAttribute("role", "switch");
        if (name.Length > 0) input.MergeAttribute("name", name);
        if (id.Length > 0) input.MergeAttribute("id", id);
        input.MergeAttribute("value", Value);
        Flag(input, "checked", on);
        Flag(input, "disabled", Disabled);
        Flag(input, "required", Required);
        if (Indeterminate) input.MergeAttribute("data-ds-indeterminate", "");
        var describedBy = new List<string>();
        if (!string.IsNullOrWhiteSpace(Description)) describedBy.Add($"{id}-description");
        if (errors.Count > 0) { describedBy.Add($"{id}-error"); input.MergeAttribute("aria-invalid", "true"); }
        if (describedBy.Count > 0) input.MergeAttribute("aria-describedby", string.Join(' ', describedBy));
        Decorate(input);
        MoveDataAttributes(output, input);

        output.TagName = "label";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, (Card ? "ds-choice" : "ds-check-row") + (End ? " is-end" : ""));
        output.Content.Clear();
        output.Content.AppendHtml(input);
        if (isBool && name.Length > 0)
        {
            var hidden = Input("hidden");
            hidden.MergeAttribute("name", name);
            hidden.MergeAttribute("value", "false");
            output.Content.AppendHtml(hidden);
        }
        var text = Tag("span", Card ? "ds-choice__body" : "ds-check-row__text");
        var title = Tag("strong");
        if (!string.IsNullOrEmpty(Label)) title.InnerHtml.Append(Label);
        else title.InnerHtml.AppendHtml(child);
        text.InnerHtml.AppendHtml(title);
        if (!string.IsNullOrWhiteSpace(Description))
        {
            var small = Tag("small");
            small.MergeAttribute("id", $"{id}-description");
            small.InnerHtml.Append(Description);
            text.InnerHtml.AppendHtml(small);
        }
        output.Content.AppendHtml(text);
        if (ErrorText(errors, $"{id}-error") is { } error) output.PostElement.AppendHtml(error);
    }
}

/// <summary>
/// Switch: <c>&lt;ds-switch asp-for="EmailAlerts" label="Email alerts" description="…" /&gt;</c> → input type=checkbox
/// role=switch on daisyUI <c>.toggle</c>. Options: <c>size="sm|lg"</c>, <c>icons</c> (check/cross in the thumb),
/// <c>label-position="start"</c> (label first, switch at the end), <c>action="/settings/alerts"</c> (saves on change with
/// aria-busy, reverts on failure), <c>card</c>.
/// </summary>
[HtmlTargetElement("ds-switch")]
public sealed class SwitchTagHelper : CheckboxTagHelper
{
    public bool Icons { get; set; }
    public string? LabelPosition { get; set; }
    public string? Action { get; set; }
    public string? Method { get; set; }

    protected override string ControlClass => "toggle";
    protected override bool IsSwitch => true;

    protected override void Decorate(TagBuilder input)
    {
        if (Icons) input.AddCssClass("is-icons");
        if (!string.IsNullOrEmpty(Action)) input.MergeAttribute("data-ds-switch-action", Action);
        if (!string.IsNullOrEmpty(Method)) input.MergeAttribute("data-ds-switch-method", Method);
    }

    public override Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        if (string.Equals(LabelPosition, "start", StringComparison.OrdinalIgnoreCase)) End = true;
        return base.ProcessAsync(context, output);
    }
}

/// <summary>
/// Radio group in a fieldset: <c>&lt;ds-radio-group asp-for="Plan" asp-items="Model.Plans" label="Plan" /&gt;</c> or
/// <c>items="IEnumerable&lt;ChoiceItem&gt;"</c> (with descriptions). Flags: <c>horizontal</c>, <c>card</c> (selectable cards,
/// <c>columns="2|3"</c>), <c>description</c> (help under the legend). Errors from ModelState mark the group invalid.
/// </summary>
[HtmlTargetElement("ds-radio-group", TagStructure = TagStructure.WithoutEndTag)]
public class RadioGroupTagHelper : ChoiceTagHelperBase
{
    public string? Label { get; set; }
    public string? Description { get; set; }

    [HtmlAttributeName("asp-items")]
    public IEnumerable<SelectListItem>? AspItems { get; set; }

    public IEnumerable<ChoiceItem>? Items { get; set; }
    public string? Value { get; set; }
    public bool Horizontal { get; set; }
    public bool Card { get; set; }
    public int Columns { get; set; }
    public string? Size { get; set; }

    protected virtual string Type => "radio";

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var name = FieldName();
        var id = FieldId();
        var errors = Errors(name);
        var selected = new HashSet<string>(Value is not null ? new[] { Value } : Values(For?.Model), StringComparer.Ordinal);
        var options = (Items ?? Enumerable.Empty<ChoiceItem>()).ToList();
        if (AspItems is not null)
        {
            options.AddRange(AspItems.Select(i => new ChoiceItem(i.Value ?? i.Text, i.Text, null, i.Disabled)));
            foreach (var item in AspItems.Where(i => i.Selected && For is null && Value is null)) selected.Add(item.Value ?? item.Text);
        }

        output.TagName = "fieldset";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, (Type == "radio" ? "ds-radio-group" : "ds-checkbox-group") + (Horizontal ? " is-horizontal" : ""));
        if (id.Length > 0) output.Attributes.SetAttribute("id", $"{id}-group");
        var describedBy = new List<string>();
        if (!string.IsNullOrWhiteSpace(Description)) describedBy.Add($"{id}-hint");
        if (errors.Count > 0) { describedBy.Add($"{id}-error"); output.Attributes.SetAttribute("aria-invalid", "true"); }
        if (describedBy.Count > 0) output.Attributes.SetAttribute("aria-describedby", string.Join(' ', describedBy));
        if (Type == "radio" && Required) output.Attributes.SetAttribute("aria-required", "true");
        if (Disabled) output.Attributes.SetAttribute("disabled", "disabled");

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Label))
        {
            var legend = Tag("legend");
            legend.InnerHtml.Append(Label);
            html.AppendHtml(legend);
        }
        if (!string.IsNullOrWhiteSpace(Description))
        {
            var hint = Tag("p", "ds-hint");
            hint.MergeAttribute("id", $"{id}-hint");
            hint.InnerHtml.Append(Description);
            html.AppendHtml(hint);
        }
        var list = Card
            ? Tag("div", "ds-choice-grid" + (Columns >= 3 ? " is-3" : Columns == 2 ? " is-2" : Horizontal ? " is-horizontal" : ""))
            : Tag("div", "ds-choice-group__items");
        var control = Type == "radio" ? "radio" : "checkbox";
        var sizeClass = SizeClass(Size);
        for (var i = 0; i < options.Count; i++)
        {
            var option = options[i];
            var optionId = $"{id}_{i}";
            var input = Input(Type, control);
            if (sizeClass.Length > 0) input.AddCssClass(sizeClass);
            input.MergeAttribute("name", name);
            input.MergeAttribute("id", optionId);
            input.MergeAttribute("value", option.Value);
            Flag(input, "checked", selected.Contains(option.Value));
            Flag(input, "disabled", option.Disabled);
            Flag(input, "required", Required && Type == "radio");
            if (!string.IsNullOrWhiteSpace(option.Description)) input.MergeAttribute("aria-describedby", $"{optionId}-description");

            var row = Tag("label", Card ? "ds-choice" : "ds-check-row");
            row.InnerHtml.AppendHtml(input);
            var text = Tag("span", Card ? "ds-choice__body" : "ds-check-row__text");
            var title = Tag("strong");
            title.InnerHtml.Append(option.Label);
            text.InnerHtml.AppendHtml(title);
            if (!string.IsNullOrWhiteSpace(option.Description))
            {
                var small = Tag("small");
                small.MergeAttribute("id", $"{optionId}-description");
                small.InnerHtml.Append(option.Description);
                text.InnerHtml.AppendHtml(small);
            }
            row.InnerHtml.AppendHtml(text);
            list.InnerHtml.AppendHtml(row);
        }
        html.AppendHtml(list);
        if (ErrorText(errors, $"{id}-error") is { } error) html.AppendHtml(error);
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Checkbox group for a collection model (<c>List&lt;string&gt;</c>, <c>int[]</c>): every checked box posts its value under
/// the same name. Same attributes as <c>&lt;ds-radio-group&gt;</c>.
/// </summary>
[HtmlTargetElement("ds-checkbox-group", TagStructure = TagStructure.WithoutEndTag)]
public sealed class CheckboxGroupTagHelper : RadioGroupTagHelper
{
    protected override string Type => "checkbox";
}

/// <summary>
/// Slider: <c>&lt;ds-slider asp-for="Volume" label="Volume" min="0" max="100" step="5" format="{value}%" marks="0,50,100" /&gt;</c>.
/// Two thumbs: add <c>asp-for-end</c> (or <c>name-end</c> + <c>value-end</c>); each thumb posts its own value.
/// <c>marks</c> is a comma list of <c>value</c> or <c>value:label</c>. <c>output="false"</c> hides the live value,
/// <c>bubble="false"</c> the value bubble, <c>size="sm|lg"</c>, <c>vertical</c>.
/// </summary>
[HtmlTargetElement("ds-slider", TagStructure = TagStructure.WithoutEndTag)]
public sealed class SliderTagHelper : ChoiceTagHelperBase
{
    [HtmlAttributeName("asp-for-end")]
    public ModelExpression? ForEnd { get; set; }

    public string? NameEnd { get; set; }
    public decimal Min { get; set; }
    public decimal Max { get; set; } = 100;
    public decimal Step { get; set; } = 1;
    public decimal? Value { get; set; }
    public decimal? ValueEnd { get; set; }
    public string? Label { get; set; }
    public string? Format { get; set; }
    public string? Marks { get; set; }
    public bool Output { get; set; } = true;
    public bool Bubble { get; set; } = true;
    public bool Vertical { get; set; }
    public string? Size { get; set; }

    string Show(decimal value) => (Format ?? "{value}").Replace("{value}", value.ToString("0.##", CultureInfo.CurrentCulture), StringComparison.Ordinal);

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var name = FieldName();
        var id = FieldId();
        var dual = ForEnd is not null || NameEnd is not null;
        var nameEnd = dual ? FieldName(ForEnd, NameEnd) : "";
        var idEnd = dual ? SanitizedId(nameEnd.Length > 0 ? nameEnd : $"{id}-end") : "";
        var start = Math.Clamp(Value ?? Number(For?.Model) ?? (dual ? Min : Min + (Max - Min) / 2), Min, Max);
        var end = Math.Clamp(ValueEnd ?? Number(ForEnd?.Model) ?? Max, start, Max);
        var errors = Errors(name).Concat(dual ? Errors(nameEnd) : Array.Empty<string>()).ToList();

        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-slider" + (Vertical ? " is-vertical" : ""));
        if (!string.IsNullOrEmpty(Format)) output.Attributes.SetAttribute("data-ds-slider-format", Format);
        if (!Bubble) output.Attributes.SetAttribute("data-ds-slider-bubble", "false");

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Label) || Output)
        {
            var head = Tag("div", "ds-slider__head");
            if (!string.IsNullOrEmpty(Label))
            {
                var label = Tag(dual ? "span" : "label", "ds-label");
                if (dual) label.MergeAttribute("id", $"{id}-label"); else label.MergeAttribute("for", id);
                label.InnerHtml.Append(Label);
                head.InnerHtml.AppendHtml(label);
            }
            if (Output)
            {
                var value = Tag("output", "ds-slider__output");
                value.MergeAttribute("for", dual ? $"{id} {idEnd}" : id);
                value.MergeAttribute("aria-hidden", "true");
                value.InnerHtml.Append(dual ? DsText.T("slider.range", Show(start), Show(end)) : Show(start));
                head.InnerHtml.AppendHtml(value);
            }
            html.AppendHtml(head);
        }

        var control = Tag("div", "ds-slider__control" + (dual ? " is-range" : ""));
        var marks = ParseMarks();
        TagBuilder MakeRange(string fieldName, string fieldId, decimal value, string? ariaLabel)
        {
            var input = Input("range", "range");
            var sizeClass = SizeClass(Size);
            if (sizeClass.Length > 0) input.AddCssClass(sizeClass);
            if (fieldName.Length > 0) input.MergeAttribute("name", fieldName);
            input.MergeAttribute("id", fieldId);
            input.MergeAttribute("min", Invariant(Min));
            input.MergeAttribute("max", Invariant(Max));
            input.MergeAttribute("step", Invariant(Step));
            input.MergeAttribute("value", Invariant(value));
            input.MergeAttribute("style", $"--ds-range-p:{Invariant(Max > Min ? Math.Round((value - Min) / (Max - Min), 4) : 0)}");
            if (marks.Count > 0) input.MergeAttribute("list", $"{id}-marks");
            if (ariaLabel is not null) input.MergeAttribute("aria-label", ariaLabel);
            if (!string.IsNullOrEmpty(Format)) input.MergeAttribute("aria-valuetext", Show(value));
            if (errors.Count > 0) { input.MergeAttribute("aria-invalid", "true"); input.MergeAttribute("aria-describedby", $"{id}-error"); }
            Flag(input, "disabled", Disabled);
            return input;
        }
        control.InnerHtml.AppendHtml(MakeRange(name, id, start, dual ? DsText.T("slider.minOf", Label ?? "") : null));
        if (dual) control.InnerHtml.AppendHtml(MakeRange(nameEnd, idEnd, end, DsText.T("slider.maxOf", Label ?? "")));
        html.AppendHtml(control);

        if (marks.Count > 0)
        {
            var datalist = Tag("datalist");
            datalist.MergeAttribute("id", $"{id}-marks");
            foreach (var (value, text) in marks)
            {
                var option = Tag("option");
                option.MergeAttribute("value", Invariant(value));
                option.MergeAttribute("label", text ?? Show(value));
                datalist.InnerHtml.AppendHtml(option);
            }
            html.AppendHtml(datalist);
        }
        if (ErrorText(errors, $"{id}-error") is { } error) html.AppendHtml(error);
        output.Content.SetHtmlContent(html);
    }

    List<(decimal Value, string? Label)> ParseMarks()
    {
        var result = new List<(decimal, string?)>();
        if (string.IsNullOrWhiteSpace(Marks)) return result;
        foreach (var part in Marks.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var pieces = part.Split(':', 2, StringSplitOptions.TrimEntries);
            if (decimal.TryParse(pieces[0], NumberStyles.Number, CultureInfo.InvariantCulture, out var value))
                result.Add((value, pieces.Length > 1 ? pieces[1] : null));
        }
        return result;
    }
}

/// <summary>
/// Star rating input (radio based): <c>&lt;ds-rating asp-for="Score" label="Rate the session" max="5" clearable /&gt;</c>.
/// Options: <c>size="sm|lg"</c>, <c>show-value</c> (number next to the stars), <c>disabled</c>, <c>required</c>.
/// Nothing is posted while no star is chosen (bind to <c>int?</c>).
/// </summary>
[HtmlTargetElement("ds-rating", TagStructure = TagStructure.WithoutEndTag)]
public sealed class RatingTagHelper : ChoiceTagHelperBase
{
    public string? Label { get; set; }
    public int Max { get; set; } = 5;
    public int? Value { get; set; }
    public bool Clearable { get; set; }
    public bool ShowValue { get; set; }
    public string? Size { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var name = FieldName();
        var id = FieldId();
        var errors = Errors(name);
        var current = Value ?? (int?)Number(For?.Model);
        var max = Math.Clamp(Max, 1, 10);

        output.TagName = "fieldset";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-rating {SizeClass(Size)}".Trim());
        output.Attributes.SetAttribute("data-ds-rating", "");
        if (Clearable) output.Attributes.SetAttribute("data-ds-rating-clearable", "");
        if (Disabled) output.Attributes.SetAttribute("disabled", "disabled");
        if (errors.Count > 0)
        {
            output.Attributes.SetAttribute("aria-invalid", "true");
            output.Attributes.SetAttribute("aria-describedby", $"{id}-error");
        }

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Label))
        {
            var legend = Tag("legend");
            legend.InnerHtml.Append(Label);
            html.AppendHtml(legend);
        }
        var row = Tag("div", "ds-rating__row");
        var stars = Tag("div", "ds-rating__stars");
        for (var i = 1; i <= max; i++)
        {
            var star = Tag("label", "ds-rating__star");
            var input = Input("radio");
            input.MergeAttribute("name", name);
            input.MergeAttribute("id", $"{id}_{i}");
            input.MergeAttribute("value", i.ToString(CultureInfo.InvariantCulture));
            Flag(input, "checked", current == i);
            Flag(input, "required", Required);
            star.InnerHtml.AppendHtml(input);
            var text = Tag("span", "ds-visually-hidden");
            text.InnerHtml.Append(i == 1 ? DsText.T("rating.star") : DsText.T("rating.stars", i));
            star.InnerHtml.AppendHtml(text);
            stars.InnerHtml.AppendHtml(star);
        }
        row.InnerHtml.AppendHtml(stars);
        if (ShowValue)
        {
            var value = Tag("span", "ds-rating__value");
            value.MergeAttribute("aria-hidden", "true");
            value.InnerHtml.Append(current?.ToString(CultureInfo.CurrentCulture) ?? "–");
            row.InnerHtml.AppendHtml(value);
        }
        html.AppendHtml(row);
        if (ErrorText(errors, $"{id}-error") is { } error) html.AppendHtml(error);
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Read-only rating with a fractional value: <c>&lt;ds-rating-display value="4.3" count="128" /&gt;</c> → stars filled to 86%,
/// the number and the review count. <c>max</c> (default 5), <c>size="sm|lg"</c>, <c>show-value="false"</c>.
/// </summary>
[HtmlTargetElement("ds-rating-display", TagStructure = TagStructure.WithoutEndTag)]
public sealed class RatingDisplayTagHelper : TagHelper
{
    public double Value { get; set; }
    public int Max { get; set; } = 5;
    public int? Count { get; set; }
    public bool ShowValue { get; set; } = true;
    public string? Size { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var max = Math.Clamp(Max, 1, 10);
        var value = Math.Clamp(Value, 0, max);
        var shown = value.ToString("0.0", CultureInfo.CurrentCulture);
        var stars = new TagBuilder("span");
        stars.AddCssClass("ds-rating-display");
        if (Size?.ToLowerInvariant() is "sm" or "lg") stars.AddCssClass($"is-{Size.ToLowerInvariant()}");
        stars.MergeAttribute("role", "img");
        stars.MergeAttribute("aria-label", DsText.T("rating.value", shown, max));
        stars.MergeAttribute("data-ds-rating-value", value.ToString("0.##", CultureInfo.InvariantCulture));
        stars.MergeAttribute("data-ds-rating-max", max.ToString(CultureInfo.InvariantCulture));
        stars.MergeAttribute("style", $"--ds-rating-value:{value.ToString("0.##", CultureInfo.InvariantCulture)};--ds-rating-max:{max}");

        if (!ShowValue && Count is null)
        {
            output.TagName = null;
            output.Content.SetHtmlContent(stars);
            return;
        }
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-rating-summary");
        output.Content.AppendHtml(stars);
        if (ShowValue)
        {
            var strong = new TagBuilder("strong");
            strong.MergeAttribute("aria-hidden", "true");
            strong.InnerHtml.Append(shown);
            output.Content.AppendHtml(strong);
        }
        if (Count is { } count)
        {
            var span = new TagBuilder("span");
            span.InnerHtml.Append(count == 1 ? DsText.T("rating.countOne") : DsText.T("rating.count", count.ToString("N0", CultureInfo.CurrentCulture)));
            output.Content.AppendHtml(span);
        }
    }
}

/// <summary>
/// One-time code: <c>&lt;ds-otp asp-for="Code" length="6" /&gt;</c>. Without JavaScript it is one text input
/// (autocomplete="one-time-code", inputmode numeric); ds.js splits it into cells and keeps posting a single value.
/// Options: <c>label</c> (default "Verification code"), <c>hint</c>, <c>alphanumeric</c>, <c>group="3"</c> (separator),
/// <c>autosubmit</c>, <c>size="sm"</c>.
/// </summary>
[HtmlTargetElement("ds-otp", TagStructure = TagStructure.WithoutEndTag)]
public sealed class OtpTagHelper : ChoiceTagHelperBase
{
    public int Length { get; set; } = 6;
    public string? Label { get; set; }
    public string? Hint { get; set; }
    public bool Alphanumeric { get; set; }
    public int Group { get; set; }
    public bool Autosubmit { get; set; }
    public string? Size { get; set; }
    public string? Value { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var name = FieldName();
        var id = FieldId();
        if (id.Length == 0) id = "otp";
        var errors = Errors(name);
        var length = Math.Clamp(Length, 3, 12);

        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-otp {SizeClass(Size)}".Trim());
        output.Attributes.SetAttribute("data-ds-otp", "");
        output.Attributes.SetAttribute("data-ds-otp-length", length.ToString(CultureInfo.InvariantCulture));
        if (Alphanumeric) output.Attributes.SetAttribute("data-ds-otp-type", "alphanumeric");
        if (Group > 0) output.Attributes.SetAttribute("data-ds-otp-group", Group.ToString(CultureInfo.InvariantCulture));
        if (Autosubmit) output.Attributes.SetAttribute("data-ds-otp-autosubmit", "");
        if (errors.Count > 0) output.Attributes.SetAttribute("data-state", "error");

        var label = Tag("label", "ds-label");
        label.MergeAttribute("for", id);
        label.InnerHtml.Append(Label ?? DsText.T("otp.label"));

        var input = Input("text", "input ds-otp__value");
        if (SizeClass(Size).Length > 0) input.AddCssClass("input-sm");
        if (name.Length > 0) input.MergeAttribute("name", name);
        input.MergeAttribute("id", id);
        input.MergeAttribute("value", Value ?? Invariant(For?.Model));
        input.MergeAttribute("inputmode", Alphanumeric ? "text" : "numeric");
        input.MergeAttribute("autocomplete", "one-time-code");
        input.MergeAttribute("maxlength", length.ToString(CultureInfo.InvariantCulture));
        input.MergeAttribute("pattern", Alphanumeric ? $"[0-9A-Za-z]{{{length}}}" : $"[0-9]{{{length}}}");
        input.MergeAttribute("spellcheck", "false");
        Flag(input, "required", Required);
        Flag(input, "disabled", Disabled);
        var describedBy = new List<string> { $"{id}-hint" };
        if (errors.Count > 0) { describedBy.Add($"{id}-error"); input.MergeAttribute("aria-invalid", "true"); }
        input.MergeAttribute("aria-describedby", string.Join(' ', describedBy));

        var hint = Tag("p", "ds-hint");
        hint.MergeAttribute("id", $"{id}-hint");
        hint.InnerHtml.Append(Hint ?? DsText.T("otp.hint", length));

        output.Content.AppendHtml(label);
        output.Content.AppendHtml(input);
        output.Content.AppendHtml(hint);
        if (ErrorText(errors, $"{id}-error") is { } error) output.Content.AppendHtml(error);
    }
}

/// <summary>
/// Tags input: <c>&lt;ds-tags-input asp-for="Labels" max="8" placeholder="Add a label" /&gt;</c>. A string model posts one
/// comma-separated value; a collection model (<c>List&lt;string&gt;</c>) posts one value per tag under the same name.
/// Options: <c>max</c>, <c>max-length</c> (per tag), <c>pattern</c> (regular expression per tag), <c>separator</c>.
/// Renders the source input; ds.js builds the chips. data-* and aria-* attributes stay on the input.
/// </summary>
[HtmlTargetElement("ds-tags-input", TagStructure = TagStructure.WithoutEndTag)]
public sealed class TagsInputTagHelper : ChoiceTagHelperBase
{
    public int Max { get; set; }
    public int MaxLength { get; set; }
    public string? Pattern { get; set; }
    public string? Placeholder { get; set; }
    public string Separator { get; set; } = ",";
    public string? Value { get; set; }
    public string? Size { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var name = FieldName();
        var id = FieldId();
        var errors = Errors(name);
        var model = For?.Model;
        var multiple = model is IEnumerable and not string
            || (For is not null && For.Metadata.IsEnumerableType && For.Metadata.ModelType != typeof(string));

        output.TagName = "input";
        output.TagMode = TagMode.SelfClosing;
        Classes.Add(output, SizeClass(Size, "input-").Length > 0 ? $"input {SizeClass(Size, "input-")}" : "input");
        output.Attributes.SetAttribute("type", "text");
        if (name.Length > 0) output.Attributes.SetAttribute("name", name);
        if (id.Length > 0) output.Attributes.SetAttribute("id", id);
        output.Attributes.SetAttribute("value", Value ?? string.Join(Separator, Values(model)));
        output.Attributes.SetAttribute("data-ds-tags", "");
        output.Attributes.SetAttribute("autocomplete", "off");
        if (Separator != ",") output.Attributes.SetAttribute("data-ds-tags-separator", Separator);
        if (multiple) output.Attributes.SetAttribute("data-ds-tags-mode", "multiple");
        if (Max > 0) output.Attributes.SetAttribute("data-ds-tags-max", Max.ToString(CultureInfo.InvariantCulture));
        if (MaxLength > 0) output.Attributes.SetAttribute("data-ds-tags-maxlength", MaxLength.ToString(CultureInfo.InvariantCulture));
        if (!string.IsNullOrEmpty(Pattern)) output.Attributes.SetAttribute("data-ds-tags-pattern", Pattern);
        if (!string.IsNullOrEmpty(Placeholder)) output.Attributes.SetAttribute("placeholder", Placeholder);
        if (Required) output.Attributes.SetAttribute("required", "required");
        if (Disabled) output.Attributes.SetAttribute("disabled", "disabled");
        if (errors.Count > 0)
        {
            output.Attributes.SetAttribute("aria-invalid", "true");
            var existing = output.Attributes.TryGetAttribute("aria-describedby", out var described) ? $"{described.Value} " : "";
            output.Attributes.SetAttribute("aria-describedby", $"{existing}{id}-error");
            if (ErrorText(errors, $"{id}-error") is { } error) output.PostElement.AppendHtml(error);
        }
    }
}
