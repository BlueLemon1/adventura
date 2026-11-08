# SRD content — attribution and license

Adventura includes adapted rules text and spell metadata from the System Reference Documents published by Wizards of the Coast LLC. The spell catalogues are maintained directly in `src/data/spells-2014.json` and `src/data/spells-2024.json`. Each spell record carries its own `contentSourceId`, identifying the exact SRD edition. English and German text are stored together on each canonical record.

## SRD 5.1 (2014 rules)

This work includes material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

Official English SRD 5.1: https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1.pdf
Official German SRD 5.1: https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1_DE.pdf

## SRD 5.2.1 (2024 rules)

This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

Official English SRD 5.2.1: https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf
Official German SRD 5.2.1: https://media.dndbeyond.com/compendium-images/srd/5.2/DE_SRD_CC_v5.2.1.pdf

## Data handling

Adventura adapts the official SRD material into its own JSON structure. The rulesets remain separate, and edition-specific wording and higher-level text structure are preserved. Spells not included in an SRD are maintained separately in `spells-additional.json`. They are never presented as official SRD entries. Each supplemental spell records its source book, page, and applicable rulesets. Their descriptions are independently written summaries, not reproductions of the source books' wording.

## Supplemental source catalogue

### Xanathar's Guide to Everything (XGE)

The initial supplemental entries are based on spell rules and metadata from *Xanathar's Guide to Everything* (Wizards of the Coast, 2017). The book is a separately published copyrighted supplement and is not covered by the SRD CC BY 4.0 license. Adventura therefore stores factual game metadata and concise independently written descriptions, not the book's original descriptive text.

Included starter entries: Absorb Elements (p. 150), Aganazzar's Scorcher (p. 150), Catapult (p. 150), Chaos Bolt (p. 151), and Shadow Blade (p. 164).

Legacy supplement spells are marked usable with both rulesets where no distinct 2024 replacement entry is included. This is a compatibility choice for the catalogue, not a claim that the spell text was reprinted in the 2024 Player's Handbook.

No endorsement by Wizards of the Coast is implied.
