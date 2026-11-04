using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Citia.DesignSystem.Ui;

/// <summary>One-shot message shown after a redirect (Post/Redirect/Get). Rendered by the partial _DsToast.</summary>
public sealed record ToastMessage(Tone Tone, string Title, string? Text = null);

public static class ToastExtensions
{
    /// <summary>TempData key. One toast per request: a new one replaces the previous.</summary>
    public const string Key = "ds.toast";

    static readonly JsonSerializerOptions Json = new() { Converters = { new JsonStringEnumConverter() } };

    /// <summary>Queue a toast from an MVC controller: <c>this.Toast(Tone.Success, "Data tersimpan")</c>.</summary>
    public static void Toast(this Controller controller, Tone tone, string title, string? text = null) =>
        controller.TempData.SetToast(new ToastMessage(tone, title, text));

    /// <summary>Queue a toast from a Razor Page.</summary>
    public static void Toast(this PageModel page, Tone tone, string title, string? text = null) =>
        page.TempData.SetToast(new ToastMessage(tone, title, text));

    public static void SetToast(this ITempDataDictionary tempData, ToastMessage message) =>
        tempData[Key] = JsonSerializer.Serialize(message, Json);

    /// <summary>Reads and removes the queued toast (null when none or unreadable).</summary>
    public static ToastMessage? TakeToast(this ITempDataDictionary tempData)
    {
        if (tempData[Key] is not string raw) return null;
        try { return JsonSerializer.Deserialize<ToastMessage>(raw, Json); }
        catch (JsonException) { return null; }
    }
}
