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
  localizedName?: string
  level: number
  source: 'class' | 'subclass'
  description?: string
  activation?: 'action' | 'bonusAction' | 'reaction' | 'special'
  resourceId?: string
  resourceCost?: number
  spellbookSpellId?: string
  unlocked: boolean
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
  Rage: {
    activation: 'bonusAction',
    description:
      'Du verfällst in einen Kampfrausch. Er hält bis zu 10 Minuten an und endet vorzeitig unter den im Regelwerk genannten Bedingungen.',
    resourceId: 'rage',
  },
  'Bardic Inspiration': {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  'Cutting Words': {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur in deiner Nähe einen Wurf ablegt, kannst du eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um das Ergebnis zu verringern.',
    resourceId: 'bardic-inspiration',
  },
  "Paladin's Smite": {
    activation: 'bonusAction',
    description:
      'Du hast Göttliches Niederstrecken stets vorbereitet und kannst es einmal pro langer Rast ohne Zauberplatz wirken.',
    resourceId: 'paladin-smite',
  },
  Countercharm: {
    activation: 'action',
    description:
      'Du beginnst eine inspirierende Aufführung, die Verbündeten in deiner Nähe Vorteil auf Rettungswürfe gegen Bezauberung und Furcht gewährt.',
  },
  'Channel Divinity': {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  'Turn Undead': {
    activation: 'action',
    description:
      'Du präsentierst dein heiliges Symbol und zwingst Untote in deiner Nähe zu einem Weisheitsrettungswurf; bei Misslingen werden sie vertrieben.',
    resourceId: 'channel-divinity',
  },
  'Preserve Life': {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.',
    resourceId: 'channel-divinity',
  },
  'Wild Shape': {
    activation: 'bonusAction',
    description:
      'Du verwandelst dich in eine zulässige Tiergestalt. Die Verwandlung hält bis zu deiner Rückverwandlung oder bis zum Ablauf der Dauer an.',
    resourceId: 'wild-shape',
  },
  'Wild Companion': {
    activation: 'action',
    description:
      'Du gibst eine Nutzung deiner Tiergestalt aus, um Vertrauten finden ohne Materialkomponenten zu wirken.',
    resourceId: 'wild-shape',
  },
  "Land's Aid": {
    activation: 'action',
    description:
      'Du gibst eine Nutzung deiner Tiergestalt aus, um einen Bereich mit nekrotischer Energie zu erfüllen und eine Kreatur zu heilen.',
    resourceId: 'wild-shape',
  },
  'Second Wind': {
    activation: 'bonusAction',
    description:
      'Du gewinnst Trefferpunkte zurück. Die Höhe richtet sich nach deiner Kämpferstufe.',
    resourceId: 'second-wind',
  },
  'Action Surge': {
    activation: 'special',
    description:
      'Du kannst in diesem Zug zusätzlich zu deiner normalen Aktion eine weitere Aktion ausführen.',
    resourceId: 'action-surge',
  },
  Indomitable: {
    activation: 'special',
    description:
      'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.',
    resourceId: 'indomitable',
  },
  Ki: {
    activation: 'special',
    description:
      'Ki-Punkte sind die Ressource für besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung, Schritt des Windes und Leerer Körper.',
  },
  'Monk’s Focus': {
    activation: 'special',
    description:
      'Fokus-Punkte sind die Ressource für besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung und Schritt des Windes.',
  },
  'Lay on Hands': {
    activation: 'bonusAction',
    description:
      'Du berührst eine Kreatur und stellst Trefferpunkte aus deinem Heilungsvorrat wieder her oder neutralisierst eine Krankheit bzw. ein Gift, sofern die Regeln dies erlauben.',
    resourceId: 'lay-on-hands',
  },
  'Divine Sense': {
    activation: 'action',
    description:
      'Bis zum Ende deines nächsten Zuges nimmst du bestimmte himmlische, untote und dämonische Präsenzen in deiner Nähe wahr.',
    resourceId: 'divine-sense',
  },
  'Turn the Unholy': {
    activation: 'action',
    description:
      'Du präsentierst dein heiliges Symbol und zwingst Unholde und Untote in deiner Nähe zu einem Weisheitsrettungswurf. Bei Misslingen werden sie für bis zu eine Minute vertrieben.',
    resourceId: 'paladin-channel-divinity',
  },
  'Sacred Weapon': {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um eine gehaltene Waffe vorübergehend mit heiliger Macht zu erfüllen.',
    resourceId: 'channel-divinity-paladin',
  },
  'Innate Sorcery': {
    activation: 'bonusAction',
    description:
      'Du entfesselst deine angeborene Magie für 1 Minute und erhältst die im Merkmal beschriebenen Vorteile.',
    resourceId: 'innate-sorcery',
  },
  'Magical Cunning': {
    activation: 'action',
    description:
      'Du führst ein kurzes Ritual aus, um einen Teil deiner verbrauchten Paktmagie-Zauberplätze zurückzugewinnen.',
    resourceId: 'magical-cunning',
  },
  'Arcane Recovery': {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'arcane-recovery',
  },
  'Natural Recovery': {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'natural-recovery',
  },
  'Intimidating Presence': {
    activation: 'action',
    description:
      'Du erschreckst Kreaturen in deiner Nähe mit deiner bedrohlichen Präsenz; sie müssen einen Weisheitsrettungswurf bestehen.',
  },
  Retaliation: {
    activation: 'reaction',
    description:
      'Wenn dich eine Kreatur in deiner Nähe verletzt, kannst du als Reaktion einen Nahkampfangriff gegen sie ausführen.',
  },
  'Fleet Step': {
    activation: 'bonusAction',
    description:
      'Du kannst Schritt des Windes einsetzen, nachdem du in diesem Zug bereits eine andere Bonusaktion verwendet hast.',
  },
  'Quivering Palm': {
    activation: 'action',
    description:
      'Du setzt Fokus-Punkte ein, um einem getroffenen Ziel tödliche Schwingungen einzuprägen und diese später auszulösen.',
    resourceId: 'focus-points',
  },
  "Thief's Reflexes": {
    activation: 'special',
    description:
      'Du kannst zu Beginn des ersten Kampfzugs unter den im Merkmal genannten Voraussetzungen einen zusätzlichen Zug erhalten.',
  },
  'Fast Hands': {
    activation: 'bonusAction',
    description:
      'Du kannst bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.',
  },
  'Uncanny Dodge': {
    activation: 'reaction',
    description:
      'Wenn dich ein sichtbarer Angreifer trifft, kannst du deine Reaktion einsetzen, um den Angriffsschaden zu halbieren.',
  },
  'Cunning Action': {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Schnelligkeit, um als Bonusaktion zu sprinten, dich zurückzuziehen oder dich zu verstecken.',
  },
  'Dragon Wings': {
    activation: 'bonusAction',
    description: 'Du manifestierst drakonische Flügel und erhältst eine Flugbewegungsrate.',
  },
  'Hurl Through Hell': {
    activation: 'special',
    description:
      'Wenn du eine Kreatur triffst, kannst du sie einmal pro Zug durch die Unteren Ebenen schleudern und ihr zusätzlichen Schaden zufügen.',
  },
  Overchannel: {
    activation: 'special',
    description:
      'Du kannst einen Magierzauber verstärken, um maximalen Schaden zu verursachen; die Anwendung birgt das im Merkmal beschriebene Risiko.',
  },
  Frenzy: {
    activation: 'bonusAction',
    description:
      'Während deines Kampfrauschs kannst du in jedem deiner Züge einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen. Wenn der Kampfrausch endet, erhältst du eine Erschöpfungsstufe.',
  },
  'Wholeness of Body': {
    activation: 'action',
    description:
      'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.',
    resourceId: 'wholeness-of-body',
  },
  'Hound of Ill Omen': {
    activation: 'bonusAction',
    description:
      'Du gibst drei Zauberpunkte aus, um einen Schattenhund zu beschwören, der ein Ziel jagt und bedrängt.',
    resourceId: 'sorcery-points',
    resourceCost: 3,
  },
  'Draconic Presence': {
    activation: 'action',
    description:
      'Du gibst fünf Zauberpunkte aus, um deine drakonische Präsenz zu entfalten und Kreaturen in deiner Nähe zu bezaubern oder zu verängstigen.',
    resourceId: 'sorcery-points',
    resourceCost: 5,
  },
  'Weapon Bond': {
    activation: 'bonusAction',
    description: 'Du kannst eine gebundene Waffe in deine Hand teleportieren.',
  },
  'Divine Intervention': {
    activation: 'action',
    description:
      'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.',
    resourceId: 'divine-intervention',
  },
  'Favored Enemy': {
    activation: 'bonusAction',
    description:
      'Du wirkst Mal des Jägers ohne Zauberplatz und nutzt dafür eine verfügbare Anwendung dieses Merkmals.',
    resourceId: 'favored-enemy',
  },
  "Dark One's Own Luck": {
    activation: 'special',
    description:
      'Wenn du einen Attributs- oder Rettungswurf ablegst, kannst du einen zusätzlichen W10 zum Ergebnis addieren.',
    resourceId: 'dark-ones-own-luck',
  },
  'Empty Body': {
    activation: 'action',
    description:
      'Du gibst vier Ki-Punkte aus, um für eine Minute unsichtbar zu werden und gegen alle Schadensarten außer Energieschaden resistent zu sein.',
    resourceId: 'ki-points',
    resourceCost: 4,
  },
  'Brutal Strike': {
    activation: 'special',
    description:
      'Wenn du während deines Kampfrauschs mit einem Stärke-Angriff triffst, kannst du einen zusätzlichen Effekt deines Brutalen Schlags wählen, etwa das Ziel wegzustoßen oder zusätzlichen Schaden zu verursachen.',
  },
  'Wild Resurgence': {
    activation: 'special',
    description:
      'Du kannst eine Nutzung deiner Tiergestalt ausgeben, um einen Zauberplatz des 1. Grades wiederherzustellen, oder einen Zauberplatz ausgeben, um eine Nutzung deiner Tiergestalt zurückzugewinnen.',
  },
  'Restoring Touch': {
    activation: 'special',
    description:
      'Wenn du Handauflegen einsetzt, kannst du zusätzlich Zustände vom Ziel entfernen. Jeder entfernte Zustand kostet fünf Trefferpunkte aus deinem Heilungsvorrat.',
    resourceId: 'lay-on-hands',
    resourceCost: 5,
  },
  'Dragon Companion': {
    activation: 'action',
    description:
      'Du beschwörst einmal nach einer langen Rast einen drakonischen Geist als Gefährten, indem du den Zauber Drachen beschwören ohne Zauberplatz und Materialkomponenten wirkst.',
    resourceId: 'dragon-companion',
  },
  'Divine Spark': {
    activation: 'action',
    description:
      'Du richtest göttliche Energie auf eine Kreatur in bis zu 9 Metern Entfernung. Du heilst sie um 1W8 plus deinen Weisheitsmodifikator oder zwingst sie zu einem Konstitutionsrettungswurf gegen gleißenden oder nekrotischen Schaden. Der Würfel steigt auf 2W8 ab Stufe 7, 3W8 ab Stufe 13 und 4W8 ab Stufe 18.',
    resourceId: 'channel-divinity',
  },
  'Cleansing Touch': {
    activation: 'action',
    description:
      'Du berührst dich selbst oder eine bereitwillige Kreatur und beendest einen Zauber, der auf ihr liegt.',
    resourceId: 'cleansing-touch',
  },
  'Sorcerous Restoration': {
    activation: 'special',
    description:
      'Nach einer kurzen Rast kannst du Zauberpunkte in Höhe von höchstens der Hälfte deiner Zaubererstufe zurückgewinnen. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.',
    resourceId: 'sorcerous-restoration',
  },
  'Cunning Strike': {
    activation: 'special',
    description:
      'Wenn du Hinterhältigen Angriffsschaden verursachst, kannst du einen oder mehrere Schadenswürfel aufgeben, um einen Listigen-Schlag-Effekt wie Vergiften, Zu-Fall-Bringen oder Zurückziehen auszulösen.',
  },
  'Devious Strikes': {
    activation: 'special',
    description:
      'Wenn du Hinterhältigen Angriffsschaden verursachst, kannst du zusätzliche Schadenswürfel aufgeben, um weitere Listige-Schläge-Effekte wie Benommenheit, Bewusstlosigkeit oder Blindheit auszulösen.',
  },
  'Reckless Attack': {
    activation: 'special',
    description:
      'Du kannst bei deinem ersten Angriff in diesem Zug Vorteil auf Stärke-Nahkampfangriffe erhalten; bis zu deinem nächsten Zug haben Angriffe gegen dich ebenfalls Vorteil.',
  },
  'Stunning Strike': {
    activation: 'special',
    description:
      'Wenn du mit einem Nahkampfangriff triffst, kannst du einen Ki- oder Fokus-Punkt ausgeben, um das Ziel zu einem Konstitutionsrettungswurf gegen Betäubung zu zwingen.',
    resourceId: 'ki-points',
  },
  'Deflect Missiles': {
    activation: 'reaction',
    description:
      'Wenn dich ein Fernkampfangriff mit einer Waffe trifft, kannst du den Schaden mit deiner Reaktion reduzieren; unter bestimmten Bedingungen kannst du das Geschoss auffangen und zurückwerfen.',
  },
  'Deflect Attacks': {
    activation: 'reaction',
    description:
      'Wenn dich ein Angriff trifft, kannst du deine Reaktion einsetzen, um den erlittenen Schaden zu reduzieren und den Angriff möglicherweise zurückzulenken.',
  },
  'Slow Fall': {
    activation: 'reaction',
    description:
      'Wenn du fällst, kannst du deine Reaktion einsetzen, um den erlittenen Fallschaden zu reduzieren.',
  },
  'Divine Smite': {
    activation: 'special',
    description:
      'Wenn du eine Kreatur mit einer Nahkampfwaffe triffst, kannst du einen Zauberplatz ausgeben, um zusätzlichen gleißenden Schaden zu verursachen.',
  },
  'Flurry of Blows': {
    activation: 'bonusAction',
    description:
      'Nach der Angriffsaktion kannst du einen Ki- oder Fokus-Punkt ausgeben, um zwei zusätzliche unbewaffnete Schläge als Bonusaktion auszuführen.',
    resourceId: 'ki-points',
  },
  'Patient Defense': {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Bonusaktion zur Verteidigung. Im Regelwerk 2024 kannst du dich kostenlos zurückziehen oder mit einem Fokus-Punkt zusätzlich ausweichen; 2014 kostet die Ausweichaktion einen Ki-Punkt.',
    resourceId: 'ki-points',
  },
  'Step of the Wind': {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Bonusaktion für Sprinten oder Zurückziehen und kannst deine Sprungweite erhöhen. Die genauen Kosten unterscheiden sich zwischen 2014 und 2024.',
    resourceId: 'ki-points',
  },
  'Font of Magic': {
    activation: 'special',
    description:
      'Du wandelst Zauberplätze in Zauberpunkte um oder gibst Zauberpunkte aus, um Zauberplätze zu erschaffen.',
  },
  'Abjure Foes': {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um ausgewählte Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht und Handlungsunfähigkeit zu belegen.',
    resourceId: 'channel-divinity-paladin',
  },
  'Peerless Skill': {
    activation: 'special',
    description:
      'Wenn du einen Attributswurf ablegst, kannst du einen Inspirationswürfel ausgeben und sein Ergebnis zum Wurf addieren.',
    resourceId: 'bardic-inspiration',
  },
  Multiattack: {
    activation: 'action',
    description:
      'Du führst eine deiner gewählten Mehrfachangriffstechniken aus: einen Angriff gegen mehrere Ziele mit Fernkampfwaffen oder mehrere Nahkampfangriffe gegen Kreaturen in deiner Reichweite.',
  },
  'Mage Hand Legerdemain': {
    activation: 'bonusAction',
    description:
      'Du kannst deine Magische Hand mit einer Bonusaktion kontrollieren und mit ihr Taschendiebstahl, das Entschärfen von Fallen oder andere geschickte Manipulationen ausführen.',
  },
  'Versatile Trickster': {
    activation: 'bonusAction',
    description:
      'Du lenkst mit deiner Magischen Hand einen Gegner ab und erhältst bis zum Ende deines Zuges Vorteil auf deine Angriffswürfe gegen ihn.',
  },
  'Spell Thief': {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur einen Zauber auf dich wirkt, kannst du versuchen, den Zauber mit deiner Reaktion zu vereiteln und seine Magie für dich zu beanspruchen.',
    resourceId: 'spell-thief',
  },
  'War Magic': {
    activation: 'special',
    description:
      'Nachdem du mit deiner Aktion einen Zaubertrick gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.',
  },
  'Improved War Magic': {
    activation: 'special',
    description:
      'Nachdem du mit deiner Aktion einen Zauber gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.',
  },
  'Arcane Charge': {
    activation: 'special',
    description:
      'Wenn du Aktionsschub einsetzt, kannst du dich vor, nach oder zwischen den Aktionen bis zu 9 Meter weit teleportieren.',
    resourceId: 'action-surge',
  },
  'Eyes of the Dark': {
    activation: 'special',
    description:
      'Du kannst Dunkelheit mit Zauberpunkten wirken und durch die von dir erzeugte magische Dunkelheit sehen.',
    resourceId: 'sorcery-points',
    resourceCost: 2,
  },
  'Strength of the Grave': {
    activation: 'reaction',
    description:
      'Wenn Schaden dich auf 0 Trefferpunkte reduzieren würde, kannst du mit einem Charisma-Rettungswurf versuchen, stattdessen mit 1 Trefferpunkt stehen zu bleiben.',
    resourceId: 'strength-of-grave',
  },
  'Shadow Walk': {
    activation: 'bonusAction',
    description:
      'Du teleportierst dich von einem Bereich mit dämmrigem Licht oder Dunkelheit zu einem freien Ort mit dämmrigem Licht oder Dunkelheit in deiner Sichtweite.',
  },
  'Umbral Form': {
    activation: 'action',
    description:
      'Du gibst sechs Zauberpunkte aus, um für bis zu eine Minute eine schattenhafte Gestalt anzunehmen, die sich durch feste Gegenstände bewegen kann.',
    resourceId: 'sorcery-points',
    resourceCost: 6,
  },
  'Faithful Steed': {
    activation: 'special',
    description:
      'Du wirkst Find Steed, ohne einen Zauberplatz auszugeben. Das beschworene Reittier folgt den Regeln des Zaubers.',
    resourceId: 'faithful-steed',
  },
  'Tactical Mind': {
    activation: 'special',
    description:
      'Wenn dir ein Attributswurf misslingt, kannst du eine Nutzung von Zweites Aufatmen ausgeben und den Wurf um einen W10 erhöhen.',
    resourceId: 'second-wind',
  },
  'Self-Restoration': {
    activation: 'special',
    description:
      'Am Ende deines Zuges kannst du einen der Zustände Bezaubert, Verängstigt oder Vergiftet beenden. Alternativ kannst du einen Fokus-Punkt ausgeben, um einen solchen Zustand sofort zu beenden.',
  },
  'Deflect Energy': {
    activation: 'reaction',
    description:
      'Wenn du mit deiner Reaktion Energieschaden abwehrst, kannst du einen Teil davon auf ein Ziel in Reichweite umlenken.',
  },
  'Greater Divine Intervention': {
    activation: 'action',
    description:
      'Du kannst die mächtigste Form deines Göttlichen Eingreifens erbitten und den dadurch gewährten göttlichen Effekt wirken.',
    resourceId: 'divine-intervention',
  },
  'Hide in Plain Sight': {
    activation: 'special',
    description:
      'Du verbringst eine Minute damit, natürliche Materialien zu sammeln und dich zu tarnen. Solange du dich nicht bewegst, bist du unter passenden natürlichen Bedingungen schwer zu entdecken.',
  },
  Vanish: {
    activation: 'bonusAction',
    description: 'Du kannst die Verstecken-Aktion als Bonusaktion ausführen.',
  },
  'Holy Nimbus': {
    activation: 'action',
    description:
      'Du entfesselst eine heilige Aura, die helles Licht ausstrahlt und feindliche Kreaturen in deiner Nähe beeinträchtigt.',
    resourceId: 'holy-nimbus',
  },
  'Eldritch Master': {
    activation: 'special',
    description:
      'Du führst eine einminütige Zwiesprache mit deinem Patron und stellst alle verbrauchten Zauberplätze deiner Paktmagie wieder her. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.',
    resourceId: 'eldritch-master',
  },
  'Contact Patron': {
    activation: 'special',
    description:
      'Du führst ein einminütiges Ritual aus, um mit deinem Patron Kontakt aufzunehmen und Kontakt zu einer anderen Ebene ohne Zauberplatz zu wirken. Den Rettungswurf des Zaubers bestehst du automatisch.',
    resourceId: 'contact-patron',
  },
  'Stroke of Luck': {
    activation: 'special',
    description:
      'Wenn ein Angriff dich verfehlt oder ein Attributswurf misslingt, kannst du das Ergebnis in einen Treffer oder einen W20-Wert von 20 verwandeln.',
    resourceId: 'stroke-of-luck',
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
      ruleset === '2024'
        ? level >= 18
          ? 4
          : level >= 6
            ? 3
            : 2
        : level >= 18
          ? 3
          : level >= 6
            ? 2
            : 1
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
  if (classId === 'druid' && subclass === 'land' && level >= (ruleset === '2024' ? 6 : 2))
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
  if (classId === 'paladin' && ruleset === '2024' && level >= 2)
    add('paladin-smite', 'Paladins Niederstrecken', 1, 'long')
  if (classId === 'paladin' && ruleset === '2024' && level >= 5)
    add('faithful-steed', 'Treues Ross', 1, 'long')
  if (classId === 'paladin' && subclass === 'devotion' && level >= 20)
    add('holy-nimbus', 'Heiliger Nimbus', 1, 'long')
  if (classId === 'warlock' && ruleset === '2024' && level >= 9)
    add('contact-patron', 'Patron kontaktieren', 1, 'long')
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
  if (classId === 'sorcerer' && ruleset === '2024' && subclass === 'draconic' && level >= 18)
    add('dragon-companion', 'Drachengefährte', 1, 'long')
  if (classId === 'sorcerer' && ruleset === '2024' && subclass === 'draconic' && level >= 14)
    add('dragon-wings', 'Drachenflügel', 1, 'long')
  if (classId === 'sorcerer' && ruleset === '2024' && level >= 5)
    add('sorcerous-restoration', 'Zauberhafte Erneuerung', 1, 'long')
  if (classId === 'paladin' && ruleset === '2014' && level >= 14)
    add(
      'cleansing-touch',
      'Reinigende Berührung',
      Math.max(1, abilityModifier(character.abilities?.cha)),
      'long',
    )
  if (classId === 'wizard' && level >= 1) add('arcane-recovery', 'Arkane Erholung', 1, 'long')
  if (classId === 'rogue' && subclass === 'arcanetrickster' && level >= 17)
    add('spell-thief', 'Zauberdieb', 1, 'long')
  if (classId === 'rogue' && level >= 20) add('stroke-of-luck', 'Glückstreffer', 1, 'short-or-long')
  if (classId === 'sorcerer' && subclass === 'shadowmagic' && level >= 1)
    add('strength-of-grave', 'Stärke des Grabes', 1, 'long')
  if (classId === 'warlock' && subclass === 'fiend' && level >= 14)
    add('hurl-through-hell', 'Durch die Hölle schicken', 1, 'long')
  if (classId === 'warlock' && level >= 20) add('eldritch-master', 'Mystischer Meister', 1, 'long')
  return resources
}

const CLASS_FEATURES: Record<string, Array<[number, string]>> = {
  barbarian: [
    [1, 'Rage'],
    [1, 'Unarmored Defense'],
    [2, 'Danger Sense'],
    [2, 'Reckless Attack'],
    [5, 'Extra Attack'],
    [5, 'Fast Movement'],
    [3, 'Primal Path'],
    [7, 'Feral Instinct'],
    [9, 'Brutal Critical'],
    [11, 'Relentless Rage'],
    [13, 'Brutal Critical'],
    [17, 'Brutal Critical'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [15, 'Persistent Rage'],
    [18, 'Indomitable Might'],
    [20, 'Primal Champion'],
  ],
  bard: [
    [1, 'Spellcasting'],
    [1, 'Bardic Inspiration'],
    [2, 'Jack of All Trades'],
    [2, 'Song of Rest'],
    [3, 'Bard College'],
    [3, 'Expertise'],
    [5, 'Font of Inspiration'],
    [6, 'Countercharm'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [10, 'Expertise'],
    [10, 'Magical Secrets'],
    [14, 'Magical Secrets'],
    [18, 'Magical Secrets'],
    [20, 'Superior Inspiration'],
  ],
  cleric: [
    [1, 'Spellcasting'],
    [1, 'Divine Domain'],
    [2, 'Channel Divinity'],
    [2, 'Turn Undead'],
    [5, 'Destroy Undead'],
    [8, 'Destroy Undead'],
    [11, 'Destroy Undead'],
    [14, 'Destroy Undead'],
    [17, 'Destroy Undead'],
    [10, 'Divine Intervention'],
    [20, 'Divine Intervention'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
  ],
  druid: [
    [1, 'Druidic'],
    [1, 'Spellcasting'],
    [2, 'Druid Circle'],
    [2, 'Wild Shape'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [18, 'Timeless Body'],
    [18, 'Beast Spells'],
    [20, 'Archdruid'],
  ],
  fighter: [
    [1, 'Fighting Style'],
    [1, 'Second Wind'],
    [2, 'Action Surge'],
    [17, 'Additional Action Surge Use'],
    [3, 'Martial Archetype'],
    [5, 'Extra Attack'],
    [11, 'Extra Attack'],
    [20, 'Extra Attack'],
    [9, 'Indomitable'],
    [13, 'Indomitable'],
    [17, 'Indomitable'],
    [4, 'Ability Score Improvement'],
    [6, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [14, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
  ],
  monk: [
    [1, 'Martial Arts'],
    [1, 'Unarmored Defense'],
    [3, 'Monastic Tradition'],
    [2, 'Ki'],
    [2, 'Flurry of Blows'],
    [2, 'Patient Defense'],
    [2, 'Step of the Wind'],
    [2, 'Unarmored Movement'],
    [3, 'Deflect Missiles'],
    [4, 'Slow Fall'],
    [5, 'Extra Attack'],
    [5, 'Stunning Strike'],
    [6, 'Ki-Empowered Strikes'],
    [7, 'Evasion'],
    [7, 'Stillness of Mind'],
    [10, 'Purity of Body'],
    [13, 'Tongue of the Sun and Moon'],
    [15, 'Timeless Body'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [14, 'Diamond Soul'],
    [18, 'Empty Body'],
    [20, 'Perfect Self'],
  ],
  paladin: [
    [1, 'Divine Sense'],
    [1, 'Lay on Hands'],
    [2, 'Fighting Style'],
    [2, 'Spellcasting'],
    [2, 'Divine Smite'],
    [3, 'Divine Health'],
    [3, 'Sacred Oath'],
    [5, 'Extra Attack'],
    [6, 'Aura of Protection'],
    [10, 'Aura of Courage'],
    [18, 'Aura Improvements'],
    [11, 'Improved Divine Smite'],
    [14, 'Cleansing Touch'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
  ],
  ranger: [
    [1, 'Favored Enemy'],
    [1, 'Natural Explorer'],
    [2, 'Fighting Style'],
    [2, 'Spellcasting'],
    [3, 'Ranger Archetype'],
    [5, 'Extra Attack'],
    [8, 'Land’s Stride'],
    [10, 'Hide in Plain Sight'],
    [14, 'Vanish'],
    [18, 'Feral Senses'],
    [20, 'Foe Slayer'],
    [3, 'Primeval Awareness'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
  ],
  rogue: [
    [1, 'Expertise'],
    [6, 'Expertise'],
    [1, 'Sneak Attack'],
    [1, 'Thieves’ Cant'],
    [2, 'Cunning Action'],
    [3, 'Roguish Archetype'],
    [5, 'Uncanny Dodge'],
    [7, 'Evasion'],
    [11, 'Reliable Talent'],
    [14, 'Blindsense'],
    [15, 'Slippery Mind'],
    [18, 'Elusive'],
    [20, 'Stroke of Luck'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [10, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
  ],
  sorcerer: [
    [1, 'Spellcasting'],
    [1, 'Sorcerous Origin'],
    [2, 'Font of Magic'],
    [3, 'Metamagic'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [20, 'Sorcerous Restoration'],
  ],
  warlock: [
    [1, 'Otherworldly Patron'],
    [1, 'Pact Magic'],
    [2, 'Eldritch Invocations'],
    [5, 'Additional Eldritch Invocations'],
    [7, 'Additional Eldritch Invocations'],
    [9, 'Additional Eldritch Invocations'],
    [12, 'Additional Eldritch Invocations'],
    [15, 'Additional Eldritch Invocations'],
    [18, 'Additional Eldritch Invocations'],
    [3, 'Pact Boon'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [11, 'Mystic Arcanum'],
    [13, 'Mystic Arcanum'],
    [15, 'Mystic Arcanum'],
    [17, 'Mystic Arcanum'],
    [20, 'Eldritch Master'],
  ],
  wizard: [
    [1, 'Spellcasting'],
    [1, 'Arcane Recovery'],
    [2, 'Arcane Tradition'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [19, 'Ability Score Improvement'],
    [18, 'Spell Mastery'],
    [20, 'Signature Spells'],
  ],
}
const SUBCLASS_FEATURES: Record<string, Array<[number, string]>> = {
  berserker: [
    [3, 'Frenzy'],
    [6, 'Mindless Rage'],
    [10, 'Intimidating Presence'],
    [14, 'Retaliation'],
  ],
  lore: [
    [3, 'Bonus Proficiencies'],
    [3, 'Cutting Words'],
    [6, 'Additional Magical Secrets'],
    [14, 'Peerless Skill'],
  ],
  life: [
    [1, 'Bonus Proficiency'],
    [1, 'Life Domain Spells'],
    [1, 'Disciple of Life'],
    [2, 'Preserve Life'],
    [6, 'Blessed Healer'],
    [8, 'Divine Strike'],
  ],
  land: [
    [2, 'Bonus Cantrip'],
    [2, 'Natural Recovery'],
    [2, 'Circle Spells'],
    [6, 'Land’s Stride'],
    [10, 'Nature’s Ward'],
    [14, 'Nature’s Sanctuary'],
  ],
  champion: [
    [3, 'Improved Critical'],
    [7, 'Remarkable Athlete'],
    [10, 'Additional Fighting Style'],
    [15, 'Superior Critical'],
    [18, 'Survivor'],
  ],
  openhand: [
    [3, 'Open Hand Technique'],
    [6, 'Wholeness of Body'],
    [11, 'Tranquility'],
    [17, 'Quivering Palm'],
  ],
  devotion: [
    [3, 'Oath Spells'],
    [3, 'Sacred Weapon'],
    [3, 'Turn the Unholy'],
    [7, 'Aura of Devotion'],
    [15, 'Purity of Spirit'],
    [20, 'Holy Nimbus'],
  ],
  hunter: [
    [3, 'Hunter’s Prey'],
    [7, 'Defensive Tactics'],
    [11, 'Multiattack'],
    [15, 'Superior Hunter’s Defense'],
  ],
  thief: [
    [3, 'Fast Hands'],
    [3, 'Second-Story Work'],
    [9, 'Supreme Sneak'],
    [13, 'Use Magic Device'],
    [17, 'Thief’s Reflexes'],
  ],
  arcanetrickster: [
    [3, 'Spellcasting'],
    [3, 'Mage Hand Legerdemain'],
    [9, 'Magical Ambush'],
    [13, 'Versatile Trickster'],
    [17, 'Spell Thief'],
  ],
  eldritchknight: [
    [3, 'Spellcasting'],
    [3, 'Weapon Bond'],
    [7, 'War Magic'],
    [10, 'Eldritch Strike'],
    [15, 'Arcane Charge'],
    [18, 'Improved War Magic'],
  ],
  draconic: [
    [1, 'Dragon Ancestor'],
    [1, 'Draconic Resilience'],
    [6, 'Elemental Affinity'],
    [14, 'Dragon Wings'],
    [18, 'Draconic Presence'],
  ],
  shadowmagic: [
    [1, 'Eyes of the Dark'],
    [1, 'Strength of the Grave'],
    [6, 'Hound of Ill Omen'],
    [14, 'Shadow Walk'],
    [18, 'Umbral Form'],
  ],
  fiend: [
    [1, 'Expanded Spell List'],
    [1, 'Dark One’s Blessing'],
    [6, "Dark One's Own Luck"],
    [10, 'Fiendish Resilience'],
    [14, 'Hurl Through Hell'],
  ],
  evocation: [
    [2, 'Evocation Savant'],
    [2, 'Sculpt Spells'],
    [6, 'Potent Cantrip'],
    [10, 'Empowered Evocation'],
    [14, 'Overchannel'],
  ],
}

const CLASS_FEATURES_2024: Record<string, Array<[number, string]>> = {
  barbarian: [
    [1, 'Rage'],
    [3, 'Barbarian Subclass'],
    [1, 'Unarmored Defense'],
    [1, 'Weapon Mastery'],
    [2, 'Danger Sense'],
    [2, 'Reckless Attack'],
    [3, 'Primal Knowledge'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Extra Attack'],
    [5, 'Fast Movement'],
    [7, 'Feral Instinct'],
    [7, 'Instinctive Pounce'],
    [9, 'Brutal Strike'],
    [11, 'Relentless Rage'],
    [13, 'Improved Brutal Strike'],
    [15, 'Persistent Rage'],
    [18, 'Indomitable Might'],
    [19, 'Epic Boon'],
    [20, 'Primal Champion'],
  ],
  bard: [
    [1, 'Bardic Inspiration'],
    [3, 'Bard Subclass'],
    [1, 'Spellcasting'],
    [2, 'Expertise'],
    [9, 'Expertise'],
    [2, 'Jack of All Trades'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Font of Inspiration'],
    [7, 'Countercharm'],
    [10, 'Magical Secrets'],
    [18, 'Superior Inspiration'],
    [19, 'Epic Boon'],
    [20, 'Words of Creation'],
  ],
  cleric: [
    [1, 'Spellcasting'],
    [1, 'Divine Order'],
    [2, 'Channel Divinity'],
    [3, 'Cleric Subclass'],
    [2, 'Divine Spark'],
    [2, 'Turn Undead'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Sear Undead'],
    [7, 'Blessed Strikes'],
    [10, 'Divine Intervention'],
    [14, 'Improved Blessed Strikes'],
    [19, 'Epic Boon'],
    [20, 'Greater Divine Intervention'],
  ],
  druid: [
    [1, 'Spellcasting'],
    [3, 'Druid Subclass'],
    [1, 'Druidic'],
    [1, 'Primal Order'],
    [2, 'Wild Shape'],
    [2, 'Wild Companion'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Wild Resurgence'],
    [7, 'Elemental Fury'],
    [15, 'Improved Elemental Fury'],
    [18, 'Beast Spells'],
    [19, 'Epic Boon'],
    [20, 'Archdruid'],
  ],
  fighter: [
    [1, 'Fighting Style'],
    [3, 'Fighter Subclass'],
    [1, 'Second Wind'],
    [1, 'Weapon Mastery'],
    [2, 'Action Surge'],
    [2, 'Tactical Mind'],
    [4, 'Ability Score Improvement'],
    [6, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [14, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Extra Attack'],
    [5, 'Tactical Shift'],
    [9, 'Indomitable'],
    [9, 'Tactical Master'],
    [11, 'Two Extra Attacks'],
    [13, 'Indomitable'],
    [13, 'Studied Attacks'],
    [17, 'Indomitable'],
    [17, 'Additional Action Surge Use'],
    [19, 'Epic Boon'],
    [20, 'Three Extra Attacks'],
  ],
  monk: [
    [1, 'Martial Arts'],
    [3, 'Monk Subclass'],
    [1, 'Unarmored Defense'],
    [2, 'Monk’s Focus'],
    [2, 'Flurry of Blows'],
    [2, 'Patient Defense'],
    [2, 'Step of the Wind'],
    [2, 'Unarmored Movement'],
    [2, 'Uncanny Metabolism'],
    [3, 'Deflect Attacks'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [4, 'Slow Fall'],
    [5, 'Extra Attack'],
    [5, 'Stunning Strike'],
    [6, 'Empowered Strikes'],
    [7, 'Evasion'],
    [9, 'Acrobatic Movement'],
    [10, 'Heightened Focus'],
    [10, 'Self-Restoration'],
    [13, 'Deflect Energy'],
    [14, 'Disciplined Survivor'],
    [15, 'Perfect Focus'],
    [18, 'Superior Defense'],
    [19, 'Epic Boon'],
    [20, 'Body and Mind'],
  ],
  paladin: [
    [1, 'Lay on Hands'],
    [3, 'Paladin Subclass'],
    [1, 'Spellcasting'],
    [1, 'Weapon Mastery'],
    [2, 'Fighting Style'],
    [2, "Paladin's Smite"],
    [3, 'Channel Divinity'],
    [3, 'Divine Sense'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Extra Attack'],
    [5, 'Faithful Steed'],
    [6, 'Aura of Protection'],
    [9, 'Abjure Foes'],
    [10, 'Aura of Courage'],
    [11, 'Radiant Strikes'],
    [14, 'Restoring Touch'],
    [18, 'Aura Expansion'],
    [19, 'Epic Boon'],
  ],
  ranger: [
    [1, 'Spellcasting'],
    [3, 'Ranger Subclass'],
    [1, 'Favored Enemy'],
    [1, 'Weapon Mastery'],
    [2, 'Deft Explorer'],
    [2, 'Fighting Style'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Extra Attack'],
    [6, 'Roving'],
    [9, 'Expertise'],
    [10, 'Tireless'],
    [13, 'Relentless Hunter'],
    [14, 'Nature’s Veil'],
    [17, 'Precise Hunter'],
    [19, 'Epic Boon'],
    [20, 'Foe Slayer'],
  ],
  rogue: [
    [1, 'Expertise'],
    [3, 'Rogue Subclass'],
    [6, 'Expertise'],
    [1, 'Sneak Attack'],
    [1, 'Thieves’ Cant'],
    [1, 'Weapon Mastery'],
    [2, 'Cunning Action'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [10, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Cunning Strike'],
    [5, 'Uncanny Dodge'],
    [7, 'Evasion'],
    [7, 'Reliable Talent'],
    [11, 'Improved Cunning Strike'],
    [14, 'Devious Strikes'],
    [15, 'Slippery Mind'],
    [18, 'Elusive'],
    [19, 'Epic Boon'],
    [20, 'Stroke of Luck'],
  ],
  sorcerer: [
    [1, 'Spellcasting'],
    [3, 'Sorcerer Subclass'],
    [1, 'Innate Sorcery'],
    [2, 'Font of Magic'],
    [2, 'Metamagic'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Sorcerous Restoration'],
    [7, 'Sorcery Incarnate'],
    [19, 'Epic Boon'],
    [10, 'Metamagic Option'],
    [17, 'Metamagic Option'],
    [20, 'Arcane Apotheosis'],
  ],
  warlock: [
    [1, 'Eldritch Invocations'],
    [2, 'Additional Eldritch Invocations'],
    [5, 'Additional Eldritch Invocations'],
    [7, 'Additional Eldritch Invocations'],
    [9, 'Additional Eldritch Invocations'],
    [12, 'Additional Eldritch Invocations'],
    [15, 'Additional Eldritch Invocations'],
    [18, 'Additional Eldritch Invocations'],
    [3, 'Otherworldly Patron'],
    [1, 'Pact Magic'],
    [2, 'Magical Cunning'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [9, 'Contact Patron'],
    [11, 'Mystic Arcanum'],
    [19, 'Epic Boon'],
    [20, 'Eldritch Master'],
  ],
  wizard: [
    [1, 'Spellcasting'],
    [3, 'Wizard Subclass'],
    [1, 'Ritual Adept'],
    [1, 'Arcane Recovery'],
    [2, 'Scholar'],
    [4, 'Ability Score Improvement'],
    [8, 'Ability Score Improvement'],
    [12, 'Ability Score Improvement'],
    [16, 'Ability Score Improvement'],
    [5, 'Memorize Spell'],
    [18, 'Spell Mastery'],
    [19, 'Epic Boon'],
    [20, 'Signature Spells'],
  ],
}
const SUBCLASS_FEATURES_2024: Record<string, Array<[number, string, string]>> = {
  barbarian: [
    [
      3,
      'Frenzy',
      'Wenn du während deines Kampfrauschs Rücksichtsloser Angriff nutzt, verursacht dein erster Treffer mit einem Stärke-Angriff zusätzlichen Schaden.',
    ],
    [
      6,
      'Mindless Rage',
      'Während des Kampfrauschs bist du immun gegen Bezaubert und Verängstigt; bestehende Zustände enden beim Beginn des Kampfrauschs.',
    ],
    [
      10,
      'Retaliation',
      'Wenn dich eine Kreatur innerhalb von 1,5 Metern verletzt, kannst du als Reaktion einen Nahkampfangriff ausführen.',
    ],
    [
      14,
      'Intimidating Presence',
      'Du kannst Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht testen lassen.',
    ],
  ],
  bard: [
    [3, 'Bonus Proficiencies', 'Du erhältst Übung in drei Fertigkeiten deiner Wahl.'],
    [
      3,
      'Cutting Words',
      'Du kannst eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um einen Wurf oder Schadenswurf eines sichtbaren Wesens zu verringern.',
    ],
    [
      6,
      'Magical Discoveries',
      'Du lernst zwei zusätzliche Zauber von der Kleriker-, Druiden- oder Magier-Zauberliste.',
    ],
    [
      14,
      'Peerless Skill',
      'Wenn du einen Attributswurf ablegst, kannst du eine Nutzung deiner Bardeninspiration einsetzen und den Würfel zum Ergebnis addieren.',
    ],
  ],
  cleric: [
    [
      3,
      'Disciple of Life',
      'Heilzauber, die du mit einem Zauberplatz wirkst, stellen zusätzliche Trefferpunkte in Höhe von 2 plus Zauberplatzgrad wieder her.',
    ],
    [
      3,
      'Life Domain Spells',
      'Die Zauber deiner Domäne sind abhängig von deiner Klerikerstufe stets vorbereitet.',
    ],
    [
      3,
      'Preserve Life',
      'Du kannst Kanal göttlicher Energie einsetzen, um Trefferpunkte auf verwundete Kreaturen in deiner Nähe zu verteilen.',
    ],
    [
      6,
      'Blessed Healer',
      'Wenn du andere mit einem Heilzauber heilst, erhältst du selbst zusätzliche Trefferpunkte zurück.',
    ],
    [8, 'Divine Strike', 'Deine Waffenangriffe verursachen zusätzlichen gleißenden Schaden.'],
    [8, 'Divine Strike', 'Deine Waffenangriffe verursachen zusätzlichen gleißenden Schaden.'],
    [
      17,
      'Supreme Healing',
      'Bei Heilwürfeln deiner Zauber verwendest du statt des Würfelwurfs den höchstmöglichen Wert.',
    ],
  ],
  druid: [
    [
      3,
      'Circle of the Land Spells',
      'Nach einer langen Rast wählst du eine Landschaft und hast deren passende Zirkelzauber vorbereitet.',
    ],
    [
      3,
      "Land's Aid",
      'Du kannst eine Nutzung deiner Tiergestalt ausgeben, um in einem Bereich nekrotischen Schaden zu verursachen und eine Kreatur zu heilen.',
    ],
    [
      6,
      'Natural Recovery',
      'Du kannst nach einer kurzen Rast Zauberplätze zurückgewinnen und erhältst zusätzliche Vorteile für deine Landzauber.',
    ],
    [
      10,
      "Nature's Ward",
      'Du bist gegen bestimmte Zustände und Umwelteinflüsse geschützt, abhängig von deiner gewählten Landschaft.',
    ],
    [
      14,
      "Nature's Sanctuary",
      'Natürliche Kreaturen können dich nicht ohne Weiteres angreifen oder sich dir feindlich nähern.',
    ],
  ],
  fighter: [
    [
      3,
      'Improved Critical',
      'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 19 oder 20 einen kritischen Treffer.',
    ],
    [
      3,
      'Remarkable Athlete',
      'Du erhältst Vorteile auf bestimmte Initiative- und körperliche Attributswürfe.',
    ],
    [7, 'Additional Fighting Style', 'Du erhältst ein weiteres Talent für Kampfstil.'],
    [
      10,
      'Heroic Warrior',
      'Zu Beginn deines Zuges kannst du Heldenmut erhalten, wenn du keinen hast.',
    ],
    [
      15,
      'Superior Critical',
      'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 18 bis 20 einen kritischen Treffer.',
    ],
    [
      18,
      'Survivor',
      'Zu Beginn deines Zuges kannst du Trefferpunkte zurückgewinnen, wenn du angeschlagen bist.',
    ],
  ],
  monk: [
    [
      3,
      'Open Hand Technique',
      'Treffer aus Hagel der Schläge können Gelegenheitsangriffe verhindern, Ziele wegstoßen oder zu Fall bringen.',
    ],
    [
      6,
      'Wholeness of Body',
      'Du kannst als Bonusaktion Trefferpunkte in Höhe deines Kampfkunstwürfels plus Weisheitsmodifikator zurückgewinnen.',
    ],
    [
      11,
      'Fleet Step',
      'Nach einer anderen Bonusaktion kannst du zusätzlich Schritt des Windes einsetzen.',
    ],
    [
      17,
      'Quivering Palm',
      'Du kannst Fokus-Punkte einsetzen, um tödliche Schwingungen in einem getroffenen Ziel zu hinterlassen.',
    ],
  ],
  paladin: [
    [
      3,
      'Oath of Devotion Spells',
      'Die Zauber deines Schwurs sind abhängig von deiner Paladinstufe stets vorbereitet.',
    ],
    [
      3,
      'Sacred Weapon',
      'Du kannst Kanal göttlicher Energie einsetzen, um eine Nahkampfwaffe vorübergehend magisch zu stärken.',
    ],
    [
      7,
      'Aura of Devotion',
      'Du und Verbündete in deiner Schutzaura seid gegen den Zustand Bezaubert immun.',
    ],
    [
      15,
      'Smite of Protection',
      'Dein Göttliches Niederstrecken gewährt dir und Verbündeten in deiner Aura vorübergehend halbe Deckung.',
    ],
    [
      20,
      'Holy Nimbus',
      'Du strahlst eine heilige Aura aus, die Licht spendet und Feinde in deiner Nähe schwächt.',
    ],
  ],
  ranger: [
    [
      3,
      "Hunter's Lore",
      'Während ein Ziel von deinem Mal des Jägers betroffen ist, erkennst du seine Schadensimmunitäten, Resistenzen und Anfälligkeiten.',
    ],
    [
      3,
      "Hunter's Prey",
      'Du wählst eine Jagdtechnik, etwa zusätzlichen Schaden gegen bereits verwundete Ziele.',
    ],
    [
      7,
      'Defensive Tactics',
      'Du erhältst eine defensive Jagdtechnik gegen Angriffe oder Flächengefahren.',
    ],
    [
      11,
      "Superior Hunter's Prey",
      'Deine Jagdtechnik wird verbessert und kann zusätzliche Ziele oder Effekte betreffen.',
    ],
    [15, 'Superior Hunter’s Defense', 'Du erhältst eine weitere defensive Jagdtechnik.'],
  ],
  rogue: [
    [
      3,
      'Fast Hands',
      'Du kannst zusätzlich bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.',
    ],
    [
      3,
      'Second-Story Work',
      'Klettern kostet dich keine zusätzliche Bewegung und Sprünge profitieren von deiner Geschicklichkeit.',
    ],
    [
      9,
      'Supreme Sneak',
      'Du kannst dich unter bestimmten Bedingungen mit einer Bonusaktion verstecken.',
    ],
    [
      13,
      'Use Magic Device',
      'Du kannst Schriftrollen und magische Gegenstände vielseitiger einsetzen.',
    ],
    [
      17,
      "Thief's Reflexes",
      'Du erhältst zu Beginn eines Kampfes einen zusätzlichen Zug unter bestimmten Voraussetzungen.',
    ],
  ],
  sorcerer: [
    [
      3,
      'Draconic Resilience',
      'Dein Trefferpunktemaximum steigt; ohne Rüstung berechnet sich deine Grund-Rüstungsklasse aus Geschicklichkeit und Charisma.',
    ],
    [
      3,
      'Draconic Spells',
      'Die Zauber deiner drakonischen Abstammung sind abhängig von deiner Zaubererstufe stets vorbereitet.',
    ],
    [
      6,
      'Elemental Affinity',
      'Du erhältst Resistenz gegen einen gewählten Drachenschadenstyp und kannst passenden Zauberschaden verstärken.',
    ],
    [
      14,
      'Dragon Wings',
      'Du kannst für eine begrenzte Zeit Flügel manifestieren und eine Flugbewegungsrate erhalten.',
    ],
    [18, 'Dragon Companion', 'Du kannst einen drakonischen Geist als Gefährten beschwören.'],
  ],
  warlock: [
    [
      3,
      "Dark One's Blessing",
      'Wenn ein Feind in deiner Nähe auf 0 Trefferpunkte sinkt, erhältst du temporäre Trefferpunkte.',
    ],
    [
      3,
      'Fiend Spells',
      'Die Zauber deines Patrons sind abhängig von deiner Hexenmeisterstufe stets vorbereitet.',
    ],
    [
      6,
      "Dark One's Own Luck",
      'Du kannst einen Attributswurf oder Rettungswurf mit einem zusätzlichen W10 verbessern.',
    ],
    [
      10,
      'Fiendish Resilience',
      'Nach einer Rast wählst du einen Schadensarttyp, gegen den du resistent bist.',
    ],
    [
      14,
      'Hurl Through Hell',
      'Einmal pro Zug kannst du ein getroffenes Ziel in die Unteren Ebenen schleudern und ihm psychischen Schaden zufügen.',
    ],
  ],
  wizard: [
    [
      3,
      'Evocation Savant',
      'Das Kopieren von Hervorrufungszaubern in dein Zauberbuch kostet weniger Zeit und Gold.',
    ],
    [
      3,
      'Potent Cantrip',
      'Deine Schadenszaubertricks verursachen auch bei erfolgreichen Rettungswürfen Schaden.',
    ],
    [
      6,
      'Sculpt Spells',
      'Du kannst sichere Bereiche für Verbündete in deinen Hervorrufungszaubern schaffen.',
    ],
    [
      10,
      'Empowered Evocation',
      'Du addierst deinen Intelligenzmodifikator zu einem Schadenswurf deiner Hervorrufungszauber.',
    ],
    [
      14,
      'Overchannel',
      'Du kannst einen Zauber verstärken, um maximalen Schaden zu verursachen, riskierst dabei aber Rückschlag.',
    ],
  ],
}

const FEATURE_LABELS_DE: Record<string, string> = {
  Rage: 'Kampfrausch',
  'Unarmored Defense': 'Ungepanzerte Verteidigung',
  'Danger Sense': 'Gefahrensinn',
  'Reckless Attack': 'Rücksichtsloser Angriff',
  'Extra Attack': 'Zusätzlicher Angriff',
  'Fast Movement': 'Schnelle Bewegung',
  'Feral Instinct': 'Wilder Instinkt',
  'Brutal Critical': 'Brutaler kritischer Treffer',
  'Relentless Rage': 'Unermüdlicher Kampfrausch',
  'Persistent Rage': 'Anhaltender Kampfrausch',
  'Indomitable Might': 'Unbezwingbare Stärke',
  'Primal Champion': 'Ursprünglicher Champion',
  Spellcasting: 'Zauberwirken',
  'Bardic Inspiration': 'Bardeninspiration',
  'Jack of All Trades': 'Alles-Könner',
  'Song of Rest': 'Lied der Rast',
  Expertise: 'Experte',
  'Font of Inspiration': 'Quelle der Inspiration',
  Countercharm: 'Gegenzauber',
  'Magical Secrets': 'Magische Geheimnisse',
  'Divine Domain': 'Göttliche Domäne',
  'Channel Divinity': 'Kanal göttlicher Energie',
  'Turn Undead': 'Untote vertreiben',
  'Destroy Undead': 'Untote zerstören',
  'Divine Strike': 'Göttlicher Schlag',
  'Divine Intervention': 'Göttliches Eingreifen',
  Druidic: 'Druidisch',
  'Wild Shape': 'Tiergestalt',
  'Timeless Body': 'Zeitloser Körper',
  'Beast Spells': 'Tierzauber',
  'Fighting Style': 'Kampfstil',
  'Second Wind': 'Zweites Aufatmen',
  'Action Surge': 'Aktionsschub',
  'Martial Archetype': 'Kampf-Archetyp',
  Indomitable: 'Unbeugsam',
  'Martial Arts': 'Kampfkünste',
  Ki: 'Ki',
  'Flurry of Blows': 'Hagel der Schläge',
  'Patient Defense': 'Geduldige Verteidigung',
  'Step of the Wind': 'Schritt des Windes',
  'Unarmored Movement': 'Ungepanzerte Bewegung',
  'Deflect Missiles': 'Geschosse abwehren',
  'Stunning Strike': 'Betäubender Schlag',
  'Ki-Empowered Strikes': 'Ki-verbesserte Schläge',
  Evasion: 'Entrinnen',
  'Purity of Body': 'Reinheit des Körpers',
  'Diamond Soul': 'Diamantseele',
  'Empty Body': 'Leerer Körper',
  'Perfect Self': 'Perfektes Selbst',
  'Divine Sense': 'Göttlicher Sinn',
  'Lay on Hands': 'Handauflegen',
  'Divine Smite': 'Göttliches Niederstrecken',
  'Divine Health': 'Göttliche Gesundheit',
  'Sacred Oath': 'Heiliger Schwur',
  'Aura of Protection': 'Aura des Schutzes',
  'Aura of Courage': 'Aura des Mutes',
  'Improved Divine Smite': 'Verbesserter göttlicher Schlag',
  'Cleansing Touch': 'Reinigende Berührung',
  'Favored Enemy': 'Bevorzugter Feind',
  'Natural Explorer': 'Erfahrener Entdecker',
  'Ranger Archetype': 'Waldläufer-Archetyp',
  'Land’s Stride': 'Landgang',
  'Hide in Plain Sight': 'Tarnung in der Wildnis',
  Vanish: 'Verschwinden',
  'Feral Senses': 'Wilde Sinne',
  'Foe Slayer': 'Feindetöter',
  'Sneak Attack': 'Hinterhältiger Angriff',
  'Thieves’ Cant': 'Diebesjargon',
  'Cunning Action': 'Listige Aktion',
  'Roguish Archetype': 'Schurken-Archetyp',
  'Uncanny Dodge': 'Unheimliches Ausweichen',
  'Reliable Talent': 'Zuverlässiges Talent',
  Blindsense: 'Blindgespür',
  'Slippery Mind': 'Schlauer Geist',
  Elusive: 'Unfassbar',
  'Stroke of Luck': 'Glückstreffer',
  'Sorcerous Origin': 'Zauberer-Abstammung',
  'Font of Magic': 'Quelle der Magie',
  Metamagic: 'Metamagie',
  'Sorcerous Restoration': 'Zauberhafte Erneuerung',
  'Pact Magic': 'Paktmagie',
  'Eldritch Invocations': 'Unheimliche Anrufungen',
  'Pact Boon': 'Paktgabe',
  'Mystic Arcanum': 'Mystisches Arkanum',
  'Eldritch Master': 'Mystischer Meister',
  'Arcane Recovery': 'Arkane Erholung',
  'Arcane Tradition': 'Arkane Tradition',
  'Spell Mastery': 'Zaubermeisterschaft',
  'Signature Spells': 'Signaturzauber',
  Frenzy: 'Raserei',
  'Mindless Rage': 'Geisteslose Wut',
  Retaliation: 'Vergeltung',
  'Intimidating Presence': 'Einschüchternde Präsenz',
  'Bonus Proficiencies': 'Zusätzliche Fertigkeiten',
  'Cutting Words': 'Schneidende Worte',
  'Additional Magical Secrets': 'Zusätzliche magische Geheimnisse',
  'Peerless Skill': 'Unvergleichliche Fertigkeit',
  'Bonus Proficiency': 'Bonus-Ausbildung',
  'Disciple of Life': 'Jünger des Lebens',
  'Preserve Life': 'Leben bewahren',
  'Blessed Healer': 'Gesegneter Heiler',
  'Bonus Spells': 'Bonus-Zauber',
  'Natural Recovery': 'Natürliche Erholung',
  "Nature's Ward": 'Schutz der Natur',
  "Nature's Sanctuary": 'Naturheiligtum',
  'Improved Critical': 'Verbesserter kritischer Treffer',
  'Remarkable Athlete': 'Bemerkenswerter Athlet',
  'Additional Fighting Style': 'Zusätzlicher Kampfstil',
  'Superior Critical': 'Überlegener kritischer Treffer',
  Survivor: 'Überlebenskünstler',
  'Open Hand Technique': 'Technik der offenen Hand',
  'Wholeness of Body': 'Ganzheit des Körpers',
  Tranquility: 'Gelassenheit',
  'Quivering Palm': 'Zitternde Handfläche',
  'Sacred Weapon': 'Heilige Waffe',
  'Turn the Unholy': 'Unheilige vertreiben',
  'Divine Allegiance': 'Untadeliger Geist',
  'Aura of Devotion': 'Aura der Hingabe',
  'Purity of Spirit': 'Reinheit des Geistes',
  'Holy Nimbus': 'Heiliger Nimbus',
  "Hunter's Prey": 'Jägerbeute',
  'Defensive Tactics': 'Defensive Taktiken',
  Multiattack: 'Mehrfachangriff',
  "Superior Hunter's Defense": 'Überlegene Verteidigung',
  'Fast Hands': 'Schnelle Hände',
  'Second-Story Work': 'Arbeit in luftiger Höhe',
  Stealth: 'Heimlichkeit',
  'Use Magic Device': 'Magische Gegenstände benutzen',
  "Thief's Reflexes": 'Diebesreflexe',
  'Mage Hand Legerdemain': 'Magische Hand-Tricks',
  'Magical Ambush': 'Magischer Hinterhalt',
  'Versatile Trickster': 'Vielseitiger Betrüger',
  'Spell Thief': 'Zauberdieb',
  'Weapon Bond': 'Waffenbindung',
  'War Magic': 'Kriegsmagie',
  'Eldritch Strike': 'Eldritch Strike',
  'Arcane Charge': 'Arkane Aufladung',
  'Improved War Magic': 'Verbesserte Kriegsmagie',
  'Dragon Ancestor': 'Drachenahne',
  'Elemental Affinity': 'Elementare Affinität',
  'Dragon Wings': 'Drachenflügel',
  'Draconic Presence': 'Drachenpräsenz',
  'Eyes of the Dark': 'Augen der Dunkelheit',
  'Strength of the Grave': 'Stärke des Grabes',
  'Hound of Ill Omen': 'Hund des Unheils',
  'Shadow Walk': 'Schattenwandlung',
  'Umbral Form': 'Schattenform',
  "Dark One's Blessing": 'Segnung des Dunklen',
  "Dark One's Own Luck": 'Dunkler eigener Glücksfall',
  'Fiendish Resilience': 'Unholdresilienz',
  'Hurl Through Hell': 'Durch die Hölle schicken',
  'Evocation Savant': 'Hervorrufungsexperte',
  'Sculpt Spells': 'Zauber formen',
  'Potent Cantrip': 'Kraftvoller Zaubertrick',
  'Empowered Evocation': 'Ermächtigte Hervorrufung',
  Overchannel: 'Überladung',
  'Weapon Mastery': 'Waffenmeisterschaft',
  'Primal Knowledge': 'Urwissen',
  'Instinctive Pounce': 'Instinktiver Sprung',
  'Brutal Strike': 'Brutaler Schlag',
  'Improved Brutal Strike': 'Verbesserter brutaler Schlag',
  'Epic Boon': 'Epischer Segen',
  'Superior Inspiration': 'Überlegene Inspiration',
  'Words of Creation': 'Worte der Schöpfung',
  'Divine Order': 'Göttliche Ordnung',
  'Divine Spark': 'Göttlicher Funke',
  'Ability Score Improvement': 'Attributswerterhöhung',
  'Blessed Strikes': 'Gesegnete Schläge',
  'Improved Divine Intervention': 'Verbessertes Göttliches Eingreifen',
  'Greater Divine Intervention': 'Großes Göttliches Eingreifen',
  'Primal Order': 'Ursprüngliche Ordnung',
  'Wild Companion': 'Wilder Gefährte',
  'Wild Resurgence': 'Wilde Erneuerung',
  'Elemental Fury': 'Elementare Wut',
  'Improved Elemental Fury': 'Verbesserte Elementare Wut',
  Archdruid: 'Erzdruide',
  'Tactical Mind': 'Taktischer Verstand',
  'Tactical Shift': 'Taktische Bewegung',
  'Two Extra Attacks': 'Zwei zusätzliche Angriffe',
  'Three Extra Attacks': 'Drei zusätzliche Angriffe',
  'Monk’s Focus': 'Fokus des Mönchs',
  'Uncanny Metabolism': 'Unheimlicher Stoffwechsel',
  'Deflect Attacks': 'Angriffe abwehren',
  'Slow Fall': 'Langsamer Fall',
  'Empowered Strikes': 'Verbesserte fokussierte Schläge',
  'Self-Restoration': 'Selbstheilung',
  'Deflect Energy': 'Abgelenkte Energie',
  Discipline: 'Disziplin',
  'Faithful Steed': 'Treues Ross',
  'Abjure Foes': 'Abwehrzauber',
  'Radiant Strikes': 'Strahlende Schläge',
  'Restoring Touch': 'Berührende Reinigung',
  Roving: 'Wanderer',
  Tireless: 'Zäher Jäger',
  'Relentless Hunter': 'Unermüdlicher Jäger',
  'Precise Hunter': 'Präziser Jäger',
  'Steady Aim': 'Sicheres Zielen',
  'Cunning Strike': 'Listiger Schlag',
  'Improved Cunning Strike': 'Verbesserte Listige Schläge',
  'Devious Strikes': 'Listige Schläge',
  'Innate Sorcery': 'Angeborene Magie',
  'Sorcery Incarnate': 'Zauberer-Inkarnation',
  'Metamagic Option': 'Metamagie-Option',
  'Magical Cunning': 'Magische List',
  'Contact Patron': 'Patron kontaktieren',
  'Ritual Adept': 'Ritualgelehrter',
  Scholar: 'Gelehrter',
  'Memorize Spell': 'Zauber einprägen',
  'Magical Discoveries': 'Magische Entdeckungen',
  'Life Domain Spells': 'Zauber der Lebensdomäne',
  'Supreme Healing': 'Überragende Heilung',
  'Circle of the Land Spells': 'Zauber des Landzirkels',
  "Land's Aid": 'Hilfe des Landes',
  'Heroic Warrior': 'Heroischer Krieger',
  'Fleet Step': 'Fließender Schritt',
  'Oath of Devotion Spells': 'Zauber des Schwurs der Hingabe',
  'Smite of Protection': 'Schützendes Niederstrecken',
  "Hunter's Lore": 'Jägerkunde',
  "Superior Hunter's Prey": 'Überlegene Jägerbeute',
  'Supreme Sneak': 'Meisterlicher Schleicher',
  'Draconic Resilience': 'Drakonische Widerstandskraft',
  'Draconic Spells': 'Drakonische Zauber',
  'Dragon Companion': 'Drachengefährte',
  'Fiend Spells': 'Zauber des Unholds',
  'Stillness of Mind': 'Geistesruhe',
  'Primeval Awareness': 'Uraltes Bewusstsein',
  'Tongue of the Sun and Moon': 'Zunge von Sonne und Mond',
  'Nature’s Ward': 'Schutz der Natur',
  'Nature’s Sanctuary': 'Naturheiligtum',
  'Hunter’s Prey': 'Jägerbeute',
  'Superior Hunter’s Defense': 'Überlegene Verteidigung',
  'Thief’s Reflexes': 'Diebesreflexe',
  'Dark One’s Blessing': 'Segnung des Dunklen',
  'Dark One’s Own Luck': 'Dunkler eigener Glücksfall',
  'Tongue of the Sun and the Moon': 'Zunge von Sonne und Mond',
  'Primal Path': 'Pfad der Wildnis',
  'Bard College': 'Bardenkolleg',
  'Druid Circle': 'Druidenzirkel',
  'Monastic Tradition': 'Mönchstradition',
  'Otherworldly Patron': 'Andersweltlicher Schutzherr',
  'Life Domain Spells': 'Zauber der Lebensdomäne',
  'Oath Spells': 'Schwurzauber',
  'Expanded Spell List': 'Erweiterte Zauberliste',
  'Additional Eldritch Invocations': 'Zusätzliche mystische Anrufungen',
  'Aura Improvements': 'Aura-Verbesserungen',
  'Aura Expansion': 'Aura-Ausdehnung',
  "Paladin's Smite": 'Paladins Niederstrecken',
  'Additional Action Surge Use': 'Zusätzliche Aktionsschub-Anwendung',
  "Land's Aid": 'Hilfe des Landes',
  "Nature's Ward": 'Schutz der Natur',
  "Nature's Sanctuary": 'Naturheiligtum',
  "Hunter's Lore": 'Jägerkunde',
  "Hunter's Prey": 'Jägerbeute',
  "Superior Hunter's Prey": 'Überlegene Jägerbeute',
  "Thief's Reflexes": 'Diebesreflexe',
  "Dark One's Blessing": 'Segnung des Dunklen',
  "Dark One's Own Luck": 'Dunkler eigener Glücksfall',
  'Barbarian Subclass': 'Barbaren-Unterklasse',
  'Bard Subclass': 'Barden-Unterklasse',
  'Cleric Subclass': 'Kleriker-Unterklasse',
  'Druid Subclass': 'Druiden-Unterklasse',
  'Fighter Subclass': 'Kämpfer-Unterklasse',
  'Monk Subclass': 'Mönchs-Unterklasse',
  'Paladin Subclass': 'Paladin-Unterklasse',
  'Ranger Subclass': 'Waldläufer-Unterklasse',
  'Rogue Subclass': 'Schurken-Unterklasse',
  'Sorcerer Subclass': 'Zauberer-Unterklasse',
  'Warlock Subclass': 'Hexenmeister-Unterklasse',
  'Wizard Subclass': 'Magier-Unterklasse',
  'Bonus Cantrip': 'Bonus-Zaubertrick',
  'Circle Spells': 'Zirkelzauber',
  'Land’s Stride': 'Landgang',
  Archdruid: 'Erzdruide',
  'Slow Fall': 'Langsamer Fall',
  'Sear Undead': 'Untote versengen',
  'Improved Blessed Strikes': 'Verbesserte Gesegnete Schläge',
  'Tactical Master': 'Taktischer Meister',
  'Studied Attacks': 'Studierte Angriffe',
  'Acrobatic Movement': 'Akrobatische Bewegung',
  'Heightened Focus': 'Erhöhter Fokus',
  'Disciplined Survivor': 'Disziplinierter Überlebender',
  'Perfect Focus': 'Perfekter Fokus',
  'Superior Defense': 'Überlegene Verteidigung',
  'Body and Mind': 'Körper und Geist',
  'Deft Explorer': 'Gewandter Entdecker',
  'Nature’s Veil': 'Schleier der Natur',
  'Arcane Apotheosis': 'Arkane Apotheose',
}

const FEATURE_DESCRIPTIONS_DE: Record<string, string> = {
  'Zauber der Lebensdomäne':
    'Du hast stets bestimmte Lebensdomänenzauber vorbereitet, die mit deiner Klerikerstufe wachsen. Sie zählen nicht gegen die Anzahl deiner vorbereiteten Zauber.',
  Schwurzauber: 'Du hast zusätzliche Schwurzauber auf bestimmten Paladinstufen stets vorbereitet.',
  'Erweiterte Zauberliste':
    'Die Zauberliste des Hexenmeisters wird um bestimmte Zauber erweitert, die du bei der Auswahl deiner bekannten Zauber berücksichtigen kannst.',
  'Zusätzliche mystische Anrufungen':
    'Du erhältst weitere mystische Anrufungen deiner Wahl. Die Gesamtzahl richtet sich nach deiner Hexenmeisterstufe.',
  'Aura-Verbesserungen':
    'Die Reichweite deiner Aura des Schutzes und deiner Aura des Mutes steigt von 3 auf 9 Meter.',
  'Aura-Ausdehnung': 'Der Radius deiner Aura des Schutzes steigt von 3 auf 9 Meter.',
  'Paladins Niederstrecken':
    'Du hast den Zauber Göttliches Niederstrecken stets vorbereitet und kannst ihn einmal pro langer Rast ohne Zauberplatz wirken.',
  'Zusätzliche Aktionsschub-Anwendung':
    'Du kannst Aktionsschub nun zweimal zwischen kurzen oder langen Rasten einsetzen.',
  'Meisterlicher Schleicher':
    'Wenn du dich in deinem Zug höchstens mit halber Bewegungsrate bewegst, hast du Vorteil auf Geschicklichkeitswürfe (Heimlichkeit).',
  'Drakonische Widerstandskraft':
    'Deine Trefferpunkte steigen bei jedem Zaubererlevel um 1. Ohne Rüstung beträgt deine Rüstungsklasse 13 plus Geschicklichkeitsmodifikator.',
  'Dunkler eigener Glücksfall':
    'Wenn du einen Attributswurf oder Rettungswurf ausführst, kannst du einen W10 addieren. Du kannst dies einmal pro kurzer oder langer Rast einsetzen.',

  'Barbaren-Unterklasse':
    'Du wählst einen Pfad, der deine Kampfrausch-Fähigkeiten erweitert und dir auf höheren Stufen weitere Unterklassenmerkmale gewährt.',
  'Barden-Unterklasse':
    'Du wählst ein Bardenkolleg, das deine Aufführungen und magischen Fähigkeiten spezialisiert.',
  'Kleriker-Unterklasse':
    'Du wählst eine Domäne, die deine göttlichen Fähigkeiten und deine Domänenzauber bestimmt.',
  'Druiden-Unterklasse':
    'Du trittst einem Druidenzirkel bei, der deine Verbindung zur Natur und deine Tiergestalt prägt.',
  'Kämpfer-Unterklasse':
    'Du wählst einen Archetyp, der deinen Kampfstil und deine besonderen Techniken prägt.',
  'Mönchs-Unterklasse':
    'Du wählst eine Tradition, die deine Kampfkunst und deinen Umgang mit Fokus spezialisiert.',
  'Paladin-Unterklasse':
    'Du legst einen Schwur ab, der deine heiligen Fähigkeiten und Schwurzauber bestimmt.',
  'Waldläufer-Unterklasse':
    'Du wählst einen Archetyp, der deine Jagd- und Überlebensfähigkeiten spezialisiert.',
  'Schurken-Unterklasse':
    'Du wählst einen Archetyp, der deine besonderen Fertigkeiten und Tricks erweitert.',
  'Zauberer-Unterklasse':
    'Du wählst eine magische Herkunft, die deine angeborenen Zauberkräfte prägt.',
  'Hexenmeister-Unterklasse':
    'Du schließt einen Pakt mit einem übernatürlichen Patron, der dir zusätzliche Kräfte verleiht.',
  'Magier-Unterklasse': 'Du wählst eine Magierschule, die deine arkane Spezialisierung bestimmt.',
  'Bonus-Zaubertrick': 'Du lernst einen zusätzlichen Druidenzaubertrick deiner Wahl.',
  Zirkelzauber:
    'Du erhältst zusätzliche Zauber passend zu deiner gewählten Landschaft. Diese Zauber sind immer vorbereitet und zählen nicht gegen die Zahl deiner vorbereiteten Zauber.',
  Landgang:
    'Du bewegst dich ohne zusätzliche Bewegung durch nichtmagisches schwieriges Gelände. Pflanzen mit Dornen oder Stacheln verursachen dir dabei keinen Schaden.',
  Erzdruide:
    'Du kannst Tiergestalt unbegrenzt einsetzen und bestimmte Komponenten deiner Druidenzauber auch in Tiergestalt ignorieren.',
  'Langsamer Fall':
    'Wenn du fällst, kannst du als Reaktion den Fallschaden um das Fünffache deiner Mönchsstufe reduzieren.',
  'Untote versengen':
    'Wenn du Untote vertreibst, erleiden Untote, die ihren Rettungswurf nicht bestehen, zusätzlich gleißenden Schaden.',
  'Verbesserte Gesegnete Schläge':
    'Der zusätzliche Schaden deiner Gesegneten Schläge steigt auf 2W8.',
  'Taktischer Meister':
    'Wenn du mit einer Waffe angreifst, deren Meisterschaft du beherrschst, kannst du deren Meisterschaftseigenschaft durch Drücken, Schwächen oder Verlangsamen ersetzen.',
  'Studierte Angriffe':
    'Wenn du eine Kreatur mit einem Angriff verfehlst, erhältst du Vorteil auf deinen nächsten Angriff gegen sie vor Ende deines nächsten Zuges.',
  'Akrobatische Bewegung':
    'Du kannst dich während deines Zuges an vertikalen Flächen und über Flüssigkeiten bewegen, ohne zu fallen, sofern du keine Rüstung oder keinen Schild trägst.',
  'Erhöhter Fokus':
    'Deine Fokusmanöver werden stärker: Hagel der Schläge, Geduldige Verteidigung und Schritt des Windes erhalten zusätzliche Vorteile.',
  'Disziplinierter Überlebender':
    'Du erhältst Übung in allen Rettungswürfen. Wenn dir ein Rettungswurf misslingt, kannst du einen Fokus-Punkt ausgeben, um ihn zu wiederholen.',
  'Perfekter Fokus':
    'Wenn du Initiative würfelst und Unheimlicher Stoffwechsel nicht einsetzt, kannst du verbrauchte Fokus-Punkte bis auf vier zurückgewinnen.',
  'Überlegene Verteidigung':
    'Du kannst drei Fokus-Punkte ausgeben, um eine Minute lang gegen nahezu alle Schadensarten resistent zu sein.',
  'Körper und Geist':
    'Deine Geschicklichkeit und Weisheit steigen jeweils um 4 bis zu einem Maximum von 25.',
  'Gewandter Entdecker':
    'Du erhältst Übung und Expertise in einer Fertigkeit deiner Wahl und lernst zusätzliche Sprachen.',
  'Schleier der Natur':
    'Du kannst dich als Bonusaktion unsichtbar machen, bis du angreifst oder ein Zauber endet. Die Nutzung kehrt nach einer langen Rast zurück.',
  'Arkane Apotheose':
    'Du erreichst die höchste Stufe deiner angeborenen Magie und kannst den Zauber Wunsch ohne Materialkomponenten wirken.',

  Urwissen:
    'Während deines Kampfrauschs kannst du Stärke statt eines anderen Attributs für bestimmte Fertigkeitswürfe verwenden.',
  'Instinktiver Sprung':
    'Wenn du deinen Kampfrausch als Bonusaktion beginnst, kannst du dich gleichzeitig bis zur Hälfte deiner Bewegungsrate bewegen.',
  'Verbesserter brutaler Schlag':
    'Deine Brutalen Schläge erhalten zusätzliche taktische Effekte, mit denen du Gegner weiter schwächen oder kontrollieren kannst.',
  'Metamagie-Option':
    'Du wählst eine weitere Metamagie-Option, mit der du die Wirkung deiner Zauber verändern kannst.',

  'Überlegene Inspiration':
    'Wenn du zu Beginn eines Kampfes keine Anwendungen deiner Bardeninspiration mehr hast, erhältst du eine Anwendung zurück.',
  Geistesruhe:
    'Du kannst deine Aktion einsetzen, um einen Bezauberungs- oder Furchteffekt auf dir zu beenden.',
  'Zunge von Sonne und Mond':
    'Du verstehst alle gesprochenen Sprachen. Kreaturen, die mindestens eine Sprache verstehen, können auch dich verstehen.',
  'Uraltes Bewusstsein':
    'Du kannst einen Zauberplatz ausgeben, um bestimmte Kreaturenarten in deiner Nähe für kurze Zeit wahrzunehmen.',
  'Geisteslose Wut':
    'Während deines Kampfrauschs kannst du nicht bezaubert oder verängstigt werden. Bestehende Effekte werden währenddessen unterdrückt.',
  'Zusätzliche Fertigkeiten': 'Du erhältst Übung in drei Fertigkeiten deiner Wahl.',
  'Zusätzliche magische Geheimnisse':
    'Du lernst zwei zusätzliche Zauber von beliebigen Klassenlisten, die du wirken kannst.',
  'Bemerkenswerter Athlet':
    'Du addierst einen Teil deines Übungsbonus auf bestimmte körperliche Attributswürfe und springst weiter.',
  'Reinheit des Geistes':
    'Du stehst dauerhaft unter dem Schutz des Zaubers Schutz vor Gut und Böse.',
  'Arbeit in luftiger Höhe':
    'Klettern kostet dich keine zusätzliche Bewegung. Außerdem erhöht sich deine Sprungweite um deinen Geschicklichkeitsmodifikator.',
  'Zauber formen':
    'Wenn du einen Hervorrufungszauber wirkst, kannst du geschützte Bereiche für Verbündete bestimmen, die dadurch keinen Schaden erleiden.',
  'Kraftvoller Zaubertrick':
    'Wenn eine Kreatur einen deiner Schadenszaubertricks mit einem erfolgreichen Rettungswurf abwehrt, erleidet sie trotzdem einen Teil des Schadens.',

  'Pfad der Wildnis':
    'Du wählst einen Pfad, der deine Kampfrausch-Fähigkeiten erweitert und dir weitere Merkmale auf höheren Stufen gewährt.',
  Bardenkolleg:
    'Du wählst ein Bardenkolleg, das deine Aufführungen und magischen Fähigkeiten spezialisiert.',
  Druidenzirkel:
    'Du trittst einem Druidenzirkel bei, der deine Verbindung zur Natur und deine Tiergestalt prägt.',
  Mönchstradition:
    'Du wählst eine Mönchstradition, die deine Kampfkunst und deinen Umgang mit Ki spezialisiert.',
  'Andersweltlicher Schutzherr':
    'Du schließt einen Pakt mit einem übernatürlichen Wesen, das dir Magie und weitere Klassenmerkmale verleiht.',

  'Ungepanzerte Verteidigung':
    'Deine Rüstungsklasse berechnet sich ohne Rüstung aus 10 plus deinen relevanten Attributsmodifikatoren.',
  Gefahrensinn:
    'Du erkennst Gefahren früh und hast unter den Regelbedingungen Vorteil auf bestimmte Geschicklichkeitsrettungswürfe.',
  'Zusätzlicher Angriff':
    'Wenn du die Angriffsaktion ausführst, kannst du mehr als einmal angreifen. Die genaue Anzahl hängt von deiner Klasse und Stufe ab.',
  'Schnelle Bewegung': 'Deine Bewegungsrate erhöht sich, solange du keine schwere Rüstung trägst.',
  'Wilder Instinkt':
    'Du erhältst Vorteile auf Initiativewürfe und kannst zu Kampfbeginn schneller reagieren.',
  'Brutaler kritischer Treffer':
    'Bei einem kritischen Treffer würfelst du zusätzliche Schadenswürfel für deine Nahkampfwaffenangriffe.',
  'Unermüdlicher Kampfrausch':
    'Du kannst einen misslungenen Rettungswurf während deines Kampfrauschs wiederholen.',
  'Anhaltender Kampfrausch':
    'Dein Kampfrausch endet nicht mehr vorzeitig unter den üblichen Bedingungen.',
  'Unbezwingbare Stärke':
    'Wenn dein Stärkewurf niedriger als dein Stärkewert ist, kannst du stattdessen deinen Stärkewert verwenden.',
  'Ursprünglicher Champion':
    'Deine Stärke und dein Konstitutionswert steigen, ebenso ihre jeweiligen Höchstwerte.',
  'Alles-Könner':
    'Du addierst die Hälfte deines Übungsbonus auf Attributswürfe, bei denen du deinen Übungsbonus nicht bereits verwendest.',
  'Lied der Rast':
    'Verbündete können während einer kurzen Rast zusätzliche Trefferpunkte zurückgewinnen, wenn du sie mit Musik oder einer Aufführung begleitest.',
  'Quelle der Inspiration':
    'Du erhältst verbrauchte Anwendungen deiner Bardeninspiration nach einer kurzen oder langen Rast zurück.',
  'Gegenzauberische Melodie':
    'Du nutzt eine Aufführung, um Verbündete gegen Bezauberungs- und Furchteffekte zu stärken.',
  'Magische Geheimnisse':
    'Du lernst zusätzliche Zauber, die normalerweise nicht auf der Bardenzauberliste stehen.',
  'Göttliche Domäne':
    'Du wählst eine Domäne, die dir zusätzliche Merkmale und Domänenzauber gewährt.',
  'Untote zerstören':
    'Untote mit einem bestimmten Herausforderungsgrad oder niedriger werden durch dein Untote-Vertreiben-Merkmal zerstört.',
  'Göttlicher Schlag':
    'Einmal pro Zug verursachst du bei einem Treffer zusätzlichen Schaden mit deiner Waffe oder deinen Zaubern.',
  'Zeitloser Körper': 'Die Magie der Natur verlangsamt deine körperliche Alterung.',
  Tierzauber: 'Du kannst bestimmte Zauber wirken, während du Tiergestalt verwendest.',
  Kampfstil:
    'Du spezialisierst dich auf eine bestimmte Kampfweise und erhältst einen entsprechenden regeltechnischen Vorteil.',
  'Kampf-Archetyp':
    'Du wählst eine Kämpfer-Unterklasse, die dir weitere Merkmale auf bestimmten Stufen gewährt.',
  Kampfkünste:
    'Du erhältst Vorteile für unbewaffnete Angriffe und Mönchswaffen; deine Kampfkunst bestimmt unter anderem deinen Schadenswürfel.',
  Ki: 'Du erhältst Ki-Punkte, mit denen du besondere Mönchsmerkmale einsetzt. Die Punkte kehren nach einer kurzen oder langen Rast zurück.',
  'Ungepanzerte Bewegung':
    'Deine Bewegungsrate steigt, solange du keine Rüstung und keinen Schild trägst.',
  'Geschosse abwehren':
    'Du kannst den Schaden eines Fernkampfangriffs mit deiner Reaktion reduzieren und das Geschoss gegebenenfalls zurückwerfen.',
  'Ki-verbesserte Schläge':
    'Deine unbewaffneten Angriffe gelten als magisch, um Resistenzen und Immunitäten zu überwinden.',
  Entrinnen:
    'Bei bestimmten Flächengefahren erleidest du bei einem erfolgreichen Geschicklichkeitsrettungswurf keinen Schaden und bei einem misslungenen nur halben.',
  'Reinheit des Körpers': 'Du bist immun gegen Krankheiten und Gifte.',
  Diamantseele:
    'Du erhältst Übung in allen Rettungswürfen und kannst Ki einsetzen, um einen misslungenen Rettungswurf zu wiederholen.',
  'Perfektes Selbst':
    'Wenn du zu Beginn eines Kampfes keine Ki-Punkte mehr hast, erhältst du einen Teil davon zurück.',
  'Göttliche Gesundheit': 'Du bist immun gegen Krankheiten.',
  'Heiliger Schwur':
    'Du wählst einen Paladin-Schwur, der dir zusätzliche Merkmale und Schwurzauber gewährt.',
  'Aura des Schutzes':
    'Du und Verbündete in deiner Nähe addieren deinen Charismamodifikator auf Rettungswürfe.',
  'Aura des Mutes':
    'Du und Verbündete in deiner Nähe können nicht verängstigt werden, solange du bei Bewusstsein bist.',
  'Verbesserter göttlicher Schlag':
    'Deine Nahkampfwaffenangriffe verursachen zusätzlich gleißenden Schaden.',
  'Erfahrener Entdecker':
    'Du erhältst Expertise in ausgewählten Fertigkeiten und zusätzliche Vorteile beim Erkunden.',
  'Waldläufer-Archetyp':
    'Du wählst eine Waldläufer-Unterklasse, die dir weitere Merkmale auf bestimmten Stufen gewährt.',
  Landgang:
    'Du bewegst dich leichter durch schwieriges natürliches Gelände und widerstehst bestimmten pflanzlichen Gefahren.',
  'Wilde Sinne':
    'Du kannst die Anwesenheit von Kreaturen wahrnehmen, auch wenn du sie nicht sehen kannst.',
  Feindetöter:
    'Du addierst deinen Weisheitsmodifikator zu bestimmten Angriffswürfen oder Schadenswürfen gegen deine bevorzugten Feinde.',
  'Hinterhältiger Angriff':
    'Einmal pro Zug verursachst du zusätzlichen Schaden, wenn du unter den festgelegten Bedingungen mit einem passenden Angriff triffst.',
  Diebesjargon:
    'Du kennst eine geheime Mischung aus Dialekt, Code und Zeichen, mit der sich Schurken austauschen.',
  'Schurken-Archetyp':
    'Du wählst eine Schurken-Unterklasse, die dir weitere Merkmale auf bestimmten Stufen gewährt.',
  'Zuverlässiges Talent':
    'Bei Fertigkeits- und Werkzeugwürfen mit Übung zählt ein niedriger W20-Wurf mindestens als 10.',
  Blindgespür:
    'Du bemerkst die Position verborgener oder unsichtbarer Kreaturen in deiner Nähe, sofern sie nicht vollständig verborgen sind.',
  Entschlüpfen:
    'Angriffe gegen dich können keinen Vorteil erhalten, solange du nicht kampfunfähig bist.',
  Unfassbar: 'Du bist außergewöhnlich schwer zu treffen und kannst Angriffen geschickt ausweichen.',
  'Zauberer-Abstammung':
    'Du wählst die magische Herkunft deiner Zauberkräfte und erhältst passende Unterklassenmerkmale.',
  Metamagie:
    'Du veränderst die Wirkung deiner Zauber, indem du Zauberpunkte für Metamagie-Optionen ausgibst.',
  'Zauberer-Apotheose':
    'Du kannst deine Zauberkräfte kurzzeitig erneuern und erhältst einen letzten Vorteil deiner Klasse.',
  Paktmagie:
    'Du wirkst Zauber mit Paktmagie-Zauberplätzen, die nach einer kurzen oder langen Rast zurückkehren.',
  'Unheimliche Anrufungen':
    'Du erhältst übernatürliche Fähigkeiten durch Anrufungen, die du aus einer Liste auswählst.',
  Paktgabe:
    'Dein Patron gewährt dir eine Paktgabe, die deine Spielweise und weitere Optionen prägt.',
  'Mystisches Arkanum':
    'Du erhältst jeweils einen besonders mächtigen Zauber eines höheren Grades, den du einmal pro langer Rast wirken kannst.',
  'Arkane Tradition':
    'Du wählst eine Magierschule, die dir zusätzliche Merkmale auf bestimmten Stufen gewährt.',
  Zaubermeisterschaft: 'Du kannst ausgewählte Zauber niedriger Grade ohne Zauberplatz wirken.',
  Signaturzauber:
    'Du wählst zwei Zauber, die du jeweils einmal ohne Zauberplatz wirken kannst und nach einer kurzen oder langen Rast zurückerhältst.',
  Waffenmeisterschaft: 'Du nutzt die Meisterschaftseigenschaften deiner geübten Waffen.',
  'Taktischer Verstand':
    'Du kannst eine Nutzung von Zweites Aufatmen einsetzen, um einen misslungenen Attributswurf zu verbessern.',
  'Taktische Bewegung':
    'Wenn du Zweites Aufatmen einsetzt, kannst du dich zusätzlich bewegen, ohne Gelegenheitsangriffe auszulösen.',
  'Zwei zusätzliche Angriffe': 'Du kannst bei der Angriffsaktion dreimal statt einmal angreifen.',
  'Drei zusätzliche Angriffe': 'Du kannst bei der Angriffsaktion viermal statt einmal angreifen.',
  Attributswerterhöhung:
    'Du erhöhst einen oder mehrere Attributswerte oder wählst stattdessen ein zulässiges Talent.',
  'Epischer Segen':
    'Du erhältst ein Talent des Epischen Segens oder ein anderes Talent, für das du die Voraussetzungen erfüllst.',
  Expertise: 'Du verdoppelst deinen Übungsbonus für ausgewählte Fertigkeiten oder Werkzeuge.',
  Zauberwirken:
    'Du erhältst die Fähigkeit, Zauber deiner Klasse vorzubereiten oder zu kennen und mit den Klassenregeln zu wirken.',
  'Göttliche Ordnung':
    'Du wählst eine göttliche Ausrichtung, die dir zusätzliche Fertigkeits- oder Zauberoptionen gewährt.',
  'Gesegnete Schläge':
    'Du verstärkst deine Zaubertricks oder Waffenangriffe mit göttlicher Energie.',
  'Verbessertes Göttliches Eingreifen':
    'Dein Göttliches Eingreifen wird zuverlässiger und kann mächtigere Effekte hervorbringen.',
  'Großes Göttliches Eingreifen':
    'Du kannst ein besonders mächtiges göttliches Eingreifen erbitten.',
  Druidisch: 'Du sprichst die geheime Sprache der Druiden und erkennst ihre Zeichen.',
  'Ursprüngliche Ordnung':
    'Du wählst eine Ausrichtung, die dir zusätzliche druidische Fertigkeiten gewährt.',
  'Elementare Wut':
    'Du verstärkst deine Tiergestalt mit elementarer Macht und verursachst zusätzlichen Schaden.',
  'Verbesserte Elementare Wut': 'Deine elementaren Angriffe in Tiergestalt werden mächtiger.',
  Erzdruide:
    'Du kannst Tiergestalt unbegrenzt einsetzen und deine druidische Magie weiter meistern.',
  'Unheimlicher Stoffwechsel':
    'Du kannst Fokus-Punkte zurückgewinnen, wenn du eine kurze Rast beendest.',
  'Verbesserte fokussierte Schläge':
    'Deine fokussierten Mönchsangriffe verursachen zusätzlichen Schaden.',
  Selbstheilung: 'Du kannst deinen Körper von bestimmten Zuständen und Effekten befreien.',
  'Abgelenkte Energie':
    'Du kannst abgewehrte Energie umlenken und gegen einen anderen Gegner einsetzen.',
  Disziplin:
    'Du kannst deinen Geist und Körper durch Fokus-Punkte vor bestimmten Zuständen schützen.',
  'Überlegene Verteidigung': 'Du erhältst eine starke defensive Fähigkeit, die Fokus-Punkte nutzt.',
  'Strahlende Schläge': 'Deine Waffenangriffe verursachen zusätzlich gleißenden Schaden.',
  'Berührende Reinigung':
    'Du kannst mit Handauflegen bestimmte Zustände bei einer Kreatur beenden.',
  'Bevorzugter Feind':
    'Du kannst Mal des Jägers ohne Zauberplatz wirken und hast zusätzliche Anwendungen.',
  Wanderer: 'Du erhältst zusätzliche Bewegungs- und Erkundungsvorteile.',
  Experte: 'Du erhältst Expertise in weiteren Fertigkeiten.',
  'Zäher Jäger':
    'Du erhältst eine zusätzliche defensive oder offensive Verbesserung deiner Jagdfähigkeiten.',
  'Unermüdlicher Jäger': 'Du kannst dich besser gegen die Angriffe deiner Beute behaupten.',
  Verschwinden: 'Du kannst dich als Bonusaktion verstecken und bist schwerer aufzuspüren.',
  'Präziser Jäger': 'Deine Angriffe gegen markierte Ziele werden zuverlässiger.',
  'Listige Aktion': 'Du kannst als Bonusaktion sprinten, dich zurückziehen oder verstecken.',
  'Sicheres Zielen':
    'Du verzichtest auf Bewegung, um bei deinem nächsten Angriff in diesem Zug Vorteil zu erhalten.',
  'Listiger Schlag':
    'Du kannst bei einem Hinterhältigen Angriff Schadenswürfel gegen zusätzliche Effekte eintauschen.',
  'Verbesserte Listige Schläge': 'Du erhältst zusätzliche Optionen für deine Listigen Schläge.',
  'Listige Schläge':
    'Du kannst weitere Effekte auslösen, indem du zusätzliche Hinterhältige-Angriff-Würfel aufgibst.',
  'Schlauer Geist':
    'Du erhältst Übung in Weisheitsrettungswürfen oder kannst dich mental besser verteidigen.',
  'Zauberer-Inkarnation':
    'Du kannst Zauberpunkte ausgeben, um deine Metamagie zu verstärken und Zauber trotz fehlender Komponenten zu wirken.',
  'Magische List':
    'Du führst ein Ritual aus, um einen Teil deiner verbrauchten Paktmagie-Zauberplätze zurückzugewinnen.',
  'Patron kontaktieren':
    'Du kannst mit deinem Patron kommunizieren und einen passenden mächtigen Zauber ohne Zauberplatz wirken.',
  Ritualgelehrter:
    'Du kannst Rituale aus deinem Zauberbuch wirken und zusätzliche Rituale erlernen.',
  Gelehrter:
    'Du erhältst Expertise in einer Fertigkeit, die mit deinem magischen Studium verbunden ist.',
  'Zauber einprägen':
    'Du kannst einen Zauber nach einer kurzen Rast in dein Zauberbuch einprägen und ihn einmal ohne Zauberplatz wirken.',
  'Treues Ross': 'Du kannst das Reittier aus dem Zauber Treues Ross herbeirufen.',
  'Kanal göttlicher Energie':
    'Du bündelst göttliche Kraft und nutzt sie für besondere Klassen- oder Unterklasseneffekte.',
  'Untote vertreiben':
    'Du präsentierst dein heiliges Symbol und zwingst Untote in deiner Nähe zu einem Weisheitsrettungswurf.',
  'Leben bewahren':
    'Du verteilst einen Heilvorrat auf Kreaturen in deiner Nähe, die weniger als die Hälfte ihrer Trefferpunkte besitzen.',
  'Bonus-Ausbildung':
    'Du erhältst Übung in zusätzlichen Fertigkeiten oder mit zusätzlicher Ausrüstung.',
  'Jünger des Lebens': 'Deine Heilzauber stellen zusätzliche Trefferpunkte wieder her.',
  'Gesegneter Heiler':
    'Wenn du andere mit einem Heilzauber heilst, erhältst du selbst Trefferpunkte zurück.',
  'Überragende Heilung': 'Deine Heilzauber verwenden bei Heilwürfeln den höchstmöglichen Wert.',
  'Bonus-Zauber':
    'Du erhältst zusätzliche Zauber, die mit deiner gewählten Landschaft verbunden sind.',
  'Zusätzliche Landbewegung': 'Du bewegst dich leichter durch natürliche Landschaften.',
  'Schutz der Natur': 'Du bist gegen bestimmte natürliche Gefahren und Zustände geschützt.',
  Naturheiligtum: 'Natürliche Kreaturen können dich nicht ohne Weiteres angreifen.',
  Athlet: 'Du verbesserst deine körperlichen Fähigkeiten und bestimmte Initiativewürfe.',
  'Zusätzlicher Kampfstil': 'Du wählst einen weiteren Kampfstil.',
  'Heroischer Krieger': 'Du kannst zu Beginn deines Zuges Heldenmut erhalten, wenn du keinen hast.',
  Überlebenskünstler:
    'Du regenerierst Trefferpunkte, wenn du zu Beginn deines Zuges angeschlagen bist.',
  'Technik der offenen Hand':
    'Deine Treffer mit Hagel der Schläge können Ziele zu Fall bringen, wegstoßen oder ihre Reaktionen verhindern.',
  Gelassenheit:
    'Du kannst dich durch Meditation schützen und nach einer Rast temporäre Trefferpunkte erhalten.',
  'Zauber des Schwurs der Hingabe':
    'Du erhältst zusätzliche Schwurzauber, die stets vorbereitet sind.',
  'Aura der Hingabe': 'Du und Verbündete in deiner Aura sind gegen Bezauberung immun.',
  'Schützendes Niederstrecken':
    'Dein Göttliches Niederstrecken schützt dich und Verbündete in deiner Aura.',
  Jägerkunde:
    'Du erkennst die Resistenzen, Immunitäten und Anfälligkeiten deiner markierten Beute.',
  Jägerbeute: 'Du wählst eine Jagdtechnik, die deine Angriffe gegen Beute verbessert.',
  'Defensive Taktiken': 'Du wählst eine defensive Technik gegen Angriffe oder Flächengefahren.',
  'Überlegene Jägerbeute': 'Deine Jagdtechnik wird verbessert und erhält zusätzliche Effekte.',
  'Kletternder Meister':
    'Du erhältst eine Kletterbewegungsrate und kannst aus großer Höhe besser springen.',
  Heimlichkeit: 'Du kannst dich leichter verstecken und bist schwerer zu entdecken.',
  'Magische Gegenstände benutzen':
    'Du kannst magische Gegenstände unabhängig von üblichen Klassenbeschränkungen verwenden.',
  Diebesreflexe:
    'Du erhältst zu Beginn eines Kampfes unter bestimmten Bedingungen einen zusätzlichen Zug.',
  'Magischer Hinterhalt':
    'Kreaturen haben einen Nachteil auf Rettungswürfe gegen deine Zauber, wenn du aus dem Versteck wirkst.',
  Waffenbindung: 'Du bindest eine Waffe an dich und kannst sie herbeirufen.',
  'Eldritch Strike':
    'Deine Waffenangriffe erschweren getroffenen Kreaturen bestimmte Rettungswürfe gegen deine Zauber.',
  Drachenahne:
    'Du sprichst Drakonisch und wählst einen Drachentyp, der deine drakonische Magie prägt.',
  'Elementare Affinität':
    'Du erhältst Resistenz gegen deinen Drachenschadenstyp und kannst passenden Zauberschaden verstärken.',
  'Augen der Dunkelheit': 'Du erhältst Dunkelsicht und kannst Dunkelheit mit Zauberpunkten wirken.',
  'Stärke des Grabes':
    'Du kannst mit einer Reaktion verhindern, dass Schaden dich auf 0 Trefferpunkte reduziert.',
  Unholdresilienz:
    'Nach einer kurzen oder langen Rast wählst du eine Schadensart, gegen die du resistent bist.',
  'Segnung des Dunklen':
    'Wenn du eine Kreatur auf 0 Trefferpunkte reduzierst, erhältst du temporäre Trefferpunkte.',
  Hervorrufungsexperte:
    'Das Kopieren von Hervorrufungszaubern in dein Zauberbuch kostet weniger Zeit und Gold.',
  'Skulptur der Zauber':
    'Du kannst in deinen Hervorrufungszaubern sichere Bereiche für Verbündete schaffen.',
  'Mächtiger Zaubertrick':
    'Deine Schadenszaubertricks verursachen auch bei erfolgreichen Rettungswürfen Schaden.',
  'Ermächtigte Hervorrufung':
    'Du addierst deinen Intelligenzmodifikator zu einem Schadenswurf deiner Hervorrufungszauber.',
  'Verbesserter kritischer Treffer':
    'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 19 oder 20 einen kritischen Treffer.',
  'Überlegener kritischer Treffer':
    'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 18 bis 20 einen kritischen Treffer.',
  'Worte der Schöpfung':
    'Du lernst zwei mächtige Zauber, die deine Worte der Schöpfung verkörpern.',
  'Wilde Erneuerung':
    'Du kannst Zauberplätze und Anwendungen deiner Tiergestalt unter den festgelegten Bedingungen austauschen.',
  Tiergestalt:
    'Du verwandelst dich in eine Tiergestalt, deren Stärke und Dauer von deiner Stufe abhängen.',
  'Hilfe des Landes':
    'Du gibst eine Nutzung deiner Tiergestalt aus, um Gegner zu schädigen und eine Kreatur zu heilen.',
  'Fokus des Mönchs': 'Du nutzt Fokus-Punkte, um besondere Mönchsmanöver einzusetzen.',
  'Angriffe abwehren':
    'Du reduzierst mit deiner Reaktion den Schaden eines Angriffs und kannst ihn gegebenenfalls umlenken.',
  'Langsamer Fall': 'Du reduzierst Fallschaden mit deiner Reaktion.',
  'Betäubender Schlag':
    'Du kannst einen getroffenen Gegner mit einem Fokus- oder Ki-Punkt zu einem Konstitutionsrettungswurf zwingen.',
}

export function getAutomaticClassFeatures(character: Character): AutomaticClassFeature[] {
  const is2024 = character.ruleset === '2024'
  const catalogue = is2024 ? CLASS_FEATURES_2024 : CLASS_FEATURES
  const result: AutomaticClassFeature[] = (catalogue[character.classId] ?? []).map(
    ([level, name], index) => ({
      id: `class-${character.ruleset}-${character.classId}-${index}`,
      name,
      level,
      source: 'class',
      description:
        FEATURE_DESCRIPTIONS_DE[FEATURE_LABELS_DE[name] ?? name] ??
        'Dieses Merkmal gewährt dir einen klassenabhängigen Vorteil. Die vollständigen Regeln richten sich nach dem gewählten Regelwerk.',
      unlocked: level <= character.level,
    }),
  )
  const subclass = character.subclassId?.toLowerCase().replace(/[^a-z]/g, '') ?? ''
  if (is2024) {
    const supportedSubclass: Record<string, string> = {
      barbarian: 'berserker',
      bard: 'lore',
      cleric: 'life',
      druid: 'land',
      fighter: 'champion',
      monk: 'openhand',
      paladin: 'devotion',
      ranger: 'hunter',
      rogue: 'thief',
      sorcerer: 'draconic',
      warlock: 'fiend',
      wizard: 'evocation',
    }
    result.push(
      ...(subclass === supportedSubclass[character.classId]
        ? (SUBCLASS_FEATURES_2024[character.classId] ?? [])
        : []
      ).map(([level, name, description], index) => ({
        id: `subclass-2024-${subclass}-${index}`,
        name,
        description,
        level,
        source: 'subclass' as const,
        unlocked: level <= character.level,
      })),
    )
  } else {
    result.push(
      ...(SUBCLASS_FEATURES[subclass] ?? []).map(([level, name], index) => ({
        id: `subclass-2014-${subclass}-${index}`,
        name,
        level,
        source: 'subclass' as const,
        description:
          FEATURE_DESCRIPTIONS_DE[FEATURE_LABELS_DE[name] ?? name] ??
          'Dieses Unterklassenmerkmal gewährt dir einen zusätzlichen Vorteil. Die vollständigen Regeln richten sich nach dem gewählten Regelwerk.',
        unlocked: level <= character.level,
      })),
    )
  }
  const FEATURE_SPELLS_IN_SPELLBOOK: Record<string, string> = {
    'Wild Companion': 'srd-2024-find-familiar',
    'Faithful Steed': 'srd-2024-find-steed',
    "Paladin's Smite": 'srd-2024-divine-smite',
    'Dragon Companion': 'srd-2024-summon-dragon',
    'Favored Enemy': 'srd-2024-hunters-mark',
  }
  return result
    .sort((left, right) => left.level - right.level)
    .map((feature): AutomaticClassFeature => {
      const active =
        (feature.name === 'Frenzy' && character.ruleset === '2024') ||
        (feature.name === 'Favored Enemy' && character.ruleset === '2014')
          ? undefined
          : ACTIVE_FEATURES[feature.name]
      let resourceId = active?.resourceId
      if (feature.name === 'Channel Divinity' && character.classId === 'paladin') {
        resourceId =
          character.ruleset === '2024' ? 'channel-divinity-paladin' : 'paladin-channel-divinity'
      }
      if (feature.name === 'Sacred Weapon' && character.ruleset === '2014')
        resourceId = 'paladin-channel-divinity'
      if (feature.name === 'Turn the Unholy') resourceId = 'paladin-channel-divinity'
      if (feature.name === 'Flurry of Blows')
        return {
          ...feature,
          ...active,
          resourceId: character.ruleset === '2024' ? 'focus-points' : 'ki-points',
        }
      if (feature.name === 'Patient Defense')
        return {
          ...feature,
          ...active,
          resourceId: character.ruleset === '2014' ? 'ki-points' : undefined,
          description:
            character.ruleset === '2014'
              ? 'Du gibst einen Ki-Punkt aus, um als Bonusaktion die Ausweichen-Aktion auszuführen.'
              : 'Du kannst dich als Bonusaktion zurückziehen. Wenn du einen Fokus-Punkt ausgibst, kannst du zusätzlich ausweichen.',
        }
      if (feature.name === 'Step of the Wind')
        return {
          ...feature,
          ...active,
          resourceId: character.ruleset === '2014' ? 'ki-points' : undefined,
          description:
            character.ruleset === '2014'
              ? 'Du gibst einen Ki-Punkt aus, um als Bonusaktion zu sprinten oder dich zurückzuziehen; deine Sprungweite verdoppelt sich für den Zug.'
              : 'Du kannst als Bonusaktion sprinten oder dich zurückziehen. Wenn du einen Fokus-Punkt ausgibst, kannst du beides tun und deine Sprungweite verdoppeln.',
        }
      if (
        feature.name === 'Divine Sense' &&
        character.classId === 'paladin' &&
        character.ruleset === '2024'
      )
        return {
          ...feature,
          ...active,
          activation: 'bonusAction',
          resourceId: 'channel-divinity-paladin',
          description:
            'Du öffnest als Bonusaktion deine Sinne und erkennst für zehn Minuten Celestials, Fiends und Untote sowie geweihte oder entweihte Orte und Gegenstände in deiner Nähe.',
        }
      if (feature.name === 'Dragon Wings')
        return {
          ...feature,
          ...active,
          resourceId: character.ruleset === '2024' ? 'dragon-wings' : undefined,
          description:
            character.ruleset === '2024'
              ? 'Du manifestierst für eine Stunde Flügel und erhältst Flugbewegungsrate. Nach der Nutzung musst du lange rasten oder drei Zauberpunkte ausgeben, um die Nutzung wiederherzustellen.'
              : 'Du manifestierst drakonische Flügel und erhältst eine Flugbewegungsrate.',
        }
      if (feature.name === 'Holy Nimbus')
        return {
          ...feature,
          ...active,
          activation: character.ruleset === '2024' ? 'bonusAction' : 'action',
          resourceId: 'holy-nimbus',
        }
      if (feature.name === 'Faithful Steed')
        return {
          ...feature,
          ...active,
          activation: 'action',
          resourceId: 'faithful-steed',
          description:
            'Du wirkst Reittier finden ohne Zauberplatz und beschwörst ein treues außerweltliches Reittier.',
        }
      if (feature.name === 'Wild Shape')
        return {
          ...feature,
          ...active,
          activation: character.ruleset === '2014' ? 'action' : 'bonusAction',
          resourceId,
        }
      if (feature.name === 'Stunning Strike')
        return {
          ...feature,
          ...active,
          resourceId: character.ruleset === '2024' ? 'focus-points' : 'ki-points',
        }
      if (feature.name === 'Lay on Hands')
        return {
          ...feature,
          ...active,
          activation: character.ruleset === '2014' ? 'action' : 'bonusAction',
          resourceId,
        }
      if (feature.name === 'Wholeness of Body')
        return {
          ...feature,
          ...active,
          activation: character.ruleset === '2024' ? 'bonusAction' : 'action',
          resourceId: 'wholeness-of-body',
        }
      if (feature.name === 'Quivering Palm')
        return {
          ...feature,
          ...active,
          resourceId: character.ruleset === '2024' ? 'focus-points' : 'ki-points',
          resourceCost: character.ruleset === '2024' ? 4 : 3,
        }
      return active ? { ...feature, ...active, resourceId } : feature
    })
    .map((feature) => ({
      ...feature,
      localizedName: FEATURE_LABELS_DE[feature.name] ?? feature.name,
      name: feature.name,
      spellbookSpellId: is2024 ? FEATURE_SPELLS_IN_SPELLBOOK[feature.name] : undefined,
    }))
}

export function getSpellbookFeatureSpells(character: Character): AutomaticClassFeature[] {
  return getAutomaticClassFeatures(character).filter(
    (feature) => feature.unlocked && feature.spellbookSpellId,
  )
}
