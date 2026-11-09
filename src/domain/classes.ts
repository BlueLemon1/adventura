import additionalClasses from '../data/classes-additional.json'
import type { Dnd5eRuleset } from './rules'

export interface ClassOption {
  value: string
  label: string
  source?: string
}

interface AdditionalClassRecord {
  id: string
  type: 'class' | 'subclass'
  classId: string
  subclassId?: string
  names: Partial<Record<Dnd5eRuleset, Partial<Record<'de' | 'en', string>>>>
  sources: Partial<Record<Dnd5eRuleset, string>>
  rulesets: Partial<Record<Dnd5eRuleset, true | 'legacy' | string>>
}

const ADDITIONAL_CLASSES = additionalClasses as AdditionalClassRecord[]

function isAvailable(record: AdditionalClassRecord, ruleset: Dnd5eRuleset): boolean {
  const availability = record.rulesets[ruleset]
  return availability === true || availability === 'legacy'
}

export function getClassOptions(ruleset: Dnd5eRuleset): ClassOption[] {
  const additional = ADDITIONAL_CLASSES.filter(
    (record) => record.type === 'class' && isAvailable(record, ruleset),
  ).map((record) => ({
    value: record.classId,
    label: record.names[ruleset]?.de ?? record.names[ruleset]?.en ?? record.classId,
    source: record.sources[ruleset],
  }))

  return [...additional, { value: 'other', label: 'Andere / eigene Klasse' }]
}

export const CLASS_OPTIONS = getClassOptions('2024')

export function getSubclassOptions(classId: string, ruleset: Dnd5eRuleset): ClassOption[] {
  return ADDITIONAL_CLASSES.filter(
    (record) => record.type === 'subclass' && record.classId === classId && isAvailable(record, ruleset),
  )
    .map((record) => ({
      value: record.subclassId ?? record.id,
      label: record.names[ruleset]?.de ?? record.names[ruleset]?.en ?? record.subclassId ?? record.id,
      source: record.sources[ruleset] ?? record.sources['2014'],
    }))
    .sort((left, right) => left.label.localeCompare(right.label, 'de'))
}

export function getClassLabel(classId: string): string {
  return getClassOptions('2024').find((item) => item.value === classId)?.label ?? classId
}
