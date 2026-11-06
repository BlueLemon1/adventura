import { z } from 'zod'
import { DND5E_RULESETS } from '../domain/rules'
import type { StoredCharacter } from './database'
import { getCharacters, replaceCharacters } from './database'

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
})

const itemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().finite().min(0),
  unitValueGp: z.number().finite().min(0),
  weightLb: z.number().finite().min(0).optional(),
  description: z.string().optional(),
  equipped: z.boolean().optional(),
})

const storedCharacterSchema = z.object({
  character: characterSchema,
  inventory: z.object({
    personal: z.array(itemSchema),
    party: z.array(itemSchema),
  }),
  spellbook: z.object({
    knownSpells: z.array(z.object({
      spellId: z.string().min(1),
      learnedAtLevel: z.number().int().min(1).max(20),
      prepared: z.boolean(),
      alwaysPrepared: z.boolean().optional(),
      notes: z.string().optional(),
    })),
  }),
})

const backupSchema = z.object({
  app: z.literal('adventura'),
  formatVersion: z.literal(1),
  exportedAt: z.string().datetime(),
  characters: z.array(storedCharacterSchema),
})

export type AdventuraBackup = z.infer<typeof backupSchema>

export async function createBackup(): Promise<AdventuraBackup> {
  return {
    app: 'adventura',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    characters: await getCharacters(),
  }
}

/** Parse and validate the entire backup before touching the local database. */
export function parseBackup(json: string): AdventuraBackup {
  const parsed: unknown = JSON.parse(json)
  return backupSchema.parse(parsed)
}

export async function importBackup(json: string): Promise<StoredCharacter[]> {
  const backup = parseBackup(json)
  await replaceCharacters(backup.characters)
  return backup.characters
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
