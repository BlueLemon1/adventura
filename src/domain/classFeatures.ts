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
  description?: string
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
      ruleset === '2014' && level >= 20
        ? 99
        : level >= 17
          ? 6
          : level >= 12
            ? 5
            : level >= 6
              ? 4
              : level >= 3
                ? 3
                : 2
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
    add(
      'channel-divinity',
      'Kanal göttlicher Energie',
      maximum,
      ruleset === '2024' ? 'short-one-or-long' : 'short-or-long',
    )
  }
  if (classId === 'druid' && level >= 2)
    add(
      'wild-shape',
      'Tiergestalt',
      ruleset === '2024' ? (level >= 17 ? 4 : level >= 6 ? 3 : 2) : 2,
      ruleset === '2024' ? 'short-one-or-long' : 'short-or-long',
    )
  if (classId === 'fighter' && level >= 1)
    add(
      'second-wind',
      'Zweites Aufatmen',
      ruleset === '2024' ? (level >= 10 ? 4 : level >= 4 ? 3 : 2) : 1,
      ruleset === '2024' ? 'short-one-or-long' : 'short-or-long',
    )
  if (classId === 'fighter' && level >= 2) {
    add('action-surge', 'Aktionsschub', level >= 17 ? 2 : 1, 'short-or-long')
    add('indomitable', 'Unbeugsam', level >= 17 ? 3 : level >= 13 ? 2 : level >= 9 ? 1 : 0, 'long')
  }
  if (classId === 'monk' && level >= 2)
    add(
      ruleset === '2024' ? 'focus-points' : 'ki-points',
      ruleset === '2024' ? 'Fokus-Punkte' : 'Ki-Punkte',
      level,
      'short-or-long',
    )
  if (classId === 'paladin') {
    add('lay-on-hands', 'Handauflegen', 5 * level, 'long')
    if (ruleset === '2014')
      add(
        'divine-sense',
        'Göttlicher Sinn',
        Math.max(1, abilityModifier(character.abilities?.cha) + 1),
        'long',
      )
    if (ruleset === '2014' && level >= 3 && character.subclassId)
      add('paladin-channel-divinity', 'Kanal göttlicher Energie', 1, 'short-or-long')
  }
  if (classId === 'paladin' && ruleset === '2024' && level >= 3)
    add(
      'channel-divinity-paladin',
      'Kanal göttlicher Energie',
      level >= 11 ? 3 : 2,
      'short-one-or-long',
    )
  if (classId === 'ranger' && ruleset === '2024')
    add(
      'favored-enemy',
      'Bevorzugter Feind',
      level >= 17 ? 6 : level >= 13 ? 5 : level >= 9 ? 4 : level >= 5 ? 3 : 2,
      'long',
    )
  if (classId === 'warlock' && ruleset === '2024' && level >= 2)
    add('magical-cunning', 'Magische List', 1, 'long')
  if (classId === 'sorcerer' && ruleset === '2024')
    add('innate-sorcery', 'Angeborene Magie', 2, 'long')
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

