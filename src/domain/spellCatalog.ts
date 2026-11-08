import type { Character } from './character'
import type { Dnd5eRuleset } from './rules'
import spells2014 from '../data/spells-2014.json'
import spells2024 from '../data/spells-2024.json'
import additionalSpells from '../data/spells-additional.json'

export interface CatalogSpell {
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
  rulesets?: Dnd5eRuleset[]
  sourcePage?: number
  previousSource?: string
  subclassRestriction?: 'chronurgy' | 'graviturgy' | 'both'
  rulesetClasses?: Partial<Record<Dnd5eRuleset, string[]>>
  availabilityNote?: string
  descriptionKind?: 'official' | 'original-summary'
}

const supplementalSpells = additionalSpells as CatalogSpell[]

/** One canonical catalogue builder shared by selection and spellbook localization. */
export function getSpellCatalog(ruleset: Character['ruleset']): CatalogSpell[] {
  const base = (ruleset === '2014' ? spells2014 : spells2024) as CatalogSpell[]
  const supplements = supplementalSpells
    .filter((spell) => spell.rulesets?.includes(ruleset))
    .map((spell) => ({
      ...spell,
      classes: spell.rulesetClasses?.[ruleset] ?? spell.classes,
    }))
  return [...base, ...supplements]
}
