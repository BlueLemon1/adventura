import type { Dnd5eRuleset } from './rules'

export interface ClassOption {
  value: string
  label: string
}

export const CLASS_OPTIONS: ClassOption[] = [
  { value: 'barbarian', label: 'Barbar' },
  { value: 'bard', label: 'Barde' },
  { value: 'cleric', label: 'Kleriker' },
  { value: 'druid', label: 'Druide' },
  { value: 'fighter', label: 'Kämpfer' },
  { value: 'monk', label: 'Mönch' },
  { value: 'paladin', label: 'Paladin' },
  { value: 'ranger', label: 'Waldläufer' },
  { value: 'rogue', label: 'Schurke' },
  { value: 'sorcerer', label: 'Zauberer' },
  { value: 'warlock', label: 'Hexenmeister' },
  { value: 'wizard', label: 'Magier' },
  { value: 'other', label: 'Andere / eigene Klasse' },
]
const SUBCLASS_OPTIONS_BY_RULESET: Record<Dnd5eRuleset, Record<string, ClassOption[]>> = {
  '2014': {
    barbarian: [{ value: 'berserker', label: 'Pfad des Berserkers' }],
    bard: [{ value: 'lore', label: 'Barde der Kunde' }],
    cleric: [{ value: 'life', label: 'Domäne des Lebens' }],
    druid: [{ value: 'land', label: 'Zirkel des Landes' }],
    fighter: [
      { value: 'champion', label: 'Champion' },
      { value: 'eldritchknight', label: 'Arkaner Ritter' },
    ],
    monk: [{ value: 'openhand', label: 'Weg der offenen Hand' }],
    paladin: [{ value: 'devotion', label: 'Schwur der Hingabe' }],
    ranger: [{ value: 'hunter', label: 'Jäger' }],
    rogue: [
      { value: 'thief', label: 'Dieb' },
      { value: 'arcanetrickster', label: 'Arkaner Gauner' },
    ],
    sorcerer: [
      { value: 'draconic', label: 'Drakonische Abstammung' },
      { value: 'shadowmagic', label: 'Schattenmagie' },
    ],
    warlock: [{ value: 'fiend', label: 'Unhold' }],
    wizard: [{ value: 'evocation', label: 'Hervorrufung' }],
  },
  '2024': {
    barbarian: [{ value: 'berserker', label: 'Pfad des Berserkers' }],
    bard: [{ value: 'lore', label: 'Barde der Kunde' }],
    cleric: [{ value: 'life', label: 'Domäne des Lebens' }],
    druid: [{ value: 'land', label: 'Zirkel des Landes' }],
    fighter: [{ value: 'champion', label: 'Champion' }],
    monk: [{ value: 'openhand', label: 'Krieger der offenen Hand' }],
    paladin: [{ value: 'devotion', label: 'Schwur der Hingabe' }],
    ranger: [{ value: 'hunter', label: 'Jäger' }],
    rogue: [{ value: 'thief', label: 'Dieb' }],
    sorcerer: [{ value: 'draconic', label: 'Drakonische Magie' }],
    warlock: [{ value: 'fiend', label: 'Unholdpatron' }],
    wizard: [{ value: 'evocation', label: 'Hervorrufungsgelehrter' }],
  },
}

export function getSubclassOptions(classId: string, ruleset: Dnd5eRuleset): ClassOption[] {
  return SUBCLASS_OPTIONS_BY_RULESET[ruleset][classId] ?? []
}

export function getClassLabel(classId: string): string {
  return CLASS_OPTIONS.find((item) => item.value === classId)?.label ?? classId
}
