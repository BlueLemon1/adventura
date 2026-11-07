# SRD spell data — attribution and license

Adventura includes spell text and structured spell metadata from the following System Reference Documents. The spell datasets are distributed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).

## D&D SRD 5.1 (2014 rules)

This work includes material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC, available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

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

## SRD 5.2.1 English class and subclass features

The English class and subclass feature text is sourced from the SRD 5.2.1 class section published by Wizards of the Coast LLC under CC BY 4.0. The source snapshot is a Markdown extraction from the public repository `downfallx/dnd-5e-srd-markdown`, file `classes.md` (upstream commit `c8c4a583afa446f38b5dc43548025bd4b37ce2da`): https://github.com/downfallx/dnd-5e-srd-markdown/blob/c8c4a583afa446f38b5dc43548025bd4b37ce2da/classes.md. The source repository identifies its content as the official SRD 5.2.1 and links the official document at https://www.dndbeyond.com/srd. Adventura retains this snapshot as an import source and normalizes the class/subclass feature headings, levels, and text. The snapshot is English only; the app uses the explicit English fallback label when a German field is unavailable.
