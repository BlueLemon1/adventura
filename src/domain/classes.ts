export interface ClassOption { value: string; label: string }

export const CLASS_OPTIONS: ClassOption[] = [
  { value: 'barbarian', label: 'Barbar' }, { value: 'bard', label: 'Barde' },
  { value: 'cleric', label: 'Kleriker' }, { value: 'druid', label: 'Druide' },
  { value: 'fighter', label: 'Kämpfer' }, { value: 'monk', label: 'Mönch' },
  { value: 'paladin', label: 'Paladin' }, { value: 'ranger', label: 'Waldläufer' },
  { value: 'rogue', label: 'Schurke' }, { value: 'sorcerer', label: 'Zauberer' },
  { value: 'warlock', label: 'Hexenmeister' }, { value: 'wizard', label: 'Magier' },
  { value: 'other', label: 'Andere / eigene Klasse' },
]
export const SPELLCASTING_SUBCLASSES: Record<string, ClassOption[]> = {
  fighter: [{ value: 'eldritchknight', label: 'Arkaner Ritter' }],
  rogue: [{ value: 'arcanetrickster', label: 'Arkaner Gauner' }],
}
export function getClassLabel(classId: string): string {
  return CLASS_OPTIONS.find((item) => item.value === classId)?.label ?? classId
}
