# SRD source snapshots

This directory contains the immutable input snapshots used to build Adventura's committed catalogues in `src/data/`. The files are grouped first by SRD release, then by content type. Language is part of each filename or directory name.

## Layout

```text
data/sources/
├── srd-5.1/
│   ├── classes/
│   │   ├── en.md
│   │   └── de/
│   │       ├── classes.json
│   │       ├── feature-index.json
│   │       ├── features.json
│   │       ├── rage.md
│   │       └── subclasses.json
│   └── spells/
│       ├── en.json
│       └── de.json
└── srd-5.2.1/
    ├── classes/
    │   ├── en.md
    │   └── de.md
    └── spells/
        ├── en.json
        └── de-en.json
```

## Why the file formats differ

The extension reflects the upstream source format, not a different Adventura data model:

- Markdown files are extracted SRD documents with headings and prose. The class importers parse those headings and retain the feature text.
- JSON files are structured upstream exports or translation dictionaries. The spell importers match their spell IDs and fields to Adventura's canonical IDs.
- `srd-5.2.1/spells/de-en.json` is a JSON snapshot converted from the upstream `spells.js` by removing only its JavaScript assignment wrapper. The spell records and their text are retained as supplied.

A class document's spell lists contain spell names and class availability, not the complete spell entries. Complete spell descriptions, components, ranges, durations, and higher-level text therefore come from the separate spell snapshots.

## Snapshot provenance

| Snapshot | Upstream source | Pinned revision |
| --- | --- | --- |
| SRD 5.1 classes (EN) | [your5e/5e-srd-markdown](https://github.com/your5e/5e-srd-markdown) | Per-class revisions documented in [../../src/data/ATTRIBUTION.md](../../src/data/ATTRIBUTION.md) |
| SRD 5.1 classes (DE) | [Mystikal91/heroquill](https://github.com/Mystikal91/heroquill/tree/main/locales/de/srd51) | See attribution file |
| SRD 5.1 spells (EN) | [5e-bits/5e-database](https://github.com/5e-bits/5e-database/blob/536928f7460b5e5343dfb1805ded15706616765e/src/2014/en/5e-SRD-Spells.json) | `536928f7460b5e5343dfb1805ded15706616765e` |
| SRD 5.1 spells (DE) | [Mystikal91/heroquill](https://github.com/Mystikal91/heroquill/blob/main/locales/de/srd51/spells.json) | See attribution file |
| SRD 5.2.1 classes (EN) | [downfallx/dnd-5e-srd-markdown](https://github.com/downfallx/dnd-5e-srd-markdown) | `c8c4a583afa446f38b5dc43548025bd4b37ce2da` |
| SRD 5.2.1 classes (DE) | [netzrenner/dnd.srd.5.2.1-de](https://github.com/netzrenner/dnd.srd.5.2.1-de) | See attribution file |
| SRD 5.2.1 spells (EN) | [5e-bits/5e-database](https://github.com/5e-bits/5e-database/blob/b910e6981ce5de122738b331156954b6781b583e/src/2024/en/5e-SRD-Spells.json) | `b910e6981ce5de122738b331156954b6781b583e` |
| SRD 5.2.1 spells (DE + EN) | [Lil-Dank/zauberkarten-werkstatt](https://github.com/Lil-Dank/zauberkarten-werkstatt/blob/8b7d6fa43963315f14dbbd4f18a819a70bed6890/spells.js) | `8b7d6fa43963315f14dbbd4f18a819a70bed6890` |

Do not edit snapshots to fix application data. Correct the relevant upstream snapshot/import mapping, then intentionally regenerate the affected committed dataset. Do not run importers as part of the normal build or deployment.
