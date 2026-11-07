import { Plus } from 'lucide-react'
import type { Character } from '../domain/character'
import {
  createPactMagic,
  createSpellSlots,
  getSpellcastingProgression,
} from '../domain/spellcasting'
import { Button, IconButton } from '../components/ui/button'
import { PanelHeader } from '../components/ui/panel-header'

interface SpellSlotTrackerProps {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

const CASTER_LABELS = {
  warlock: 'PACT-MAGIE',
  full: 'VOLLER ZAUBERWIRKER',
  half: 'HALBER ZAUBERWIRKER',
  third: 'DRITTEL-ZAUBERWIRKER',
} as const

export function SpellSlotTracker({ character, onUpdate }: SpellSlotTrackerProps) {
  const progression = getSpellcastingProgression(character)
  if (!progression) return null

  const slots = character.spellSlots ?? createSpellSlots(character)
  const pactMagic = character.pactMagic ?? createPactMagic(character)

  function restoreAllSlots() {
    onUpdate({
      spellSlots: slots.map((slot) => ({ ...slot, current: slot.max })),
      pactMagic: pactMagic ? { ...pactMagic, current: pactMagic.max } : undefined,
    })
  }

  function spendPactSlot() {
    if (!pactMagic) return
    onUpdate({ pactMagic: { ...pactMagic, current: Math.max(0, pactMagic.current - 1) } })
  }

  function restorePactSlots() {
    const next = pactMagic ?? createPactMagic(character)
    if (next) onUpdate({ pactMagic: { ...next, current: next.max } })
  }

  function updateSlot(spellLevel: number, change: -1 | 1) {
    onUpdate({
      spellSlots: slots.map((slot) =>
        slot.spellLevel === spellLevel
          ? { ...slot, current: Math.max(0, Math.min(slot.max, slot.current + change)) }
          : slot,
      ),
    })
  }

  return (
    <section className="panel">
      <PanelHeader title="Zauberplätze" meta={CASTER_LABELS[progression.kind]} />

      {progression.kind === 'warlock' && pactMagic ? (
        <div className="slot-row">
          <strong>Paktplatz · Grad {pactMagic.spellLevel}</strong>
          <span>
            {pactMagic.current} / {pactMagic.max}
          </span>
          <Button disabled={pactMagic.current <= 0} onClick={spendPactSlot}>
            Verbrauchen
          </Button>
        </div>
      ) : (
        <div className="slot-list">
          {progression.slots.map((maximum, index) => {
            const spellLevel = index + 1
            const slot = slots.find((item) => item.spellLevel === spellLevel) ?? {
              spellLevel,
              max: maximum,
              current: maximum,
            }

            return (
              <div className="slot-row" key={spellLevel}>
                <strong>Grad {spellLevel}</strong>
                <span>
                  {slot.current} / {slot.max}
                </span>
                <Button disabled={slot.current <= 0} onClick={() => updateSlot(spellLevel, -1)}>
                  Verbrauchen
                </Button>
                <IconButton
                  label="Zauberplatz wiederherstellen"
                  disabled={slot.current >= slot.max}
                  onClick={() => updateSlot(spellLevel, 1)}
                >
                  <Plus size={15} />
                </IconButton>
              </div>
            )
          })}
        </div>
      )}

      <div className="rest-actions">
        <Button onClick={restoreAllSlots}>Lange Rast · alle Plätze auffüllen</Button>
        {progression.kind === 'warlock' && (
          <Button onClick={restorePactSlots}>Kurze Rast · Paktplätze auffüllen</Button>
        )}
      </div>
    </section>
  )
}
