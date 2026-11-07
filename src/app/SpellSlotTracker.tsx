import { Moon, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Character, SpellSlot } from '../domain/character'
import { createPactMagic, getSpellcastingProgression } from '../domain/spellcasting'
import { Button } from '../components/ui/button'
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

const SLOT_TONES = [
  'amber',
  'emerald',
  'azure',
  'violet',
  'rose',
  'cyan',
  'gold',
  'silver',
  'crimson',
]

function SlotTrack({
  label,
  current,
  maximum,
  tone,
  onChange,
}: {
  label: ReactNode
  current: number
  maximum: number
  tone: string
  onChange: (change: -1 | 1) => void
}) {
  return (
    <div className="slot-track">
      <div className="slot-track-heading">
        <strong>{label}</strong>
        <span>
          {current}
          <small> / {maximum}</small>
        </span>
      </div>
      <div className="slot-pips" aria-label={`${current} von ${maximum} Zauberplätzen verfügbar`}>
        {Array.from({ length: maximum }, (_, index) => {
          const available = index < current
          return (
            <button
              key={index}
              type="button"
              className={`slot-pip ${available ? 'is-available' : 'is-spent'}`}
              data-tone={tone}
              aria-label={`${label}: ${available ? 'Zauberplatz verbrauchen' : 'Zauberplatz wiederherstellen'}`}
              title={available ? 'Zauberplatz verbrauchen' : 'Zauberplatz wiederherstellen'}
              onClick={() => onChange(available ? -1 : 1)}
            />
          )
        })}
      </div>
    </div>
  )
}

export function SpellSlotTracker({ character, onUpdate }: SpellSlotTrackerProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const progression = getSpellcastingProgression(character)
  if (!progression) return null

  const slots = progression.slots
    .map((maximum, index) => {
      const spellLevel = index + 1
      const stored = character.spellSlots?.find((slot) => slot.spellLevel === spellLevel)
      return stored ?? { spellLevel, max: maximum, current: maximum }
    })
    .filter((slot) => slot.max > 0)
  const pactMagic = character.pactMagic ?? createPactMagic(character)

  function updateSlot(spellLevel: number, change: -1 | 1) {
    onUpdate({
      spellSlots: slots.map((slot) =>
        slot.spellLevel === spellLevel
          ? { ...slot, current: Math.max(0, Math.min(slot.max, slot.current + change)) }
          : slot,
      ),
    })
  }

  function updatePactMagic(change: -1 | 1) {
    if (!pactMagic) return
    onUpdate({
      pactMagic: {
        ...pactMagic,
        current: Math.max(0, Math.min(pactMagic.max, pactMagic.current + change)),
      },
    })
  }

  function restoreAllSlots() {
    onUpdate({
      spellSlots: slots.map((slot) => ({ ...slot, current: slot.max })),
      pactMagic: pactMagic ? { ...pactMagic, current: pactMagic.max } : undefined,
    })
  }

  function restorePactSlots() {
    const next = pactMagic ?? createPactMagic(character)
    if (next) onUpdate({ pactMagic: { ...next, current: next.max } })
  }

  return (
    <section className="panel spell-slot-panel">
      <PanelHeader
        title={t('Zauberplätze')}
        meta={t(CASTER_LABELS[progression.kind])}
        description={t(
          'Tippe auf einen Edelstein, um einen Platz zu verbrauchen oder wiederherzustellen.',
        )}
      />
      {progression.kind === 'warlock' && pactMagic ? (
        <SlotTrack
          label={
            <>
              {t('Paktmagie')} · {t('Grad')} {pactMagic.spellLevel}
            </>
          }
          current={pactMagic.current}
          maximum={pactMagic.max}
          tone={SLOT_TONES[Math.max(0, pactMagic.spellLevel - 1)]}
          onChange={updatePactMagic}
        />
      ) : (
        <div className="slot-tracks">
          {slots.map((slot: SpellSlot) => (
            <SlotTrack
              key={slot.spellLevel}
              label={
                <>
                  {t('Grad')} {slot.spellLevel}
                </>
              }
              current={slot.current}
              maximum={slot.max}
              tone={SLOT_TONES[slot.spellLevel - 1] ?? 'amber'}
              onChange={(change) => updateSlot(slot.spellLevel, change)}
            />
          ))}
        </div>
      )}
      <div className="rest-actions">
        <Button variant="secondary" onClick={restoreAllSlots}>
          <Moon size={14} /> {t('Lange Rast · alle Plätze auffüllen')}
        </Button>
        {progression.kind === 'warlock' && (
          <Button variant="secondary" onClick={restorePactSlots}>
            <Sparkles size={14} /> {t('Kurze Rast · Paktplätze auffüllen')}
          </Button>
        )}
      </div>
    </section>
  )
}
