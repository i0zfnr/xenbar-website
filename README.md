# XenBar website — React Native Web

Project: `C:\laragon\www\xenbar-website`.

The landing page is implemented with React and React Native Web (`View`, `Text`, `Image`, `Pressable`, `StyleSheet`, `useWindowDimensions`). Vite serves and builds the browser application. Native browser elements handle navigation links, video playback and disclosure panels. This project targets the web; it is not an Android/iOS application scaffold.

## Run

```powershell
cd C:\laragon\www\xenbar-website
npm install
npm run dev
```

Open http://127.0.0.1:5174. The development server uses a strict port to avoid redirecting you to an unexpected port. Stop it with Ctrl+C.

## Production build

```powershell
npm run build
npm run preview
```

Preview the production build at http://127.0.0.1:4174. Publish only `dist/` to your chosen static host. A Laragon virtual host can also use `C:\laragon\www\xenbar-website\dist` as its document root; the dev URL above works without changing Laragon settings. The repository root contains development source, so do not use it as a production document root.

## Branding

The supplied wolf artwork is copied unchanged to `public/assets/xenbar-logo.png`. It is used for the header, download section, footer, browser favicon, touch icon and configured social image. Historical product screenshots and video retain their recorded app branding. No desktop-app source, icon, executable or user profile was modified.

## Release and hosting configuration

Edit `public/site-config.js`, then rebuild for production:

- `version`, `fileName`, `sizeBytes`: current release details (0.11.4, 116,451,536 bytes).
- `downloadUrl`: verified HTTPS public executable destination; currently empty. The page shows a pending-download message until configured.
- `siteUrl`: final HTTPS website origin. Enables canonical/social metadata and removes the local-preview footer label.
- `supportUrl`, `releaseNotesUrl`: optional verified HTTPS destinations.

Hosting, domain and executable download destination have not been selected or created. Review public media permissions before publishing the supplied artwork and showcase assets. `REFERENCE.md` records the original read-only app/media sources and executable SHA-256; its original static-project run instructions are superseded by this README.
