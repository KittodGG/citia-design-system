---
title: Releases and updates
group: getting-started
order: 7
summary: How versions are numbered, how an app moves to a new version and back, and how the maintainer publishes a release to the Citia NuGet feed.
---

Citia Design System ships as one NuGet package, `Citia.DesignSystem`, on the Citia feed. Each app decides when it takes a new version. Nothing changes in an app until someone updates the package reference, builds and deploys it, so a release never breaks a running app by itself.

- **Package:** `Citia.DesignSystem`
- **Feed:** `https://design.citia-engineering.com/nuget/v3/index.json`
- **Current version:** next to the logo at the top of this site
- **What changed:** [Changelog](./changelog.md)

## Version numbers

Versions follow SemVer, `major.minor.patch`.

| Change | Example | What an app has to do |
| --- | --- | --- |
| Patch | `2.0.1 → 2.0.2` | Nothing. Fixes only, markup stays the same. |
| Minor | `2.0.2 → 2.1.0` | Nothing. New components, attributes or tokens; existing markup keeps working. |
| Major | `2.1.0 → 3.0.0` | Follow the migration guide: a token, class or tag helper that apps use has changed. |

A published version is never replaced or removed. A fix always comes as a new version.

## Update an app

From the web project folder, run the install command again. It moves the app to the newest version:

```powershell
irm https://design.citia-engineering.com/install.ps1 | iex
```

To pick a version, or to see what is new first:

```powershell
dotnet list package --outdated
dotnet add package Citia.DesignSystem --version 2.1.0
```

Offline apps run `install-citia-ds.ps1 -From <folder>` from the newer offline zip. Before you commit the `.csproj` change, open the app and check:

- [ ] The pages you touch most, in light and dark.
- [ ] One page with `?culture=id`.
- [ ] A form with a validation error, a table, and a dialog or menu if the app uses them.
- [ ] The browser console shows no errors.

Then commit and deploy as usual. To go back, set the previous version with the same command, build and deploy.

### Several projects in one repository

Keep the version in one place with central package management. `Directory.Packages.props` next to the solution:

```xml
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>
  <ItemGroup>
    <PackageVersion Include="Citia.DesignSystem" Version="2.0.1" />
  </ItemGroup>
</Project>
```

Each project then references the package without a version:

```xml
<PackageReference Include="Citia.DesignSystem" />
```

An update is a one-line change to `Directory.Packages.props`. Central package management covers every package in the repository, so move the other versions there too.

## Publish a release

For the design system maintainer. You need the .NET 10 SDK, PowerShell, SSH access to the staging server as the deploy user through the alias `citia-ds-staging` in `~/.ssh/config` (or set `CITIA_DS_SSH_HOST`), and the GitHub CLI signed in with write access to `KittodGG/citia-design-system`.

1. Make the change, with its documentation in English and Indonesian.
2. Raise `<Version>` in `src/Citia.DesignSystem/Citia.DesignSystem.csproj` according to the table above.
3. Add a `## <version> - <date>` entry to `CHANGELOG.md`, `docs/en/changelog.md` and `docs/id/changelog.md`.
4. Commit and push. CI builds and smoke-tests every push; wait for it to pass.
5. Run the release script:

   ```powershell
   powershell -NoProfile -File tools/release.ps1
   ```

6. If the documentation changed, deploy the site:

   ```powershell
   powershell -NoProfile -File tools/deploy-site.ps1
   ```

`release.ps1` stops at the first failed check:

| Check | Fails when |
| --- | --- |
| Changelog | One of the three changelog files has no entry for the version. |
| Not published | The version is already on the feed or on GitHub. |
| Git | The working tree has uncommitted changes, or the commit is not pushed. |
| Tokens and CSS | A required WCAG contrast pair is below its minimum, or regenerating tokens or `ds.css` changes a committed file. |
| Smoke test | The package, installed into a new Razor Pages app, does not render, serve its assets and daisyUI classes, switch language, show a validation error or show a toast. Run in Development and as a published app. |
| Offline installer | `install-citia-ds.ps1`, run from the offline zip on a simulated machine without internet, does not produce a working app. |
| Live feed | After the upload, the same smoke test fails when it installs from the feed. |

Then it creates the GitHub release `v<version>` with the `.nupkg` (the same file as on the feed), `citia-ds-offline-<version>.zip` and `citia-ds-static-<version>.zip`. See [Installation](./installation.md#offline).

`deploy-site.ps1` builds the site for Linux, uploads it and restarts it. When the new build does not answer, it puts the previous one back. Published packages live in their own folder on the server and survive every site deployment.

You can run the smoke test on its own at any time:

```powershell
powershell -NoProfile -File tools/smoke-test.ps1 -Source https://design.citia-engineering.com/nuget/v3/index.json -Version 2.0.2
```
