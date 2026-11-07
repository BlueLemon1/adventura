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
export const SUBCLASS_OPTIONS: Record<string, ClassOption[]> = {
  barbarian: [{ value: 'berserker', label: 'Berserker' }],
  bard: [{ value: 'lore', label: 'Bard der Kunde' }],
  cleric: [{ value: 'life', label: 'Domäne des Lebens' }],
  druid: [{ value: 'land', label: 'Zirkel des Landes' }],
  fighter: [{ value: 'champion', label: 'Champion' }, { value: 'eldritchknight', label: 'Arkaner Ritter' }],
  monk: [{ value: 'openhand', label: 'Weg der offenen Hand' }],
  paladin: [{ value: 'devotion', label: 'Schwur der Hingabe' }],
  ranger: [{ value: 'hunter', label: 'Jäger' }],
  rogue: [{ value: 'thief', label: 'Dieb' }, { value: 'arcanetrickster', label: 'Arkaner Gauner' }],
  sorcerer: [{ value: 'draconic', label: 'Drakonische Abstammung' }, { value: 'shadowmagic', label: 'Schattenmagie' }],
  warlock: [{ value: 'fiend', label: 'Unhold' }],
  wizard: [{ value: 'evocation', label: 'Hervorrufung' }],
}

export const SPELLCASTING_SUBCLASSES: Record<string, ClassOption[]> = {
  fighter: [{ value: 'eldritchknight', label: 'Arkaner Ritter' }],
  rogue: [{ value: 'arcanetrickster', label: 'Arkaner Gauner' }],
  sorcerer: [{ value: 'shadowmagic', label: 'Schattenmagie' }],
}
export function getClassLabel(classId: string): string {
  return CLASS_OPTIONS.find((item) => item.value === classId)?.label ?? classId
}