const CLASS_FEATURES_2024: Record<string, Array<[number, string]>> = {
  barbarian: [
    [1, 'Kampfrausch'],
    [1, 'Ungepanzerte Verteidigung'],
    [1, 'Waffenmeisterschaft'],
    [2, 'Gefahrensinn'],
    [2, 'Rücksichtsloser Angriff'],
    [3, 'Urwissen'],
    [5, 'Zusätzlicher Angriff'],
    [5, 'Schnelle Bewegung'],
    [7, 'Wilder Instinkt'],
    [7, 'Instinktiver Sprung'],
    [9, 'Brutaler Schlag'],
    [11, 'Unermüdlicher Kampfrausch'],
    [13, 'Verbesserter brutaler Schlag'],
    [15, 'Anhaltender Kampfrausch'],
    [18, 'Unbezwingbare Stärke'],
    [19, 'Epischer Segen'],
    [20, 'Ursprünglicher Champion'],
  ],
  bard: [
    [1, 'Bardeninspiration'],
    [1, 'Zauberwirken'],
    [2, 'Expertise'],
    [2, 'Alles-Könner'],
    [5, 'Quelle der Inspiration'],
    [7, 'Gegenzauber'],
    [10, 'Magische Geheimnisse'],
    [18, 'Überlegene Inspiration'],
    [19, 'Epischer Segen'],
    [20, 'Worte der Schöpfung'],
  ],
  cleric: [
    [1, 'Zauberwirken'],
    [1, 'Göttliche Ordnung'],
    [2, 'Kanal göttlicher Energie'],
    [4, 'Attributswerterhöhung'],
    [5, 'Untote zerstören'],
    [7, 'Gesegnete Schläge'],
    [10, 'Göttliches Eingreifen'],
    [14, 'Verbessertes Göttliches Eingreifen'],
    [19, 'Epischer Segen'],
    [20, 'Großes Göttliches Eingreifen'],
  ],
  druid: [
    [1, 'Zauberwirken'],
    [1, 'Druidisch'],
    [1, 'Ursprüngliche Ordnung'],
    [2, 'Tiergestalt'],
    [2, 'Wilder Gefährte'],
    [4, 'Attributswerterhöhung'],
    [5, 'Wilde Erneuerung'],
    [7, 'Elementare Wut'],
    [15, 'Verbesserte Elementare Wut'],
    [18, 'Tierzauber'],
    [19, 'Epischer Segen'],
    [20, 'Erzdruide'],
  ],
  fighter: [
    [1, 'Kampfstil'],
    [1, 'Zweites Aufatmen'],
    [1, 'Waffenmeisterschaft'],
    [2, 'Aktionsschub'],
    [2, 'Taktischer Verstand'],
    [4, 'Attributswerterhöhung'],
    [5, 'Zusätzlicher Angriff'],
    [5, 'Taktische Bewegung'],
    [9, 'Unbeugsam'],
    [11, 'Zwei zusätzliche Angriffe'],
    [19, 'Epischer Segen'],
    [20, 'Drei zusätzliche Angriffe'],
  ],
  monk: [
    [1, 'Kampfkünste'],
    [1, 'Ungepanzerte Verteidigung'],
    [2, 'Fokus des Mönchs'],
    [2, 'Ungepanzerte Bewegung'],
    [2, 'Unheimlicher Stoffwechsel'],
    [3, 'Angriffe abwehren'],
    [4, 'Attributswerterhöhung'],
    [4, 'Langsamer Fall'],
    [5, 'Zusätzlicher Angriff'],
    [6, 'Verbesserte fokussierte Schläge'],
    [7, 'Entrinnen'],
    [10, 'Selbstheilung'],
    [13, 'Abgelenkte Energie'],
    [14, 'Disziplin'],
    [18, 'Überlegene Verteidigung'],
    [19, 'Epischer Segen'],
    [20, 'Perfektes Selbst'],
  ],
  paladin: [
    [1, 'Handauflegen'],
    [1, 'Zauberwirken'],
    [1, 'Waffenmeisterschaft'],
    [2, 'Kampfstil'],
    [3, 'Kanal göttlicher Energie'],
    [4, 'Attributswerterhöhung'],
    [5, 'Zusätzlicher Angriff'],
    [5, 'Treues Ross'],
    [6, 'Aura des Schutzes'],
    [9, 'Abwehrzauber'],
    [10, 'Aura des Mutes'],
    [11, 'Strahlende Schläge'],
    [14, 'Berührende Reinigung'],
    [19, 'Epischer Segen'],
  ],
  ranger: [
    [1, 'Zauberwirken'],
    [1, 'Bevorzugter Feind'],
    [1, 'Waffenmeisterschaft'],
    [2, 'Erfahrener Entdecker'],
    [2, 'Kampfstil'],
    [4, 'Attributswerterhöhung'],
    [5, 'Zusätzlicher Angriff'],
    [6, 'Wanderer'],
    [9, 'Experte'],
    [10, 'Zäher Jäger'],
    [13, 'Unermüdlicher Jäger'],
    [14, 'Verschwinden'],
    [17, 'Präziser Jäger'],
    [19, 'Epischer Segen'],
    [20, 'Feindetöter'],
  ],
  rogue: [
    [1, 'Expertise'],
    [1, 'Hinterhältiger Angriff'],
    [1, 'Diebesjargon'],
    [1, 'Waffenmeisterschaft'],
    [2, 'Listige Aktion'],
    [3, 'Sicheres Zielen'],
    [5, 'Listiger Schlag'],
    [5, 'Unheimliches Ausweichen'],
    [7, 'Entrinnen'],
    [7, 'Zuverlässiges Talent'],
    [11, 'Verbesserte Listige Schläge'],
    [14, 'Listige Schläge'],
    [15, 'Schlauer Geist'],
    [18, 'Unfassbar'],
    [19, 'Epischer Segen'],
    [20, 'Glückstreffer'],
  ],
  sorcerer: [
    [1, 'Zauberwirken'],
    [1, 'Angeborene Magie'],
    [2, 'Quelle der Magie'],
    [3, 'Metamagie'],
    [5, 'Zauberhafte Erneuerung'],
    [10, 'Metamagie-Option'],
    [20, 'Zauberer-Apotheose'],
  ],
  warlock: [
    [1, 'Unheimliche Anrufungen'],
    [1, 'Paktmagie'],
    [2, 'Magische List'],
    [4, 'Attributswerterhöhung'],
    [9, 'Patron kontaktieren'],
    [11, 'Mystisches Arkanum'],
    [19, 'Epischer Segen'],
    [20, 'Mystischer Meister'],
  ],
  wizard: [
    [1, 'Zauberwirken'],
    [1, 'Ritualgelehrter'],
    [1, 'Arkane Erholung'],
    [2, 'Gelehrter'],
    [4, 'Attributswerterhöhung'],
    [5, 'Zauber einprägen'],
    [18, 'Zaubermeisterschaft'],
    [19, 'Epischer Segen'],
    [20, 'Signaturzauber'],
  ],
}
const SUBCLASS_FEATURES_2024: Record<string, Array<[number, string, string]>> = {
  barbarian: [
    [
      3,
      'Raserei',
      'Wenn du während deines Kampfrauschs Rücksichtsloser Angriff nutzt, verursacht dein erster Treffer mit einem Stärke-Angriff zusätzlichen Schaden.',
    ],
    [
      6,
      'Geisteslose Wut',
      'Während des Kampfrauschs bist du immun gegen Bezaubert und Verängstigt; bestehende Zustände enden beim Beginn des Kampfrauschs.',
    ],
    [
      10,
      'Vergeltung',
      'Wenn dich eine Kreatur innerhalb von 1,5 Metern verletzt, kannst du als Reaktion einen Nahkampfangriff ausführen.',
    ],
    [
      14,
      'Einschüchternde Präsenz',
      'Du kannst Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht testen lassen.',
    ],
  ],
  bard: [
    [3, 'Zusätzliche Fertigkeiten', 'Du erhältst Übung in drei Fertigkeiten deiner Wahl.'],
    [
      3,
      'Schneidende Worte',
      'Du kannst eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um einen Wurf oder Schadenswurf eines sichtbaren Wesens zu verringern.',
    ],
    [
      6,
      'Magische Entdeckungen',
      'Du lernst zwei zusätzliche Zauber von der Kleriker-, Druiden- oder Magier-Zauberliste.',
    ],
    [
      14,
      'Unvergleichliche Fertigkeit',
      'Wenn du einen Attributswurf ablegst, kannst du eine Nutzung deiner Bardeninspiration einsetzen und den Würfel zum Ergebnis addieren.',
    ],
  ],
  cleric: [
    [
      3,
      'Jünger des Lebens',
      'Heilzauber, die du mit einem Zauberplatz wirkst, stellen zusätzliche Trefferpunkte in Höhe von 2 plus Zauberplatzgrad wieder her.',
    ],
    [
      3,
      'Zauber der Lebensdomäne',
      'Die Zauber deiner Domäne sind abhängig von deiner Klerikerstufe stets vorbereitet.',
    ],
    [
      3,
      'Leben bewahren',
      'Du kannst Kanal göttlicher Energie einsetzen, um Trefferpunkte auf verwundete Kreaturen in deiner Nähe zu verteilen.',
    ],
    [
      6,
      'Gesegneter Heiler',
      'Wenn du andere mit einem Heilzauber heilst, erhältst du selbst zusätzliche Trefferpunkte zurück.',
    ],
    [
      17,
      'Überragende Heilung',
      'Bei Heilwürfeln deiner Zauber verwendest du statt des Würfelwurfs den höchstmöglichen Wert.',
    ],
  ],
  druid: [
    [
      3,
      'Zauber des Landzirkels',
      'Nach einer langen Rast wählst du eine Landschaft und hast deren passende Zirkelzauber vorbereitet.',
    ],
    [
      3,
      'Hilfe des Landes',
      'Du kannst eine Nutzung deiner Tiergestalt ausgeben, um in einem Bereich nekrotischen Schaden zu verursachen und eine Kreatur zu heilen.',
    ],
    [
      6,
      'Natürliche Erholung',
      'Du kannst nach einer kurzen Rast Zauberplätze zurückgewinnen und erhältst zusätzliche Vorteile für deine Landzauber.',
    ],
    [
      10,
      'Schutz der Natur',
      'Du bist gegen bestimmte Zustände und Umwelteinflüsse geschützt, abhängig von deiner gewählten Landschaft.',
    ],
    [
      14,
      'Naturheiligtum',
      'Natürliche Kreaturen können dich nicht ohne Weiteres angreifen oder sich dir feindlich nähern.',
    ],
  ],
  fighter: [
    [
      3,
      'Verbesserter kritischer Treffer',
      'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 19 oder 20 einen kritischen Treffer.',
    ],
    [
      3,
      'Bemerkenswerter Athlet',
      'Du erhältst Vorteile auf bestimmte Initiative- und körperliche Attributswürfe.',
    ],
    [7, 'Zusätzlicher Kampfstil', 'Du erhältst ein weiteres Talent für Kampfstil.'],
    [
      10,
      'Heroischer Krieger',
      'Zu Beginn deines Zuges kannst du Heldenmut erhalten, wenn du keinen hast.',
    ],
    [
      15,
      'Überlegener kritischer Treffer',
      'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 18 bis 20 einen kritischen Treffer.',
    ],
    [
      18,
      'Überlebenskünstler',
      'Zu Beginn deines Zuges kannst du Trefferpunkte zurückgewinnen, wenn du angeschlagen bist.',
    ],
  ],
  monk: [
    [
      3,
      'Technik der offenen Hand',
      'Treffer aus Hagel der Schläge können Gelegenheitsangriffe verhindern, Ziele wegstoßen oder zu Fall bringen.',
    ],
    [
      6,
      'Ganzheit des Körpers',
      'Du kannst als Bonusaktion Trefferpunkte in Höhe deines Kampfkunstwürfels plus Weisheitsmodifikator zurückgewinnen.',
    ],
    [
      11,
      'Fließender Schritt',
      'Nach einer anderen Bonusaktion kannst du zusätzlich Schritt des Windes einsetzen.',
    ],
    [
      17,
      'Zitternde Handfläche',
      'Du kannst Fokus-Punkte einsetzen, um tödliche Schwingungen in einem getroffenen Ziel zu hinterlassen.',
    ],
  ],
  paladin: [
    [
      3,
      'Zauber des Schwurs der Hingabe',
      'Die Zauber deines Schwurs sind abhängig von deiner Paladinstufe stets vorbereitet.',
    ],
    [
      3,
      'Heilige Waffe',
      'Du kannst Kanal göttlicher Energie einsetzen, um eine Nahkampfwaffe vorübergehend magisch zu stärken.',
    ],
    [
      7,
      'Aura der Hingabe',
      'Du und Verbündete in deiner Schutzaura seid gegen den Zustand Bezaubert immun.',
    ],
    [
      15,
      'Schützendes Niederstrecken',
      'Dein Göttliches Niederstrecken gewährt dir und Verbündeten in deiner Aura vorübergehend halbe Deckung.',
    ],
    [
      20,
      'Heiliger Nimbus',
      'Du strahlst eine heilige Aura aus, die Licht spendet und Feinde in deiner Nähe schwächt.',
    ],
  ],
  ranger: [
    [
      3,
      'Jägerkunde',
      'Während ein Ziel von deinem Mal des Jägers betroffen ist, erkennst du seine Schadensimmunitäten, Resistenzen und Anfälligkeiten.',
    ],
    [
      3,
      'Jägerbeute',
      'Du wählst eine Jagdtechnik, etwa zusätzlichen Schaden gegen bereits verwundete Ziele.',
    ],
    [
      7,
      'Defensive Taktiken',
      'Du erhältst eine defensive Jagdtechnik gegen Angriffe oder Flächengefahren.',
    ],
    [
      11,
      'Überlegene Jägerbeute',
      'Deine Jagdtechnik wird verbessert und kann zusätzliche Ziele oder Effekte betreffen.',
    ],
    [15, 'Überlegene Verteidigung', 'Du erhältst eine weitere defensive Jagdtechnik.'],
  ],
  rogue: [
    [
      3,
      'Schnelle Hände',
      'Du kannst zusätzlich bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.',
    ],
    [
      3,
      'Arbeit in luftiger Höhe',
      'Klettern kostet dich keine zusätzliche Bewegung und Sprünge profitieren von deiner Geschicklichkeit.',
    ],
    [
      9,
      'Meisterlicher Schleicher',
      'Du kannst dich unter bestimmten Bedingungen mit einer Bonusaktion verstecken.',
    ],
    [
      13,
      'Magische Gegenstände benutzen',
      'Du kannst Schriftrollen und magische Gegenstände vielseitiger einsetzen.',
    ],
    [
      17,
      'Diebesreflexe',
      'Du erhältst zu Beginn eines Kampfes einen zusätzlichen Zug unter bestimmten Voraussetzungen.',
    ],
  ],
  sorcerer: [
    [
      3,
      'Drakonische Widerstandskraft',
      'Dein Trefferpunktemaximum steigt; ohne Rüstung berechnet sich deine Grund-Rüstungsklasse aus Geschicklichkeit und Charisma.',
    ],
    [
      3,
      'Drakonische Zauber',
      'Die Zauber deiner drakonischen Abstammung sind abhängig von deiner Zaubererstufe stets vorbereitet.',
    ],
    [
      6,
      'Elementare Affinität',
      'Du erhältst Resistenz gegen einen gewählten Drachenschadenstyp und kannst passenden Zauberschaden verstärken.',
    ],
    [
      14,
      'Drachenflügel',
      'Du kannst für eine begrenzte Zeit Flügel manifestieren und eine Flugbewegungsrate erhalten.',
    ],
    [18, 'Drachengefährte', 'Du kannst einen drakonischen Geist als Gefährten beschwören.'],
  ],
  warlock: [
    [
      3,
      'Segnung des Dunklen',
      'Wenn ein Feind in deiner Nähe auf 0 Trefferpunkte sinkt, erhältst du temporäre Trefferpunkte.',
    ],
    [
      3,
      'Zauber des Unholds',
      'Die Zauber deines Patrons sind abhängig von deiner Hexenmeisterstufe stets vorbereitet.',
    ],
    [
      6,
      'Dunkler eigener Glücksfall',
      'Du kannst einen Attributswurf oder Rettungswurf mit einem zusätzlichen W10 verbessern.',
    ],
    [
      10,
      'Unholdresilienz',
      'Nach einer Rast wählst du einen Schadensarttyp, gegen den du resistent bist.',
    ],
    [
      14,
      'Durch die Hölle schicken',
      'Einmal pro Zug kannst du ein getroffenes Ziel in die Unteren Ebenen schleudern und ihm psychischen Schaden zufügen.',
    ],
  ],
  wizard: [
    [
      3,
      'Hervorrufungsexperte',
      'Das Kopieren von Hervorrufungszaubern in dein Zauberbuch kostet weniger Zeit und Gold.',
    ],
    [
      3,
      'Kraftvoller Zaubertrick',
      'Deine Schadenszaubertricks verursachen auch bei erfolgreichen Rettungswürfen Schaden.',
    ],
    [
      6,
      'Zauber formen',
      'Du kannst sichere Bereiche für Verbündete in deinen Hervorrufungszaubern schaffen.',
    ],
    [
      10,
      'Ermächtigte Hervorrufung',
      'Du addierst deinen Intelligenzmodifikator zu einem Schadenswurf deiner Hervorrufungszauber.',
    ],
    [
      14,
      'Überladung',
      'Du kannst einen Zauber verstärken, um maximalen Schaden zu verursachen, riskierst dabei aber Rückschlag.',
    ],
  ],
}

