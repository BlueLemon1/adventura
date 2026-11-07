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

The System Reference Documents (SRDs) are the source of truth for all official rules content. Adventura must not invent, paraphrase, or machine-translate SRD rules text.

### Canonical data model

- Official SRD content is the first and independently maintained content library. The initial scope is limited to the official SRD 5.1 and SRD 5.2.1.
- Non-SRD supplements, homebrew, character-created content, and item-granted content are separate source categories. They are not inserted into or presented as SRD records.
- Every content record references an explicit content source (for example, `srd-5.1` or `srd-5.2.1`). Never infer provenance from a class, subclass, spell name, or character ruleset.
- A character may use content from multiple sources, but every selected feature or spell retains its own source and ruleset metadata.

- Source code, identifiers, domain models, keys, and normalized data fields use English.
- Every ruleset is an independent dataset. SRD 5.1 (2014) and SRD 5.2.1 (2024) must never be merged implicitly.
- Every content record has a stable English canonical ID and source provenance.
- Localized names are aliases of the same canonical record, not separate spells or features.
- English and German names and descriptions are imported from their respective SRD language editions. A missing translation stays explicitly unavailable; it must never silently fall back to a hand-written translation or to another ruleset.
- Display labels may be localized as application UI. Rules text and game data may not be authored in the UI translation dictionary.

### Data ingestion

- The source registry and provenance types live in `src/domain/contentSources.ts`. It currently registers only the two official SRD releases; additional sources are added only after their provenance and usage rights have been checked.

- Normalized class-feature records are modeled in `src/domain/classFeatureCatalog.ts`. Each record carries its ruleset, exact content source, class/subclass origin, unlock level, canonical localized names and descriptions, and any explicitly granted spell IDs. The shared validator rejects duplicate IDs, cross-ruleset/source contamination, invalid levels, and incomplete origin metadata. Missing locale text remains missing rather than falling back to another language.

- Keep source snapshots separate from normalized application data.
- Normalize source data through repeatable scripts; do not hand-edit generated SRD datasets.
- Preserve source document, version, language, license, source URL, and import date in the data manifest.
- Validate canonical IDs, duplicate records, cross-language aliases, ruleset boundaries, and required fields during import/build.
- Character-specific, campaign, item-granted, and homebrew content must remain distinguishable from SRD records.

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
