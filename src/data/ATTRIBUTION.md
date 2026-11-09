# SRD content — attribution and license

Adventura maintains the official 2014 and 2024 SRD spell and class-feature datasets separately in `src/data/spells-2014.json`, `src/data/spells-2024.json`, `src/data/class-features-2014.json`, and `src/data/class-features-2024.json`. These four files contain SRD material only and are not enriched with Adventura-specific compatibility or mechanics metadata.

Supplemental spells are maintained in `spells-additional.json`; supplemental class-feature text is maintained once in `features-additional.json`, with ruleset-specific class/subclass placement in `class-progressions.json`. The source registry provides the full book name, compact abbreviation, and default ruleset. Cross-ruleset availability is explicit in `rulesets`. App-specific spell damage and availability exceptions are keyed by spell ID in `spell-mechanics.json` and `spell-availability.json`; feature activation, resource, and spellbook metadata is keyed by feature ID in `feature-mechanics.json`.


## SRD 5.1 (2014 rules)

This work includes material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

Official English SRD 5.1: https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1.pdf
Official German SRD 5.1: https://media.wizards.com/2023/downloads/dnd/SRD_CC_v5.1_DE.pdf

## SRD 5.2.1 (2024 rules)

This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

Official English SRD 5.2.1: https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf
Official German SRD 5.2.1: https://media.dndbeyond.com/compendium-images/srd/5.2/DE_SRD_CC_v5.2.1.pdf

## Data handling

Adventura adapts the official SRD material into its own JSON structure. The 2014 and 2024 SRD catalogues remain separate because the same-named spells are not interchangeable: 317 names occur in both catalogues, and every one of those shared-name records differs in at least one mechanical or descriptive field. Edition-specific wording and higher-level text structure are therefore preserved without forcing a brittle override model. Spells not included in an SRD are maintained separately in `spells-additional.json`. They are never presented as official SRD entries. Source names and abbreviations are centralized in `src/domain/contentSources.ts`; omitted `rulesets` means the source registry's default ruleset, while explicit arrays mark cross-ruleset compatibility. `rulesetClasses` is limited to spells whose class access actually changes between editions. Empty optional `material` and `damage` fields are omitted. Their descriptions are independently written summaries, not reproductions of the source books' wording.

## Supplemental source catalogue

### Xanathar's Guide to Everything (XGE)

The supplemental entries are based on spell rules and metadata from *Xanathar's Guide to Everything* (Wizards of the Coast, 2017). The book is a separately published copyrighted supplement and is not covered by the SRD CC BY 4.0 license. Adventura therefore stores factual game metadata and concise independently written descriptions, not the book's original descriptive text.

