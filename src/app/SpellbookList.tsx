import { useMemo, useState } from 'react'
import { BookOpen, Check, Clock3, RotateCcw, Search, Sparkles, Trash2 } from 'lucide-react'
import type { Character, KnownSpell } from '../domain/character'
import { getSpellCapacity } from '../domain/spellLimits'
import { normalizeKey } from '../domain/text'
import { IconButton } from '../components/ui/button'
import { SearchField } from '../components/ui/field'
import { PanelHeader } from '../components/ui/panel-header'
import { translate, useLanguage } from './i18n'

type SpellFilter = 'all' | 'prepared' | 'unprepared' | 'features'

interface SpellbookListProps {
  spells: KnownSpell[]
  character: Character
  onTogglePrepared: (id: string, value: boolean) => void
  onRemove: (id: string) => void
  onUse: (id: string) => void
  onReset: (id: string) => void
}

const SOURCE_LABELS: Record<NonNullable<KnownSpell['source']>, string> = {
  class: 'Klasse',
  story: 'Story',
  item: 'Gegenstand',
  feat: 'Talent',
  other: 'Sonstiges',
}

const RESET_LABELS: Record<NonNullable<KnownSpell['usageReset']>, string> = {
  shortRest: 'kurze Rast',
  longRest: 'lange Rast',
  dawn: 'Morgengrauen',
  none: 'manuell',
  shortOneOrLong: 'kurze Rast (+1) / lange Rast (alle)',
  shortOrLong: 'kurze oder lange Rast',
}

const FILTER_LABELS: Record<SpellFilter, string> = {
  all: 'Alle Zauber',
  prepared: 'Vorbereitet',
  unprepared: 'Nicht vorbereitet',
  features: 'Merkmalszauber',
}

function isPrepared(spell: KnownSpell): boolean {
  return spell.entryType !== 'feature' && (spell.prepared || spell.alwaysPrepared === true)
}

function matchesFilter(spell: KnownSpell, filter: SpellFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'features') return spell.entryType === 'feature'
  if (spell.entryType === 'feature') return false
  return filter === 'prepared' ? isPrepared(spell) : !isPrepared(spell)
}

function sortSpells(left: KnownSpell, right: KnownSpell): number {
  return (
    (left.spellLevel ?? 0) - (right.spellLevel ?? 0) ||
    (left.name ?? left.spellId).localeCompare(right.name ?? right.spellId)
  )
}

function getSpellSearchText(spell: KnownSpell): string {
  return normalizeKey(
    [spell.name, spell.school, spell.description, spell.notes, spell.sourceName]
      .filter(Boolean)
      .join(' '),
  )
}

function SpellCapacitySummary({
  character,
  spells,
  translateText,
}: {
  character: Character
  spells: KnownSpell[]
  translateText: (value: string) => string
}) {
  const actualSpells = spells.filter((spell) => spell.entryType !== 'feature')
  const capacity = getSpellCapacity(character, actualSpells)
  const description =
    capacity.mode === 'known'
      ? 'Bekannte Klassenzauber'
      : capacity.mode === 'prepared'
        ? 'Vorbereitete Klassenzauber'
        : 'Regelgrenze noch offen'

  return (
    <>
      <div className="class-spell-capacity">
        <div>
          <span>{translateText(capacity.label)}</span>
          <strong>
            {capacity.current}
            {capacity.maximum !== undefined ? ` / ${capacity.maximum}` : ''}
          </strong>
          <small>{translateText(description)}</small>
        </div>
        <p>{translateText(capacity.note)}</p>
      </div>
      <p className="spell-capacity-note">
        {translateText(
          'Zauber im Buch und Zauberplätze sind getrennt: Zauberplätze geben an, wie oft du Zauber des jeweiligen Grades wirken kannst. Zusätzliche Story- und Gegenstandszauber zählen nicht als Klassenfortschritt.',
        )}
      </p>
    </>
  )
}

