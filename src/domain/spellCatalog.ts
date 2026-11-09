import type { Dnd5eRuleset } from './rules'
import { CONTENT_SOURCES } from './contentSources'
import spells2014 from '../data/spells-2014.json'
import spells2024 from '../data/spells-2024.json'
import additionalSpells from '../data/spells-additional.json'

export interface CatalogSpell {
  id: string
  name: string
  englishName?: string
  level: number
  school: string
  castingTime: string
  range: string
  components: string
  material?: string
  duration: string
  concentration: boolean
  ritual: boolean
  classes: string[]
  description: string
  higherLevel?: string
  higherLevelLabel?: string
  localized?: {
    name?: string
    school?: string
    classes?: string[]
    castingTime?: string
    range?: string
    components?: string
    duration?: string
    description?: string
    higherLevel?: string
    higherLevelLabel?: string
    availabilityNote?: string
  }
  damage?: Array<{ dice: string; average: number; type?: string }>
  contentSourceId: string
  rulesets?: Partial<Record<Dnd5eRuleset, boolean | string>>
  sourcePage?: number
  previousSource?: string
  subclassRestriction?: 'chronurgy' | 'graviturgy' | 'both'
  rulesetClasses?: Partial<Record<Dnd5eRuleset, string[]>>
  availabilityNote?: string
  descriptionKind?: 'official' | 'original-summary'
  /** 2014 spell retained for use with the 2024 rules because it has no 2024 revision. */
  legacy?: boolean
}

const supplementalSpells = additionalSpells as CatalogSpell[]
const sourceRulesets = new Map<string, Dnd5eRuleset>(
  Object.values(CONTENT_SOURCES).map((source) => [source.id, source.ruleset]),
)

const spellCatalogCache = new Map<Dnd5eRuleset, CatalogSpell[]>()

function normalizeSpellName(spell: CatalogSpell): string {
  return (spell.englishName ?? spell.name)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

/**
 * Keep the first occurrence of a spell. The SRD array is deliberately passed
 * first, so an SRD record always wins over an identically named supplement.
 */
function mergeSpellRecords(base: CatalogSpell[], supplements: CatalogSpell[]): CatalogSpell[] {
  const seen = new Set<string>()
  return [...base, ...supplements].filter((spell) => {
    const key = normalizeSpellName(spell)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** One canonical catalogue builder shared by selection and spellbook localization. */
export function getSpellCatalog(ruleset: Dnd5eRuleset): CatalogSpell[] {
  const cached = spellCatalogCache.get(ruleset)
  if (cached) return cached

  const base = (ruleset === '2014' ? spells2014 : spells2024) as CatalogSpell[]
  const supplements = supplementalSpells
    .filter((spell) => spell.rulesets?.[ruleset] === true)
    .map((spell) => ({
      ...spell,
      classes: spell.rulesetClasses?.[ruleset] ?? spell.classes,
    }))
  // Legacy supplements are selectable in 2024, but remain explicitly marked.
  const legacySpells =
    ruleset === '2024'
      ? supplementalSpells
          .filter((spell) => spell.rulesets?.['2024'] === 'legacy')
          .map((spell) => ({
            ...spell,
            classes: spell.rulesetClasses?.['2014'] ?? spell.classes,
            legacy: true,
          }))
      : []
  const catalog = mergeSpellRecords(base, [...supplements, ...legacySpells])
  spellCatalogCache.set(ruleset, catalog)
  return catalog
}

/**
 * Resolve older saved IDs that now point to a lower-priority duplicate to the
 * canonical SRD (or first supplemental) catalogue record without rewriting
 * the character's stored data.
 */
export function findCatalogSpell(
  spellId: string | undefined,
  ruleset: Dnd5eRuleset,
): CatalogSpell | undefined {
  if (!spellId) return undefined
  const catalog = getSpellCatalog(ruleset)
  const directMatch = catalog.find((spell) => spell.id === spellId)
  if (directMatch) return directMatch

  const original =
    supplementalSpells.find((spell) => spell.id === spellId) ??
    (ruleset === '2024' ? getSpellCatalog('2014').find((spell) => spell.id === spellId) : undefined)
  if (!original) return undefined
  const sourceRuleset = sourceRulesets.get(original.contentSourceId)
  const belongsToRuleset =
    original.rulesets?.[ruleset] === true ||
    original.rulesets?.[ruleset] === 'legacy' ||
    sourceRuleset === ruleset
  if (!belongsToRuleset) return undefined

  if (ruleset === '2024') {
    const replacement = original.rulesets?.['2024']
    if (typeof replacement === 'string' && replacement !== 'legacy') {
      return catalog.find((spell) => spell.id === replacement)
    }
    // The two renamed 2014 SRD spells cannot carry metadata because SRD files
    // are kept verbatim; retain only these ID migrations here.
    const srdReplacements: Record<string, string> = {
      'srd-2014-branding-smite': 'srd-2024-shining-smite',
      'srd-2014-feeblemind': 'srd-2024-befuddlement',
    }
    const srdReplacement = srdReplacements[original.id]
    if (srdReplacement) return catalog.find((spell) => spell.id === srdReplacement)
    if (sourceRuleset === '2014' && original.rulesets?.['2024'] !== 'legacy') {
      return undefined
    }
  }

  const key = normalizeSpellName(original)
  return catalog.find((spell) => normalizeSpellName(spell) === key)
}
