import type { Dnd5eRuleset } from './rules'

export const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const
export type Ability = (typeof ABILITIES)[number]
export type AbilityScores = Record<Ability, number>

export const SKILLS = [
  { id: 'acrobatics', ability: 'dex' }, { id: 'animalHandling', ability: 'wis' },
  { id: 'arcana', ability: 'int' }, { id: 'athletics', ability: 'str' },
  { id: 'deception', ability: 'cha' }, { id: 'history', ability: 'int' },
  { id: 'insight', ability: 'wis' }, { id: 'intimidation', ability: 'cha' },
  { id: 'investigation', ability: 'int' }, { id: 'medicine', ability: 'wis' },
  { id: 'nature', ability: 'int' }, { id: 'perception', ability: 'wis' },
  { id: 'performance', ability: 'cha' }, { id: 'persuasion', ability: 'cha' },
  { id: 'religion', ability: 'int' }, { id: 'sleightOfHand', ability: 'dex' },
  { id: 'stealth', ability: 'dex' }, { id: 'survival', ability: 'wis' },
] as const

export type SkillId = (typeof SKILLS)[number]['id']
export type ProficiencyLevel = 'none' | 'proficient' | 'expertise'

export interface SpellSlot {
  spellLevel: number
  max: number
  current: number
}

export interface PactMagic {
  spellLevel: number
  max: number
  current: number
}

export interface Character {
  id: string
  name: string
  ruleset: Dnd5eRuleset
  classId: string
  subclassId?: string
  level: number
  speciesId?: string
  backgroundId?: string
  createdAt: string
  updatedAt: string
  abilities?: AbilityScores
  savingThrowProficiencies?: Ability[]
  skillProficiencies?: Partial<Record<SkillId, ProficiencyLevel>>
  armorClass?: number
  hitPointsMax?: number
  hitPointsCurrent?: number
  temporaryHitPoints?: number
  speed?: number
  initiativeBonus?: number
  hitDice?: string
  spellSlots?: SpellSlot[]
  pactMagic?: PactMagic
  experiencePoints?: number
  inspiration?: boolean
  deathSaves?: { successes: number; failures: number }
  alignment?: string
  background?: string
  playerName?: string
  personalityTraits?: string
  ideals?: string
  bonds?: string
  flaws?: string
  features?: string
  notes?: string
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unitValueGp: number
  weightLb?: number
  description?: string
  higherLevel?: string
  higherLevel?: string
  equipped?: boolean
}

export interface CharacterInventory {
  personal: InventoryItem[]
  party: InventoryItem[]
  currency?: { cp: number; sp: number; gp: number; ep: number; pp: number }
}

export interface KnownSpell {
  spellId: string
  learnedAtLevel: number
  prepared: boolean
  alwaysPrepared?: boolean
  notes?: string
  name?: string
  spellLevel?: number
  school?: string
  castingTime?: string
  range?: string
  components?: string
  duration?: string
  concentration?: boolean
  ritual?: boolean
  description?: string
}

export interface CharacterSpellbook {
  knownSpells: KnownSpell[]
}
