# Class feature data layout

Class features are kept in edition-specific datasets. The `class-features-2014.json` and `class-features-2024.json` files contain SRD material only. Additional official-source material belongs in `class-features-supplemental-2014.json` or `class-features-supplemental-2024.json` and must retain its exact `contentSourceId` on every record.

The application loads the SRD and supplemental datasets together for the selected ruleset. This keeps provenance visible while allowing the feature UI to use one unified catalog.

Only material licensed for redistribution should be stored verbatim. For non-SRD sourcebooks, store factual metadata and independently written summaries unless redistribution rights or user-provided text permit otherwise. Unofficial translations must be labelled as such and must not be presented as official localized text.

## Current supplemental coverage

- 2014 Artificer: class progression plus summarized specialist features for Alchemist, Armorer, Artillerist, and Battle Smith.
- 2014 subclass catalog: feature records are now present for all 117 selectable subclass options across the currently represented official sources, including PHB, XGE, TCE, SCAG, DMG, EGW, FTD, VRGtR, DSotDQ, and Bigby. Records are concise independent summaries, not full rulebook text.
- 2024 Artificer: class progression plus summarized specialist features for Alchemist, Armorer, Artillerist, Battle Smith, and Cartographer.
- 2024 Player's Handbook: summarized feature progressions for all 48 PHB subclasses across the twelve classes; SRD subclasses remain in the SRD dataset and the remaining subclasses are in the 2024 supplemental dataset.
- These summaries are independently written and are not transcriptions of the sourcebooks.
- German text in these supplemental records is an unofficial translation and carries `translationStatus.de = "unofficial"`; the UI displays that status.

Every currently selectable subclass has at least one feature record in its matching ruleset dataset. This is a coverage milestone, not a claim that every progression has passed a rule-by-rule audit: feature names, levels, descriptions, spell-grant lists, and source provenance still need review. Spell grants are currently populated only for the subsets listed above. Keep the PR in draft until those checks and integration work are complete.
