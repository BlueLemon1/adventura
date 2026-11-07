import type { Character } from './character'

export interface ClassResourceDefinition {
  id: string
  label: string
  maximum: number
  recovery: 'short' | 'long' | 'short-or-long' | 'short-one-or-long'
}
export interface AutomaticClassFeature {
  id: string
  name: string
  level: number
  source: 'class' | 'subclass'
}

function abilityModifier(score = 10) {
  return Math.floor((score - 10) / 2)
}

export function getClassResources(character: Character): ClassResourceDefinition[] {
  const { classId, level, ruleset } = character
  const resources: ClassResourceDefinition[] = []
  const add = (
    id: string,
    label: string,
    maximum: number,
    recovery: ClassResourceDefinition['recovery'],
  ) => {
    if (maximum > 0) resources.push({ id, label, maximum, recovery })
  }
  if (classId === 'barbarian') {
    const maximum =
      level >= 20 ? 99 : level >= 17 ? 6 : level >= 12 ? 5 : level >= 6 ? 4 : level >= 3 ? 3 : 2
    add('rage', 'Kampfrausch', maximum, ruleset === '2014' ? 'long' : 'short-one-or-long')
  }
  if (classId === 'bard') {
    add(
      'bardic-inspiration',
      'Bardeninspiration',
      Math.max(1, abilityModifier(character.abilities?.cha)),
      level >= 5 ? 'short-or-long' : 'long',
    )
  }
  if (classId === 'cleric' && level >= 2) {
    const maximum =
      level >= 18 ? (ruleset === '2024' ? 4 : 3) : level >= 6 ? 2 : ruleset === '2024' ? 2 : 1
    add('channel-divinity', 'Kanal göttlicher Energie', maximum, 'short-or-long')
  }
  if (classId === 'druid' && level >= 2)
    add('wild-shape', 'Tiergestalt', 2, ruleset === '2024' ? 'short-one-or-long' : 'short-or-long')
  if (classId === 'fighter' && level >= 1)
    add(
      'second-wind',
      'Zweites Aufatmen',
      ruleset === '2024' ? (level >= 10 ? 4 : level >= 4 ? 3 : 2) : 1,
      'short-or-long',
    )
  if (classId === 'monk' && level >= 2)
    add(
      ruleset === '2024' ? 'focus-points' : 'ki-points',
      ruleset === '2024' ? 'Fokus-Punkte' : 'Ki-Punkte',
      level,
      'short-or-long',
    )
  if (classId === 'paladin' && ruleset === '2024' && level >= 3)
    add(
      'channel-divinity-paladin',
      'Kanal göttlicher Energie',
      level >= 11 ? 3 : 2,
      'short-or-long',
    )
  if (classId === 'sorcerer' && level >= 2) add('sorcery-points', 'Zauberpunkte', level, 'long')
  if (classId === 'wizard' && level >= 1) add('arcane-recovery', 'Arkane Erholung', 1, 'long')
  return resources
}

