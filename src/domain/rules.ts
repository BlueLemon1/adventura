/**
 * Ruleset identifiers are persisted with each character.
 * Keep rules-dependent progression and spell rules explicitly versioned.
 */
export const DND5E_RULESETS = ['2014', '2024'] as const

export type Dnd5eRuleset = (typeof DND5E_RULESETS)[number]

export const RULESET_LABELS: Record<Dnd5eRuleset, string> = {
  '2014': 'D&D 5e (2014)',
  '2024': 'D&D 5e (2024)',
}

export function isDnd5eRuleset(value: unknown): value is Dnd5eRuleset {
  return typeof value === 'string' && DND5E_RULESETS.some((ruleset) => ruleset === value)
}