Included entries:
- Abi-Dalzim's Horrid Wilting (p. 150)
- Absorb Elements (p. 150)
- Aganazzar's Scorcher (p. 150)
- Bones of the Earth (p. 150)
- Catapult (p. 150)
- Chaos Bolt (p. 151)
- Beast Bond (p. 150)
- Catnap (p. 151)
- Cause Fear (p. 151)
- Ceremony (p. 151)
- Charm Monster (p. 151)
- Control Flames (p. 152)
- Control Winds (p. 152)
- Create Bonfire (p. 152)
- Create Homunculus (p. 152)
- Crown of Stars (p. 152)
- Danse Macabre (p. 153)
- Dawn (p. 153)
- Dragon's Breath (p. 154)
- Druid Grove (p. 154)
- Dust Devil (p. 154)
- Earth Tremor (p. 155)
- Earthbind (p. 154)
- Elemental Bane (p. 155)
- Enemies Abound (p. 155)
- Enervation (p. 155)
- Erupting Earth (p. 155)
- Far Step (p. 155)
- Flame Arrows (p. 156)
- Frostbite (p. 156)
- Gust (p. 157)
- Guardian of Nature (p. 157)
- Healing Spirit (p. 157)
- Holy Weapon (p. 157)
- Ice Knife (p. 157; originally Elemental Evil Player's Companion p. 15)
- Illusory Dragon (p. 157)
- Immolation (p. 158)
- Infernal Calling (p. 158)
- Infestation (p. 158)
- Investiture of Flame (p. 159)
- Investiture of Ice (p. 159)
- Investiture of Stone (p. 159)
- Investiture of Wind (p. 160)
- Invulnerability (p. 160)
- Life Transference (p. 160)
- Maddening Darkness (p. 160)
- Maelstrom (p. 160)
- Magic Stone (p. 160)
- Mass Polymorph (p. 160)
- Mighty Fortress (p. 161)
- Mental Prison (p. 161)
- Mold Earth (p. 162)
- Maximilian's Earthen Grasp (p. 161)
- Melf's Minute Meteors (p. 161)
- Mind Spike (p. 162)
- Negative Energy Flood (p. 163)
- Power Word Pain (p. 163)
- Primal Savagery (p. 163)
- Primordial Ward (p. 163)
- Psychic Scream (p. 163)
- Pyrotechnics (p. 163)
- Scatter (p. 164)
- Shape Water (p. 164)
- Shadow of Moil (p. 164)
- Shadow Blade (p. 164)
- Sickening Radiance (p. 164)
- Skywrite (p. 165)
- Snare (p. 165)
- Skill Empowerment (p. 165)
- Snilloc's Snowball Swarm (p. 165)
- Soul Cage (p. 165)
- Storm Sphere (p. 166)
- Steel Wind Strike (p. 166)
- Summon Greater Demon (p. 166)
- Summon Lesser Demons (p. 167)
- Synaptic Static (p. 167)
- Temple of the Gods (p. 167)
- Thunderclap (p. 168)
- Thunder Step (p. 168)
- Tidal Wave (p. 168)
- Tiny Servant (p. 168)
- Toll the Dead (p. 169)
- Transmute Rock (p. 169)
- Vitriolic Sphere (p. 170)
- Wall of Sand (p. 170)
- Wall of Water (p. 170)
- Warding Wind (p. 170)
- Wall of Light (p. 170)
- Watery Sphere (p. 170)
- Whirlwind (p. 171)
- Word of Radiance (p. 171)
- Wrath of Nature (p. 171)
- Zephyr Strike (p. 171)

### Tasha's Cauldron of Everything (TCE)

Tasha's supplemental entries are factual spell metadata with independently written German and English summaries. Most TCE entries are assigned to the 2014 ruleset, matching the sourcebook's rules context. The four revised cantrips reprinted from SCAG are also marked compatible with the 2024 ruleset; other spells are added to 2024 only after their compatibility is checked.

Included TCE spells:
- Booming Blade (p. 106; originally SCAG p. 142)
- Green-Flame Blade (p. 107; originally SCAG p. 142)
- Lightning Lure (p. 107; originally SCAG p. 143)
- Sword Burst (p. 115; originally SCAG p. 143)
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

### Strixhaven: A Curriculum of Chaos (SCC)

Included spells:
- Borrowed Knowledge (p. 37)
- Kinetic Jaunt (p. 37)
- Silvery Barbs (p. 38)
- Vortex Warp (p. 38)
- Wither and Bloom (p. 38)

### Fizban's Treasury of Dragons (FTD)

Included spells:
- Ashardalon's Stride (p. 19)
- Draconic Transformation (p. 19)
- Fizban's Platinum Shield (p. 20)
- Nathair's Mischief (p. 20)
- Raulothim's Psychic Lance (p. 21)
- Rime's Binding Ice (p. 21)
- Summon Draconic Spirit (p. 21)

Most entries from Strixhaven, Fizban, and Wildemount are limited to the 2014 ruleset. Kinetic Jaunt and Vortex Warp from Strixhaven, plus Ashardalon's Stride from Fizban, are also available to 2024 Artificers.

### Explorer's Guide to Wildemount (EGW)

Included Dunamancy spells:
- Dark Star (p. 186)
- Fortune's Favor (p. 186)
- Gift of Alacrity (p. 186)
- Gravity Fissure (p. 187)
- Gravity Sinkhole (p. 187)
- Immovable Object (p. 187)
- Magnify Gravity (p. 188)
- Pulse Wave (p. 188)
- Ravenous Void (p. 188)
- Reality Break (p. 189)
- Sapping Sting (p. 189)
- Temporal Shunt (p. 189)
- Tether Essence (p. 189)
- Time Ravage (p. 189)
- Wristpocket (p. 190)

These entries are marked as Dunamancy and show whether they are associated with Chronurgy Magic, Graviturgy Magic, or both. They are assigned to the Wizard class; access for other spellcasters requires the DM's approval. Dunamancy spells are not automatically treated as ordinary Wizard spells for every subclass and remain limited to the 2014 ruleset in Adventura.

### Acquisitions Incorporated (AI)

Included spells:
- Distort Value (p. 75)
- Fast Friends (p. 75)
- Gift of Gab (p. 76)
- Incite Greed (p. 76)
- Jim's Glowing Coin (p. 76)
- Jim's Magic Missile (p. 76)
- Motivational Speech (p. 77)

The special Royalty component used by some spells is recorded separately in the component/material display.

### Guildmasters' Guide to Ravnica (GGR)

Included spell:
- Encode Thoughts (p. 47)

Encode Thoughts is associated with the Dimir Operative background rather than a standard class spell list. Adventura displays it for spellcasting classes with an explicit background-access note.

### Astral Adventurer's Guide (AAG)

Included spells:
- Air Bubble (p. 22)
- Create Spelljamming Helm (p. 22)

Both spells are available in the 2014 ruleset and to 2024 Artificers. The 2024 class list is explicitly restricted to Artificer.

The spell catalogue may grow as additional sourcebooks are checked. A sourcebook's publication era does not automatically determine whether an entry is available under both rulesets.

### Sword Coast Adventurer's Guide (SCAG)

Booming Blade, Green-Flame Blade, Lightning Lure, and Sword Burst first appeared in SCAG (pp. 142–143). Adventura uses their later revised Tasha's versions as the canonical entries and retains the original SCAG page references as provenance.

XGE entries are marked usable with both rulesets where their mechanics are compatible with the 2024 rules. This is a catalogue compatibility choice, not a claim that the spell text was reprinted in the 2024 Player's Handbook.

No endorsement by Wizards of the Coast is implied.
