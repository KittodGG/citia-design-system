# syntax=docker/dockerfile:1
# Citia Design System documentation site. Build context: the repository root.
#   docker build -f site/Citia.DesignSystem.Docs/Dockerfile -t citia-ds-docs .
#   docker run --rm -p 8090:8080 citia-ds-docs

# CSS: Tailwind CSS standalone CLI + daisyUI, pinned and SHA-256 verified (same versions as tools/css.ps1 and TPS).
FROM debian:bookworm-slim AS css
WORKDIR /src
ADD --checksum=sha256:dc61b3ac6b8c9ca874c0cc4c57b2409791a64c5540404ca5f5367360babc313a --chmod=755 \
    https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-linux-x64 /usr/local/bin/tailwindcss
ADD --checksum=sha256:85819d3fe86a852237b439b13f481481aac58e562ac47694cd11c3038e994f2a \
    https://github.com/saadeghi/daisyui/releases/download/v5.7.47/daisyui.mjs .tools/daisyui.mjs
ADD --checksum=sha256:d92d2f488933dab757f046e81ebd4986e51e9423307798dc3545d09a15542c89 \
    https://github.com/saadeghi/daisyui/releases/download/v5.7.47/daisyui-theme.mjs .tools/daisyui-theme.mjs
COPY src/Citia.DesignSystem/Styles ./src/Citia.DesignSystem/Styles
COPY src/Citia.DesignSystem/Views ./src/Citia.DesignSystem/Views
# ds.bundle.css scans these for the classes the library emits (see the @source lines there).
COPY src/Citia.DesignSystem/TagHelpers ./src/Citia.DesignSystem/TagHelpers
COPY src/Citia.DesignSystem/Ui ./src/Citia.DesignSystem/Ui
COPY src/Citia.DesignSystem/wwwroot/js ./src/Citia.DesignSystem/wwwroot/js
COPY site/Citia.DesignSystem.Docs/Styles ./site/Citia.DesignSystem.Docs/Styles
COPY site/Citia.DesignSystem.Docs/Pages ./site/Citia.DesignSystem.Docs/Pages
COPY site/Citia.DesignSystem.Docs/Docs ./site/Citia.DesignSystem.Docs/Docs
COPY site/Citia.DesignSystem.Docs/wwwroot/js ./site/Citia.DesignSystem.Docs/wwwroot/js
COPY docs ./docs
RUN cd src/Citia.DesignSystem && tailwindcss -i Styles/ds.bundle.css -o wwwroot/css/ds.css --minify \
 && cd /src/site/Citia.DesignSystem.Docs && tailwindcss -i Styles/docs.css -o wwwroot/css/docs.css --minify

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props global.json ./
COPY src/Citia.DesignSystem/Citia.DesignSystem.csproj src/Citia.DesignSystem/
COPY site/Citia.DesignSystem.Docs/Citia.DesignSystem.Docs.csproj site/Citia.DesignSystem.Docs/
RUN dotnet restore site/Citia.DesignSystem.Docs/Citia.DesignSystem.Docs.csproj
COPY . .
COPY --from=css /src/src/Citia.DesignSystem/wwwroot/css/ds.css src/Citia.DesignSystem/wwwroot/css/ds.css
COPY --from=css /src/site/Citia.DesignSystem.Docs/wwwroot/css/docs.css site/Citia.DesignSystem.Docs/wwwroot/css/docs.css
RUN dotnet publish site/Citia.DesignSystem.Docs/Citia.DesignSystem.Docs.csproj -c Release -o /app/publish --no-restore /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
USER app
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
COPY --from=build --chown=app:app /app/publish .
ENTRYPOINT ["dotnet", "Citia.DesignSystem.Docs.dll"]
