import type { Dnd5eRuleset } from './rules'

export interface ClassOption {
  value: string
  label: string
  source?: string
}

const BASE_CLASSES: ClassOption[] = [
  { value: 'barbarian', label: 'Barbar' },
  { value: 'bard', label: 'Barde' },
  { value: 'cleric', label: 'Kleriker' },
  { value: 'druid', label: 'Druide' },
  { value: 'fighter', label: 'Kämpfer' },
  { value: 'monk', label: 'Mönch' },
  { value: 'paladin', label: 'Paladin' },
  { value: 'ranger', label: 'Waldläufer' },
  { value: 'rogue', label: 'Schurke' },
  { value: 'sorcerer', label: 'Zauberer' },
  { value: 'warlock', label: 'Hexenmeister' },
  { value: 'wizard', label: 'Magier' },
]

export const CLASS_OPTIONS: ClassOption[] = [
  ...BASE_CLASSES,
  { value: 'artificer', label: 'Erfinder' },
  { value: 'other', label: 'Andere / eigene Klasse' },
]

export function getClassOptions(ruleset: Dnd5eRuleset): ClassOption[] {
  const artificerSource = ruleset === '2014' ? 'ERLW / TCE' : 'EFA'
  return [
    ...BASE_CLASSES,
    { value: 'artificer', label: 'Erfinder', source: artificerSource },
    { value: 'other', label: 'Andere / eigene Klasse' },
  ]
}

