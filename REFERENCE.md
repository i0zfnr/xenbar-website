# XenBar website

Local publication draft for XenBar 0.11.4. The desktop application was used as a read-only reference. No app files or profile data were changed.

## Preview

From this directory, run `npm start` (Node.js required for the preview server only). Open http://127.0.0.1:4173. To choose another port in PowerShell, run `$env:PORT=4180` before `npm start`.

The website itself is dependency-free static HTML, CSS and JavaScript. Deploy only the contents of `dist/` to any static host. Do not deploy this preview server. There is no framework build or package installation step.

## Configure publication

Edit `dist/site-config.js`:

- `downloadUrl`: verified HTTPS release URL. Until configured, the download card explains that the public download is coming soon.
- `siteUrl`: final HTTPS website URL, including a subdirectory if applicable. This enables canonical and social URL metadata and replaces the local-preview footer label.
- `supportUrl`: optional HTTPS support destination; otherwise Help opens the compatibility FAQ.
- `releaseNotesUrl`: optional HTTPS release notes destination.
- `version`, `fileName`, `sizeBytes`: keep these aligned with the uploaded executable.

Keep all URLs empty until their destinations are selected and verified. The page accepts HTTPS external destinations. No hosting account, domain, public URL or download host has been created.

## Before publication

1. Choose a static host and domain, then configure the website URL.
2. Upload the intended executable to a release host. Verify that it downloads successfully, matches the checksum below, and configure `downloadUrl`.
3. Confirm the desired Windows version/architecture support on target machines. The page currently makes no unverified Windows 10/11, ARM or x64 compatibility claim.
4. Review media permissions for public use. The supplied film includes the user's selected anime media, album artwork, third-party icons and wallpaper; their owners retain rights. The film's local README identifies these sources. No substitute rights clearance is implied by using the supplied assets in this local draft.
5. Recheck the configured download, support links, social preview and page on the actual public origin. Add public release notes if desired.

## Verified release reference

- Source: `C:\laragon\www\xenbar\release\XenBar-0.11.4-portable.exe`
- Version confirmed in the app's `package.json`: 0.11.4.
- File size: 116,451,536 bytes (116.45 decimal MB; approximately 111.06 MiB).
- SHA-256: `2BBE6614265D256798AA195B55F5264AB73C3962A929BB17E839294002903976`
- Electron portable target; executable signing disabled in local build configuration.
- The executable is intentionally not duplicated into this website or served as a public release.

## Reference assets

Only the following curated visual assets were copied; no user profile, snapshot JSON, tokens or app source is included:

- `assets/dock.png`: `video/xenbar-my-setup/footage/dock.png`, real v0.11.3 renderer capture.
- `assets/notch.png`: `video/xenbar-my-setup/footage/expanded.png`, real v0.11.3 renderer capture.
- `assets/workspace.png`: `.local/notch-packaged-check/workspace-880-midnight.png`, v0.11.1 diagnostic reference, visibly labelled in the gallery.
- Supplied 20-second MP4 and poster from the app's `media/` directory. The film was captured on v0.11.3; its local source README documents staged playback and snapshot readings.
- Icon from `assets/icon.png`; wallpaper from `public/wallpapers/purple.jpg`.

The hero combines the actual dock capture, wallpaper, decorative text and a CSS notch face. It is labelled as a composed desktop preview. Interface captures contain past readings and are not live data or performance claims. Product capabilities were checked against the local README and package configuration; physical device behavior was not retested for this website.

## Verification

`npm run check` validates JavaScript syntax. Browser QA covered the default desktop preview and 390-pixel mobile viewport, image loading, all gallery tabs including arrow-key navigation, 20-second video playback, pending-download state, and release disclosure. HTTP checks verified the page and partial-content video serving. See `QA.md` for the final record.
