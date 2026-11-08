# SRD spell data — attribution and license

Adventura includes spell text and structured spell metadata from the following System Reference Documents. The spell datasets are distributed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).

## D&D SRD 5.1 (2014 rules)

This work includes material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC, available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

English higher-level spell text source: the `higher_level` field from the SRD 5.1 (2014) spell dataset in 5e-bits/5e-srd-api, `packages/5e-database/src/2014/en/5e-SRD-Spells.json` (https://github.com/5e-bits/5e-srd-api). The file in `data/sources/srd-5.1/spells-higher-level.en.json` is a raw snapshot of that field for all 319 spells; source values are retained verbatim. The import script only maps non-empty values to Adventura's canonical 2014 spell IDs and writes the derived application data to `src/data/spell-higher-level-2014.en.json`. The snapshot is a structured third-party transcription, not a replacement for the official SRD document.

Structured data conversion source: DnD-RSR, "spells-SRD14.js", by A. Bruce Pilcher, https://github.com/BruceP42/DnD-RSR. The upstream file identifies its 319 entries as SRD 5.1 content only. Adventura normalizes this data for its own catalog.

## D&D SRD 5.2 (2024 rules)

Portions of this work include material from the System Reference Document 5.2 ("SRD 5.2") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

Structured data source: 5e-bits/5e-database, `src/2024/en/5e-SRD-Spells.json`, https://github.com/5e-bits/5e-database. Adventura normalizes this data for its own catalog.

## License

CC BY 4.0 permits sharing and adaptation, including commercial use, provided appropriate attribution is given, a link to the license is supplied, and changes are indicated. Adventura's spell catalogs are adapted and normalized from the sources above. No endorsement by Wizards of the Coast is implied.

License text: https://creativecommons.org/licenses/by/4.0/legalcode

## German-language SRD 5.2.1 spell data

German spell names, descriptions, components, ranges and other localized fields are sourced from the bilingual SRD 5.2.1 dataset in Lil-Dank/zauberkarten-werkstatt, file spells.js: https://github.com/Lil-Dank/zauberkarten-werkstatt. Its README identifies the German text as material from Wizards of the Coast LLC's German System Reference Document 5.2.1, published under CC BY 4.0: https://media.dndbeyond.com/compendium-images/srd/5.2/DE_SRD_CC_v5.2.1.pdf. Adventura incorporates the German SRD fields and adds normalized spell metadata and derived damage summaries. The upstream dataset and its attribution are retained here as provenance; this does not imply endorsement by Wizards of the Coast.


## Required attribution for the German SRD 5.1 text

Dieses Werk enthält Material aus dem Systemreferenzdokument 5.1 („SRD 5.1“) von Wizards of the Coast LLC, das unter https://dnd.wizards.com/de/resources/systems-reference-document verfügbar ist. Das SRD 5.1 ist lizenziert gemäß der Lizenz Creative Commons Namensnennung 4.0 International, die unter https://creativecommons.org/licenses/by/4.0/legalcode.de verfügbar ist.

German SRD 5.1 spell descriptions are being added only from the official German SRD 5.1 document. No descriptions, rules text, class lists, or spell data are borrowed from SRD 5.2.1. Until an individual SRD 5.1 description has been verified and added, the German interface shows an explicit notice instead of silently falling back to English or to 2024 text.

## Required attribution for SRD 5.2.1

This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

Changes: Adventura uses the official German SRD fields, normalizes their structured data, and derives damage-dice and average-damage summaries. These additions are modifications of the source material.

## Explicit spell grants from class features

Adventura keeps spell grants separate from general class spell lists. In SRD 5.2.1, the Bard's Words of Creation feature grants Power Word Heal and Power Word Kill; these are linked to their canonical 2024 spell records in the spellbook. Other one-spell feature grants are likewise linked by canonical spell ID. This does not automatically add a class's full spell list or optional subclass-list choices to a character.

## SRD 5.2.1 German class and subclass features

German class and subclass feature names and descriptions are taken from the official German SRD 5.2.1 translation, published by Wizards of the Coast under CC BY 4.0. The Markdown source snapshot was converted from the official German PDF and is used as an import source.

- Official source: https://media.dndbeyond.com/compendium-images/srd/5.2/DE_SRD_CC_v5.2.1.pdf
- Markdown conversion: https://github.com/netzrenner/dnd.srd.5.2.1-de
- License: CC BY 4.0 (Wizards of the Coast LLC)
- `data/sources/srd-5.1/rage.de.md` is transcribed directly from the official German PDF, class feature section, page 9.

## SRD 5.2.1 English class and subclass features

The English class and subclass feature text is sourced from the SRD 5.2.1 class section published by Wizards of the Coast LLC under CC BY 4.0. The source snapshot is a Markdown extraction from the public repository `downfallx/dnd-5e-srd-markdown`, file `classes.md` (upstream commit `c8c4a583afa446f38b5dc43548025bd4b37ce2da`): https://github.com/downfallx/dnd-5e-srd-markdown/blob/c8c4a583afa446f38b5dc43548025bd4b37ce2da/classes.md. The source repository identifies its content as the official SRD 5.2.1 and links the official document at https://www.dndbeyond.com/srd. Adventura retains this snapshot as an import source and normalizes the class/subclass feature headings, levels, and text. The snapshot is English only; the app uses the explicit English fallback label when a German field is unavailable.

## SRD 5.1 German class and subclass features

German class and subclass feature text is sourced from the official German SRD 5.1 translation, released by Wizards of the Coast under CC BY 4.0. The localized source dictionaries below were imported from the Heroquill project, whose class importer documents extraction from the official SRD translation PDF. Only SRD 5.1 classes and the SRD subclasses used by Adventura are mapped into the application dataset.

- Official source: https://media.dndbeyond.com/compendium-images/srd/5.1/SRD_CC_v5.1_DE.pdf
- Structured translation source: https://github.com/Mystikal91/heroquill (locales/de/srd51)
- Source import implementation: https://github.com/Mystikal91/heroquill/blob/main/scripts/srd-translations/import_classes.py
- License: CC BY 4.0 (Wizards of the Coast LLC)

## SRD 5.1 English class and subclass features

The English class and subclass feature text is sourced from the official SRD 5.1 (2014 rules), distributed by Wizards of the Coast LLC under CC BY 4.0. The source snapshot is a combined Markdown extraction from the public repository `your5e/5e-srd-markdown`, under `dnd/51/markdown/Classes/`. The upstream README states that the SRD text was reformatted into Markdown with conversion changes documented there, and provides the required Wizards of the Coast attribution. The exact upstream file revisions used by Adventura are: Barbarian `ba4bddcdf085b9a5839933ae23bbbafebaf0a02d`; Bard `3022c83b76ae05205361f1749174fd371cba5964`; Cleric `8e6824ab89ca005ffac370a39ea952f98e83351e`; Druid `fb597138c90449fc2e92cc36abb49067f915df64`; Fighter `5b8e18f69570b65921cb30f6ef53c7730e3395e6`; Monk `b451ab30292c868e4c594dc2227efd34f8f65ca9`; Paladin `0c325271c79bbc5143655e9eefb3b8f864d59785`; Ranger `51c1e71daa0398223874d5fd0c37a3c4c5cb03f2`; Rogue `c861c6ff9b0e879f30f69b47746a1211e100a052`; Sorcerer `9805eb7831a5a746339eb3bb7169ce831bf1e4f7`; Warlock `57577bfa8280e511434bc52f7ab4f21eacd6fbb8`; Wizard `4885e9b8249d7d328417fcd6d897948dd13d7e43`. Official SRD page: https://dnd.wizards.com/resources/systems-reference-document. Adventura normalizes class progression levels, feature headings, and subclass IDs; the English source text remains unchanged.


## SRD 5.1 German spell data

German names, full spell descriptions, higher-level text, casting times, ranges and durations for the 319 SRD 5.1 spells are taken from the official German SRD 5.1 translation published by Wizards of the Coast LLC under CC BY 4.0. The structured translation snapshot was imported from Heroquill's German SRD 5.1 spell dictionary, whose import script documents extraction and matching against the official German SRD PDF:

- Official German SRD 5.1 PDF: https://media.dndbeyond.com/compendium-images/srd/5.1/SRD_CC_v5.1_DE.pdf
- Structured translation snapshot: https://github.com/Mystikal91/heroquill/blob/main/locales/de/srd51/spells.json
- Import method/provenance: https://github.com/Mystikal91/heroquill/blob/main/scripts/srd-translations/import_spells.py
- License: CC BY 4.0 (Wizards of the Coast LLC)

Adventura maps the German text to its canonical 2014 spell IDs. The 2014 spell records remain separate from the 2024 catalog; no 2024 spell text is used as a fallback for 2014.