const CLASS_FEATURES: Record<string, Array<[number, string]>> = {
  barbarian: [
    [1, 'Kampfrausch'],
    [1, 'Ungepanzerte Verteidigung'],
    [2, 'Gefahrensinn'],
    [2, 'Rücksichtsloser Angriff'],
    [5, 'Zusätzlicher Angriff'],
    [5, 'Schnelle Bewegung'],
    [7, 'Wilder Instinkt'],
    [9, 'Brutaler kritischer Treffer'],
    [11, 'Unermüdlicher Kampfrausch'],
    [15, 'Anhaltender Kampfrausch'],
    [18, 'Unbezwingbare Stärke'],
    [20, 'Ursprünglicher Champion'],
  ],
  bard: [
    [1, 'Zauberwirken'],
    [1, 'Bardeninspiration'],
    [2, 'Alles-Könner'],
    [2, 'Lied der Rast'],
    [3, 'Expertise'],
    [5, 'Quelle der Inspiration'],
    [6, 'Gegenzauberische Melodie'],
    [10, 'Magische Geheimnisse'],
  ],
  cleric: [
    [1, 'Zauberwirken'],
    [1, 'Göttliche Domäne'],
    [2, 'Kanal göttlicher Energie'],
    [2, 'Untote vertreiben'],
    [5, 'Untote zerstören'],
    [8, 'Göttlicher Schlag'],
  ],
  druid: [
    [1, 'Druidisch'],
    [1, 'Zauberwirken'],
    [2, 'Tiergestalt'],
    [18, 'Zeitloser Körper'],
    [18, 'Tierzauber'],
  ],
  fighter: [
    [1, 'Kampfstil'],
    [1, 'Zweites Aufatmen'],
    [2, 'Aktionsschub'],
    [3, 'Kampf-Archetyp'],
    [5, 'Zusätzlicher Angriff'],
    [9, 'Unbeugsam'],
  ],
  monk: [
    [1, 'Kampfkünste'],
    [1, 'Ungepanzerte Verteidigung'],
    [2, 'Ki'],
    [2, 'Ungepanzerte Bewegung'],
    [3, 'Geschosse abwehren'],
    [5, 'Zusätzlicher Angriff'],
    [6, 'Ki-verbesserte Schläge'],
    [7, 'Entrinnen'],
    [10, 'Reinheit des Körpers'],
    [14, 'Diamantseele'],
    [18, 'Leerer Körper'],
    [20, 'Perfektes Selbst'],
  ],
  paladin: [
    [1, 'Göttlicher Sinn'],
    [1, 'Handauflegen'],
    [2, 'Kampfstil'],
    [2, 'Zauberwirken'],
    [2, 'Göttliches Niederstrecken'],
    [3, 'Göttliche Gesundheit'],
    [3, 'Heiliger Schwur'],
    [5, 'Zusätzlicher Angriff'],
    [6, 'Aura des Schutzes'],
    [10, 'Aura des Mutes'],
    [11, 'Verbesserter göttlicher Schlag'],
  ],
  ranger: [
    [1, 'Bevorzugter Feind'],
    [1, 'Erfahrener Entdecker'],
    [2, 'Kampfstil'],
    [2, 'Zauberwirken'],
    [3, 'Waldläufer-Archetyp'],
    [5, 'Zusätzlicher Angriff'],
    [8, 'Landgang'],
    [10, 'Tarnung in der Wildnis'],
    [14, 'Verschwinden'],
    [18, 'Wilde Sinne'],
    [20, 'Feindetöter'],
  ],
  rogue: [
    [1, 'Expertise'],
    [1, 'Hinterhältiger Angriff'],
    [1, 'Diebesjargon'],
    [2, 'Listige Aktion'],
    [3, 'Schurken-Archetyp'],
    [5, 'Unheimliches Ausweichen'],
    [7, 'Entrinnen'],
    [11, 'Zuverlässiges Talent'],
    [14, 'Blindgespür'],
    [15, 'Entschlüpfen'],
    [18, 'Unfassbar'],
    [20, 'Glückstreffer'],
  ],
  sorcerer: [
    [1, 'Zauberwirken'],
    [1, 'Zauberer-Abstammung'],
    [2, 'Quelle der Magie'],
    [3, 'Metamagie'],
    [20, 'Zauberer-Apotheose'],
  ],
  warlock: [
    [1, 'Paktmagie'],
    [1, 'Unheimliche Anrufungen'],
    [3, 'Paktgabe'],
    [11, 'Mystisches Arkanum'],
    [20, 'Mystischer Meister'],
  ],
  wizard: [
    [1, 'Zauberwirken'],
    [1, 'Arkane Erholung'],
    [2, 'Arkane Tradition'],
    [18, 'Zaubermeisterschaft'],
    [20, 'Signaturzauber'],
  ],
}
const SUBCLASS_FEATURES: Record<string, Array<[number, string]>> = {
  berserker: [
    [3, 'Raserei'],
    [6, 'Geisteslose Wut'],
    [10, 'Vergeltung'],
    [14, 'Einschüchternde Präsenz'],
  ],
  lore: [
    [3, 'Zusätzliche Fertigkeiten'],
    [3, 'Worte der Schreckens'],
    [6, 'Zusätzliche magische Geheimnisse'],
    [14, 'Unvergleichliche Fertigkeiten'],
  ],
  life: [
    [1, 'Bonus-Ausbildung'],
    [1, 'Jünger des Lebens'],
    [2, 'Bewahrung des Lebens'],
    [6, 'Gesegneter Heiler'],
    [8, 'Göttlicher Schlag'],
  ],
  land: [
    [2, 'Bonus-Zauber'],
    [2, 'Natürliche Erholung'],
    [6, 'Zusätzliche Landbewegung'],
    [10, 'Schutz der Natur'],
    [14, 'Naturheiligtum'],
  ],
  champion: [
    [3, 'Verbesserter kritischer Treffer'],
    [7, 'Athlet'],
    [10, 'Zusätzlicher Kampfstil'],
    [15, 'Überlegener kritischer Treffer'],
    [18, 'Überlebenskünstler'],
  ],
  openhand: [
    [3, 'Technik der offenen Hand'],
    [6, 'Ganzheit des Körpers'],
    [11, 'Gelassenheit'],
    [17, 'Zitternde Handfläche'],
  ],
  devotion: [
    [3, 'Heilige Waffe'],
    [3, 'Untadeliger Geist'],
    [7, 'Aura der Hingabe'],
    [15, 'Reinheit des Geistes'],
    [20, 'Heiliger Nimbus'],
  ],
  hunter: [
    [3, 'Jägerbeute'],
    [7, 'Defensive Taktiken'],
    [11, 'Mehrfachangriff'],
    [15, 'Überlegene Verteidigung'],
  ],
  thief: [
    [3, 'Schnelle Hände'],
    [3, 'Kletternder Meister'],
    [9, 'Heimlichkeit'],
    [13, 'Magische Gegenstände benutzen'],
    [17, 'Diebesreflexe'],
  ],
  arcanetrickster: [
    [3, 'Zauberwirken'],
    [3, 'Magische Hand-Tricks'],
    [9, 'Magischer Hinterhalt'],
    [13, 'Vielseitiger Betrüger'],
    [17, 'Zauberdieb'],
  ],
  eldritchknight: [
    [3, 'Zauberwirken'],
    [3, 'Waffenbindung'],
    [7, 'Kriegsmagie'],
    [10, 'Eldritch Strike'],
    [15, 'Arkane Aufladung'],
    [18, 'Verbesserte Kriegsmagie'],
  ],
  draconic: [
    [1, 'Drachenahne'],
    [6, 'Elementare Affinität'],
    [14, 'Drachenflügel'],
    [18, 'Drachenpräsenz'],
  ],
  shadowmagic: [
    [1, 'Augen der Dunkelheit'],
    [1, 'Stärke des Grabes'],
    [6, 'Hund des Unheils'],
    [14, 'Schattenwandlung'],
    [18, 'Schattenform'],
  ],
  fiend: [
    [1, 'Segnung des Dunklen'],
    [6, 'Dunkler eigener Glücksfall'],
    [10, 'Unholdresilienz'],
    [14, 'Durch die Hölle schicken'],
  ],
  evocation: [
    [2, 'Hervorrufungsexperte'],
    [2, 'Skulptur der Zauber'],
    [6, 'Mächtiger Zaubertrick'],
    [10, 'Ermächtigte Hervorrufung'],
    [14, 'Überladung'],
  ],
}

export function getAutomaticClassFeatures(character: Character): AutomaticClassFeature[] {
  // This initial catalogue is explicitly SRD 5.1 / 2014 data. Never show it for 2024 characters.
  if (character.ruleset !== '2014') return []
  const result: AutomaticClassFeature[] = (CLASS_FEATURES[character.classId] ?? [])
    .filter(([level]) => level <= character.level)
    .map(([level, name], index) => ({
      id: `class-${character.classId}-${index}`,
      name,
      level,
      source: 'class',
    }))
  const subclass = character.subclassId?.toLowerCase().replace(/[^a-z]/g, '') ?? ''
  result.push(
    ...(SUBCLASS_FEATURES[subclass] ?? [])
      .filter(([level]) => level <= character.level)
      .map(([level, name], index) => ({
        id: `subclass-${subclass}-${index}`,
        name,
        level,
        source: 'subclass' as const,
      })),
  )
  return result
}
