import { Moon, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Character, SpellSlot } from '../domain/character'
import { createPactMagic, getSpellcastingProgression } from '../domain/spellcasting'
import { Button } from '../components/ui/button'
import { PanelHeader } from '../components/ui/panel-header'
import { translate, useLanguage } from './i18n'

interface SpellSlotTrackerProps {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

type SlotTone =
  | 'amber'
  | 'emerald'
  | 'azure'
  | 'violet'
  | 'rose'
  | 'cyan'
  | 'gold'
  | 'silver'
  | 'crimson'

const CASTER_LABELS = {
  warlock: 'PACT-MAGIE',
  full: 'VOLLER ZAUBERWIRKER',
  half: 'HALBER ZAUBERWIRKER',
  third: 'DRITTEL-ZAUBERWIRKER',
} as const

const SLOT_TONES: SlotTone[] = [
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

interface SlotTrackProps {
  label: ReactNode
  labelText: string
  current: number
  maximum: number
  tone: SlotTone
  translateText: (value: string) => string
  onChange: (change: -1 | 1) => void
}

function SlotTrack({
  label,
  labelText,
  current,
  maximum,
  tone,
  translateText,
  onChange,
}: SlotTrackProps) {
  return (
    <div className="slot-track">
      <div className="slot-track-heading">
        <strong>{label}</strong>
        <span aria-live="polite">
          {current}
          <small> / {maximum}</small>
        </span>
      </div>

      <div
        className="slot-pips"
        role="group"
        aria-label={`${labelText}: ${current} ${translateText('von')} ${maximum} ${translateText('Zauberplätze verfügbar')}`}
      >
        {Array.from({ length: maximum }, (_, index) => {
          const available = index < current
          const action = available ? 'Zauberplatz verbrauchen' : 'Zauberplatz wiederherstellen'

          return (
            <button
              key={index}
              type="button"
              className={`slot-pip ${available ? 'is-available' : 'is-spent'}`}
              data-tone={tone}
              aria-label={`${labelText}: ${translateText(action)}`}
              aria-pressed={!available}
              title={translateText(action)}
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

      return stored
        ? { ...stored, max: maximum, current: Math.min(stored.current, maximum) }
        : { spellLevel, max: maximum, current: maximum }
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
    if (pactMagic) {
      onUpdate({ pactMagic: { ...pactMagic, current: pactMagic.max } })
    }
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
          labelText={`${t('Paktmagie')} · ${t('Grad')} ${pactMagic.spellLevel}`}
          current={pactMagic.current}
          maximum={pactMagic.max}
          tone={SLOT_TONES[Math.max(0, pactMagic.spellLevel - 1)]}
          translateText={t}
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
              labelText={`${t('Grad')} ${slot.spellLevel}`}
              current={slot.current}
              maximum={slot.max}
              tone={SLOT_TONES[slot.spellLevel - 1] ?? 'amber'}
              translateText={t}
              onChange={(change) => updateSlot(slot.spellLevel, change)}
            />
          ))}
        </div>
      )}

      <div className="rest-actions">
        <Button variant="secondary" onClick={restoreAllSlots}>
          <Moon size={15} /> {t('Lange Rast · alle Plätze auffüllen')}
        </Button>
        {progression.kind === 'warlock' && (
          <Button variant="secondary" onClick={restorePactSlots}>
            <Sparkles size={15} /> {t('Kurze Rast · Paktplätze auffüllen')}
          </Button>
        )}
      </div>
    </section>
  )
}
