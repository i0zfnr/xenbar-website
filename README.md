# XenBar website — React Native Web

Project: `C:\laragon\www\xenbar-website`.

The landing page uses React, a React Native Web page shell, and responsive browser elements styled with CSS. Vite serves and builds the browser application. This project targets the web; it is not an Android/iOS application scaffold.

The design takes inspiration from the Nusa reference supplied by the user: near-black surfaces, bold centered typography, restrained blue/violet glows, a prominent interactive preview, and feature grids. All branding, release details and product copy are specific to XenBar.

The preview includes nine selectable states: Resting, Closed, Music, Focus timer, Water, Shelf, To-do, Calendar and Quick actions. The supplied 23 October 2026 screenshots define the notch silhouette, status bar, cross-shaped eyes and widget layouts. Three selectable desktop backdrops and a screenshot-based dock surface preserve the captured appearance. The dock has interactive hotspots that select related previews; the focus timer counts down, task checkboxes update their completion count, water intake responds to the selected drink size, and the file shelf accepts a sample item. Screenshot, audio output and notes shortcuts explain their app-only behavior rather than accessing the computer. All eleven newly supplied captures are also available unchanged in the gallery, alongside the earlier workspace image. These are browser demonstrations, not access to local Windows apps or files. Automatic cycling can be paused and respects reduced-motion preferences. No video or audio is embedded.

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

The supplied wolf artwork is copied unchanged to `public/assets/xenbar-logo.png`. It is used for the header, download section, footer, browser favicon, touch icon and configured social image. Historical product screenshots retain their recorded app branding. The showcase uses a React/CSS animation, with clickable dock regions, an expanding music notch, widget demos and playback controls. It respects reduced-motion preferences and plays no audio. The former recording and poster are archived locally in ignored `reference-media/`, outside the published assets. No desktop-app source, icon, executable or user profile was modified.

## Release and hosting configuration

Edit `public/site-config.js`, then rebuild for production:

- `version`, `fileName`, `sizeBytes`: current release details (0.11.4, 116,451,536 bytes).
- `downloadUrl`: verified HTTPS public executable destination; currently empty. The page shows a pending-download message until configured.
- `siteUrl`: final HTTPS website origin. Enables canonical/social metadata and removes the local-preview footer label.
- `supportUrl`, `releaseNotesUrl`: optional verified HTTPS destinations.

Hosting, domain and executable download destination have not been selected or created. Review public media permissions before publishing the supplied artwork and showcase assets. `REFERENCE.md` records the original read-only app/media sources and executable SHA-256; its original static-project run instructions are superseded by this README.
