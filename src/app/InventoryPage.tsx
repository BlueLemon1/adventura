import { useMemo, useState, type FormEvent } from 'react'
import { Backpack, Coins, Plus, ShieldCheck, Trash2 } from 'lucide-react'
import type { CharacterInventory, InventoryItem } from '../domain/character'
import { Button, IconButton } from '../components/ui/button'
import { TextInputField } from '../components/ui/form-field'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import { SegmentedTabs } from '../components/ui/segmented-tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { translate, useLanguage } from './i18n'

type InventoryGroup = 'personal' | 'party'
type InventoryView = 'inventory' | 'equipped'

const DEFAULT_CURRENCY = { cp: 0, sp: 0, gp: 0, ep: 0, pp: 0 }

interface InventoryPageProps {
  inventory: CharacterInventory
  partyItems: InventoryItem[]
  onUpdateInventory: (patch: Partial<CharacterInventory>) => void
  onSavePartyItems: (items: InventoryItem[]) => void
}

interface InventoryItemListProps {
  items: InventoryItem[]
  emptyLabel: string
  showEquipped: boolean
  onToggleEquipped?: (item: InventoryItem, equipped: boolean) => void
  onRemove: (item: InventoryItem) => void
}

function InventoryItemList({
  items,
  emptyLabel,
  showEquipped,
  onToggleEquipped,
  onRemove,
}: InventoryItemListProps) {
  if (items.length === 0) {
    return <p className="muted-paragraph">{emptyLabel}</p>
  }

  return (
    <div className="inventory-list">
      {items.map((item) => (
        <div className="inventory-row" key={item.id}>
          <div className="inventory-main">
            <strong>{item.name}</strong>
            <small>
              {item.description || 'Keine Beschreibung'}
              {item.weightLb !== undefined ? ` · ${item.weightLb} Pfd.` : ''}
            </small>
          </div>
          <span>× {item.quantity}</span>
          <span>{item.unitValueGp} GM</span>
          {showEquipped && onToggleEquipped && (
            <label className="equipped-toggle">
              <input
                type="checkbox"
                checked={item.equipped ?? false}
                onChange={(event) => onToggleEquipped(item, event.target.checked)}
              />
              Ausgerüstet
            </label>
          )}
          <IconButton
            className="delete-button"
            label={item.name + ' entfernen'}
            onClick={() => onRemove(item)}
          >
            <Trash2 size={15} />
          </IconButton>
        </div>
      ))}
    </div>
  )
}

export function InventoryPage({
  inventory,
  partyItems,
  onUpdateInventory,
  onSavePartyItems,
}: InventoryPageProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const [view, setView] = useState<InventoryView>('inventory')
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(1)
  const [itemValue, setItemValue] = useState(0)
  const [itemWeight, setItemWeight] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemGroup, setItemGroup] = useState<InventoryGroup>('personal')

  const equippedItems = useMemo(
    () => inventory.personal.filter((item) => item.equipped),
    [inventory.personal],
  )

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

  function updateItem(itemId: string, update: (item: InventoryItem) => InventoryItem) {
    onUpdateInventory({
      personal: inventory.personal.map((item) => (item.id === itemId ? update(item) : item)),
    })
  }

  function removePersonalItem(item: InventoryItem) {
    onUpdateInventory({ personal: inventory.personal.filter((entry) => entry.id !== item.id) })
  }

  function removePartyItem(item: InventoryItem) {
    onSavePartyItems(partyItems.filter((entry) => entry.id !== item.id))
  }

  return (
    <>
      <PageIntro
        eyebrow={t('AUSRÜSTUNG')}
        title={t('Inventar')}
        description={t('Persönliche Gegenstände und gemeinsamer Gruppenbesitz.')}
      />

      <SegmentedTabs
        ariaLabel={t('Inventaransicht')}
        value={view}
        onChange={setView}
        items={[
          { value: 'inventory', label: t('Inventar'), icon: <Backpack size={16} /> },
          {
            value: 'equipped',
            label: t('Angelegt'),
            icon: <ShieldCheck size={16} />,
            count: equippedItems.length,
          },
        ]}
      />

      {view === 'equipped' ? (
        <section className="panel equipped-gear-panel">
          <PanelHeader
            title={t('Angelegte Ausrüstung')}
            meta={`${equippedItems.length} ${t('ANGELEGT')}`}
          />
          <p className="muted-paragraph">
            {t('Hier siehst du nur die Gegenstände, die dein Charakter aktuell trägt oder verwendet.')}
          </p>
          <InventoryItemList
            items={equippedItems}
            emptyLabel={t('Du hast noch keine Gegenstände angelegt. Markiere Ausrüstung im Inventar als angelegt.')}
            showEquipped
            onToggleEquipped={(item, equipped) =>
              updateItem(item.id, (current) => ({ ...current, equipped }))
            }
            onRemove={removePersonalItem}
          />
        </section>
      ) : (
        <>
          <section className="panel currency-panel">
            <PanelHeader title={t('Währungen')} meta={<><Coins size={14} /> {t('GELDBEUTEL')}</>} />
            <div className="currency-grid">
              {(['cp', 'sp', 'ep', 'gp', 'pp'] as const).map((coin) => (
                <label key={coin}>
                  <span>{coin.toUpperCase()}</span>
                  <input
                    type="number"
                    min="0"
                    value={inventory.currency?.[coin] ?? 0}
                    onChange={(event) =>
                      onUpdateInventory({
                        currency: {
                          ...DEFAULT_CURRENCY,
                          ...inventory.currency,
                          [coin]: Math.max(0, Number(event.target.value) || 0),
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
                  {t('Besitz')}
                  <Select
                    value={itemGroup}
                    onValueChange={(next) => setItemGroup(next as InventoryGroup)}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">{t('Persönlich')}</SelectItem>
                      <SelectItem value="party">{t('Gruppeninventar')}</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
                <TextInputField
                  label="Anzahl"
                  type="number"
                  value={String(itemQuantity)}
                  onChange={(value) => setItemQuantity(Math.max(1, Number(value) || 1))}
                />
                <TextInputField
                  label="Wert (GM)"
                  type="number"
                  value={String(itemValue)}
                  onChange={(value) => setItemValue(Math.max(0, Number(value) || 0))}
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
                <Plus size={15} /> {t('Gegenstand hinzufügen')}
              </Button>
            </form>
          </section>

          <section className="panel">
            <PanelHeader
              title={t('Persönliches Inventar')}
              meta={`${inventory.personal.length} ${t('GEGENSTÄNDE')}`}
            />
            <InventoryItemList
              items={inventory.personal}
              emptyLabel={t('Noch keine Gegenstände vorhanden.')}
              showEquipped
              onToggleEquipped={(item, equipped) =>
                updateItem(item.id, (current) => ({ ...current, equipped }))
              }
              onRemove={removePersonalItem}
            />
          </section>

          <section className="panel">
            <PanelHeader
              title={t('Gruppeninventar')}
              meta={`${partyItems.length} ${t('GEGENSTÄNDE')}`}
            />
            <InventoryItemList
              items={partyItems}
              emptyLabel={t('Noch keine Gegenstände vorhanden.')}
              showEquipped={false}
              onRemove={removePartyItem}
            />
          </section>
        </>
      )}
    </>
  )
}
