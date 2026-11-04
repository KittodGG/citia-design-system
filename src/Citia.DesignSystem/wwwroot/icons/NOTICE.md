# Ikon Citia Design System

`icons.json` dan `sprite.svg` berisi 73 ikon yang disalin apa adanya dari TPS Integration `Helpers/Icon.cs` (commit 88cd8e4).
Grid 24 px, stroke 2 px `currentColor`, ujung dan sambungan bulat.

Sebagian path mengikuti atau sama dengan set ikon terbuka berikut. Saat menambah ikon dari set tersebut, sertakan pemberitahuan lisensinya.

- Lucide — ISC License, Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022. https://lucide.dev/license
- Feather — MIT License, Copyright (c) 2013-2023 Cole Bemis. https://github.com/feathericons/feather
- Tabler Icons — MIT License, Copyright (c) 2020-2024 Paweł Kuna. https://github.com/tabler/tabler-icons

Menambah ikon: tambahkan entri di `icons.json` → `icons`, lalu jalankan `dotnet run tools/tokens.cs` untuk membangun ulang `Icons/IconSet.g.cs` dan `sprite.svg`.
