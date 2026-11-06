import type { Dnd5eRuleset } from './rules'

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
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unitValueGp: number
  weightLb?: number
  description?: string
  equipped?: boolean
}

export interface CharacterInventory {
  personal: InventoryItem[]
  party: InventoryItem[]
}

/**
 * A character's spellbook stores the character's relationship to spells.
 * Spell rules and full spell descriptions live in the ruleset-aware spell catalogue.
 */
export interface KnownSpell {
  spellId: string
  learnedAtLevel: number
  prepared: boolean
  alwaysPrepared?: boolean
  notes?: string
}

export interface CharacterSpellbook {
  knownSpells: KnownSpell[]
}
