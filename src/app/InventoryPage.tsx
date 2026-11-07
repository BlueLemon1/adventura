import { useMemo, useState, type FormEvent } from 'react'
import {
  Backpack,
  CircleDot,
  Coins,
  Crown,
  Footprints,
  Gem,
  Hand,
  Plus,
  Shield,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sword,
  Trash2,
} from 'lucide-react'
import type { CharacterInventory, EquipmentSlot, InventoryItem } from '../domain/character'
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
  view: 'inventory' | 'equipped'
  onViewChange: (view: 'inventory' | 'equipped') => void
  partyItems: InventoryItem[]
  onUpdateInventory: (patch: Partial<CharacterInventory>) => void
  onSavePartyItems: (items: InventoryItem[]) => void
}

interface InventoryItemListProps {
  items: InventoryItem[]
  emptyLabel: string
  onRemove: (item: InventoryItem) => void
}

function InventoryItemList({ items, emptyLabel, onRemove }: InventoryItemListProps) {
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

const EQUIPMENT_SLOTS: { id: EquipmentSlot; label: string; icon: typeof Shield }[] = [
  { id: 'head', label: 'Kopf', icon: Crown },
  { id: 'neck', label: 'Hals', icon: Gem },
  { id: 'cloak', label: 'Umhang', icon: Shirt },
  { id: 'armor', label: 'Rüstung', icon: Shield },
  { id: 'mainHand', label: 'Haupthand', icon: Sword },
  { id: 'offHand', label: 'Nebenhand', icon: ShieldCheck },
  { id: 'hands', label: 'Hände', icon: Hand },
  { id: 'waist', label: 'Gürtel', icon: CircleDot },
  { id: 'feet', label: 'Füße', icon: Footprints },
  { id: 'ring1', label: 'Ring 1', icon: Gem },
  { id: 'ring2', label: 'Ring 2', icon: Gem },
  { id: 'other', label: 'Sonstiges', icon: Sparkles },
]

interface EquipmentLoadoutProps {
  items: InventoryItem[]
  inventoryItems: InventoryItem[]
  onEquip: (slot: EquipmentSlot, itemId: string) => void
  onUnequip: (item: InventoryItem) => void
  onRemove: (item: InventoryItem) => void
}

function EquipmentLoadout({
  items,
  inventoryItems,
  onEquip,
  onUnequip,
  onRemove,
}: EquipmentLoadoutProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  return (
    <div className="equipment-layout">
      <div className="equipment-slot-grid">
        {EQUIPMENT_SLOTS.map(({ id, label, icon: Icon }) => {
          const item = items.find(
            (entry) => (entry.equippedSlot ?? (entry.equipped ? 'other' : undefined)) === id,
          )
          return (
            <article className={item ? 'equipment-slot filled' : 'equipment-slot'} key={id}>
              <div className="equipment-slot-top">
                <span className="equipment-slot-icon">
                  <Icon size={20} />
                </span>
                <div className="equipment-slot-copy">
                  <strong>{t(label)}</strong>
                  <small>{item ? t('Belegt') : t('Freier Slot')}</small>
                </div>
              </div>
              {item ? (
                <div className="equipment-slot-item">
                  <strong>{item.name}</strong>
                  <small>
                    {item.quantity > 1 ? `× ${item.quantity} · ` : ''}
                    {item.description || t('Keine Beschreibung')}
                  </small>
                  <div className="equipment-slot-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => onUnequip(item)}
                    >
                      {t('Ablegen')}
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      aria-label={t('Gegenstand entfernen')}
                      onClick={() => onRemove(item)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <Select value="" onValueChange={(value) => onEquip(id, value)}>
                  <SelectTrigger className="equipment-slot-select">
                    <SelectValue placeholder={t('Gegenstand anlegen')} />
                  </SelectTrigger>
                  <SelectContent>
                    {inventoryItems.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name}
                        {candidate.quantity > 1 ? ` × ${candidate.quantity}` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </article>
          )
        })}
      </div>
      {inventoryItems.length === 0 && items.length === 0 && (
        <p className="muted-paragraph">
          {t('Füge zuerst Gegenstände zum persönlichen Inventar hinzu.')}
        </p>
      )}
    </div>
  )
}

export function InventoryPage({
  inventory,
  partyItems,
  onUpdateInventory,
  onSavePartyItems,
  view,
  onViewChange,
}: InventoryPageProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(1)
  const [itemValue, setItemValue] = useState(0)
  const [itemWeight, setItemWeight] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemGroup, setItemGroup] = useState<InventoryGroup>('personal')

  const equippedItems = useMemo(
    () => inventory.personal.filter((item) => item.equippedSlot || item.equipped),
    [inventory.personal],
  )
  const carriedItems = useMemo(
    () => inventory.personal.filter((item) => !item.equippedSlot && !item.equipped),
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

      {view === 'equipped' ? (
        <section className="panel equipped-gear-panel">
          <PanelHeader
            title={t('Angelegte Ausrüstung')}
            meta={`${equippedItems.length} ${t('ANGELEGT')}`}
          />
          <p className="muted-paragraph">
            {t(
              'Jeder Slot kann genau einen Gegenstand aufnehmen. Beim Anlegen wird er aus deinem Inventar verschoben.',
            )}
          </p>
          <EquipmentLoadout
            items={equippedItems}
            inventoryItems={carriedItems}
            onEquip={(slot, itemId) => {
              const currentSlotItem = equippedItems.find(
                (item) => (item.equippedSlot ?? (item.equipped ? 'other' : undefined)) === slot,
              )
              const selectedItem = carriedItems.find((item) => item.id === itemId)
              if (!selectedItem) return
              onUpdateInventory({
                personal: inventory.personal.map((item) => {
                  if (currentSlotItem?.id === item.id)
                    return { ...item, equipped: false, equippedSlot: undefined }
                  if (selectedItem.id === item.id)
                    return { ...item, equipped: undefined, equippedSlot: slot }
                  return item
                }),
              })
            }}
            onUnequip={(item) =>
              updateItem(item.id, (current) => ({
                ...current,
                equipped: false,
                equippedSlot: undefined,
              }))
            }
            onRemove={removePersonalItem}
          />
        </section>
      ) : (
        <>
          <section className="panel currency-panel">
            <PanelHeader
              title={t('Währungen')}
              meta={
                <>
                  <Coins size={14} /> {t('GELDBEUTEL')}
                </>
              }
            />
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
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
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
              meta={`${carriedItems.length} ${t('GEGENSTÄNDE')}`}
            />
            <InventoryItemList
              items={carriedItems}
              emptyLabel={t('Noch keine Gegenstände vorhanden.')}
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
              onRemove={removePartyItem}
            />
          </section>
        </>
      )}
    </>
  )
}
