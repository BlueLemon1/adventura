# Data layout

Adventura keeps official source datasets separate from supplemental content and app-specific mechanics.

## Directories

- `srd/2014/` and `srd/2024/`: edition-specific SRD datasets. Treat these as source snapshots; do not add Adventura-only metadata or merge the editions.
- `classes/`: supplemental class and subclass catalog, reusable feature definitions, class/subclass progression assignments, and Adventura-specific feature mechanics. See [classes/README.md](classes/README.md).
- `spells/`: supplemental spell records, spell mechanics, and edition/class availability exceptions. See [spells/README.md](spells/README.md).

## Root files

- `ATTRIBUTION.md`: licensing, source attribution, and data-handling rules for the whole data directory.

## Data conventions

- Keep source text and app mechanics in separate files. Join them through stable IDs rather than copying source records.
- Put ruleset-specific availability on the record that owns that decision; do not duplicate it across dependent records.
- Omit optional metadata when no value is needed instead of storing empty objects or placeholder fields.
- Preserve the SRD files as source data. Put corrections, compatibility decisions, extracted mechanics, and app-specific annotations in supplemental datasets.
