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
- English and German names and descriptions are imported from their respective SRD language editions. If a localized field is missing, the English source field is used as a fallback and the UI must mark it clearly (for example, `EN – englischer Ersatztext`). The fallback is presentation-only: it must not be stored or attributed as an official translation.
- Display labels may be localized as application UI. Rules text and game data may not be authored in the UI translation dictionary.

### Data ingestion

- The source registry and provenance types live in `src/domain/contentSources.ts`. It currently registers only the two official SRD releases; additional sources are added only after their provenance and usage rights have been checked.
- Normalized class-feature records are modeled in `src/domain/classFeatureCatalog.ts`. Each record carries its ruleset, exact content source, class/subclass origin, unlock level, canonical localized names and descriptions, and any explicitly granted spell IDs. The shared validator rejects duplicate IDs, cross-ruleset/source contamination, invalid levels, and incomplete origin metadata. Missing locale text remains missing rather than falling back to another language.
- Source snapshots are kept separate from the ready-to-use JSON datasets in `src/data/`.
- Import scripts are one-time/repeatable maintenance tools. They are **not** run during development, build, or deployment. Once imported, the committed JSON files are what the app reads. Do not rerun an importer unless intentionally rebuilding that dataset from its matching source snapshot.
- Do not hand-edit generated SRD datasets; make changes in the source snapshot/import process and regenerate the target dataset instead.
- Keep source document, version, language, license, source URL, and import date documented in the data provenance/attribution files.
- Character-specific, campaign, item-granted, and homebrew content must remain distinguishable from SRD records.

#### Import scripts currently in use

| Script / npm command | Purpose | Source snapshot | Output |
| --- | --- | --- | --- |
| `import:srd:2014:features` | Build English SRD 5.1 class and subclass features | `data/sources/srd-5.1/classes.en.md` | `src/data/class-features-2014.json` |
| `import:srd:2014:features:de` | Add German SRD 5.1 class and subclass text | `data/sources/srd-5.1/*.de.*`, `feature-index.json` | `src/data/class-features-2014.json` |
| `import:srd:2024:features` | Build English SRD 5.2.1 class and subclass features | `data/sources/srd-5.2.1/classes.en.md` | `src/data/class-features-2024.json` |
| `import:srd:2024:features:de` | Add German SRD 5.2.1 class and subclass text | `data/sources/srd-5.2.1/classes.de.md` | `src/data/class-features-2024.json` |
| `import:srd:2014:spells:de` | Add German SRD 5.1 spell fields | `data/sources/srd-5.1/spells.de.json` | `src/data/spells-2014.json` |
| `import:srd:2014:spells:en` | Add English SRD 5.1 higher-level fields | `data/sources/srd-5.1/spells-higher-level.en.json` | `src/data/spells-2014.json` |

All six import scripts above are referenced by `package.json` and have a distinct role in rebuilding the corresponding dataset. No unused import script or unused source snapshot was found, so none was deleted.

**Spell-data limitation:** `src/data/spells-2024.json` is already a committed, ready-to-use dataset, but this repository currently has no matching SRD 5.2.1 spell source snapshot or spell importer. It is not generated by any of the six scripts above. The 2014 English spell importer only supplies the separate `higher_level` source field; the base English 2014 spell records are already present in `spells-2014.json`. This distinction is intentional and should remain explicit rather than pretending there is a complete 2024 spell-import pipeline.

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
