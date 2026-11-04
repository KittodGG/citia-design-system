---
title: Writing
group: content
order: 1
summary: UX writing rules for English and Indonesian: buttons, labels, errors, empty states, numbers, dates, currency, capitalisation and plain language, with good and bad examples.
---

Interface text is part of the design. These rules apply to every string in an application, in English and in Indonesian. For the character of the voice see [Voice and tone](./voice-and-tone.md); for formatting helpers see [Localization](./localization.md) and [Razor and C# API](./razor-api.md).

## Buttons are verbs

A button names the result of pressing it: a verb, then the object when it is not obvious. Two or three words.

| Bad | Good (en) | Good (id) |
| --- | --- | --- |
| OK | Save changes | Simpan perubahan |
| Submit | Create project | Buat proyek |
| Yes / No | Delete project / Keep project | Hapus proyek / Pertahankan proyek |
| Click here | View invoice | Lihat faktur |
| Proceed | Continue | Lanjut |

- One primary action per area, named for its result. Cancel is "Cancel" / "Batal".
- Use the same verb for the same action everywhere: do not mix Remove, Delete and Discard for one thing.
- Delete removes the record; Remove takes it out of a list but keeps it; Archive hides it and can be restored.

## Labels

- A label is a noun or a short noun phrase: "Email", "Due date", "Tanggal jatuh tempo". No colon, no full stop.
- Label above the field, always visible. The placeholder shows an example ("name@example.com"), never an instruction that disappears.
- Keep labels under 3 words; put the explanation in a hint under the field.
- Mark the exception: "optional" / "opsional" on optional fields (see [Forms pattern](./forms-pattern.md)).

## Hints

A hint says what the field expects or why it is asked, in one short sentence, with an example when the format is not obvious.

- Good: "Digits with a decimal point, for example 48500.50." / "Angka dengan titik desimal, misalnya 48500.50."
- Bad: "Please enter a valid value."

## Error messages

An error says what is wrong and how to fix it, in plain words, next to the field. It does not blame the person and it does not show codes.

| Bad | Good (en) | Good (id) |
| --- | --- | --- |
| Invalid input | Enter a date like 25 Jan 2026. | Isi tanggal seperti 25 Jan 2026. |
| Error 403 | You do not have access to this page. Ask an administrator to add you. | Anda tidak punya akses ke halaman ini. Minta administrator menambahkan Anda. |
| Password must meet complexity requirements | Use at least 12 characters. | Gunakan minimal 12 karakter. |
| You entered the wrong email | The email or password is not correct. Check both and try again. | Email atau password tidak sesuai. Periksa keduanya lalu coba lagi. |
| Something went wrong | The invoice was not saved. Check your connection and try again. | Faktur belum tersimpan. Periksa koneksi Anda lalu coba lagi. |

- Start with the problem or the instruction, not "Error:" or "Oops".
- Say what was kept: "Your changes are still here."
- Do not use exclamation marks, humour or apologies for expected errors.

## Empty states

Say what belongs here and offer the first step. Three parts at most: a heading, one sentence and one action.

| Case | en | id |
| --- | --- | --- |
| First run | No invoices yet. Invoices you create appear here. [Create invoice] | Belum ada faktur. Faktur yang Anda buat tampil di sini. [Buat faktur] |
| No results | No projects match "okafor". [Clear filters] | Tidak ada proyek yang cocok dengan "okafor". [Hapus filter] |
| No access | You can view this list only when you are a member of the team. | Anda hanya bisa melihat daftar ini bila menjadi anggota tim. |

## Confirmations

State the object and the consequence; name the buttons for their actions. "Delete PRJ-1024? The project and its 3 linked invoices are deleted. This cannot be undone." with "Delete project" and "Keep project".

## Numbers, dates, currency

Format for the reader's locale on screen; use machine formats in files and URLs. Use `Fmt` in C# and `Intl` in script, never hand-built strings.

| Thing | English | Indonesian |
| --- | --- | --- |
| Number | 1,574,782.5 | 1.574.782,5 |
| Percentage | 12.5% | 12,5% |
| Date | 25 Jan 2026 | 25 Jan 2026 |
| Date and time | 25 Jan 2026, 2:30 PM or 14:30 | 25 Jan 2026 14.30 |
| Time range | 08:00–17:00 | 08.00–17.00 |
| Currency | $1,250.00, USD 1,250.00 | Rp1.250.000, IDR 1.250.000 |
| Count with unit | 3 invoices | 3 faktur |

- Months are abbreviated to 3 letters; Indonesian uses Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des.
- Never write dates as 01/02/2026, which means different days in different countries.
- Put the currency symbol or code consistently, with a non-breaking space for codes.
- Show the time zone when the audience spans zones ("14:30 WIB", "14:30 UTC+7").
- Numbers in tables are end-aligned, in tabular figures, with the same decimals per column.
- Spell out numbers under 10 in sentences ("three invoices"), use digits in UI labels, counts and data ("3 selected").
- Plurals: write them with the count, "1 invoice" and "2 invoices". Indonesian does not inflect: "1 faktur", "2 faktur".

## Capitalisation

- Sentence case for headings, buttons, labels and menu items: "Create project", "Billing details".
- Capitalise product names and proper nouns only.
- Indonesian follows the same rule: "Simpan perubahan", not "Simpan Perubahan".
- Do not write in all capitals; use the `text-transform` style where a design needs it.
- Abbreviations are written once in full: "Value-added tax (VAT)".

## Indonesian specifics

- Address the user formally and plainly as "Anda", with a capital A. Do not use "kamu" or "kak". Avoid "Bapak/Ibu".
- Use the active voice: "Pembayaran gagal" rather than "Pembayaran telah mengalami kegagalan".
- Keep common technical words in English when Indonesians use them: email, password, login is "masuk", file, upload is "unggah", download is "unduh". Be consistent in one product.
- Prefer short everyday words: "pakai" for "menggunakan" in labels, "buat" for "membuat", but "gunakan" is fine in sentences.
- Plan for 30 to 40% more length than English; do not truncate button labels.
- Decimal comma and thousands dot in numbers; "Rp" attached to the amount.

## No jargon

- Write what a person would say: "Sign in", not "Authenticate"; "Could not connect", not "Request timeout 504".
- Name things the way users do, one name per thing across the product, English and Indonesian glossaries kept side by side.
- Never show internal identifiers, exceptions or SQL. Show a request ID for support.
- Do not use idioms or humour that do not translate.
- Do not use marketing words (seamless, powerful, effortless).

## Usage

- Do write the message the way you would say it to a colleague.
- Do use real examples in hints ("INV-2026-0418").
- Do test strings at 140% length.
- Do not use exclamation marks, emoji or ALL CAPS.
- Do not concatenate sentences from fragments; translators need whole sentences with placeholders (`{0} invoices selected`).
