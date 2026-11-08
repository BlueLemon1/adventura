import { useState, type FormEvent } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import type { Ability, Character, KnownSpell } from '../domain/character'
import { ABILITIES } from '../domain/character'
import { getSpellbookFeatureSpells, getClassResources } from '../domain/classFeatures'
import type { Language } from './i18n'
import { Button } from '../components/ui/button'
import { SegmentedTabs } from '../components/ui/segmented-tabs'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import { TextAreaField, TextInputField } from '../components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { SpellCatalog } from './SpellCatalog'
import { getHigherLevelText } from './SpellHigherLevel'
import { SpellbookList } from './SpellbookList'
import { SpellSlotTracker } from './SpellSlotTracker'
import { getSpellCatalog } from '../domain/spellCatalog'
import { getDefaultSpellcastingAbility, getSpellcastingStats } from '../domain/spellcasting'
import { translate } from './i18n'

type SpellSource = KnownSpell['source']
type UsageReset = NonNullable<KnownSpell['usageReset']>

interface SpellbookPageProps {
  character: Character
  knownSpells: KnownSpell[]
  view: 'character' | 'catalog'
  onViewChange: (view: 'character' | 'catalog') => void
  language: Language
  onUpdateCharacter: (patch: Partial<Character>) => void
  onUpdateSpells: (spells: KnownSpell[]) => void
}

