---
title: Voice and tone
group: content
order: 2
summary: The voice of the interface is calm, precise and helpful. Tone shifts with the situation, from routine to error to destructive actions, in both languages.
---

Voice is who is speaking and stays the same everywhere. Tone is how that voice adapts to what the person is doing and feeling. The concrete rules for strings are in [Writing](./writing.md).

## Voice

| Quality | Means | Does not mean |
| --- | --- | --- |
| Calm | Even, unhurried, no exclamation marks, no alarm for routine things | Flat or cold |
| Precise | Specific nouns and numbers: "3 invoices", "by 08 Nov, 17:00" | Technical or formal |
| Helpful | Says what to do next and keeps the user in control | Chatty or instructional about the obvious |

The product speaks as a competent colleague: it addresses the user directly ("You can…", "Anda dapat…"), uses short sentences and never talks about itself ("We are sorry to inform you"). It does not joke at the user's expense, flatter, or use marketing words.

## Tone by situation

| Situation | Tone | Example (en) | Example (id) |
| --- | --- | --- | --- |
| Routine action | Brief, neutral | Project saved | Proyek tersimpan |
| Success that matters | Warm, factual | Invoice INV-2026-0418 sent to daniel.okafor@example.com. | Faktur INV-2026-0418 terkirim ke daniel.okafor@example.com. |
| First use, onboarding | Encouraging, concrete | Create your first project to start tracking budgets. | Buat proyek pertama Anda untuk mulai melacak anggaran. |
| Empty state | Calm, inviting | No invoices yet. Invoices you create appear here. | Belum ada faktur. Faktur yang Anda buat tampil di sini. |
| Warning | Direct, no drama | The card on file expires on 30 Nov. Update it to avoid a failed payment. | Kartu yang tersimpan kedaluwarsa pada 30 Nov. Perbarui agar pembayaran tidak gagal. |
| Validation error | Matter-of-fact, helpful | Enter a date like 25 Jan 2026. | Isi tanggal seperti 25 Jan 2026. |
| System error | Honest, reassuring about data | The invoice was not saved. Your changes are still here. Try again in a moment. | Faktur belum tersimpan. Perubahan Anda masih ada. Coba lagi sebentar lagi. |
| Destructive action | Serious, exact about consequence | Delete PRJ-1024? The project and its 3 linked invoices are deleted. This cannot be undone. | Hapus PRJ-1024? Proyek dan 3 faktur terkait dihapus. Tindakan ini tidak bisa dibatalkan. |
| Permission denied | Neutral, points to a fix | You do not have access to this page. Ask an administrator to add you. | Anda tidak punya akses ke halaman ini. Minta administrator menambahkan Anda. |
| Waiting | Informative | Generating report. This usually takes under a minute. | Membuat laporan. Biasanya kurang dari satu menit. |

## Principles

- **Lead with the useful part.** The first words tell the person what happened or what to do.
- **Be specific.** Use the name of the thing and the number: "PRJ-1024", "12 rows skipped".
- **Own the problem.** For system failures say "was not saved", not "you failed to save"; never blame the user.
- **Match the weight.** A small success gets 2 words; a destructive action gets a full sentence of consequence.
- **Stay human, not cute.** No jokes in errors, no emoji, no exclamation marks; kindness shows as clarity.
- **Same voice in both languages.** The Indonesian text is written natively, formal and plain ("Anda"), not translated word for word.

## Usage

- Do write for someone in the middle of a task who has seconds to read.
- Do keep the same tone for the same situation across the product.
- Do not turn the interface into a character with a name, a mood or a joke.
- Do not use urgency or fear to push an action.
