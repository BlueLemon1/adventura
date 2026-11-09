# Class feature data layout

Class feature text and progression are separate concepts:

- `class-features-2014.json` and `class-features-2024.json` contain only the official SRD datasets. Their contents are kept exactly as published in the project.
- `features-additional.json` contains each supplemental feature definition once: canonical text, translation status, and the complete set of contributing source references. Shared mechanics such as Extra Attack or Potent Spellcasting are not copied for every class.
- `class-progressions.json` assigns definitions to classes or subclasses and describes ruleset-specific availability, levels, source context, and optional class-specific display-name overrides. Multiple progression records may reference one definition; each occurrence has its own stable `progressionId`.
- `classes-additional.json` is the shared class and subclass catalog. Legacy compatibility and replacement relationships belong to the class/subclass records, not to every feature beneath them.
- `feature-mechanics.json` stores Adventura-specific activation, resource, and spellbook metadata by shared definition ID, not by class-specific occurrence. It is not part of the SRD text.

A 2014 feature used by a 2024 Legacy subclass is represented by one definition and one progression record. The subclass catalog carries `rulesets["2024"] = "legacy"`; the feature progression simply references the same definition in both rulesets and stores the edition-specific unlock level. For example, a feature can remain at level 2 in 2014 and move to level 3 in 2024 without duplicating its text or repeating the Legacy marker on every feature.

If a feature itself is revised, the revised feature receives its own definition and ID. The 2024 progression points to that definition; the old feature's 2024 availability is omitted when the parent subclass is replaced. Replacement subclass IDs are never copied into individual feature records.

Run `npm run validate:content` to check definition/progression references, ruleset availability, subclass coverage, source references, and granted spell IDs. Only material licensed for redistribution should be stored verbatim. For non-SRD sourcebooks, store factual metadata and independently written summaries unless redistribution rights or user-provided text permit otherwise. Unofficial translations must be labelled as such and must not be presented as official localized text.

## Current supplemental coverage

- 2014 Artificer: class progression plus summarized specialist features for Alchemist, Armorer, Artillerist, and Battle Smith.
- 2014 subclass catalog: feature records cover the currently represented official sources, including PHB, XGE, TCE, SCAG, DMG, EGW, FTD, VRGtR, DSotDQ, and Bigby.
- 2024 Artificer: class progression plus summarized specialist features for Alchemist, Armorer, Artillerist, Battle Smith, and Cartographer.
- 2024 Player's Handbook: summarized feature progressions for the represented PHB subclasses; SRD subclasses remain in the SRD dataset.
- Supplemental summaries are independently written. German text is an unofficial translation and carries `translationStatus.de = "unofficial"`.

Coverage is validated for every selectable subclass. This is not a claim that every progression has passed a rule-by-rule audit: feature names, levels, descriptions, spell-grant lists, and source provenance still need review.