export function SpellbookPage({
  character,
  knownSpells,
  view,
  onViewChange,
  language,
  onUpdateCharacter,
  onUpdateSpells,
}: SpellbookPageProps) {
  const t = (value: string) => translate(language, value)
  const featureSpells = getSpellbookFeatureSpells(character, language)
  const classResources = getClassResources(character)
  const spellCatalog = getSpellCatalog(character.ruleset)
  const localizedKnownSpells = knownSpells.map((knownSpell) => {
    const spell = spellCatalog.find((entry) => entry.id === knownSpell.spellId)
    if (!spell) return knownSpell

    const localized = language === 'de' ? spell.localized : undefined
    const englishHigherLevel = spell.higherLevel
    return {
      ...knownSpell,
      name: language === 'de' ? (localized?.name ?? '') : spell.name,
      contentSourceId: spell.contentSourceId,
      spellLevel: spell.level,
      school: language === 'de' ? (localized?.school ?? '') : spell.school,
      castingTime: language === 'de' ? (localized?.castingTime ?? '') : spell.castingTime,
      range: language === 'de' ? (localized?.range ?? '') : spell.range,
      components: language === 'de' ? (localized?.components ?? '') : spell.components,
      duration: language === 'de' ? (localized?.duration ?? '') : spell.duration,
      description: language === 'de' ? (localized?.description ?? '') : spell.description,
      higherLevel: getHigherLevelText(englishHigherLevel, localized?.higherLevel, language),
      higherLevelLabel: language === 'de' ? localized?.higherLevelLabel : spell.higherLevelLabel,
    }
  })
  const spellcastingStats = getSpellcastingStats(character)
  const selectedSpellcastingAbility =
    character.spellcastingAbility ?? getDefaultSpellcastingAbility(character) ?? 'int'
  const featureSpellEntries: KnownSpell[] = featureSpells.map((feature): KnownSpell => {
    const spell = spellCatalog.find((entry) => entry.id === feature.spellbookSpellId)
    const localizedSpell = language === 'de' ? spell?.localized : undefined
    const englishHigherLevel = spell?.higherLevel
    const spellName = localizedSpell?.name ?? spell?.name ?? feature.name
    const featureName = language === 'de' ? (feature.localizedName ?? feature.name) : feature.name
    const resource = feature.resourceId
      ? classResources.find((entry) => entry.id === feature.resourceId)
      : undefined
    const savedCurrent = feature.resourceId
      ? character.classResources?.find((entry) => entry.id === feature.resourceId)?.current
      : undefined
    const current = resource
      ? Math.max(0, Math.min(resource.maximum, savedCurrent ?? resource.maximum))
      : undefined
    const sourceComponents = language === 'de' ? localizedSpell?.components : spell?.components
    return {
      entryType: 'feature',
      actionType: feature.activation,
      resourceId: feature.resourceId,
      resourceCost: feature.resourceCost ?? 1,
      spellId: feature.id,
      name: language === 'de' ? (localizedSpell?.name ?? feature.localizedName ?? '') : spellName,
      learnedAtLevel: feature.level,
      prepared: true,
      spellLevel: spell?.level ?? 0,
      school: language === 'de' ? localizedSpell?.school : spell?.school,
      castingTime:
        language === 'de'
          ? (localizedSpell?.castingTime ?? '')
          : (spell?.castingTime ?? t('Aktion')),
      range: language === 'de' ? localizedSpell?.range : spell?.range,
      components:
        feature.spellbookSpellId === 'srd-2024-find-familiar' ||
        feature.spellbookSpellId === 'srd-2024-summon-dragon'
          ? sourceComponents?.replace(/,?\s*M(?:\s*\([^)]*\))?/i, '')
          : sourceComponents,
      duration: language === 'de' ? localizedSpell?.duration : spell?.duration,
      concentration: spell?.concentration,
      ritual: spell?.ritual,
      description:
        language === 'de'
          ? (localizedSpell?.description ?? '')
          : (spell?.description ?? feature.description ?? ''),
      higherLevel: getHigherLevelText(englishHigherLevel, localizedSpell?.higherLevel, language),
      higherLevelLabel:
        language === 'de' ? localizedSpell?.higherLevelLabel : spell?.higherLevelLabel,
      damage: spell?.damage,
      contentSourceId: spell?.contentSourceId,
      notes: featureName,
      source: 'class',
      sourceName: feature.source === 'subclass' ? t('Unterklassenmerkmal') : t('Klassenmerkmal'),
      ...(resource && current !== undefined
        ? {
            usageLimit: resource.maximum,
            usageRemaining: current,
            usageReset:
              resource.recovery === 'long'
                ? 'longRest'
                : resource.recovery === 'short'
                  ? 'shortRest'
                  : resource.recovery === 'short-one-or-long'
                    ? 'shortOneOrLong'
                    : resource.recovery === 'short-or-long'
                      ? 'shortOrLong'
                      : 'none',
          }
        : {}),
    }
  })
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
        description={t(
          'Verwalte deine Zauber und zusätzliche Zauber, die dir Klassenmerkmale gewähren.',
        )}
      />
      <SegmentedTabs
        value={view}
        onChange={onViewChange}
        ariaLabel={t('Zauberbuchansichten')}
        items={[
          {
            value: 'character',
            label: t('Meine Zauber'),
            icon: <Plus size={15} />,
            count: knownSpells.length + featureSpellEntries.length,
          },
          { value: 'catalog', label: t('Zauber finden'), icon: <Sparkles size={15} /> },
        ]}
      />

      {view === 'character' ? (
        <>
          <section className="panel spellcasting-stats">
            <PanelHeader
              title={t('Zauberwerte')}
              description={t('Zauberangriffe und Rettungswurf-SG')}
            />
            <div className="form-grid">
              <label className="field-label">
                {t('Zauberattribut')}
                <Select
                  value={selectedSpellcastingAbility}
                  onValueChange={(value) =>
                    onUpdateCharacter({ spellcastingAbility: value as Ability })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ABILITIES.map((ability) => (
                      <SelectItem key={ability} value={ability}>
                        {t(
                          (
                            {
                              str: 'Stärke',
                              dex: 'Geschicklichkeit',
                              con: 'Konstitution',
                              int: 'Intelligenz',
                              wis: 'Weisheit',
                              cha: 'Charisma',
                            } as Record<Ability, string>
                          )[ability],
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <div className="combat-card">
                <span>{t('Zauberangriff')}</span>
                <strong className="combat-number">
                  {spellcastingStats
                    ? (spellcastingStats.attackBonus >= 0 ? '+' : '') +
                      spellcastingStats.attackBonus
                    : '—'}
                </strong>
              </div>
              <div className="combat-card">
                <span>{t('Rettungswurf-SG')}</span>
                <strong className="combat-number">{spellcastingStats?.saveDc ?? '—'}</strong>
              </div>
            </div>
            <small>
              {t(
                'Standardmäßig wird das Attribut deiner Klasse verwendet. Bei mehreren Zauberquellen kannst du es hier anpassen.',
              )}
            </small>
          </section>
          <SpellSlotTracker character={character} onUpdate={onUpdateCharacter} />
          <SpellbookList
            spells={[...localizedKnownSpells, ...featureSpellEntries]}
            character={character}
            onUse={(spellId) => {
              const feature = featureSpellEntries.find((entry) => entry.spellId === spellId)
              if (feature?.resourceId) {
                const resource = classResources.find((entry) => entry.id === feature.resourceId)
                if (!resource) return
                const current =
                  character.classResources?.find((entry) => entry.id === feature.resourceId)
                    ?.current ?? resource.maximum
                onUpdateCharacter({
                  classResources: [
                    ...(character.classResources ?? []).filter(
                      (entry) => entry.id !== feature.resourceId,
                    ),
                    {
                      id: feature.resourceId,
                      current: Math.max(0, current - (feature.resourceCost ?? 1)),
                    },
                  ],
                })
                return
              }
              updateSpell(spellId, (spell) => ({
                ...spell,
                usageRemaining: Math.max(0, (spell.usageRemaining ?? spell.usageLimit ?? 0) - 1),
              }))
            }}
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
