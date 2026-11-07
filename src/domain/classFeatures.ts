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
  activation?: 'action' | 'bonusAction' | 'reaction' | 'special'
  resourceId?: string
  resourceCost?: number
}

const ACTIVE_FEATURES: Record<
  string,
  {
    activation: NonNullable<AutomaticClassFeature['activation']>
    description: string
    resourceId?: string
    resourceCost?: number
  }
> = {
  Kampfrausch: {
    activation: 'bonusAction',
    description:
      'Du verfällst in einen Kampfrausch. Er hält bis zu 10 Minuten an und endet vorzeitig unter den im Regelwerk genannten Bedingungen.',
    resourceId: 'rage',
  },
  Bardeninspiration: {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  'Schneidende Worte': {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur in deiner Nähe einen Wurf ablegt, kannst du eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um das Ergebnis zu verringern.',
    resourceId: 'bardic-inspiration',
  },
  'Gegenzauberische Melodie': {
    activation: 'action',
    description:
      'Du beginnst eine Aufführung, die Verbündete in deiner Nähe gegen bestimmte Furcht- und Bezauberungseffekte stärkt.',
  },
  Gegenzauber: {
    activation: 'action',
    description:
      'Du beginnst eine Aufführung, die Verbündete in deiner Nähe gegen bestimmte Furcht- und Bezauberungseffekte stärkt.',
  },
  'Kanal göttlicher Energie': {
    activation: 'action',
    description:
      'Du setzt deine göttliche Energie frei und wählst einen verfügbaren Effekt deiner Klasse oder Unterklasse.',
    resourceId: 'channel-divinity',
  },
  'Untote vertreiben': {
    activation: 'action',
    description:
      'Du präsentierst dein heiliges Symbol und zwingst Untote in deiner Nähe zu einem Weisheitsrettungswurf; bei Misslingen werden sie vertrieben.',
    resourceId: 'channel-divinity',
  },
  'Leben bewahren': {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.',
    resourceId: 'channel-divinity',
  },
  Tiergestalt: {
    activation: 'bonusAction',
    description:
      'Du verwandelst dich in eine zulässige Tiergestalt. Die Verwandlung hält bis zu deiner Rückverwandlung oder bis zum Ablauf der Dauer an.',
    resourceId: 'wild-shape',
  },
  'Wilder Gefährte': {
    activation: 'action',
    description:
      'Du gibst eine Nutzung deiner Tiergestalt aus, um Vertrauten finden ohne Materialkomponenten zu wirken.',
    resourceId: 'wild-shape',
  },
  'Hilfe des Landes': {
    activation: 'action',
    description:
      'Du gibst eine Nutzung deiner Tiergestalt aus, um einen Bereich mit nekrotischer Energie zu erfüllen und eine Kreatur zu heilen.',
    resourceId: 'wild-shape',
  },
  'Zweites Aufatmen': {
    activation: 'bonusAction',
    description:
      'Du gewinnst Trefferpunkte zurück. Die Höhe richtet sich nach deiner Kämpferstufe.',
    resourceId: 'second-wind',
  },
  Aktionsschub: {
    activation: 'special',
    description:
      'Du kannst in diesem Zug zusätzlich zu deiner normalen Aktion eine weitere Aktion ausführen.',
    resourceId: 'action-surge',
  },
  Unbeugsam: {
    activation: 'special',
    description:
      'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.',
    resourceId: 'indomitable',
  },
  Ki: {
    activation: 'special',
    description:
      'Du setzt Ki-Punkte ein, um besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung oder Schritt des Windes auszuführen.',
    resourceId: 'ki-points',
  },
  'Fokus des Mönchs': {
    activation: 'special',
    description:
      'Du setzt Fokus-Punkte ein, um besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung oder Schritt des Windes auszuführen.',
    resourceId: 'focus-points',
  },
  Handauflegen: {
    activation: 'bonusAction',
    description:
      'Du berührst eine Kreatur und stellst Trefferpunkte aus deinem Heilungsvorrat wieder her oder neutralisierst eine Krankheit bzw. ein Gift, sofern die Regeln dies erlauben.',
    resourceId: 'lay-on-hands',
  },
  'Göttlicher Sinn': {
    activation: 'action',
    description:
      'Bis zum Ende deines nächsten Zuges nimmst du bestimmte himmlische, untote und dämonische Präsenzen in deiner Nähe wahr.',
    resourceId: 'divine-sense',
  },
  'Heilige Waffe': {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um eine gehaltene Waffe vorübergehend mit heiliger Macht zu erfüllen.',
    resourceId: 'channel-divinity-paladin',
  },
  'Angeborene Magie': {
    activation: 'bonusAction',
    description:
      'Du entfesselst deine angeborene Magie für 1 Minute und erhältst die im Merkmal beschriebenen Vorteile.',
    resourceId: 'innate-sorcery',
  },
  'Magische List': {
    activation: 'action',
    description:
      'Du führst ein kurzes Ritual aus, um einen Teil deiner verbrauchten Paktmagie-Zauberplätze zurückzugewinnen.',
    resourceId: 'magical-cunning',
  },
  'Arkane Erholung': {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'arcane-recovery',
  },
  'Natürliche Erholung': {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'natural-recovery',
  },
  'Einschüchternde Präsenz': {
    activation: 'action',
    description:
      'Du erschreckst Kreaturen in deiner Nähe mit deiner bedrohlichen Präsenz; sie müssen einen Weisheitsrettungswurf bestehen.',
  },
  Vergeltung: {
    activation: 'reaction',
    description:
      'Wenn dich eine Kreatur in deiner Nähe verletzt, kannst du als Reaktion einen Nahkampfangriff gegen sie ausführen.',
  },
  'Fließender Schritt': {
    activation: 'bonusAction',
    description:
      'Du kannst Schritt des Windes einsetzen, nachdem du in diesem Zug bereits eine andere Bonusaktion verwendet hast.',
  },
  'Zitternde Handfläche': {
    activation: 'action',
    description:
      'Du setzt Fokus-Punkte ein, um einem getroffenen Ziel tödliche Schwingungen einzuprägen und diese später auszulösen.',
    resourceId: 'focus-points',
  },
  Diebesreflexe: {
    activation: 'special',
    description:
      'Du kannst zu Beginn des ersten Kampfzugs unter den im Merkmal genannten Voraussetzungen einen zusätzlichen Zug erhalten.',
  },
  'Schnelle Hände': {
    activation: 'bonusAction',
    description:
      'Du kannst bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.',
  },
  'Unheimliches Ausweichen': {
    activation: 'reaction',
    description:
      'Wenn dich ein sichtbarer Angreifer trifft, kannst du deine Reaktion einsetzen, um den Angriffsschaden zu halbieren.',
  },
  'Listige Aktion': {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Schnelligkeit, um als Bonusaktion zu sprinten, dich zurückzuziehen oder dich zu verstecken.',
  },
  'Sicheres Zielen': {
    activation: 'bonusAction',
    description:
      'Du gibst deine Bewegung für diesen Zug auf, um bei deinem nächsten Angriff im selben Zug Vorteil zu erhalten.',
  },
  Drachenflügel: {
    activation: 'bonusAction',
    description: 'Du manifestierst drakonische Flügel und erhältst eine Flugbewegungsrate.',
  },
  'Durch die Hölle schicken': {
    activation: 'special',
    description:
      'Wenn du eine Kreatur triffst, kannst du sie einmal pro Zug durch die Unteren Ebenen schleudern und ihr zusätzlichen Schaden zufügen.',
  },
  Überladung: {
    activation: 'special',
    description:
      'Du kannst einen Magierzauber verstärken, um maximalen Schaden zu verursachen; die Anwendung birgt das im Merkmal beschriebene Risiko.',
  },
  Raserei: {
    activation: 'bonusAction',
    description:
      'Während deines Kampfrauschs kannst du einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen.',
  },
  'Bewahrung des Lebens': {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.',
    resourceId: 'channel-divinity',
  },
  'Ganzheit des Körpers': {
    activation: 'action',
    description:
      'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.',
    resourceId: 'wholeness-of-body',
  },
  'Hund des Unheils': {
    activation: 'bonusAction',
    description:
      'Du gibst drei Zauberpunkte aus, um einen Schattenhund zu beschwören, der ein Ziel jagt und bedrängt.',
    resourceId: 'sorcery-points',
    resourceCost: 3,
  },
  Drachenpräsenz: {
    activation: 'action',
    description:
      'Du gibst fünf Zauberpunkte aus, um deine drakonische Präsenz zu entfalten und Kreaturen in deiner Nähe zu bezaubern oder zu verängstigen.',
    resourceId: 'sorcery-points',
    resourceCost: 5,
  },
  Waffenbindung: {
    activation: 'bonusAction',
    description: 'Du kannst eine gebundene Waffe in deine Hand teleportieren.',
  },
  'Göttliches Eingreifen': {
    activation: 'action',
    description:
      'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.',
    resourceId: 'divine-intervention',
  },
  'Bevorzugter Feind': {
    activation: 'bonusAction',
    description:
      'Du wirkst Mal des Jägers ohne Zauberplatz und nutzt dafür eine verfügbare Anwendung dieses Merkmals.',
    resourceId: 'favored-enemy',
  },
  'Dunkler eigener Glücksfall': {
    activation: 'special',
    description:
      'Wenn du einen Attributs- oder Rettungswurf ablegst, kannst du einen zusätzlichen W10 zum Ergebnis addieren.',
    resourceId: 'dark-ones-own-luck',
  },
  'Rücksichtsloser Angriff': {
    activation: 'special',
    description:
      'Du kannst bei deinem ersten Angriff in diesem Zug Vorteil auf Stärke-Nahkampfangriffe erhalten; bis zu deinem nächsten Zug haben Angriffe gegen dich ebenfalls Vorteil.',
  },
  'Betäubender Schlag': {
    activation: 'special',
    description:
      'Wenn du mit einem Nahkampfangriff triffst, kannst du einen Ki- oder Fokus-Punkt ausgeben, um das Ziel zu einem Konstitutionsrettungswurf gegen Betäubung zu zwingen.',
    resourceId: 'ki-points',
  },
  'Geschosse abwehren': {
    activation: 'reaction',
    description:
      'Wenn dich ein Fernkampfangriff mit einer Waffe trifft, kannst du den Schaden mit deiner Reaktion reduzieren; unter bestimmten Bedingungen kannst du das Geschoss auffangen und zurückwerfen.',
  },
  'Angriffe abwehren': {
    activation: 'reaction',
    description:
      'Wenn dich ein Angriff trifft, kannst du deine Reaktion einsetzen, um den erlittenen Schaden zu reduzieren und den Angriff möglicherweise zurückzulenken.',
  },
  'Langsamer Fall': {
    activation: 'reaction',
    description:
      'Wenn du fällst, kannst du deine Reaktion einsetzen, um den erlittenen Fallschaden zu reduzieren.',
  },
  'Göttliches Niederstrecken': {
    activation: 'special',
    description:
      'Wenn du eine Kreatur mit einer Nahkampfwaffe triffst, kannst du einen Zauberplatz ausgeben, um zusätzlichen gleißenden Schaden zu verursachen.',
  },
  'Hagel der Schläge': {
    activation: 'bonusAction',
    description:
      'Nach der Angriffsaktion kannst du einen Ki- oder Fokus-Punkt ausgeben, um zwei zusätzliche unbewaffnete Schläge als Bonusaktion auszuführen.',
    resourceId: 'ki-points',
  },
  'Geduldige Verteidigung': {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Bonusaktion zur Verteidigung. Im Regelwerk 2024 kannst du dich kostenlos zurückziehen oder mit einem Fokus-Punkt zusätzlich ausweichen; 2014 kostet die Ausweichaktion einen Ki-Punkt.',
    resourceId: 'ki-points',
  },
  'Schritt des Windes': {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Bonusaktion für Sprinten oder Zurückziehen und kannst deine Sprungweite erhöhen. Die genauen Kosten unterscheiden sich zwischen 2014 und 2024.',
    resourceId: 'ki-points',
  },
  'Quelle der Magie': {
    activation: 'special',
    description:
      'Du wandelst Zauberplätze in Zauberpunkte um oder gibst Zauberpunkte aus, um Zauberplätze zu erschaffen.',
  },
  Abwehrzauber: {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um ausgewählte Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht und Handlungsunfähigkeit zu belegen.',
    resourceId: 'channel-divinity-paladin',
  },
}

function abilityModifier(score = 10) {
  return Math.floor((score - 10) / 2)
}

export function getClassResources(character: Character): ClassResourceDefinition[] {
  const { classId, level, ruleset } = character
  const resources: ClassResourceDefinition[] = []
  const subclass = character.subclassId?.toLowerCase().replace(/[^a-z]/g, '') ?? ''
  const add = (
    id: string,
    label: string,
    maximum: number,
    recovery: ClassResourceDefinition['recovery'],
  ) => {
    if (maximum > 0) resources.push({ id, label, maximum, recovery })
  }
  if (classId === 'barbarian' && !(ruleset === '2014' && level >= 20)) {
    const maximum =
      ruleset === '2014'
        ? level >= 12
          ? 5
          : level >= 6
            ? 4
            : level >= 3
              ? 3
              : 2
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
      level >= 18 ? 4 : level >= 6 ? (ruleset === '2024' ? 3 : 2) : ruleset === '2024' ? 2 : 1
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
  if (classId === 'druid' && subclass === 'land' && level >= 2)
    add('natural-recovery', 'Natürliche Erholung', 1, 'long')
  if (classId === 'cleric' && level >= 10)
    add('divine-intervention', 'Göttliches Eingreifen', 1, 'long')
  if (classId === 'warlock' && subclass === 'fiend' && level >= 6)
    add('dark-ones-own-luck', 'Dunkler eigener Glücksfall', 1, 'short-or-long')
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
  if (classId === 'monk' && level >= 6 && subclass === 'openhand')
    add(
      'wholeness-of-body',
      'Ganzheit des Körpers',
      ruleset === '2024' ? Math.max(1, abilityModifier(character.abilities?.wis)) : 1,
      'long',
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
    [10, 'Göttliches Eingreifen'],
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
    [2, 'Hagel der Schläge'],
    [2, 'Geduldige Verteidigung'],
    [2, 'Schritt des Windes'],
    [2, 'Ungepanzerte Bewegung'],
    [3, 'Geschosse abwehren'],
    [5, 'Zusätzlicher Angriff'],
    [5, 'Betäubender Schlag'],
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
    [3, 'Schneidende Worte'],
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
    [2, 'Hagel der Schläge'],
    [2, 'Geduldige Verteidigung'],
    [2, 'Schritt des Windes'],
    [2, 'Ungepanzerte Bewegung'],
    [2, 'Unheimlicher Stoffwechsel'],
    [3, 'Angriffe abwehren'],
    [4, 'Attributswerterhöhung'],
    [4, 'Langsamer Fall'],
    [5, 'Zusätzlicher Angriff'],
    [5, 'Betäubender Schlag'],
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
  return result.map((feature) => {
    const active =
      (feature.name === 'Raserei' && character.ruleset === '2024') ||
      (feature.name === 'Bevorzugter Feind' && character.ruleset === '2014')
        ? undefined
        : ACTIVE_FEATURES[feature.name]
    let resourceId = active?.resourceId
    if (feature.name === 'Kanal göttlicher Energie' && character.classId === 'paladin') {
      resourceId =
        character.ruleset === '2024' ? 'channel-divinity-paladin' : 'paladin-channel-divinity'
    }
    if (feature.name === 'Heilige Waffe' && character.ruleset === '2014')
      resourceId = 'paladin-channel-divinity'
    if (feature.name === 'Hagel der Schläge')
      return {
        ...feature,
        ...active,
        resourceId: character.ruleset === '2024' ? 'focus-points' : 'ki-points',
      }
    if (feature.name === 'Geduldige Verteidigung')
      return {
        ...feature,
        ...active,
        resourceId: character.ruleset === '2014' ? 'ki-points' : undefined,
        description:
          character.ruleset === '2014'
            ? 'Du gibst einen Ki-Punkt aus, um als Bonusaktion die Ausweichen-Aktion auszuführen.'
            : 'Du kannst dich als Bonusaktion zurückziehen. Wenn du einen Fokus-Punkt ausgibst, kannst du zusätzlich ausweichen.',
      }
    if (feature.name === 'Schritt des Windes')
      return {
        ...feature,
        ...active,
        resourceId: character.ruleset === '2014' ? 'ki-points' : undefined,
        description:
          character.ruleset === '2014'
            ? 'Du gibst einen Ki-Punkt aus, um als Bonusaktion zu sprinten oder dich zurückzuziehen; deine Sprungweite verdoppelt sich für den Zug.'
            : 'Du kannst als Bonusaktion sprinten. Wenn du einen Fokus-Punkt ausgibst, kannst du zusätzlich zurückziehen und deine Sprungweite verdoppeln.',
      }
    if (feature.name === 'Tiergestalt')
      return {
        ...feature,
        ...active,
        activation: character.ruleset === '2014' ? 'action' : 'bonusAction',
        resourceId,
      }
    if (feature.name === 'Betäubender Schlag')
      return {
        ...feature,
        ...active,
        resourceId: character.ruleset === '2024' ? 'focus-points' : 'ki-points',
      }
    if (feature.name === 'Handauflegen')
      return {
        ...feature,
        ...active,
        activation: character.ruleset === '2014' ? 'action' : 'bonusAction',
        resourceId,
      }
    if (feature.name === 'Ganzheit des Körpers')
      return {
        ...feature,
        ...active,
        activation: character.ruleset === '2024' ? 'bonusAction' : 'action',
        resourceId: 'wholeness-of-body',
      }
    if (feature.name === 'Zitternde Handfläche')
      return {
        ...feature,
        ...active,
        resourceId: character.ruleset === '2024' ? 'focus-points' : 'ki-points',
        resourceCost: character.ruleset === '2024' ? 4 : 3,
      }
    return active ? { ...feature, ...active, resourceId } : feature
  })
}

export function getActiveClassFeatures(character: Character): AutomaticClassFeature[] {
  return getAutomaticClassFeatures(character).filter((feature) => feature.activation)
}