const SUBCLASS_OPTIONS_BY_RULESET: Record<Dnd5eRuleset, Record<string, ClassOption[]>> = {
  '2014': {
    artificer: [
      { value: 'alchemist', label: 'Alchemist', source: 'TCE' },
      { value: 'armorer', label: 'Konstrukteur', source: 'TCE' },
      { value: 'artillerist', label: 'Artillerist', source: 'ERLW / TCE' },
      { value: 'battlesmith', label: 'Kampf-Schmied', source: 'ERLW / TCE' },
    ],
    barbarian: [
      { value: 'berserker', label: 'Pfad des Berserkers', source: 'PHB / SRD' },
      { value: 'totemwarrior', label: 'Pfad des Totemkriegers', source: 'PHB / SCAG' },
      { value: 'ancestralguardian', label: 'Pfad des Ahnenwächters', source: 'XGE' },
      { value: 'stormherald', label: 'Pfad des Sturmherolds', source: 'XGE' },
      { value: 'zealot', label: 'Pfad des Zeloten', source: 'XGE' },
      { value: 'giant', label: 'Pfad des Riesen', source: 'BPGG' },
      { value: 'beast', label: 'Pfad der Bestie', source: 'TCE' },
      { value: 'wildmagic', label: 'Pfad der wilden Magie', source: 'TCE' },
      { value: 'battlerager', label: 'Pfad des Kampfwüters', source: 'SCAG' },
    ],
    bard: [
      { value: 'lore', label: 'Barde der Kunde', source: 'PHB / SRD' },
      { value: 'valor', label: 'Barde des Mutes', source: 'PHB' },
      { value: 'glamour', label: 'Barde des Glamours', source: 'XGE' },
      { value: 'swords', label: 'Barde der Schwerter', source: 'XGE' },
      { value: 'whispers', label: 'Barde des Flüsterns', source: 'XGE' },
      { value: 'eloquence', label: 'Barde der Beredsamkeit', source: 'MOoT / TCE' },
      { value: 'creation', label: 'Barde der Schöpfung', source: 'TCE' },
      { value: 'spirits', label: 'Barde der Geister', source: 'VRGtR' },
    ],
    cleric: [
      { value: 'knowledge', label: 'Domäne des Wissens', source: 'PHB' },
      { value: 'life', label: 'Domäne des Lebens', source: 'PHB / SRD' },
      { value: 'light', label: 'Domäne des Lichts', source: 'PHB' },
      { value: 'nature', label: 'Domäne der Natur', source: 'PHB' },
      { value: 'tempest', label: 'Domäne des Sturms', source: 'PHB' },
      { value: 'trickery', label: 'Domäne der List', source: 'PHB' },
      { value: 'war', label: 'Domäne des Krieges', source: 'PHB' },
      { value: 'arcana', label: 'Arkane Domäne', source: 'SCAG' },
      { value: 'forge', label: 'Schmiededomäne', source: 'XGE' },
      { value: 'grave', label: 'Domäne des Grabes', source: 'XGE' },
      { value: 'order', label: 'Domäne der Ordnung', source: 'GGR / TCE' },
      { value: 'peace', label: 'Domäne des Friedens', source: 'TCE' },
      { value: 'twilight', label: 'Domäne der Dämmerung', source: 'TCE' },
      { value: 'death', label: 'Domäne des Todes', source: 'DMG' },
    ],
    druid: [
      { value: 'land', label: 'Zirkel des Landes', source: 'PHB / SRD' },
      { value: 'moon', label: 'Zirkel des Mondes', source: 'PHB' },
      { value: 'dreams', label: 'Zirkel der Träume', source: 'XGE' },
      { value: 'shepherd', label: 'Zirkel des Hirten', source: 'XGE' },
      { value: 'spores', label: 'Zirkel der Sporen', source: 'GGR / TCE' },
      { value: 'stars', label: 'Zirkel der Sterne', source: 'TCE' },
      { value: 'wildfire', label: 'Zirkel des Wildfeuers', source: 'TCE' },
    ],
    fighter: [
      { value: 'champion', label: 'Champion', source: 'PHB / SRD' },
      { value: 'battlemaster', label: 'Kampfmeister', source: 'PHB' },
      { value: 'eldritchknight', label: 'Arkaner Ritter', source: 'PHB' },
      { value: 'purpledragonknight', label: 'Purpurdrache-Ritter', source: 'SCAG' },
      { value: 'arcanearcher', label: 'Arkaner Bogenschütze', source: 'XGE' },
      { value: 'cavalier', label: 'Kavalier', source: 'XGE' },
      { value: 'samurai', label: 'Samurai', source: 'XGE' },
      { value: 'echo_knight', label: 'Echoritter', source: 'EGW' },
      { value: 'psiwarrior', label: 'Psi-Krieger', source: 'TCE' },
      { value: 'runeknight', label: 'Runenritter', source: 'TCE' },
    ],
    monk: [
      { value: 'openhand', label: 'Weg der offenen Hand', source: 'PHB / SRD' },
      { value: 'shadow', label: 'Weg des Schattens', source: 'PHB' },
      { value: 'four_elements', label: 'Weg der vier Elemente', source: 'PHB' },
      { value: 'longdeath', label: 'Weg des langen Todes', source: 'SCAG' },
      { value: 'sun_soul', label: 'Weg der Sonnenseele', source: 'SCAG' },
      { value: 'drunkenmaster', label: 'Weg des betrunkenen Meisters', source: 'XGE' },
      { value: 'kensei', label: 'Weg des Kensei', source: 'XGE' },
      { value: 'mercy', label: 'Weg der Barmherzigkeit', source: 'TCE' },
      { value: 'astral_self', label: 'Weg des Astralkörpers', source: 'TCE' },
      { value: 'ascendant_dragon', label: 'Weg des aufsteigenden Drachen', source: 'FTD' },
    ],
    paladin: [
      { value: 'devotion', label: 'Schwur der Hingabe', source: 'PHB / SRD' },
      { value: 'ancients', label: 'Schwur der Uralten', source: 'PHB' },
      { value: 'vengeance', label: 'Schwur der Vergeltung', source: 'PHB' },
      { value: 'crown', label: 'Schwur der Krone', source: 'SCAG' },
      { value: 'conquest', label: 'Schwur der Eroberung', source: 'XGE' },
      { value: 'redemption', label: 'Schwur der Erlösung', source: 'XGE' },
      { value: 'glory', label: 'Schwur des Ruhms', source: 'MOoT / TCE' },
      { value: 'watchers', label: 'Schwur der Wächter', source: 'TCE' },
      { value: 'oathbreaker', label: 'Schwurbrecher', source: 'DMG' },
    ],
    ranger: [
      { value: 'hunter', label: 'Jäger', source: 'PHB / SRD' },
      { value: 'beastmaster', label: 'Tiermeister', source: 'PHB' },
      { value: 'gloomstalker', label: 'Schreckenjäger', source: 'XGE' },
      { value: 'horizonwalker', label: 'Horizontläufer', source: 'XGE' },
      { value: 'monster_slayer', label: 'Monsterjäger', source: 'XGE' },
      { value: 'feywanderer', label: 'Feenwanderer', source: 'TCE' },
      { value: 'swarmkeeper', label: 'Schwarmhüter', source: 'TCE' },
      { value: 'drakewarden', label: 'Drachenhüter', source: 'FTD' },
    ],
    rogue: [
      { value: 'thief', label: 'Dieb', source: 'PHB / SRD' },
      { value: 'assassin', label: 'Assassine', source: 'PHB' },
      { value: 'arcanetrickster', label: 'Arkaner Gauner', source: 'PHB' },
      { value: 'inquisitive', label: 'Inquisitiv', source: 'XGE' },
      { value: 'mastermind', label: 'Strippenzieher', source: 'XGE' },
      { value: 'scout', label: 'Späher', source: 'XGE' },
      { value: 'swashbuckler', label: 'Haudegen', source: 'XGE' },
      { value: 'phantom', label: 'Phantom', source: 'TCE' },
      { value: 'soulknife', label: 'Seelenmesser', source: 'TCE' },
    ],
    sorcerer: [
      { value: 'draconic', label: 'Drakonische Abstammung', source: 'PHB / SRD' },
      { value: 'wildmagic', label: 'Wilde Magie', source: 'PHB' },
      { value: 'storm', label: 'Sturmmagie', source: 'SCAG / XGE' },
      { value: 'aberrantmind', label: 'Aberrantes Gemüt', source: 'TCE' },
      { value: 'clockwork', label: 'Uhrwerkseele', source: 'TCE' },
      { value: 'lunar', label: 'Mondmagie', source: 'DSotDQ' },
      { value: 'shadowmagic', label: 'Schattenmagie', source: 'XGE' },
    ],
    warlock: [
      { value: 'archfey', label: 'Feenwesen', source: 'PHB' },
      { value: 'celestial', label: 'Himmlischer', source: 'XGE' },
      { value: 'fiend', label: 'Unhold', source: 'PHB / SRD' },
      { value: 'greatoldone', label: 'Großer Alter', source: 'PHB' },
      { value: 'hexblade', label: 'Hexenklinge', source: 'XGE' },
      { value: 'undead', label: 'Untoter', source: 'VRGtR' },
      { value: 'undying', label: 'Unsterblicher', source: 'SCAG' },
      { value: 'fathomless', label: 'Tiefsee', source: 'TCE' },
      { value: 'genie', label: 'Dschinn', source: 'TCE' },
    ],
    wizard: [
      { value: 'abjuration', label: 'Bannmagie', source: 'PHB' },
      { value: 'conjuration', label: 'Beschwörung', source: 'PHB' },
      { value: 'divination', label: 'Erkenntnismagie', source: 'PHB' },
      { value: 'enchantment', label: 'Verzauberung', source: 'PHB' },
      { value: 'evocation', label: 'Hervorrufung', source: 'PHB / SRD' },
      { value: 'illusion', label: 'Illusion', source: 'PHB' },
      { value: 'necromancy', label: 'Nekromantie', source: 'PHB' },
      { value: 'transmutation', label: 'Verwandlung', source: 'PHB' },
      { value: 'bladesinging', label: 'Klingengesang', source: 'SCAG' },
      { value: 'chronurgy', label: 'Chronurgie', source: 'EGW' },
      { value: 'graviturgy', label: 'Graviturgy', source: 'EGW' },
      { value: 'scribes', label: 'Ordnung der Schreiber', source: 'TCE' },
      { value: 'war', label: 'Kampfmagie', source: 'XGE' },
    ],
  },
  '2024': {
    artificer: [
      { value: 'alchemist', label: 'Alchemist', source: 'EFA' },
      { value: 'armorer', label: 'Konstrukteur', source: 'EFA' },
      { value: 'artillerist', label: 'Artillerist', source: 'EFA' },
      { value: 'battlesmith', label: 'Kampf-Schmied', source: 'EFA' },
      { value: 'cartographer', label: 'Kartograph', source: 'EFA' },
    ],
    barbarian: [
      { value: 'berserker', label: 'Pfad des Berserkers', source: 'PHB' },
      { value: 'wildheart', label: 'Pfad des wilden Herzens', source: 'PHB' },
      { value: 'worldtree', label: 'Pfad des Weltenbaums', source: 'PHB' },
      { value: 'zealot', label: 'Pfad des Zeloten', source: 'PHB' },
    ],
    bard: [
      { value: 'dance', label: 'Bardenkollegium des Tanzes', source: 'PHB' },
      { value: 'glamour', label: 'Bardenkollegium des Glamours', source: 'PHB' },
      { value: 'lore', label: 'Bardenkollegium der Kunde', source: 'PHB / SRD' },
      { value: 'valor', label: 'Bardenkollegium des Mutes', source: 'PHB' },
    ],
    cleric: [
      { value: 'life', label: 'Domäne des Lebens', source: 'PHB / SRD' },
      { value: 'light', label: 'Domäne des Lichts', source: 'PHB' },
      { value: 'trickery', label: 'Domäne der List', source: 'PHB' },
      { value: 'war', label: 'Domäne des Krieges', source: 'PHB' },
    ],
    druid: [
      { value: 'land', label: 'Zirkel des Landes', source: 'PHB / SRD' },
      { value: 'moon', label: 'Zirkel des Mondes', source: 'PHB' },
      { value: 'sea', label: 'Zirkel der See', source: 'PHB' },
      { value: 'stars', label: 'Zirkel der Sterne', source: 'PHB' },
    ],
    fighter: [
      { value: 'battlemaster', label: 'Kampfmeister', source: 'PHB' },
      { value: 'champion', label: 'Champion', source: 'PHB / SRD' },
      { value: 'eldritchknight', label: 'Arkaner Ritter', source: 'PHB' },
      { value: 'psiwarrior', label: 'Psi-Krieger', source: 'PHB' },
    ],
    monk: [
      { value: 'mercy', label: 'Krieger der Barmherzigkeit', source: 'PHB' },
      { value: 'shadow', label: 'Krieger des Schattens', source: 'PHB' },
      { value: 'elements', label: 'Krieger der Elemente', source: 'PHB' },
      { value: 'openhand', label: 'Krieger der offenen Hand', source: 'PHB / SRD' },
    ],
    paladin: [
      { value: 'devotion', label: 'Schwur der Hingabe', source: 'PHB / SRD' },
      { value: 'glory', label: 'Schwur des Ruhms', source: 'PHB' },
      { value: 'ancients', label: 'Schwur der Uralten', source: 'PHB' },
      { value: 'vengeance', label: 'Schwur der Vergeltung', source: 'PHB' },
    ],
    ranger: [
      { value: 'beastmaster', label: 'Tiermeister', source: 'PHB' },
      { value: 'feywanderer', label: 'Feenwanderer', source: 'PHB' },
      { value: 'gloomstalker', label: 'Schreckenjäger', source: 'PHB' },
      { value: 'hunter', label: 'Jäger', source: 'PHB / SRD' },
    ],
    rogue: [
      { value: 'arcanetrickster', label: 'Arkaner Gauner', source: 'PHB' },
      { value: 'assassin', label: 'Assassine', source: 'PHB' },
      { value: 'soulknife', label: 'Seelenmesser', source: 'PHB' },
      { value: 'thief', label: 'Dieb', source: 'PHB / SRD' },
    ],
    sorcerer: [
      { value: 'aberrant', label: 'Aberrante Magie', source: 'PHB' },
      { value: 'clockwork', label: 'Uhrwerkmagie', source: 'PHB' },
      { value: 'draconic', label: 'Drakonische Magie', source: 'PHB / SRD' },
      { value: 'wildmagic', label: 'Wilde Magie', source: 'PHB' },
    ],
    warlock: [
      { value: 'archfey', label: 'Feenwesen-Patron', source: 'PHB' },
      { value: 'celestial', label: 'Himmlischer Patron', source: 'PHB' },
      { value: 'fiend', label: 'Unholdpatron', source: 'PHB / SRD' },
      { value: 'greatoldone', label: 'Patron des Großen Alten', source: 'PHB' },
    ],
    wizard: [
      { value: 'abjurer', label: 'Bannwirker', source: 'PHB' },
      { value: 'diviner', label: 'Wahrsager', source: 'PHB' },
      { value: 'evocation', label: 'Hervorrufungsgelehrter', source: 'PHB / SRD' },
      { value: 'illusionist', label: 'Illusionist', source: 'PHB' },
    ],
  },
}

