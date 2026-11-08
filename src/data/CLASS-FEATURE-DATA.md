# Class feature data layout

Class features are kept in edition-specific datasets. The `class-features-2014.json` and `class-features-2024.json` files contain SRD material only. Additional official-source material belongs in `class-features-supplemental-2014.json` or `class-features-supplemental-2024.json` and must retain its exact `contentSourceId` on every record.

The application loads the SRD and supplemental datasets together for the selected ruleset. This keeps provenance visible while allowing the feature UI to use one unified catalog.

Only material licensed for redistribution should be stored verbatim. For non-SRD sourcebooks, store factual metadata and independently written summaries unless redistribution rights or user-provided text permit otherwise. Unofficial translations must be labelled as such and must not be presented as official localized text.

## Current supplemental coverage

- 2014 Artificer: class progression plus summarized specialist features for Alchemist, Armorer, Artillerist, and Battle Smith.
- 2024 Artificer: class progression plus summarized specialist features for Alchemist, Armorer, Artillerist, Battle Smith, and Cartographer.
- These summaries are independently written and are not transcriptions of the sourcebooks.
- German text in these supplemental records is an unofficial translation and carries `translationStatus.de = "unofficial"`; the UI displays that status.

The selectable subclass inventory is intentionally broader than the currently populated feature records. A subclass appearing in the character selector does not yet mean its complete feature progression has been imported. Keep the PR in draft until each source/ruleset dataset has been audited and populated.
