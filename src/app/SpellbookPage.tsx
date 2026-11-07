import { useState, type FormEvent } from 'react'
import { Plus, WandSparkles } from 'lucide-react'
import type { Character, KnownSpell } from '../domain/character'
import type { Language } from './i18n'
import { Button } from '../components/ui/button'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import { SegmentedTabs } from '../components/ui/segmented-tabs'
import { TextAreaField, TextInputField } from '../components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { SpellCatalog } from './SpellCatalog'
import { SpellbookList } from './SpellbookList'
import { SpellSlotTracker } from './SpellSlotTracker'
import { translate } from './i18n'

type SpellSource = KnownSpell['source']
type UsageReset = NonNullable<KnownSpell['usageReset']>
type SpellbookView = 'character' | 'catalog'

interface SpellbookPageProps {
  character: Character
  knownSpells: KnownSpell[]
  language: Language
  onUpdateCharacter: (patch: Partial<Character>) => void
  onUpdateSpells: (spells: KnownSpell[]) => void
}

export function SpellbookPage({
  character,
  knownSpells,
  language,
  onUpdateCharacter,
  onUpdateSpells,
}: SpellbookPageProps) {
  const t = (value: string) => translate(language, value)
  const [view, setView] = useState<SpellbookView>('character')
  const [spellName, setSpellName] = useState('')
  const [spellLevel, setSpellLevel] = useState(0)
  const [spellSchool, setSpellSchool] = useState('')
  const [spellTime, setSpellTime] = useState('1 Aktion')
  const [spellRange, setSpellRange] = useState('')
  const [spellComponents, setSpellComponents] = useState('')
  const [spellDuration, setSpellDuration] = useState('Sofort')
  const [spellDescription, setSpellDescription] = useState('')
  const [spellConcentration, setSpellConcentration] = useState(false)
  const [spellRitual, setSpellRitual] = useState(false)
  const [spellSource, setSpellSource] = useState<SpellSource>('class')
  const [spellSourceName, setSpellSourceName] = useState('')
  const [spellUsageLimit, setSpellUsageLimit] = useState(0)
  const [spellUsageReset, setSpellUsageReset] = useState<UsageReset>('longRest')

  function addCustomSpell(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!spellName.trim()) return

    const spell: KnownSpell = {
      spellId: crypto.randomUUID(),
      name: spellName.trim(),
      learnedAtLevel: character.level,
      prepared: false,
      spellLevel,
      school: spellSchool,
      castingTime: spellTime,
      range: spellRange,
      components: spellComponents,
      duration: spellDuration,
      concentration: spellConcentration,
      ritual: spellRitual,
      description: spellDescription,
      source: spellSource,
      sourceName: spellSourceName.trim() || undefined,
      ...(spellUsageLimit > 0
        ? {
            usageLimit: spellUsageLimit,
            usageRemaining: spellUsageLimit,
            usageReset: spellUsageReset,
          }
        : {}),
    }

    onUpdateSpells([...knownSpells, spell])
    setSpellName('')
    setSpellLevel(0)
    setSpellSchool('')
    setSpellRange('')
    setSpellComponents('')
    setSpellDescription('')
    setSpellConcentration(false)
    setSpellRitual(false)
    setSpellSource('class')
    setSpellSourceName('')
    setSpellUsageLimit(0)
    setSpellUsageReset('longRest')
  }

  function updateSpell(spellId: string, update: (spell: KnownSpell) => KnownSpell) {
    onUpdateSpells(knownSpells.map((spell) => (spell.spellId === spellId ? update(spell) : spell)))
  }

  return (
    <>
      <PageIntro
        eyebrow={t('MAGIE & ZAUBER')}
        title={t('Zauberbuch')}
        description={t('Verwalte bekannte Zauber, Vorbereitung und ihre wichtigsten Details.')}
      />

      <SegmentedTabs
        ariaLabel={t('Zauberbuchansicht')}
        value={view}
        onChange={setView}
        items={[
          {
            value: 'character',
            label: t('Meine Zauber'),
            icon: <WandSparkles size={16} />,
            count: knownSpells.length,
          },
          {
            value: 'catalog',
            label: t('SRD & hinzufügen'),
            icon: <Plus size={16} />,
          },
        ]}
      />

      {view === 'character' ? (
        <>
          <SpellSlotTracker character={character} onUpdate={onUpdateCharacter} />
          <SpellbookList
            spells={knownSpells}
            character={character}
            onUse={(spellId) =>
              updateSpell(spellId, (spell) => ({
                ...spell,
                usageRemaining: Math.max(0, (spell.usageRemaining ?? spell.usageLimit ?? 0) - 1),
              }))
            }
            onReset={(spellId) =>
              updateSpell(spellId, (spell) => ({
                ...spell,
                usageRemaining: spell.usageLimit,
              }))
            }
            onTogglePrepared={(spellId, prepared) =>
              updateSpell(spellId, (spell) => ({ ...spell, prepared }))
            }
            onRemove={(spellId) =>
              onUpdateSpells(knownSpells.filter((spell) => spell.spellId !== spellId))
            }
          />
        </>
      ) : (
        <>
          <SpellCatalog
            character={character}
            knownSpells={knownSpells}
            language={language}
            onAdd={(spell) => onUpdateSpells([...knownSpells, spell])}
          />

          <section className="panel">
            <PanelHeader title={t('Eigene Zauber hinzufügen')} meta={t('MANUELLE ERFASSUNG')} />
            <form onSubmit={addCustomSpell}>
              <div className="form-grid spell-form">
                <TextInputField
                  label="Zaubername"
                  value={spellName}
                  onChange={setSpellName}
                  required
                />
                <label className="field-label">
                  {t('Zaubergrad')}
                  <Select
                    value={String(spellLevel)}
                    onValueChange={(value) => setSpellLevel(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, index) => (
                        <SelectItem key={index} value={String(index)}>
                          {index === 0 ? t('Zaubertrick') : `${t('Grad ')}${index}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
                <TextInputField label="Schule" value={spellSchool} onChange={setSpellSchool} />
                <TextInputField label="Zauberzeit" value={spellTime} onChange={setSpellTime} />
                <TextInputField label="Reichweite" value={spellRange} onChange={setSpellRange} />
                <TextInputField
                  label="Komponenten (V/S/M)"
                  value={spellComponents}
                  onChange={setSpellComponents}
                />
                <TextInputField
                  label="Wirkungsdauer"
                  value={spellDuration}
                  onChange={setSpellDuration}
                />
              </div>

              <div className="form-grid spell-origin-form">
                <label className="field-label">
                  {t('Herkunft')}
                  <Select
                    value={spellSource ?? 'other'}
                    onValueChange={(value) => setSpellSource(value as SpellSource)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">{t('Klassenzauber')}</SelectItem>
                      <SelectItem value="story">{t('Story / Belohnung')}</SelectItem>
                      <SelectItem value="item">{t('Gegenstand')}</SelectItem>
                      <SelectItem value="feat">{t('Talent / Fähigkeit')}</SelectItem>
                      <SelectItem value="other">{t('Sonstiges')}</SelectItem>
                    </SelectContent>
                  </Select>
                </label>
                <TextInputField
                  label="Quelle / Gegenstand / Notiz"
                  value={spellSourceName}
                  onChange={setSpellSourceName}
                />
                <TextInputField
                  label="Nutzungen (0 = unbegrenzt)"
                  type="number"
                  value={String(spellUsageLimit)}
                  onChange={(value) =>
                    setSpellUsageLimit(Math.max(0, Math.min(1000, Number(value) || 0)))
                  }
                />
                {spellUsageLimit > 0 && (
                  <label className="field-label">
                    {t('Erneuerung')}
                    <Select
                      value={spellUsageReset}
                      onValueChange={(value) => setSpellUsageReset(value as UsageReset)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shortRest">{t('Kurze Rast')}</SelectItem>
                        <SelectItem value="longRest">{t('Lange Rast')}</SelectItem>
                        <SelectItem value="dawn">{t('Morgengrauen')}</SelectItem>
                        <SelectItem value="none">{t('Manuell / nie')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                )}
              </div>

              <div className="spell-flags">
                <label>
                  <input
                    type="checkbox"
                    checked={spellConcentration}
                    onChange={(event) => setSpellConcentration(event.target.checked)}
                  />
                  {t('Konzentration')}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={spellRitual}
                    onChange={(event) => setSpellRitual(event.target.checked)}
                  />
                  {t('Ritual')}
                </label>
              </div>

              <TextAreaField
                label="Beschreibung / Effekt"
                value={spellDescription}
                onChange={setSpellDescription}
              />
              <Button variant="primary" className="form-submit" type="submit">
                <Plus size={15} /> {t('Zauber hinzufügen')}
              </Button>
            </form>
          </section>
        </>
      )}
    </>
  )
}