function SpellCard({
  spell,
  translateText,
  onTogglePrepared,
  onRemove,
  onUse,
  onReset,
}: {
  spell: KnownSpell
  translateText: (value: string) => string
  onTogglePrepared: SpellbookListProps['onTogglePrepared']
  onRemove: SpellbookListProps['onRemove']
  onUse: SpellbookListProps['onUse']
  onReset: SpellbookListProps['onReset']
}) {
  const isFeature = spell.entryType === 'feature'
  const level = spell.spellLevel ?? 0
  const name = spell.name ?? spell.spellId
  const hasLimitedUses = (spell.usageLimit ?? 0) > 0
  const remainingUses = spell.usageRemaining ?? spell.usageLimit ?? 0
  const source = spell.source ?? 'class'

  return (
    <article className="spellbook-card">
      <div className="spellbook-card-top">
        <div className="spellbook-card-title">
          <span className="spell-level">
            {isFeature
              ? translateText('MERKMALSZAUBER')
              : level === 0
                ? translateText('ZAUBERTRICK')
                : `${translateText('GRAD')} ${level}`}
          </span>
          <h3>{name}</h3>
        </div>
        <div className="spellbook-card-actions">
          <span className={`spell-source source-${source}`}>
            {translateText(
              isFeature ? (spell.sourceName ?? 'Klassenmerkmal') : SOURCE_LABELS[source],
            )}
          </span>
          {!isFeature && spell.alwaysPrepared && (
            <span className="always-prepared">
              <Check size={12} />
              {translateText('Immer vorbereitet')}
            </span>
          )}
          {!isFeature && (
            <IconButton
              className="delete-button"
              label={`${translateText('Zauber entfernen')}: ${name}`}
              onClick={() => onRemove(spell.spellId)}
            >
              <Trash2 size={14} />
            </IconButton>
          )}
        </div>
      </div>

      {spell.sourceName && !isFeature && (
        <p className="spell-origin-note">
          {translateText('Quelle')}: {spell.sourceName}
        </p>
      )}

      {isFeature && spell.notes && (
        <p className="spell-origin-note">
          {translateText('Ermöglicht durch')}: {spell.notes}
        </p>
      )}

      {spell.damage && spell.damage.length > 0 && (
        <div className="spell-damage-summary">
          <strong>{spell.damage.map((part) => part.dice).join(' + ')}</strong>
          <span>
            Ø{' '}
            {spell.damage
              .reduce((sum, part) => sum + part.average, 0)
              .toLocaleString('de-DE', { maximumFractionDigits: 1 })}{' '}
            {translateText('Schaden')}
          </span>
          {spell.damage.some((part) => part.type) && (
            <small>
              {[...new Set(spell.damage.map((part) => part.type).filter(Boolean))].join(', ')}
            </small>
          )}
        </div>
      )}
      <div className="spellbook-meta">
        {[spell.school, spell.castingTime, spell.range, spell.components, spell.duration]
          .filter(Boolean)
          .map((value) => (
            <span key={value}>{value}</span>
          ))}
        {spell.concentration && <span>{translateText('Konzentration')}</span>}
        {spell.ritual && <span>{translateText('Ritual')}</span>}
      </div>

      {spell.description && (
        <details className="spellbook-details" open={isFeature}>
          <summary>
            {translateText('Zauberbeschreibung')}
          </summary>
          <p>{spell.description}</p>
          {spell.higherLevel && (
            <p>
              <strong>{translateText('Auf höheren Graden:')}</strong> {spell.higherLevel}
            </p>
          )}
        </details>
      )}

      <div className="spellbook-card-footer">
        <small>
          {translateText(isFeature ? 'Freigeschaltet auf Stufe' : 'Gelernt auf Stufe')}{' '}
          {spell.learnedAtLevel}
        </small>
        <div className="spell-card-controls">
          {isFeature ? (
            spell.resourceId && hasLimitedUses ? (
              <span className="spell-uses">
                <Clock3 size={12} /> {remainingUses}/{spell.usageLimit} ·{' '}
                {translateText(RESET_LABELS[spell.usageReset ?? 'longRest'])}
              </span>
            ) : (
              <span className="spell-uses">{translateText('Keine begrenzten Nutzungen')}</span>
            )
          ) : hasLimitedUses ? (
            <span className="spell-uses">
              <Clock3 size={12} />
              {remainingUses}/{spell.usageLimit} ·{' '}
              {translateText(RESET_LABELS[spell.usageReset ?? 'longRest'])}
            </span>
          ) : (
            <label className="prepared-toggle">
              <input
                type="checkbox"
                checked={isPrepared(spell)}
                disabled={spell.alwaysPrepared === true}
                onChange={(event) => onTogglePrepared(spell.spellId, event.target.checked)}
              />
              {translateText('Vorbereitet')}
            </label>
          )}

          {hasLimitedUses && (
            <>
              <button
                className="spell-use-button"
                type="button"
                disabled={remainingUses < (isFeature ? (spell.resourceCost ?? 1) : 1)}
                onClick={() => onUse(spell.spellId)}
              >
                {translateText(isFeature ? 'Aktivieren' : 'Nutzen')}
              </button>
              {!isFeature && (
                <IconButton
                  label={translateText('Nutzungen zurücksetzen')}
                  onClick={() => onReset(spell.spellId)}
                >
                  <RotateCcw size={13} />
                </IconButton>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export function SpellbookList({
  spells,
  character,
  onTogglePrepared,
  onRemove,
  onUse,
  onReset,
}: SpellbookListProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<SpellFilter>('all')

  const visibleSpells = useMemo(() => {
    const search = normalizeKey(query)
    return spells
      .filter((spell) => {
        const matchesSearch = !search || getSpellSearchText(spell).includes(search)
        return matchesSearch && matchesFilter(spell, filter)
      })
      .sort(sortSpells)
  }, [spells, query, filter])

  const spellGroups = useMemo(() => {
    const groups = new Map<number, KnownSpell[]>()
    for (const spell of visibleSpells) {
      const level = spell.spellLevel ?? 0
      groups.set(level, [...(groups.get(level) ?? []), spell])
    }
    return [...groups.entries()]
  }, [visibleSpells])

  const actualSpells = spells.filter((spell) => spell.entryType !== 'feature')
  const preparedCount = actualSpells.filter(isPrepared).length

  return (
    <section className="panel spellbook-panel">
      <PanelHeader
        className="spellbook-heading"
        title={t('Zauber & Merkmalszauber')}
        description={`${actualSpells.length} ${t('Zauber im Buch')} · ${preparedCount} ${t('vorbereitet')} · ${spells.length - actualSpells.length} ${t('Merkmalszauber')}`}
        meta={
          <span className="spellbook-count">
            <BookOpen size={14} />
            {actualSpells.length}
          </span>
        }
      />

      <SpellCapacitySummary character={character} spells={spells} translateText={t} />

      <div className="spellbook-toolbar">
        <SearchField
          className="spellbook-search"
          icon={<Search size={15} />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('Suche Zauber in deinem Buch …')}
          aria-label={t('Suche Zauber in deinem Buch …')}
        />
        <div className="spellbook-filters" role="group" aria-label={t('Zauber filtern')}>
          {(Object.keys(FILTER_LABELS) as SpellFilter[]).map((value) => (
            <button
              type="button"
              key={value}
              className={filter === value ? 'active' : ''}
              onClick={() => setFilter(value)}
            >
              {t(FILTER_LABELS[value])}
            </button>
          ))}
        </div>
      </div>

      {visibleSpells.length === 0 ? (
        <div className="spellbook-empty">
          <Sparkles size={22} />
          <p>
            {t(
              spells.length === 0
                ? 'Deine Zauber sind noch leer.'
                : 'Keine Zauber entsprechen diesem Filter.',
            )}
          </p>
        </div>
      ) : (
        <div className="spellbook-groups">
          {spellGroups.map(([level, group]) => (
            <section className="spellbook-level-group" key={level}>
              <div className="spellbook-level-heading">
                <span>
                  {level < 0
                    ? t('Aktive Klassen- und Unterklassenmerkmale')
                    : level === 0
                      ? t('Zaubertricks')
                      : `${t('Grad')} ${level}`}
                </span>
                <small>
                  {group.length} {level < 0 ? t('Merkmale') : t('Zauber')}
                </small>
              </div>
              <div className="spellbook-cards">
                {group.map((spell) => (
                  <SpellCard
                    key={spell.spellId}
                    spell={spell}
                    translateText={t}
                    onTogglePrepared={onTogglePrepared}
                    onRemove={onRemove}
                    onUse={onUse}
                    onReset={onReset}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
