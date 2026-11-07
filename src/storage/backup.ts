import { z } from 'zod'
import { ABILITIES } from '../domain/character'
import { DND5E_RULESETS } from '../domain/rules'
import type { StoredCharacter } from './database'
import { getCharacters, getPartyInventory, replaceCharacters, savePartyInventory } from './database'

const abilitySchema = z.object({
  str: z.number().int().min(1).max(30),
  dex: z.number().int().min(1).max(30),
  con: z.number().int().min(1).max(30),
  int: z.number().int().min(1).max(30),
  wis: z.number().int().min(1).max(30),
  cha: z.number().int().min(1).max(30),
})

const spellSlotSchema = z.object({
  spellLevel: z.number().int().min(1).max(9),
  max: z.number().int().min(0).max(20),
  current: z.number().int().min(0).max(20),
})

const characterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  ruleset: z.enum(DND5E_RULESETS),
  classId: z.string().min(1),
  subclassId: z.string().optional(),
  level: z.number().int().min(1).max(20),
  speciesId: z.string().optional(),
  backgroundId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  abilities: abilitySchema.optional(),
  savingThrowProficiencies: z.array(z.enum(ABILITIES)).optional(),
  skillProficiencies: z.record(z.string(), z.enum(['none', 'proficient', 'expertise'])).optional(),
  armorClass: z.number().int().min(0).max(100).optional(),
  hitPointsMax: z.number().int().min(0).max(10000).optional(),
  hitPointsCurrent: z.number().int().min(0).max(10000).optional(),
  temporaryHitPoints: z.number().int().min(0).max(10000).optional(),
  speed: z.number().int().min(0).max(1000).optional(),
  initiativeBonus: z.number().int().min(-20).max(20).optional(),
  hitDice: z.string().optional(),
  spellSlots: z.array(spellSlotSchema).optional(),
  pactMagic: z
    .object({
      spellLevel: z.number().int().min(1).max(5),
      max: z.number().int().min(1).max(4),
      current: z.number().int().min(0).max(4),
    })
    .optional(),
  experiencePoints: z.number().int().min(0).optional(),
  inspiration: z.boolean().optional(),
  deathSaves: z
    .object({
      successes: z.number().int().min(0).max(3),
      failures: z.number().int().min(0).max(3),
    })
    .optional(),
  alignment: z.string().optional(),
  background: z.string().optional(),
  playerName: z.string().optional(),
  personalityTraits: z.string().optional(),
  ideals: z.string().optional(),
  bonds: z.string().optional(),
  flaws: z.string().optional(),
  features: z.string().optional(),
  notes: z.string().optional(),
})

const itemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().finite().min(0),
  unitValueGp: z.number().finite().min(0),
  weightLb: z.number().finite().min(0).optional(),
  description: z.string().optional(),
  equipped: z.boolean().optional(),
  equippedSlot: z
    .enum([
      'head',
      'neck',
      'cloak',
      'armor',
      'mainHand',
      'offHand',
      'hands',
      'waist',
      'feet',
      'ring1',
      'ring2',
      'other',
    ])
    .optional(),
})

const spellSchema = z.object({
  spellId: z.string().min(1),
  learnedAtLevel: z.number().int().min(1).max(20),
  prepared: z.boolean(),
  alwaysPrepared: z.boolean().optional(),
  notes: z.string().optional(),
  name: z.string().optional(),
  spellLevel: z.number().int().min(0).max(9).optional(),
  school: z.string().optional(),
  castingTime: z.string().optional(),
  range: z.string().optional(),
  components: z.string().optional(),
  duration: z.string().optional(),
  concentration: z.boolean().optional(),
  ritual: z.boolean().optional(),
  description: z.string().optional(),
  higherLevel: z.string().optional(),
  source: z.enum(['class', 'story', 'item', 'feat', 'other']).optional(),
  sourceName: z.string().optional(),
  usageLimit: z.number().int().min(0).max(1000).optional(),
  usageRemaining: z.number().int().min(0).max(1000).optional(),
  usageReset: z.enum(['shortRest', 'longRest', 'dawn', 'none']).optional(),
})

const currencySchema = z.object({
  cp: z.number().min(0),
  sp: z.number().min(0),
  gp: z.number().min(0),
  ep: z.number().min(0),
  pp: z.number().min(0),
})

const storedCharacterSchema = z.object({
  character: characterSchema,
  inventory: z.object({
    personal: z.array(itemSchema),
    party: z.array(itemSchema),
    currency: currencySchema.optional(),
  }),
  spellbook: z.object({
    knownSpells: z.array(spellSchema),
  }),
})

const backupSchema = z.object({
  app: z.literal('adventura'),
  formatVersion: z.literal(1),
  exportedAt: z.string().datetime(),
  characters: z.array(storedCharacterSchema),
  partyInventory: z.array(itemSchema).optional(),
})

const DEFAULT_ABILITIES = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
}

const DEFAULT_CURRENCY = { cp: 0, sp: 0, gp: 0, ep: 0, pp: 0 }

export type AdventuraBackup = z.infer<typeof backupSchema>

export async function createBackup(): Promise<AdventuraBackup> {
  const [characters, partyInventory] = await Promise.all([getCharacters(), getPartyInventory()])

  return {
    app: 'adventura',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    characters,
    partyInventory,
  }
}

export function parseBackup(json: string): AdventuraBackup {
  return backupSchema.parse(JSON.parse(json) as unknown)
}

export async function importBackup(json: string): Promise<StoredCharacter[]> {
  const backup = parseBackup(json)
  const normalized = backup.characters.map((entry) => ({
    ...entry,
    inventory: {
      ...entry.inventory,
      currency: entry.inventory.currency ?? { ...DEFAULT_CURRENCY },
    },
    character: {
      ...entry.character,
      abilities: entry.character.abilities ?? { ...DEFAULT_ABILITIES },
    },
  }))

  await replaceCharacters(normalized)
  await savePartyInventory(backup.partyInventory ?? [])
  return normalized
}

export async function downloadBackup(): Promise<void> {
  const backup = await createBackup()
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `adventura-backup-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()

  URL.revokeObjectURL(url)
}
