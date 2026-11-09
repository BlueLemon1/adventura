# Spell data

Supplemental spell datasets live in this directory. The edition-specific SRD spell records are kept separately under `../srd/`; application-only mechanics and compatibility metadata are stored here and joined by canonical spell ID.

- `../srd/2014/spells.json`, `../srd/2024/spells.json`: English SRD spell records, free of locale and application metadata. Official German SRD spell text is joined by ID from `../srd/<ruleset>/locales/de/spells.json`.
- `spells-additional.json`: supplemental spell records.
- `spell-mechanics.json`: structured damage, damage modifiers, conditions, timing, and scaling keyed by spell ID.
- `spell-availability.json`: ruleset and class availability exceptions keyed by spell ID.

## Damage mechanics

Each spell ID maps to one or more damage components:

- `dice` and `average`: the dice expression and its average; the average covers dice only.
- `flatBonus`: an additional fixed number, spellcasting ability modifier, spell-slot level, or a structured combination of these.
- `type`: one damage type; `typeOptions`: mutually exclusive or selectable damage types.
- `condition` and `timing`: when the component applies and when it is dealt.
- `modifier`: an extra/reduced damage effect, a damage-roll penalty/reduction, or a weapon damage-die replacement.
- `activeFromLevel`: the character level at which a conditional damage component first applies.
- `scaling`: one or more independent rules for spell-slot, character-level, or turn-based scaling. `add-instance` means another hit/dart/beam; `add-dice` increases the dice rolled; `set-dice` replaces the dice expression at a threshold.
- `diceRules`: special die behavior such as Sorcerous Burst's exploding d8s.

The data describes mechanics; the original spell text remains the authoritative rules wording.