export function getAutomaticClassFeatures(character: Character): AutomaticClassFeature[] {
  const is2024 = character.ruleset === '2024'
  const catalogue = is2024 ? CLASS_FEATURES_2024 : CLASS_FEATURES
  const result: AutomaticClassFeature[] = (catalogue[character.classId] ?? [])
    .filter(([level]) => level <= character.level)
    .map(([level, name], index) => ({
      id: `class-${character.ruleset}-${character.classId}-${index}`,
      name,
      level,
      source: 'class',
    }))
  const subclass = character.subclassId?.toLowerCase().replace(/[^a-z]/g, '') ?? ''
  if (is2024) {
    result.push(
      ...(character.subclassId ? (SUBCLASS_FEATURES_2024[character.classId] ?? []) : [])
        .filter(([level]) => level <= character.level)
        .map(([level, name, description], index) => ({
          id: `subclass-2024-${subclass}-${index}`,
          name,
          description,
          level,
          source: 'subclass' as const,
        })),
    )
  } else {
    result.push(
      ...(SUBCLASS_FEATURES[subclass] ?? [])
        .filter(([level]) => level <= character.level)
        .map(([level, name], index) => ({
          id: `subclass-2014-${subclass}-${index}`,
          name,
          level,
          source: 'subclass' as const,
        })),
    )
  }
  return result
}