export function getSubclassOptions(classId: string, ruleset: Dnd5eRuleset): ClassOption[] {
  const currentOptions = SUBCLASS_OPTIONS_BY_RULESET[ruleset][classId] ?? []
  if (ruleset === '2014') return currentOptions

  // 2024 characters may use legacy official subclasses that were not reprinted
  // for the 2024 rules. Keep the 2024 PHB/SRD options above authoritative and
  // add only older options that do not already have a 2024 entry.
  const currentValues = new Set(currentOptions.map((option) => option.value))

  // Some 2024 PHB subclasses use a different internal ID than their 2014
  // predecessor. Treat those as replacements, not as additional choices.
  const replacedLegacyValues: Record<string, string[]> = {
    barbarian: ['totemwarrior'],
    monk: ['four_elements'],
    sorcerer: ['aberrantmind'],
    wizard: ['abjuration', 'divination', 'illusion'],
  }
  const replacedValues = new Set(replacedLegacyValues[classId] ?? [])

  const legacyOptions = (SUBCLASS_OPTIONS_BY_RULESET['2014'][classId] ?? []).filter(
    (option) => !currentValues.has(option.value) && !replacedValues.has(option.value),
  )

  return [...currentOptions, ...legacyOptions]
}

export function getClassLabel(classId: string): string {
  return CLASS_OPTIONS.find((item) => item.value === classId)?.label ?? classId
}
