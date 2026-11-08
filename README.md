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

## Rules content, localization, and licensing

The System Reference Documents (SRDs) are the source of truth for official rules content. Adventura maintains its ready-to-use catalogues directly in `src/data/`. There are no separate source snapshots, generated datasets, or import scripts.

### Canonical data model

- The initial official content scope is limited to SRD 5.1 (2014) and SRD 5.2.1 (2024).
- Every spell record carries an explicit `contentSourceId`: `srd-5.1` or `srd-5.2.1`. Source provenance is stored on the record itself and must never be inferred from a spell name or the currently selected character ruleset.
- The two rulesets are independent datasets. SRD 5.1 and SRD 5.2.1 must never be merged implicitly.
- English and German text live on the same canonical spell record in `name` / `description` and `localized` fields. Keep the official wording and structure of each edition; preserve the separate higher-level field where that edition provides one.
- Non-SRD supplements, homebrew, character-created content, and item-granted content are separate source categories. They must not be inserted into or presented as SRD records. Spells not included in an SRD are intentionally out of scope until added later as a clearly separate source.
- Source code, identifiers, domain models, keys, and normalized data fields use English.
- Do not silently fall back between ruleset versions or languages. If localized text is missing, keep it missing and make the UI communicate that clearly.
- Class-feature records continue to carry their own `contentSourceId`, ruleset, origin, unlock level, localized names/descriptions, and any explicitly granted spell IDs.

### Maintaining the data

- Edit the relevant JSON files in `src/data/` directly. These are the application data, not generated build artifacts.
- When adding or changing a spell, set `contentSourceId` explicitly and verify that the record belongs to the matching ruleset dataset.
- Preserve official SRD wording and edition-specific structure. Do not fill gaps with community material, other editions, or invented text.
- Keep `src/data/ATTRIBUTION.md` up to date with the official SRD releases, license notices, and provenance of included material.
- The build reads the committed JSON files directly; there is no data-import step.

Do not copy non-open content from paid sourcebooks. Include the exact required attribution and license notices for every bundled SRD dataset. See [src/data/ATTRIBUTION.md](src/data/ATTRIBUTION.md).

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
