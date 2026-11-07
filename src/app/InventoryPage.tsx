import { useState, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { CharacterInventory, InventoryItem } from '../domain/character'
import { Button, IconButton } from '../components/ui/button'
import { TextInputField } from '../components/ui/form-field'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { translate, useLanguage } from './i18n'

type InventoryGroup = 'personal' | 'party'

const DEFAULT_CURRENCY = { cp: 0, sp: 0, gp: 0, ep: 0, pp: 0 }

interface InventoryPageProps {
  inventory: CharacterInventory
  partyItems: InventoryItem[]
  onUpdateInventory: (patch: Partial<CharacterInventory>) => void
  onSavePartyItems: (items: InventoryItem[]) => void
}

export function InventoryPage({
  inventory,
  partyItems,
  onUpdateInventory,
  onSavePartyItems,
}: InventoryPageProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(1)
  const [itemValue, setItemValue] = useState(0)
  const [itemWeight, setItemWeight] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemGroup, setItemGroup] = useState<InventoryGroup>('personal')

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!itemName.trim()) return

    const item: InventoryItem = {
      id: crypto.randomUUID(),
      name: itemName.trim(),
      quantity: itemQuantity,
      unitValueGp: itemValue,
      ...(itemWeight ? { weightLb: Number(itemWeight) } : {}),
      ...(itemDescription ? { description: itemDescription } : {}),
    }

    if (itemGroup === 'party') {
      onSavePartyItems([...partyItems, item])
    } else {
      onUpdateInventory({ personal: [...inventory.personal, item] })
    }

    setItemName('')
    setItemQuantity(1)
    setItemValue(0)
    setItemWeight('')
    setItemDescription('')
  }

  return (
    <>
      <PageIntro
        eyebrow={t('AUSRÜSTUNG')}
        title={t('Inventar')}
        description={t('Persönliche Gegenstände und gemeinsamer Gruppenbesitz.')}
      />
      <section className="panel currency-panel">
        <PanelHeader title={t('Währungen')} meta="GELDBEUTEL" />
        <div className="currency-grid">
          {(['cp', 'sp', 'ep', 'gp', 'pp'] as const).map((coin) => (
            <label key={coin}>
              <span>{coin.toUpperCase()}</span>
              <input
                type="number"
                min="0"
                value={inventory.currency?.[coin] ?? 0}
                onChange={(e) =>
                  onUpdateInventory({
                    currency: {
                      ...DEFAULT_CURRENCY,
                      ...inventory.currency,
                      [coin]: Math.max(0, Number(e.target.value) || 0),
                    },
                  })
                }
              />
            </label>
          ))}
        </div>
      </section>
      <section className="panel">
        <PanelHeader title={t('Gegenstand hinzufügen')} />
        <form onSubmit={addItem}>
          <div className="form-grid item-form">
            <TextInputField label="Name" value={itemName} onChange={setItemName} required />
            <label className="field-label">
              Besitz
              <Select
                value={itemGroup}
                onValueChange={(next) => setItemGroup(next as 'personal' | 'party')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Persönlich</SelectItem>
                  <SelectItem value="party">Gruppeninventar</SelectItem>
                </SelectContent>
              </Select>
            </label>
            <TextInputField
              label="Anzahl"
              type="number"
              value={String(itemQuantity)}
              onChange={(v) => setItemQuantity(Math.max(1, Number(v) || 1))}
            />
            <TextInputField
              label="Wert (GM)"
              type="number"
              value={String(itemValue)}
              onChange={(v) => setItemValue(Math.max(0, Number(v) || 0))}
            />
            <TextInputField
              label="Gewicht (Pfund)"
              type="number"
              value={itemWeight}
              onChange={setItemWeight}
            />
            <TextInputField
              label="Beschreibung"
              value={itemDescription}
              onChange={setItemDescription}
            />
          </div>
          <Button variant="primary" className="form-submit" type="submit">
            <Plus size={15} /> Gegenstand hinzufügen
          </Button>
        </form>
      </section>
      {(['personal', 'party'] as const).map((group) => {
        const items = group === 'party' ? partyItems : inventory.personal
        const updateItems = (next: InventoryItem[]) => {
          if (group === 'party') {
            onSavePartyItems(next)
          } else onUpdateInventory({ personal: next })
        }
        return (
          <section className="panel" key={group}>
            <PanelHeader
              title={group === 'personal' ? 'Persönliches Inventar' : 'Gruppeninventar'}
              meta={`${items.length} GEGENSTÄNDE`}
            />
            {items.length === 0 ? (
              <p className="muted-paragraph">Noch keine Gegenstände vorhanden.</p>
            ) : (
              <div className="inventory-list">
                {items.map((item) => (
                  <div className="inventory-row" key={item.id}>
                    <div className="inventory-main">
                      <strong>{item.name}</strong>
                      <small>
                        {item.description || 'Keine Beschreibung'}
                        {item.weightLb !== undefined ? ' · ' + item.weightLb + ' Pfd.' : ''}
                      </small>
                    </div>
                    <span>× {item.quantity}</span>
                    <span>{item.unitValueGp} GM</span>
                    <label className="equipped-toggle">
                      <input
                        type="checkbox"
                        checked={item.equipped ?? false}
                        onChange={(e) =>
                          updateItems(
                            items.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, equipped: e.target.checked }
                                : entry,
                            ),
                          )
                        }
                      />{' '}
                      Ausgerüstet
                    </label>
                    <IconButton
                      className="delete-button"
                      label={item.name + ' entfernen'}
                      onClick={() => updateItems(items.filter((entry) => entry.id !== item.id))}
                    >
                      <Trash2 size={15} />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </>
  )
}
