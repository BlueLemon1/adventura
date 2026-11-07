import { useMemo, useState } from 'react'
import { BookOpen, Check, Plus, Search } from 'lucide-react'
import type { Character, KnownSpell } from '../domain/character'
import { normalizeKey } from '../domain/text'
import { getSpellcastingProgression } from '../domain/spellcasting'
import { Button } from '../components/ui/button'
import { PanelHeader } from '../components/ui/panel-header'
import { Field, SearchField } from '../components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import type { Language } from './i18n'
import { translate } from './i18n'
import spells2014 from '../data/spells-2014.json'
import spells2024 from '../data/spells-2024.json'

interface CatalogSpell {
  id: string
  name: string
  level: number
  school: string
  castingTime: string
  range: string
  components: string
  material: string
  duration: string
  concentration: boolean
  ritual: boolean
  classes: string[]
  description: string
  higherLevel?: string
  localized?: {
    name: string
    school: string
    classes: string[]
    castingTime: string
    range: string
    components: string
    duration: string
    description?: string
    higherLevel?: string
  }
  damage?: Array<{ dice: string; average: number; type?: string }>
}

type SpellSource = NonNullable<KnownSpell['source']>
type UsageReset = NonNullable<KnownSpell['usageReset']>

const CATALOGS: Record<Character['ruleset'], CatalogSpell[]> = {
  '2014': spells2014 as CatalogSpell[],
  '2024': spells2024 as CatalogSpell[],
}

const CLASS_ALIASES: Record<string, string> = {
  barde: 'bard',
  kleriker: 'cleric',
  druide: 'druid',
  zauberer: 'sorcerer',
  magier: 'wizard',
  hexenmeister: 'warlock',
  paladin: 'paladin',
  waldlaeufer: 'ranger',
  kaempfer: 'fighter',
  schurke: 'rogue',
}

const SCHOOLS: Record<Language, Record<string, string>> = {
  de: {
    abjuration: 'Bannmagie',
    conjuration: 'Beschwörung',
    divination: 'Erkenntnis',
    enchantment: 'Verzauberung',
    evocation: 'Hervorrufung',
    illusion: 'Illusion',
    necromancy: 'Nekromantie',
    transmutation: 'Verwandlung',
  },
  en: {
    abjuration: 'Abjuration',
    conjuration: 'Conjuration',
    divination: 'Divination',
    enchantment: 'Enchantment',
    evocation: 'Evocation',
    illusion: 'Illusion',
    necromancy: 'Necromancy',
    transmutation: 'Transmutation',
  },
}

const SOURCE_OPTIONS: Array<{ value: SpellSource; label: string }> = [
  { value: 'class', label: 'Klasse' },
  { value: 'story', label: 'Story / Belohnung' },
  { value: 'item', label: 'Gegenstand' },
  { value: 'feat', label: 'Talent / Fähigkeit' },
  { value: 'other', label: 'Sonstiges' },
]

const RESET_OPTIONS: Array<{ value: UsageReset; label: string }> = [
  { value: 'shortRest', label: 'Kurze Rast' },
  { value: 'longRest', label: 'Lange Rast' },
  { value: 'dawn', label: 'Morgengrauen' },
  { value: 'none', label: 'Manuell / nie' },
]

function getClassId(value: string): string {
  const key = normalizeKey(value)
  return CLASS_ALIASES[key] ?? key
}

function getSchoolLabel(value: string, language: Language): string {
  return SCHOOLS[language][normalizeKey(value)] ?? value
}

function getAllowedClasses(character: Character): string[] {
  const classId = getClassId(character.classId)
  const subclass = normalizeKey(character.subclassId)

  if (classId === 'fighter' && subclass.includes('eldritchknight')) return ['wizard']
  if (classId === 'rogue' && subclass.includes('arcanetrickster')) return ['wizard']
  return [classId]
}

function matchesSpell(
  spell: CatalogSpell,
  options: {
    search: string
    levelFilter: string
    eligibleOnly: boolean
    allowedClasses: string[]
    maxSpellLevel: number
  },
): boolean {
  const matchesSearch =
    !options.search ||
    normalizeKey(
      `${spell.name} ${spell.school} ${spell.description} ${spell.localized?.name ?? ''} ${spell.localized?.school ?? ''} ${spell.localized?.description ?? ''}`,
    ).includes(options.search)
  const matchesLevel = options.levelFilter === 'all' || spell.level === Number(options.levelFilter)
  const matchesClass =
    !options.eligibleOnly ||
    spell.classes.some((item) => options.allowedClasses.includes(getClassId(item)))
  const matchesSpellLevel =
    !options.eligibleOnly || spell.level === 0 || spell.level <= options.maxSpellLevel

  return matchesSearch && matchesLevel && matchesClass && matchesSpellLevel
}

