import type { Character, KnownSpell } from './character'
import { normalizeKey } from './text'

export interface SpellCapacity {
  mode: 'known' | 'prepared' | 'unsupported' | 'none'
  maximum?: number
  current: number
  label: string
  note: string
}

const BARD_2014 = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22]
const SORCERER_2014 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
const WARLOCK_2014 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
const RANGER_2014 = [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
const RANGER_2024 = [0, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]

const CLASS_ALIASES: Record<string, string> = {
  barde: 'bard',
  kleriker: 'cleric',
  druide: 'druid',
  zauberer: 'sorcerer',
  magier: 'wizard',
  hexenmeister: 'warlock',
  waldlaeufer: 'ranger',
}

function getClassId(value: string): string {
  const normalized = normalizeKey(value)
  return CLASS_ALIASES[normalized] ?? normalized
}

function getAbilityModifier(score: number | undefined): number {
  return Math.floor(((score ?? 10) - 10) / 2)
}

function getPreparedSpellMaximum(character: Character, classId: string): number {
  const level = character.level
  const abilities = character.abilities
  const abilityScore =
    classId === 'wizard' ? abilities?.int : classId === 'paladin' ? abilities?.cha : abilities?.wis
  const casterLevel = classId === 'paladin' || classId === 'ranger' ? Math.floor(level / 2) : level

  return Math.max(1, casterLevel + getAbilityModifier(abilityScore))
}

// Capacity is guidance, not a hard validation gate. Non-class sources are excluded.
export function getSpellCapacity(character: Character, spells: KnownSpell[]): SpellCapacity {
  const classId = getClassId(character.classId)
  const classSpells = spells.filter(
    (spell) => (spell.source ?? 'class') === 'class' && (spell.spellLevel ?? 0) > 0,
  )
  const known = classSpells.length
  const prepared = classSpells.filter((spell) => spell.prepared || spell.alwaysPrepared).length

  if (character.ruleset === '2014') {
    const knownTables: Record<string, number[]> = {
      bard: BARD_2014,
      sorcerer: SORCERER_2014,
      warlock: WARLOCK_2014,
      ranger: RANGER_2014,
    }
    const table = knownTables[classId]
    if (table) {
      return {
        mode: 'known',
        maximum: table[character.level] ?? 0,
        current: known,
        label: 'Bekannte Klassenzauber',
        note: 'Zaubertricks sind nicht mitgezählt. Zusätzliche Zauber aus Story, Gegenständen und Talenten zählen nicht zum Klassenlimit.',
      }
    }

    if (['cleric', 'druid', 'wizard', 'paladin'].includes(classId)) {
      return {
        mode: 'prepared',
        maximum: getPreparedSpellMaximum(character, classId),
        current: prepared,
        label: 'Vorbereitete Klassenzauber',
        note: 'Nur vorbereitete Klassenzauber werden gezählt. Zusätzliche Zauberquellen bleiben außen vor.',
      }
    }
  }

  if (character.ruleset === '2024') {
    const knownTables: Record<string, number[]> = {
      bard: BARD_2014,
      sorcerer: SORCERER_2014,
      warlock: WARLOCK_2014,
      ranger: RANGER_2024,
    }
    const table = knownTables[classId]
    if (table) {
      return {
        mode: 'prepared',
        maximum: table[character.level] ?? 0,
        current: prepared,
        label: 'Vorbereitete Klassenzauber',
        note: 'Zaubertricks werden nicht mitgezählt. Klassenmerkmale mit ausdrücklich zusätzlichen oder immer vorbereiteten Zaubern werden separat behandelt.',
      }
    }
  }

  if (
    character.ruleset === '2024' &&
    ['cleric', 'druid', 'wizard', 'paladin'].includes(classId)
  ) {
    return {
      mode: 'prepared',
      maximum: getPreparedSpellMaximum(character, classId),
      current: prepared,
      label: 'Vorbereitete Klassenzauber',
      note: 'Klassenlimit nach Stufe und Zauberattribut. Story-, Gegenstands- und Talentzauber werden separat gezählt.',
    }
  }

  if (['barbarian', 'monk'].includes(classId)) {
    return { mode: 'none', current: 0, label: '', note: '' }
  }

  if (['fighter', 'rogue'].includes(classId)) {
    return {
      mode: 'unsupported',
      current: known,
      label: 'Unterklassenzauber',
      note: 'Für Eldritch Knight und Arcane Trickster gelten eigene Lern- und Schulregeln; diese werden noch ergänzt.',
    }
  }

  return {
    mode: 'unsupported',
    current: known,
    label: 'Klassenzauber',
    note: 'Für diese Klasse ist die exakte Lern-/Vorbereitungstabelle noch nicht hinterlegt.',
  }
}
