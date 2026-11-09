# Spell data

All spell-specific datasets live in this directory. The SRD spell records remain source data; application-only mechanics and compatibility metadata are stored separately and joined by canonical spell ID.

- `spells-2014.json`, `spells-2024.json`: SRD spell records, kept free of extracted application metadata.
- `spells-additional.json`: supplemental spell records.
- `spell-mechanics.json`: structured damage, damage modifiers, conditions, timing, and scaling keyed by spell ID.
- `spell-availability.json`: ruleset and class availability exceptions keyed by spell ID.

## Damage mechanics

Each spell ID maps to one or more damage components:

- `dice` and `average`: the dice expression and its average; the average covers dice only.
- `flatBonus`: an additional fixed number or the spellcasting ability modifier.
- `type`: one damage type; `typeOptions`: mutually exclusive or selectable damage types.
- `condition` and `timing`: when the component applies and when it is dealt.
- `modifier`: an extra/reduced damage effect, a damage-roll penalty/reduction, or a weapon damage-die replacement.
- `activeFromLevel`: the character level at which a conditional damage component first applies.
- `scaling`: one or more independent rules for spell-slot, character-level, or turn-based scaling. `add-instance` means another hit/dart/beam; `add-dice` increases the dice rolled; `set-dice` replaces the dice expression at a threshold.
- `diceRules`: special die behavior such as Sorcerous Burst's exploding d8s.

The data describes mechanics; the original spell text remains the authoritative rules wording.
