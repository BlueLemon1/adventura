import type {
  Character,
  CharacterInventory,
  CharacterSpellbook,
  InventoryItem,
} from '../domain/character'

export interface StoredCharacter {
  character: Character
  inventory: CharacterInventory
  spellbook: CharacterSpellbook
}

interface PartyInventoryRecord {
  id: 'shared'
  items: InventoryItem[]
}

const DATABASE_NAME = 'adventura'
const DATABASE_VERSION = 2
const CHARACTER_STORE = 'characters'
const PARTY_STORE = 'partyInventory'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result

      if (!database.objectStoreNames.contains(PARTY_STORE)) {
        database.createObjectStore(PARTY_STORE, { keyPath: 'id' })
      }

      if (!database.objectStoreNames.contains(CHARACTER_STORE)) {
        const store = database.createObjectStore(CHARACTER_STORE, { keyPath: 'character.id' })
        store.createIndex('updatedAt', 'character.updatedAt')
      }
    }

    request.onsuccess = () => {
      const database = request.result
      database.onversionchange = () => database.close()
      resolve(database)
    }

    request.onerror = () => {
      reject(request.error ?? new Error('Die lokale Datenbank konnte nicht geöffnet werden.'))
    }

    request.onblocked = () => {
      reject(
        new Error(
          'Die Datenbank wird noch von einem anderen Adventura-Tab verwendet. Bitte schließe andere Tabs und versuche es erneut.',
        ),
      )
    }
  })
}

function runTransaction<T>(
  storeName: string,
  mode: IDBTransactionMode,
  operation: (
    store: IDBObjectStore,
    resolve: (value: T) => void,
    reject: (reason: Error) => void,
  ) => void,
): Promise<T> {
  return openDatabase().then(
    (database) =>
      new Promise<T>((resolve, reject) => {
        const transaction = database.transaction(storeName, mode)
        const store = transaction.objectStore(storeName)
        let result!: T

        operation(
          store,
          (value) => {
            result = value
          },
          reject,
        )

        transaction.oncomplete = () => {
          database.close()
          resolve(result)
        }

        transaction.onerror = () => {
          database.close()
          reject(transaction.error ?? new Error('Die Datenbanktransaktion ist fehlgeschlagen.'))
        }

        transaction.onabort = () => {
          database.close()
          reject(transaction.error ?? new Error('Die Datenbanktransaktion wurde abgebrochen.'))
        }
      }),
  )
}

export function getCharacters(): Promise<StoredCharacter[]> {
  return runTransaction(CHARACTER_STORE, 'readonly', (store, resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result as StoredCharacter[])
    request.onerror = () =>
      reject(request.error ?? new Error('Charaktere konnten nicht geladen werden.'))
  })
}

export function saveCharacter(character: StoredCharacter): Promise<void> {
  return runTransaction(CHARACTER_STORE, 'readwrite', (store, resolve, reject) => {
    const request = store.put(character)
    request.onsuccess = () => resolve(undefined)
    request.onerror = () =>
      reject(request.error ?? new Error('Charakter konnte nicht gespeichert werden.'))
  })
}

export function deleteCharacter(id: string): Promise<void> {
  return runTransaction(CHARACTER_STORE, 'readwrite', (store, resolve, reject) => {
    const request = store.delete(id)
    request.onsuccess = () => resolve(undefined)
    request.onerror = () =>
      reject(request.error ?? new Error('Charakter konnte nicht gelöscht werden.'))
  })
}

/** Replaces all characters atomically. */
export function replaceCharacters(characters: StoredCharacter[]): Promise<void> {
  return runTransaction(CHARACTER_STORE, 'readwrite', (store, resolve, reject) => {
    const clearRequest = store.clear()

    clearRequest.onerror = () => {
      reject(clearRequest.error ?? new Error('Vorhandene Charaktere konnten nicht ersetzt werden.'))
    }

    clearRequest.onsuccess = () => {
      for (const character of characters) {
        const request = store.put(character)
        request.onerror = () => {
          reject(
            request.error ?? new Error('Importierter Charakter konnte nicht gespeichert werden.'),
          )
        }
      }
      resolve(undefined)
    }
  })
}

export function getPartyInventory(): Promise<InventoryItem[]> {
  return runTransaction(PARTY_STORE, 'readonly', (store, resolve, reject) => {
    const request = store.get('shared')
    request.onsuccess = () => {
      const record = request.result as PartyInventoryRecord | undefined
      resolve(record?.items ?? [])
    }
    request.onerror = () => {
      reject(request.error ?? new Error('Gruppeninventar konnte nicht geladen werden.'))
    }
  })
}

export function savePartyInventory(items: InventoryItem[]): Promise<void> {
  return runTransaction(PARTY_STORE, 'readwrite', (store, resolve, reject) => {
    const request = store.put({ id: 'shared', items } satisfies PartyInventoryRecord)
    request.onsuccess = () => resolve(undefined)
    request.onerror = () => {
      reject(request.error ?? new Error('Gruppeninventar konnte nicht gespeichert werden.'))
    }
  })
}


/** Clears the deprecated global group inventory after its one-time migration. */
export function clearPartyInventory(): Promise<void> {
  return runTransaction(PARTY_STORE, 'readwrite', (store, resolve, reject) => {
    const request = store.delete('shared')
    request.onsuccess = () => resolve(undefined)
    request.onerror = () => {
      reject(request.error ?? new Error('Altes Gruppeninventar konnte nicht entfernt werden.'))
    }
  })
}
