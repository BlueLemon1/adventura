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

Included entries: Absorb Elements (p. 150), Aganazzar's Scorcher (p. 150), Catapult (p. 150), Chaos Bolt (p. 151), and Shadow Blade (p. 164).

### Tasha's Cauldron of Everything (TCE)

Tasha's supplemental entries are factual spell metadata with independently written German and English summaries. They are currently assigned to the 2014 ruleset, because that is the rules context of the sourcebook; compatibility with the 2024 ruleset is assessed spell by spell rather than assumed.

Included TCE spells:
- Mind Sliver (p. 108)
- Intellect Fortress (p. 107)
- Spirit Shroud (p. 108)
- Summon Beast (p. 109)
- Summon Aberration (p. 109)
- Summon Celestial (p. 110)
- Summon Construct (p. 111)
- Summon Elemental (p. 111)
- Summon Fey (p. 112)
- Summon Fiend (p. 112)
- Summon Shadowspawn (p. 113)
- Summon Undead (p. 114)
- Tasha's Caustic Brew (p. 115)
- Tasha's Mind Whip (p. 115)
- Tasha's Otherworldly Guise (p. 116)
- Dream of the Blue Veil (p. 106)
- Blade of Disaster (p. 106)

The spell catalogue may grow as additional sourcebooks are checked. A sourcebook's publication era does not automatically determine whether an entry is available under both rulesets.
### Sword Coast Adventurer's Guide (SCAG)

The catalogue also includes the four SCAG cantrips: Booming Blade (p. 142), Green-Flame Blade (p. 142), Lightning Lure (p. 143), and Sword Burst (p. 143). Their current entries are explicitly assigned to the 2014 ruleset. A separate 2024 entry will be added only after its revised wording and mechanics have been checked.

XGE entries are marked usable with both rulesets where their mechanics are compatible with the 2024 rules. This is a catalogue compatibility choice, not a claim that the spell text was reprinted in the 2024 Player's Handbook.

No endorsement by Wizards of the Coast is implied.