interface SpellSourceEditorProps {
  translateText: (value: string) => string
  source: SpellSource
  sourceName: string
  usageLimit: number
  usageReset: UsageReset
  onSourceChange: (value: SpellSource) => void
  onSourceNameChange: (value: string) => void
  onUsageLimitChange: (value: number) => void
  onUsageResetChange: (value: UsageReset) => void
  onConfirm: () => void
}

function SpellSourceEditor({
  translateText: t,
  source,
  sourceName,
  usageLimit,
  usageReset,
  onSourceChange,
  onSourceNameChange,
  onUsageLimitChange,
  onUsageResetChange,
  onConfirm,
}: SpellSourceEditorProps) {
  return (
    <div className="catalog-source-editor">
      <strong>{t('Herkunft für diesen Zauber')}</strong>
      <div className="catalog-source-fields">
        <Field label={t('Herkunft')}>
          <Select value={source} onValueChange={(value) => onSourceChange(value as SpellSource)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOURCE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label={t('Quelle / Gegenstand / Notiz')}>
          <input
            value={sourceName}
            onChange={(event) => onSourceNameChange(event.target.value)}
            placeholder={t('z. B. Ring der Zauberei')}
          />
        </Field>

        <Field label={t('Nutzungen (0 = unbegrenzt)')}>
          <input
            type="number"
            min="0"
            max="1000"
            value={usageLimit}
            onChange={(event) =>
              onUsageLimitChange(Math.max(0, Math.min(1000, Number(event.target.value) || 0)))
            }
          />
        </Field>

        {usageLimit > 0 && (
          <Field label={t('Erneuerung')}>
            <Select
              value={usageReset}
              onValueChange={(value) => onUsageResetChange(value as UsageReset)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESET_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>
      <Button variant="primary" onClick={onConfirm}>
        <Plus size={14} /> {t('Zauber mit diesen Angaben übernehmen')}
      </Button>
    </div>
  )
}

export function SpellCatalog({
  character,
  knownSpells,
  onAdd,
  language = 'de',
}: {
  character: Character
  knownSpells: KnownSpell[]
  onAdd: (spell: KnownSpell) => void
  language?: Language
}) {
  const t = (value: string) => translate(language, value)
  const [query, setQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [eligibleOnly, setEligibleOnly] = useState(true)
  const [configSpellId, setConfigSpellId] = useState<string | null>(null)
  const [expandedSpellIds, setExpandedSpellIds] = useState<Set<string>>(() => new Set())
  const [source, setSource] = useState<SpellSource>('class')
  const [sourceName, setSourceName] = useState('')
  const [usageLimit, setUsageLimit] = useState(0)
  const [usageReset, setUsageReset] = useState<UsageReset>('longRest')

  const catalog = CATALOGS[character.ruleset].map((spell) => {
    if (language !== 'de' || !spell.localized) return spell
    return {
      ...spell,
      name: spell.localized.name,
      school: spell.localized.school,
      classes: spell.localized.classes,
      castingTime: spell.localized.castingTime,
      range: spell.localized.range,
      components: spell.localized.components,
      duration: spell.localized.duration,
      description: spell.localized.description ?? spell.description,
      higherLevel: spell.localized.higherLevel ?? spell.higherLevel,
    }
  })
  const spellcasting = getSpellcastingProgression(character)
  const maxSpellLevel =
    spellcasting?.kind === 'warlock'
      ? (spellcasting.pactMagic?.spellLevel ?? 0)
      : (spellcasting?.slots.length ?? 0)
  const allowedClasses = getAllowedClasses(character)

  const results = useMemo(() => {
    const search = normalizeKey(query)
    const options = { search, levelFilter, eligibleOnly, allowedClasses, maxSpellLevel }
    return catalog
      .filter((spell) => matchesSpell(spell, options))
      .sort((left, right) => left.level - right.level || left.name.localeCompare(right.name))
  }, [catalog, query, levelFilter, eligibleOnly, allowedClasses.join(','), maxSpellLevel])

  const learnedSpellIds = useMemo(
    () => new Set(knownSpells.map((spell) => spell.spellId)),
    [knownSpells],
  )

  function resetSourceEditor() {
    setConfigSpellId(null)
    setSource('class')
    setSourceName('')
    setUsageLimit(0)
    setUsageReset('longRest')
  }

  function addSpell(spell: CatalogSpell) {
    const components = spell.material ? `${spell.components} (${spell.material})` : spell.components

    onAdd({
      spellId: spell.id,
      learnedAtLevel: character.level,
      prepared: false,
      name: spell.name,
      spellLevel: spell.level,
      school: getSchoolLabel(spell.school, language),
      castingTime: spell.castingTime,
      range: spell.range,
      components,
      duration: spell.duration,
      concentration: spell.concentration,
      ritual: spell.ritual,
      description: spell.description,
      higherLevel: spell.higherLevel,
      damage: spell.damage,
      source,
      sourceName: sourceName.trim() || undefined,
      ...(usageLimit > 0 ? { usageLimit, usageRemaining: usageLimit, usageReset } : {}),
    })

    resetSourceEditor()
  }

  function toggleEditor(spellId: string) {
    if (configSpellId === spellId) {
      setConfigSpellId(null)
      setExpandedSpellIds((current) => {
        const next = new Set(current)
        next.delete(spellId)
        return next
      })
      return
    }

    setConfigSpellId(spellId)
    setExpandedSpellIds((current) => new Set(current).add(spellId))
  }

  function toggleExpanded(spellId: string, isOpen: boolean) {
    setExpandedSpellIds((current) => {
      const next = new Set(current)
      if (isOpen) next.add(spellId)
      else next.delete(spellId)
      return next
    })
    if (!isOpen && configSpellId === spellId) setConfigSpellId(null)
  }

  return (
    <section className="panel spell-catalog">
      <PanelHeader
        title={t('SRD-Zauberkatalog')}
        description={t('Offizielle SRD-Zauber passend zu deinem Regelwerk.')}
        meta={`${catalog.length} ZAUBER`}
      />

      <div className="catalog-filters">
        <SearchField
          className="catalog-search"
          icon={<Search size={16} />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('Zauber suchen …')}
          aria-label={t('Zauber suchen …')}
        />

        <Field label={t('Zaubergrad')}>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('Alle Grade')}</SelectItem>
              {Array.from({ length: 10 }, (_, index) => (
                <SelectItem key={index} value={String(index)}>
                  {index === 0 ? t('Zaubertricks') : `${t('Grad ')}${index}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <label className="catalog-eligible">
          <input
            type="checkbox"
            checked={eligibleOnly}
            onChange={(event) => setEligibleOnly(event.target.checked)}
          />
          {t('Nur für meine Klasse und Stufe')}
        </label>
      </div>

      <div className="catalog-count">
        {results.length} {t('Treffer')} ·{' '}
        {character.ruleset === '2014' ? 'SRD 5.1' : 'SRD 5.2.1 (2024)'} ·{' '}
        {eligibleOnly ? t('Klassen-/Gradfilter aktiv') : t('vollständiger Katalog')}
      </div>
      <div className="spellcasting-explainer">
        <strong>{t('Zauberwirker-Typ')}: </strong>
        {spellcasting
          ? t(
              (
                {
                  full: 'Vollzauberwirker',
                  half: 'Halbzauberwirker',
                  third: 'Drittelzauberwirker',
                  warlock: 'Paktmagie (Hexenmeister)',
                } as Record<string, string>
              )[spellcasting.kind],
            )
          : t('Keine automatische Zauberprogression')}
        <p>
          {t(
            (
              {
                full: 'Vollzauberwirker verwenden ihre gesamte Klassenstufe für Zauberplätze: Barde, Kleriker, Druide, Zauberer und Magier.',
                half: 'Halbzauberwirker erhalten Zauberplätze auf Basis der halben Klassenstufe, aufgerundet: Paladin und Waldläufer.',
                third:
                  'Drittelzauberwirker erhalten ab Unterklassenstufe 3 Zauberplätze auf Basis eines Drittels ihrer Klassenstufe, abgerundet: Arkaner Ritter und Arkaner Gauner.',
                warlock:
                  'Hexenmeister verwenden eigene Paktmagie-Zauberplätze statt der normalen Klassen-Tabelle.',
              } as Record<string, string>
            )[spellcasting?.kind ?? ''] ??
              'Für diese Klasse sind keine automatischen Zauberplätze hinterlegt.',
          )}
        </p>
        {spellcasting?.kind === 'half' && (
          <p>
            {character.ruleset === '2014'
              ? t(
                  'Im Regelwerk 2014 beginnt die Zauberprogression für Paladine und Waldläufer ab Stufe 2.',
                )
              : t(
                  'Im Regelwerk 2024 beginnt die Zauberprogression für Paladine und Waldläufer bereits ab Stufe 1.',
                )}
          </p>
        )}
      </div>

      <div className="catalog-results">
        {results.slice(0, 100).map((spell) => {
          const added = learnedSpellIds.has(spell.id)
          const editorOpen = configSpellId === spell.id

          return (
            <details
              className="catalog-spell"
              key={spell.id}
              open={expandedSpellIds.has(spell.id)}
              onToggle={(event) => toggleExpanded(spell.id, event.currentTarget.open)}
            >
              <summary>
                <span className="catalog-spell-level">
                  {spell.level === 0 ? t('ZAUBERTRICK') : `${t('GRAD ')}${spell.level}`}
                </span>
                <span className="catalog-spell-name">
                  <strong>{spell.name}</strong>
                  <small>
                    {getSchoolLabel(spell.school, language)} · {spell.castingTime} · {spell.range}
                  </small>
                </span>
                <span className="catalog-spell-action">
                  {added ? (
                    <span className="already-added">
                      <Check size={14} /> {t('Im Buch')}
                    </span>
                  ) : (
                    <Button
                      onClick={(event) => {
                        event.preventDefault()
                        toggleEditor(spell.id)
                      }}
                      aria-expanded={editorOpen}
                    >
                      <Plus size={14} /> {t('Hinzufügen')}
                    </Button>
                  )}
                </span>
              </summary>

              <div className="catalog-spell-detail">
                <div>
                  {spell.components}
                  {spell.material ? ` (${spell.material})` : ''} · {spell.duration}
                  {spell.concentration ? ' · Konzentration' : ''}
                  {spell.ritual ? ' · Ritual' : ''}
                </div>
                {spell.damage && spell.damage.length > 0 && (
                  <div className="spell-damage-summary">
                    <strong>{spell.damage.map((part) => part.dice).join(' + ')}</strong>
                    <span>
                      Ø {spell.damage.reduce((sum, part) => sum + part.average, 0).toLocaleString('de-DE', { maximumFractionDigits: 1 })} {t('Schaden')}
                    </span>
                    {spell.damage.some((part) => part.type) && (
                      <small>{[...new Set(spell.damage.map((part) => part.type).filter(Boolean))].join(', ')}</small>
                    )}
                  </div>
                )}
                <p>{spell.description}</p>
                {spell.higherLevel && (
                  <p>
                    <strong>{t('Auf höheren Graden:')}</strong> {spell.higherLevel}
                  </p>
                )}
                <small>
                  {t('Klassen:')} {spell.classes.join(', ')}
                </small>

                {!added && editorOpen && (
                  <SpellSourceEditor
                    translateText={t}
                    source={source}
                    sourceName={sourceName}
                    usageLimit={usageLimit}
                    usageReset={usageReset}
                    onSourceChange={setSource}
                    onSourceNameChange={setSourceName}
                    onUsageLimitChange={setUsageLimit}
                    onUsageResetChange={setUsageReset}
                    onConfirm={() => addSpell(spell)}
                  />
                )}
              </div>
            </details>
          )
        })}

        {results.length === 0 && (
          <p className="muted-paragraph">
            {t(
              'Keine passenden Zauber gefunden. Prüfe den Klassenfilter oder passe deine Suche an.',
            )}
          </p>
        )}
        {results.length > 100 && (
          <p className="muted-paragraph">
            Es werden die ersten 100 Treffer angezeigt. Verfeinere deine Suche für weitere
            Ergebnisse.
          </p>
        )}
      </div>

      <p className="catalog-attribution">
        <BookOpen size={13} /> SRD 5.1 / SRD 5.2 von Wizards of the Coast LLC, CC BY 4.0.{' '}
        <a
          href="https://github.com/BlueLemon1/adventura/blob/main/src/data/ATTRIBUTION.md"
          target="_blank"
          rel="noreferrer"
        >
          {t('Quellen & Lizenz')}
        </a>
      </p>
    </section>
  )
}
