# Adventura

A local-first D&D 5e character companion for use at the table.

Adventura focuses on one player's character sheet, personal and party inventory, spellbook, and level-up choices. It is not a campaign or virtual tabletop manager.

## Rulesets

Each character has an explicit ruleset:
- **D&D 5e (2014)**
- **D&D 5e (2024)**

Rules-dependent character progression, spell access, preparation rules, and spell-slot handling must always be evaluated against that character's selected ruleset. The two rulesets must not be silently mixed.

## Stack
- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- IndexedDB for local persistence
- Versioned JSON import/export
- Zod, i18next, Lucide

## Data and privacy

- No account, login, hosted database, or backend is required.
- Character data stays in the browser on the current device.
- Users can export/import characters as versioned JSON files to move or back up their data.
- Import must validate the file format and schema before changing local data.
- Do not store character data in GitHub Pages or commit it to this repository.
- Future synchronization may be added behind the storage abstraction, but it is not part of the initial product.

## Rules content and licensing

Rules and spell data must come from sources that Adventura is permitted to redistribute, such as the applicable System Reference Document under its license. Do not copy non-open content from paid sourcebooks. Include required attribution and license notices alongside bundled rules data.

## Development

```bash
npm install
npm run dev
```

## Deployment

GitHub Actions builds and deploys the static frontend to GitHub Pages. The app has no paid runtime service dependency.

## Install as an app

Adventura is a Progressive Web App (PWA) and can be installed from its HTTPS GitHub Pages address.

- **Chrome / Edge on Windows:** Open Adventura, then use the install icon in the address bar or the browser menu and choose **Install Adventura**.
- **Android:** Open Adventura in Chrome, open the browser menu, and choose **Install app** or **Add to Home screen**.
- **iPhone / iPad:** Open Adventura in Safari, tap **Share**, then choose **Add to Home Screen**.

After the first successful visit, the service worker caches the app shell and previously loaded app resources for offline use. Character data remains stored locally in the browser; use JSON export/import to move it between devices.
