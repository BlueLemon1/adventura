import type { Ability, Character } from './character'
import { normalizeKey } from './text'

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

export interface SpellcastingProgression {
  kind: 'full' | 'half' | 'third' | 'warlock'
  slots: number[]
  pactMagic?: { spellLevel: number; max: number }
}

const FULL_CASTER_SLOTS: number[][] = [
  [],
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1],
]

const THIRD_CASTER_SLOTS_2014: number[][] = [
  [],
  [],
  [],
  [2],
  [3],
  [3],
  [3],
  [4, 2],
  [4, 2],
  [4, 2],
  [4, 3],
  [4, 3],
  [4, 3],
  [4, 3, 2],
  [4, 3, 2],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 1],
]

const THIRD_CASTER_SLOTS_2024: number[][] = [
  [],
  [],
  [],
  [2],
  [3],
  [3],
  [3],
  [4, 2],
  [4, 2],
  [4, 2],
  [4, 3],
  [4, 3],
  [4, 3],
  [4, 3, 2],
  [4, 3, 2],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3],
  [4, 3, 3],
  [4, 3, 3],
  [4, 3, 3],
]

const WARLOCK_PACT_MAGIC: Array<{ spellLevel: number; max: number }> = [
  { spellLevel: 0, max: 0 },
  { spellLevel: 1, max: 1 },
  { spellLevel: 1, max: 2 },
  { spellLevel: 2, max: 2 },
  { spellLevel: 2, max: 2 },
  { spellLevel: 3, max: 2 },
  { spellLevel: 3, max: 2 },
  { spellLevel: 4, max: 2 },
  { spellLevel: 4, max: 2 },
  { spellLevel: 5, max: 2 },
  { spellLevel: 5, max: 2 },
  { spellLevel: 5, max: 3 },
  { spellLevel: 5, max: 3 },
  { spellLevel: 5, max: 3 },
  { spellLevel: 5, max: 3 },
  { spellLevel: 5, max: 3 },
  { spellLevel: 5, max: 3 },
  { spellLevel: 5, max: 4 },
  { spellLevel: 5, max: 4 },
  { spellLevel: 5, max: 4 },
  { spellLevel: 5, max: 4 },
]

type CasterCharacter = Pick<Character, 'ruleset' | 'classId' | 'subclassId' | 'level'>

function getCasterKind(character: CasterCharacter): SpellcastingProgression['kind'] | null {
  const classId = normalizeKey(character.classId)
  const subclass = normalizeKey(character.subclassId)

  if (['warlock', 'hexenmeister'].includes(classId)) return 'warlock'
  if (
    [
      'bard',
      'barde',
      'cleric',
      'kleriker',
      'druid',
      'druide',
      'sorcerer',
      'zauberer',
      'wizard',
      'magier',
    ].includes(classId)
  ) {
    return 'full'
  }
  if (['paladin', 'ranger', 'waldlaeufer'].includes(classId)) return 'half'
  if (
    ['fighter', 'kaempfer'].includes(classId) &&
    ['eldritchknight', 'arkaeneritter'].includes(subclass) &&
    character.level >= 3
  ) {
    return 'third'
  }
  if (
    ['rogue', 'schurke'].includes(classId) &&
    ['arcanetrickster', 'arkanergauner'].includes(subclass) &&
    character.level >= 3
  ) {
    return 'third'
  }

  return null
}

export function getSpellcastingProgression(
  character: CasterCharacter,
): SpellcastingProgression | null {
  const kind = getCasterKind(character)
  if (!kind) return null

  if (kind === 'warlock') {
    return { kind, slots: [], pactMagic: WARLOCK_PACT_MAGIC[character.level] }
  }

  if (kind === 'half' && character.ruleset === '2014' && character.level < 2) {
    return null
  }

  const casterLevel =
    kind === 'full'
      ? character.level
      : kind === 'half'
        ? Math.ceil(character.level / 2)
        : Math.floor(character.level / 3)

  const slots =
    kind === 'third'
      ? ((character.ruleset === '2014' ? THIRD_CASTER_SLOTS_2014 : THIRD_CASTER_SLOTS_2024)[
          character.level
        ] ?? [])
      : (FULL_CASTER_SLOTS[casterLevel] ?? [])

  return { kind, slots }
}

export function createSpellSlots(character: CasterCharacter): SpellSlot[] {
  return (
    getSpellcastingProgression(character)?.slots.map((maximum, index) => ({
      spellLevel: index + 1,
      max: maximum,
      current: maximum,
    })) ?? []
  )
}

export function updateSpellSlots(
  character: CasterCharacter,
  previous: SpellSlot[] = [],
): SpellSlot[] {
  return createSpellSlots(character).map((slot) => {
    const previousSlot = previous.find((item) => item.spellLevel === slot.spellLevel)
    const spent = previousSlot ? previousSlot.max - previousSlot.current : 0
    return { ...slot, current: Math.max(0, slot.max - spent) }
  })
}

export function createPactMagic(character: CasterCharacter): PactMagic | undefined {
  const pactMagic = getSpellcastingProgression(character)?.pactMagic
  return pactMagic ? { ...pactMagic, current: pactMagic.max } : undefined
}

export function updatePactMagic(
  character: CasterCharacter,
  previous?: PactMagic,
): PactMagic | undefined {
  const next = createPactMagic(character)
  if (!next) return undefined

  const spent = previous ? previous.max - previous.current : 0
  return { ...next, current: Math.max(0, next.max - spent) }
}

export function isWarlock(character: Pick<Character, 'classId'>): boolean {
  return ['warlock', 'hexenmeister'].includes(normalizeKey(character.classId))
}

const DEFAULT_SPELLCASTING_ABILITIES: Record<string, Ability> = {
  artificer: 'int',
  bard: 'cha',
  cleric: 'wis',
  druid: 'wis',
  paladin: 'cha',
  ranger: 'wis',
  sorcerer: 'cha',
  warlock: 'cha',
  wizard: 'int',
}

export function getDefaultSpellcastingAbility(
  character: Pick<Character, 'classId' | 'subclassId'>,
): Ability | undefined {
  const classId = normalizeKey(character.classId)
  if (['fighter', 'kaempfer'].includes(classId) && normalizeKey(character.subclassId).includes('eldritchknight')) return 'int'
  if (['rogue', 'schurke'].includes(classId) && normalizeKey(character.subclassId).includes('arcanetrickster')) return 'int'
  return DEFAULT_SPELLCASTING_ABILITIES[classId]
}

export function getSpellcastingStats(
  character: Pick<Character, 'classId' | 'level' | 'abilities' | 'spellcastingAbility'>,
):
  | {
      ability: Ability
      attackBonus: number
      saveDc: number
      abilityModifier: number
      proficiencyBonus: number
    }
  | undefined {
  const ability = character.spellcastingAbility ?? getDefaultSpellcastingAbility(character)
  if (!ability) return undefined

  const score = character.abilities?.[ability] ?? 10
  const abilityModifier = Math.floor((score - 10) / 2)
  const proficiencyBonus = Math.ceil(character.level / 4) + 1
  return {
    ability,
    abilityModifier,
    proficiencyBonus,
    attackBonus: abilityModifier + proficiencyBonus,
    saveDc: 8 + abilityModifier + proficiencyBonus,
  }
}
