import { useEffect, useState } from 'react'
import type { Character, InventoryItem, KnownSpell } from '../domain/character'
import {
  getCharacters,
  getPartyInventory,
  saveCharacter,
  savePartyInventory,
} from '../storage/database'
import type { StoredCharacter } from '../storage/database'

function getErrorMessage(reason: unknown, fallback: string): string {
  return reason instanceof Error ? reason.message : fallback
}

export function useCharacterCollection() {
  const [characters, setCharacters] = useState<StoredCharacter[]>([])
  const [partyItems, setPartyItems] = useState<InventoryItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const selected = characters.find((entry) => entry.character.id === selectedId) ?? null

  useEffect(() => {
    Promise.all([getCharacters(), getPartyInventory()])
      .then(([storedCharacters, sharedItems]) => {
        setCharacters(storedCharacters)
        setPartyItems(sharedItems)
      })
      .catch((reason: unknown) => {
        setError(getErrorMessage(reason, 'Daten konnten nicht geladen werden.'))
      })
      .finally(() => setLoading(false))
  }, [])

  async function persist(next: StoredCharacter): Promise<void> {
    const updated: StoredCharacter = {
      ...next,
      character: {
        ...next.character,
        updatedAt: new Date().toISOString(),
      },
    }

    setCharacters((current) =>
      current.map((entry) => (entry.character.id === updated.character.id ? updated : entry)),
    )

    try {
      await saveCharacter(updated)
    } catch (reason) {
      setError(getErrorMessage(reason, 'Änderungen konnten nicht gespeichert werden.'))
    }
  }

  function updateCharacter(patch: Partial<Character>): void {
    if (!selected) return
    void persist({
      ...selected,
      character: { ...selected.character, ...patch },
    })
  }

  function updateInventory(patch: Partial<StoredCharacter['inventory']>): void {
    if (!selected) return
    void persist({
      ...selected,
      inventory: { ...selected.inventory, ...patch },
    })
  }

  function updateSpellbook(knownSpells: KnownSpell[]): void {
    if (!selected) return
    void persist({
      ...selected,
      spellbook: { knownSpells },
    })
  }

  function persistPartyItems(items: InventoryItem[]): void {
    setPartyItems(items)
    void savePartyInventory(items).catch((reason: unknown) => {
      setError(getErrorMessage(reason, 'Gruppeninventar konnte nicht gespeichert werden.'))
    })
  }

  return {
    characters,
    setCharacters,
    partyItems,
    setPartyItems,
    selectedId,
    setSelectedId,
    selected,
    loading,
    error,
    setError,
    persist,
    updateCharacter,
    updateInventory,
    updateSpellbook,
    persistPartyItems,
  }
}
