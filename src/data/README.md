# Data layout

Adventura keeps official source datasets, official locale editions, supplemental content, and application-specific mechanics in separate, explicit layers.

## Directories

- `srd/2014/` and `srd/2024/`: edition-specific English SRD source datasets. These files contain source-language rules content only.
- `srd/<ruleset>/locales/<locale>/`: official translated editions of that same SRD, keyed by the canonical IDs in the English source files. Locale files are still SRD source material, not Adventura supplements.
- `classes/`: supplemental class and subclass catalog, reusable feature definitions, class/subclass progression assignments, and Adventura-specific feature mechanics. See [classes/README.md](classes/README.md).
- `spells/`: supplemental spell records, spell mechanics, and edition/class availability exceptions keyed by canonical spell ID. See [spells/README.md](spells/README.md).

## Data relationships

- SRD English records own canonical IDs, rules text, spell mechanics, class membership, and source provenance.
- Official locale records contain only translated display text and reference the canonical SRD IDs. They never repeat rules mechanics or class/availability data.
- Supplemental feature definitions own reusable text; progression records assign those definitions to classes/subclasses and ruleset-specific levels.
- Spell damage and feature mechanics are application data, never copied into SRD source records.
- Spell availability and class/subclass progression are independent of translated display text.

## Data conventions

- Keep each fact in one authoritative place. Join related records by stable IDs rather than copying fields.
- Keep 2014 and 2024 source datasets separate.
- Keep official SRD text and translations within the corresponding ruleset's `srd/<ruleset>/` tree.
- Keep Adventura-only compatibility decisions, extracted mechanics, and annotations outside `srd/`.
- Omit optional metadata when no value is needed instead of storing empty objects or placeholders.
- Run `npm test` to validate references, uniqueness, source boundaries, locale coverage, and mechanics relationships.
