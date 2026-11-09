import type { AutomaticClassFeature } from './classFeatures'

export interface FeatureMechanics {
  activation: NonNullable<AutomaticClassFeature['activation']>
  description: string
  resourceId?: string
  resourceCost?: number
}

/** App-specific activation and resource metadata, keyed by stable feature ID. */
export const FEATURE_MECHANICS: Record<string, FeatureMechanics> = {
  "srd-2014-class-barbarian-core-1-rage": {
    activation: 'bonusAction',
    description:
      'Du verfällst in einen Kampfrausch. Er hält bis zu 10 Minuten an und endet vorzeitig unter den im Regelwerk genannten Bedingungen.',
    resourceId: 'rage',
  },
  "srd-2024-class-barbarian-core-1-rage": {
    activation: 'bonusAction',
    description:
      'Du verfällst in einen Kampfrausch. Er hält bis zu 10 Minuten an und endet vorzeitig unter den im Regelwerk genannten Bedingungen.',
    resourceId: 'rage',
  },
  "srd-2014-class-bard-core-1-bardic-inspiration": {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2014-class-bard-core-5-bardic-inspiration": {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2014-class-bard-core-10-bardic-inspiration": {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2014-class-bard-core-15-bardic-inspiration": {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2024-class-bard-core-1-bardic-inspiration": {
    activation: 'bonusAction',
    description:
      'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2014-subclass-bard-lore-3-cutting-words": {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur in deiner Nähe einen Wurf ablegt, kannst du eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um das Ergebnis zu verringern.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2024-subclass-bard-lore-3-cutting-words": {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur in deiner Nähe einen Wurf ablegt, kannst du eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um das Ergebnis zu verringern.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2024-class-paladin-core-2-paladin-s-smite": {
    activation: 'bonusAction',
    description:
      'Du hast Göttliches Niederstrecken stets vorbereitet und kannst es einmal pro langer Rast ohne Zauberplatz wirken.',
    resourceId: 'paladin-smite',
  },
  "srd-2014-class-bard-core-6-countercharm": {
    activation: 'action',
    description:
      'Du beginnst eine inspirierende Aufführung, die Verbündeten in deiner Nähe Vorteil auf Rettungswürfe gegen Bezauberung und Furcht gewährt.',
  },
  "srd-2024-class-bard-core-7-countercharm": {
    activation: 'action',
    description:
      'Du beginnst eine inspirierende Aufführung, die Verbündeten in deiner Nähe Vorteil auf Rettungswürfe gegen Bezauberung und Furcht gewährt.',
  },
  "2014-paladin-ancients-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "2014-paladin-vengeance-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "2014-paladin-conquest-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "2014-paladin-redemption-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "2014-paladin-glory-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "2014-paladin-watchers-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "2014-paladin-crown-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2014-class-cleric-core-2-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2014-class-cleric-core-6-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2014-class-cleric-core-18-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2014-subclass-paladin-devotion-3-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2024-class-cleric-core-2-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2024-class-paladin-core-3-channel-divinity": {
    activation: 'special',
    description:
      'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.',
  },
  "srd-2024-subclass-cleric-life-3-preserve-life": {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.',
    resourceId: 'channel-divinity',
  },
  "srd-2014-class-druid-core-2-wild-shape": {
    activation: 'bonusAction',
    description:
      'Du verwandelst dich in eine zulässige Tiergestalt. Die Verwandlung hält bis zu deiner Rückverwandlung oder bis zum Ablauf der Dauer an.',
    resourceId: 'wild-shape',
  },
  "srd-2024-class-druid-core-2-wild-shape": {
    activation: 'bonusAction',
    description:
      'Du verwandelst dich in eine zulässige Tiergestalt. Die Verwandlung hält bis zu deiner Rückverwandlung oder bis zum Ablauf der Dauer an.',
    resourceId: 'wild-shape',
  },
  "srd-2024-class-druid-core-2-wild-companion": {
    activation: 'action',
    description:
      'Du gibst eine Nutzung deiner Tiergestalt aus, um Vertrauten finden ohne Materialkomponenten zu wirken.',
    resourceId: 'wild-shape',
  },
  "srd-2024-subclass-druid-land-3-land-s-aid": {
    activation: 'action',
    description:
      'Du gibst eine Nutzung deiner Tiergestalt aus, um einen Bereich mit nekrotischer Energie zu erfüllen und eine Kreatur zu heilen.',
    resourceId: 'wild-shape',
  },
  "srd-2014-class-fighter-core-1-second-wind": {
    activation: 'bonusAction',
    description:
      'Du gewinnst Trefferpunkte zurück. Die Höhe richtet sich nach deiner Kämpferstufe.',
    resourceId: 'second-wind',
  },
  "srd-2024-class-fighter-core-1-second-wind": {
    activation: 'bonusAction',
    description:
      'Du gewinnst Trefferpunkte zurück. Die Höhe richtet sich nach deiner Kämpferstufe.',
    resourceId: 'second-wind',
  },
  "srd-2014-class-fighter-core-2-action-surge": {
    activation: 'special',
    description:
      'Du kannst in diesem Zug zusätzlich zu deiner normalen Aktion eine weitere Aktion ausführen.',
    resourceId: 'action-surge',
  },
  "srd-2014-class-fighter-core-17-action-surge": {
    activation: 'special',
    description:
      'Du kannst in diesem Zug zusätzlich zu deiner normalen Aktion eine weitere Aktion ausführen.',
    resourceId: 'action-surge',
  },
  "srd-2024-class-fighter-core-2-action-surge": {
    activation: 'special',
    description:
      'Du kannst in diesem Zug zusätzlich zu deiner normalen Aktion eine weitere Aktion ausführen.',
    resourceId: 'action-surge',
  },
  "srd-2014-class-fighter-core-9-indomitable": {
    activation: 'special',
    description:
      'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.',
    resourceId: 'indomitable',
  },
  "srd-2014-class-fighter-core-13-indomitable": {
    activation: 'special',
    description:
      'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.',
    resourceId: 'indomitable',
  },
  "srd-2014-class-fighter-core-17-indomitable": {
    activation: 'special',
    description:
      'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.',
    resourceId: 'indomitable',
  },
  "srd-2024-class-fighter-core-9-indomitable": {
    activation: 'special',
    description:
      'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.',
    resourceId: 'indomitable',
  },
  "srd-2014-class-monk-core-2-ki": {
    activation: 'special',
    description:
      'Ki-Punkte sind die Ressource für besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung, Schritt des Windes und Leerer Körper.',
  },
  "srd-2014-class-paladin-core-1-lay-on-hands": {
    activation: 'bonusAction',
    description:
      'Du berührst eine Kreatur und stellst Trefferpunkte aus deinem Heilungsvorrat wieder her oder neutralisierst eine Krankheit bzw. ein Gift, sofern die Regeln dies erlauben.',
    resourceId: 'lay-on-hands',
  },
  "srd-2014-class-paladin-core-1-divine-sense": {
    activation: 'action',
    description:
      'Bis zum Ende deines nächsten Zuges nimmst du bestimmte himmlische, untote und dämonische Präsenzen in deiner Nähe wahr.',
    resourceId: 'divine-sense',
  },
  "srd-2024-subclass-paladin-devotion-3-sacred-weapon": {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um eine gehaltene Waffe vorübergehend mit heiliger Macht zu erfüllen.',
    resourceId: 'channel-divinity-paladin',
  },
  "srd-2024-class-sorcerer-core-1-innate-sorcery": {
    activation: 'bonusAction',
    description:
      'Du entfesselst deine angeborene Magie für 1 Minute und erhältst die im Merkmal beschriebenen Vorteile.',
    resourceId: 'innate-sorcery',
  },
  "srd-2024-class-warlock-core-2-magical-cunning": {
    activation: 'action',
    description:
      'Du führst ein kurzes Ritual aus, um einen Teil deiner verbrauchten Paktmagie-Zauberplätze zurückzugewinnen.',
    resourceId: 'magical-cunning',
  },
  "srd-2014-class-wizard-core-1-arcane-recovery": {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'arcane-recovery',
  },
  "srd-2024-class-wizard-core-1-arcane-recovery": {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'arcane-recovery',
  },
  "srd-2014-subclass-druid-land-2-natural-recovery": {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'natural-recovery',
  },
  "srd-2024-subclass-druid-land-6-natural-recovery": {
    activation: 'special',
    description:
      'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.',
    resourceId: 'natural-recovery',
  },
  "srd-2014-subclass-barbarian-berserker-10-intimidating-presence": {
    activation: 'action',
    description:
      'Du erschreckst Kreaturen in deiner Nähe mit deiner bedrohlichen Präsenz; sie müssen einen Weisheitsrettungswurf bestehen.',
  },
  "srd-2024-subclass-barbarian-berserker-14-intimidating-presence": {
    activation: 'action',
    description:
      'Du erschreckst Kreaturen in deiner Nähe mit deiner bedrohlichen Präsenz; sie müssen einen Weisheitsrettungswurf bestehen.',
  },
  "srd-2014-subclass-barbarian-berserker-14-retaliation": {
    activation: 'reaction',
    description:
      'Wenn dich eine Kreatur in deiner Nähe verletzt, kannst du als Reaktion einen Nahkampfangriff gegen sie ausführen.',
  },
  "srd-2024-subclass-barbarian-berserker-10-retaliation": {
    activation: 'reaction',
    description:
      'Wenn dich eine Kreatur in deiner Nähe verletzt, kannst du als Reaktion einen Nahkampfangriff gegen sie ausführen.',
  },
  "srd-2024-subclass-monk-openhand-11-fleet-step": {
    activation: 'bonusAction',
    description:
      'Du kannst Schritt des Windes einsetzen, nachdem du in diesem Zug bereits eine andere Bonusaktion verwendet hast.',
  },
  "srd-2014-subclass-monk-openhand-17-quivering-palm": {
    activation: 'action',
    description:
      'Du setzt Fokus-Punkte ein, um einem getroffenen Ziel tödliche Schwingungen einzuprägen und diese später auszulösen.',
    resourceId: 'focus-points',
  },
  "srd-2024-subclass-monk-openhand-17-quivering-palm": {
    activation: 'action',
    description:
      'Du setzt Fokus-Punkte ein, um einem getroffenen Ziel tödliche Schwingungen einzuprägen und diese später auszulösen.',
    resourceId: 'focus-points',
  },
  "srd-2014-subclass-rogue-thief-17-thiefs-reflexes": {
    activation: 'special',
    description:
      'Du kannst zu Beginn des ersten Kampfzugs unter den im Merkmal genannten Voraussetzungen einen zusätzlichen Zug erhalten.',
  },
  "srd-2024-subclass-rogue-thief-17-thief-s-reflexes": {
    activation: 'special',
    description:
      'Du kannst zu Beginn des ersten Kampfzugs unter den im Merkmal genannten Voraussetzungen einen zusätzlichen Zug erhalten.',
  },
  "srd-2014-subclass-rogue-thief-3-fast-hands": {
    activation: 'bonusAction',
    description:
      'Du kannst bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.',
  },
  "srd-2024-subclass-rogue-thief-3-fast-hands": {
    activation: 'bonusAction',
    description:
      'Du kannst bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.',
  },
  "srd-2014-class-rogue-core-5-uncanny-dodge": {
    activation: 'reaction',
    description:
      'Wenn dich ein sichtbarer Angreifer trifft, kannst du deine Reaktion einsetzen, um den Angriffsschaden zu halbieren.',
  },
  "srd-2024-class-rogue-core-5-uncanny-dodge": {
    activation: 'reaction',
    description:
      'Wenn dich ein sichtbarer Angreifer trifft, kannst du deine Reaktion einsetzen, um den Angriffsschaden zu halbieren.',
  },
  "srd-2014-class-rogue-core-2-cunning-action": {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Schnelligkeit, um als Bonusaktion zu sprinten, dich zurückzuziehen oder dich zu verstecken.',
  },
  "srd-2024-class-rogue-core-2-cunning-action": {
    activation: 'bonusAction',
    description:
      'Du nutzt deine Schnelligkeit, um als Bonusaktion zu sprinten, dich zurückzuziehen oder dich zu verstecken.',
  },
  "srd-2014-subclass-sorcerer-draconic-14-dragon-wings": {
    activation: 'bonusAction',
    description: 'Du manifestierst drakonische Flügel und erhältst eine Flugbewegungsrate.',
  },
  "srd-2024-subclass-sorcerer-draconic-14-dragon-wings": {
    activation: 'bonusAction',
    description: 'Du manifestierst drakonische Flügel und erhältst eine Flugbewegungsrate.',
  },
  "srd-2014-subclass-warlock-fiend-14-hurl-through-hell": {
    activation: 'special',
    description:
      'Wenn du eine Kreatur triffst, kannst du sie einmal pro Zug durch die Unteren Ebenen schleudern und ihr zusätzlichen Schaden zufügen.',
  },
  "srd-2024-subclass-warlock-fiend-14-hurl-through-hell": {
    activation: 'special',
    description:
      'Wenn du eine Kreatur triffst, kannst du sie einmal pro Zug durch die Unteren Ebenen schleudern und ihr zusätzlichen Schaden zufügen.',
  },
  "srd-2014-subclass-wizard-evocation-14-overchannel": {
    activation: 'special',
    description:
      'Du kannst einen Magierzauber verstärken, um maximalen Schaden zu verursachen; die Anwendung birgt das im Merkmal beschriebene Risiko.',
  },
  "srd-2024-subclass-wizard-evocation-14-overchannel": {
    activation: 'special',
    description:
      'Du kannst einen Magierzauber verstärken, um maximalen Schaden zu verursachen; die Anwendung birgt das im Merkmal beschriebene Risiko.',
  },
  "srd-2014-subclass-barbarian-berserker-3-frenzy": {
    activation: 'bonusAction',
    description:
      'Während deines Kampfrauschs kannst du in jedem deiner Züge einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen. Wenn der Kampfrausch endet, erhältst du eine Erschöpfungsstufe.',
  },
  "srd-2024-subclass-barbarian-berserker-3-frenzy": {
    activation: 'bonusAction',
    description:
      'Während deines Kampfrauschs kannst du in jedem deiner Züge einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen. Wenn der Kampfrausch endet, erhältst du eine Erschöpfungsstufe.',
  },
  "srd-2014-subclass-monk-openhand-6-wholeness-of-body": {
    activation: 'action',
    description:
      'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.',
    resourceId: 'wholeness-of-body',
  },
  "srd-2024-subclass-monk-openhand-6-wholeness-of-body": {
    activation: 'action',
    description:
      'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.',
    resourceId: 'wholeness-of-body',
  },
  "2014-sorcerer-shadowmagic-hound-of-ill-omen": {
    activation: 'bonusAction',
    description:
      'Du gibst drei Zauberpunkte aus, um einen Schattenhund zu beschwören, der ein Ziel jagt und bedrängt.',
    resourceId: 'sorcery-points',
    resourceCost: 3,
  },
  "srd-2014-subclass-sorcerer-draconic-18-draconic-presence": {
    activation: 'action',
    description:
      'Du gibst fünf Zauberpunkte aus, um deine drakonische Präsenz zu entfalten und Kreaturen in deiner Nähe zu bezaubern oder zu verängstigen.',
    resourceId: 'sorcery-points',
    resourceCost: 5,
  },
  "2014-fighter-eldritchknight-weapon-bond": {
    activation: 'bonusAction',
    description: 'Du kannst eine gebundene Waffe in deine Hand teleportieren.',
  },
  "srd-2014-class-cleric-core-10-divine-intervention": {
    activation: 'action',
    description:
      'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.',
    resourceId: 'divine-intervention',
  },
  "srd-2014-class-cleric-core-20-divine-intervention": {
    activation: 'action',
    description:
      'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.',
    resourceId: 'divine-intervention',
  },
  "srd-2024-class-cleric-core-10-divine-intervention": {
    activation: 'action',
    description:
      'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.',
    resourceId: 'divine-intervention',
  },
  "srd-2014-class-ranger-core-1-favored-enemy": {
    activation: 'bonusAction',
    description:
      'Du wirkst Mal des Jägers ohne Zauberplatz und nutzt dafür eine verfügbare Anwendung dieses Merkmals.',
    resourceId: 'favored-enemy',
  },
  "srd-2024-class-ranger-core-1-favored-enemy": {
    activation: 'bonusAction',
    description:
      'Du wirkst Mal des Jägers ohne Zauberplatz und nutzt dafür eine verfügbare Anwendung dieses Merkmals.',
    resourceId: 'favored-enemy',
  },
  "srd-2014-subclass-warlock-fiend-6-dark-ones-own-luck": {
    activation: 'special',
    description:
      'Wenn du einen Attributs- oder Rettungswurf ablegst, kannst du einen zusätzlichen W10 zum Ergebnis addieren.',
    resourceId: 'dark-ones-own-luck',
  },
  "srd-2024-subclass-warlock-fiend-6-dark-one-s-own-luck": {
    activation: 'special',
    description:
      'Wenn du einen Attributs- oder Rettungswurf ablegst, kannst du einen zusätzlichen W10 zum Ergebnis addieren.',
    resourceId: 'dark-ones-own-luck',
  },
  "srd-2014-class-monk-core-18-empty-body": {
    activation: 'action',
    description:
      'Du gibst vier Ki-Punkte aus, um für eine Minute unsichtbar zu werden und gegen alle Schadensarten außer Energieschaden resistent zu sein.',
    resourceId: 'ki-points',
    resourceCost: 4,
  },
  "srd-2024-class-barbarian-core-9-brutal-strike": {
    activation: 'special',
    description:
      'Wenn du während deines Kampfrauschs mit einem Stärke-Angriff triffst, kannst du einen zusätzlichen Effekt deines Brutalen Schlags wählen, etwa das Ziel wegzustoßen oder zusätzlichen Schaden zu verursachen.',
  },
  "srd-2024-class-druid-core-5-wild-resurgence": {
    activation: 'special',
    description:
      'Du kannst eine Nutzung deiner Tiergestalt ausgeben, um einen Zauberplatz des 1. Grades wiederherzustellen, oder einen Zauberplatz ausgeben, um eine Nutzung deiner Tiergestalt zurückzugewinnen.',
  },
  "srd-2024-class-paladin-core-14-restoring-touch": {
    activation: 'special',
    description:
      'Wenn du Handauflegen einsetzt, kannst du zusätzlich Zustände vom Ziel entfernen. Jeder entfernte Zustand kostet fünf Trefferpunkte aus deinem Heilungsvorrat.',
    resourceId: 'lay-on-hands',
    resourceCost: 5,
  },
  "srd-2024-subclass-sorcerer-draconic-18-dragon-companion": {
    activation: 'action',
    description:
      'Du beschwörst einmal nach einer langen Rast einen drakonischen Geist als Gefährten, indem du den Zauber Drachen beschwören ohne Zauberplatz und Materialkomponenten wirkst.',
    resourceId: 'dragon-companion',
  },
  "srd-2014-class-paladin-core-14-cleansing-touch": {
    activation: 'action',
    description:
      'Du berührst dich selbst oder eine bereitwillige Kreatur und beendest einen Zauber, der auf ihr liegt.',
    resourceId: 'cleansing-touch',
  },
  "srd-2014-class-sorcerer-core-20-sorcerous-restoration": {
    activation: 'special',
    description:
      'Nach einer kurzen Rast kannst du Zauberpunkte in Höhe von höchstens der Hälfte deiner Zaubererstufe zurückgewinnen. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.',
    resourceId: 'sorcerous-restoration',
  },
  "srd-2024-class-sorcerer-core-5-sorcerous-restoration": {
    activation: 'special',
    description:
      'Nach einer kurzen Rast kannst du Zauberpunkte in Höhe von höchstens der Hälfte deiner Zaubererstufe zurückgewinnen. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.',
    resourceId: 'sorcerous-restoration',
  },
  "srd-2024-class-rogue-core-5-cunning-strike": {
    activation: 'special',
    description:
      'Wenn du Hinterhältigen Angriffsschaden verursachst, kannst du einen oder mehrere Schadenswürfel aufgeben, um einen Listigen-Schlag-Effekt wie Vergiften, Zu-Fall-Bringen oder Zurückziehen auszulösen.',
  },
  "srd-2024-class-rogue-core-14-devious-strikes": {
    activation: 'special',
    description:
      'Wenn du Hinterhältigen Angriffsschaden verursachst, kannst du zusätzliche Schadenswürfel aufgeben, um weitere Listige-Schläge-Effekte wie Benommenheit, Bewusstlosigkeit oder Blindheit auszulösen.',
  },
  "srd-2014-class-barbarian-core-2-reckless-attack": {
    activation: 'special',
    description:
      'Du kannst bei deinem ersten Angriff in diesem Zug Vorteil auf Stärke-Nahkampfangriffe erhalten; bis zu deinem nächsten Zug haben Angriffe gegen dich ebenfalls Vorteil.',
  },
  "srd-2024-class-barbarian-core-2-reckless-attack": {
    activation: 'special',
    description:
      'Du kannst bei deinem ersten Angriff in diesem Zug Vorteil auf Stärke-Nahkampfangriffe erhalten; bis zu deinem nächsten Zug haben Angriffe gegen dich ebenfalls Vorteil.',
  },
  "srd-2014-class-monk-core-5-stunning-strike": {
    activation: 'special',
    description:
      'Wenn du mit einem Nahkampfangriff triffst, kannst du einen Ki- oder Fokus-Punkt ausgeben, um das Ziel zu einem Konstitutionsrettungswurf gegen Betäubung zu zwingen.',
    resourceId: 'ki-points',
  },
  "srd-2024-class-monk-core-5-stunning-strike": {
    activation: 'special',
    description:
      'Wenn du mit einem Nahkampfangriff triffst, kannst du einen Ki- oder Fokus-Punkt ausgeben, um das Ziel zu einem Konstitutionsrettungswurf gegen Betäubung zu zwingen.',
    resourceId: 'ki-points',
  },
  "srd-2014-class-monk-core-3-deflect-missiles": {
    activation: 'reaction',
    description:
      'Wenn dich ein Fernkampfangriff mit einer Waffe trifft, kannst du den Schaden mit deiner Reaktion reduzieren; unter bestimmten Bedingungen kannst du das Geschoss auffangen und zurückwerfen.',
  },
  "srd-2024-class-monk-core-3-deflect-attacks": {
    activation: 'reaction',
    description:
      'Wenn dich ein Angriff trifft, kannst du deine Reaktion einsetzen, um den erlittenen Schaden zu reduzieren und den Angriff möglicherweise zurückzulenken.',
  },
  "srd-2014-class-monk-core-4-slow-fall": {
    activation: 'reaction',
    description:
      'Wenn du fällst, kannst du deine Reaktion einsetzen, um den erlittenen Fallschaden zu reduzieren.',
  },
  "srd-2024-class-monk-core-4-slow-fall": {
    activation: 'reaction',
    description:
      'Wenn du fällst, kannst du deine Reaktion einsetzen, um den erlittenen Fallschaden zu reduzieren.',
  },
  "srd-2014-class-paladin-core-2-divine-smite": {
    activation: 'special',
    description:
      'Wenn du eine Kreatur mit einer Nahkampfwaffe triffst, kannst du einen Zauberplatz ausgeben, um zusätzlichen gleißenden Schaden zu verursachen.',
  },
  "srd-2014-class-sorcerer-core-2-font-of-magic": {
    activation: 'special',
    description:
      'Du wandelst Zauberplätze in Zauberpunkte um oder gibst Zauberpunkte aus, um Zauberplätze zu erschaffen.',
  },
  "srd-2024-class-sorcerer-core-2-font-of-magic": {
    activation: 'special',
    description:
      'Du wandelst Zauberplätze in Zauberpunkte um oder gibst Zauberpunkte aus, um Zauberplätze zu erschaffen.',
  },
  "srd-2024-class-paladin-core-9-abjure-foes": {
    activation: 'action',
    description:
      'Du setzt Kanal göttlicher Energie ein, um ausgewählte Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht und Handlungsunfähigkeit zu belegen.',
    resourceId: 'channel-divinity-paladin',
  },
  "srd-2014-subclass-bard-lore-14-peerless-skill": {
    activation: 'special',
    description:
      'Wenn du einen Attributswurf ablegst, kannst du einen Inspirationswürfel ausgeben und sein Ergebnis zum Wurf addieren.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2024-subclass-bard-lore-14-peerless-skill": {
    activation: 'special',
    description:
      'Wenn du einen Attributswurf ablegst, kannst du einen Inspirationswürfel ausgeben und sein Ergebnis zum Wurf addieren.',
    resourceId: 'bardic-inspiration',
  },
  "srd-2014-subclass-ranger-hunter-11-multiattack": {
    activation: 'action',
    description:
      'Du führst eine deiner gewählten Mehrfachangriffstechniken aus: einen Angriff gegen mehrere Ziele mit Fernkampfwaffen oder mehrere Nahkampfangriffe gegen Kreaturen in deiner Reichweite.',
  },
  "2014-rogue-arcanetrickster-mage-hand-legerdemain": {
    activation: 'bonusAction',
    description:
      'Du kannst deine Magische Hand mit einer Bonusaktion kontrollieren und mit ihr Taschendiebstahl, das Entschärfen von Fallen oder andere geschickte Manipulationen ausführen.',
  },
  "2024-rogue-arcanetrickster-mage-hand-legerdemain": {
    activation: 'bonusAction',
    description:
      'Du kannst deine Magische Hand mit einer Bonusaktion kontrollieren und mit ihr Taschendiebstahl, das Entschärfen von Fallen oder andere geschickte Manipulationen ausführen.',
  },
  "2014-rogue-arcanetrickster-versatile-trickster": {
    activation: 'bonusAction',
    description:
      'Du lenkst mit deiner Magischen Hand einen Gegner ab und erhältst bis zum Ende deines Zuges Vorteil auf deine Angriffswürfe gegen ihn.',
  },
  "2024-rogue-arcanetrickster-versatile-trickster": {
    activation: 'bonusAction',
    description:
      'Du lenkst mit deiner Magischen Hand einen Gegner ab und erhältst bis zum Ende deines Zuges Vorteil auf deine Angriffswürfe gegen ihn.',
  },
  "2014-rogue-arcanetrickster-spell-thief": {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur einen Zauber auf dich wirkt, kannst du versuchen, den Zauber mit deiner Reaktion zu vereiteln und seine Magie für dich zu beanspruchen.',
    resourceId: 'spell-thief',
  },
  "2024-rogue-arcanetrickster-spell-thief": {
    activation: 'reaction',
    description:
      'Wenn eine Kreatur einen Zauber auf dich wirkt, kannst du versuchen, den Zauber mit deiner Reaktion zu vereiteln und seine Magie für dich zu beanspruchen.',
    resourceId: 'spell-thief',
  },
  "2014-fighter-eldritchknight-war-magic": {
    activation: 'special',
    description:
      'Nachdem du mit deiner Aktion einen Zaubertrick gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.',
  },
  "2024-fighter-eldritchknight-war-magic": {
    activation: 'special',
    description:
      'Nachdem du mit deiner Aktion einen Zaubertrick gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.',
  },
  "2014-fighter-eldritchknight-improved-war-magic": {
    activation: 'special',
    description:
      'Nachdem du mit deiner Aktion einen Zauber gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.',
  },
  "2024-fighter-eldritchknight-improved-war-magic": {
    activation: 'special',
    description:
      'Nachdem du mit deiner Aktion einen Zauber gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.',
  },
  "2014-fighter-eldritchknight-arcane-charge": {
    activation: 'special',
    description:
      'Wenn du Aktionsschub einsetzt, kannst du dich vor, nach oder zwischen den Aktionen bis zu 9 Meter weit teleportieren.',
    resourceId: 'action-surge',
  },
  "2024-fighter-eldritchknight-arcane-charge": {
    activation: 'special',
    description:
      'Wenn du Aktionsschub einsetzt, kannst du dich vor, nach oder zwischen den Aktionen bis zu 9 Meter weit teleportieren.',
    resourceId: 'action-surge',
  },
  "2014-sorcerer-shadowmagic-eyes-of-the-dark": {
    activation: 'special',
    description:
      'Du kannst Dunkelheit mit Zauberpunkten wirken und durch die von dir erzeugte magische Dunkelheit sehen.',
    resourceId: 'sorcery-points',
    resourceCost: 2,
  },
  "2014-sorcerer-shadowmagic-strength-of-the-grave": {
    activation: 'reaction',
    description:
      'Wenn Schaden dich auf 0 Trefferpunkte reduzieren würde, kannst du mit einem Charisma-Rettungswurf versuchen, stattdessen mit 1 Trefferpunkt stehen zu bleiben.',
    resourceId: 'strength-of-grave',
  },
  "2014-sorcerer-shadowmagic-shadow-walk": {
    activation: 'bonusAction',
    description:
      'Du teleportierst dich von einem Bereich mit dämmrigem Licht oder Dunkelheit zu einem freien Ort mit dämmrigem Licht oder Dunkelheit in deiner Sichtweite.',
  },
  "2014-sorcerer-shadowmagic-umbral-form": {
    activation: 'action',
    description:
      'Du gibst sechs Zauberpunkte aus, um für bis zu eine Minute eine schattenhafte Gestalt anzunehmen, die sich durch feste Gegenstände bewegen kann.',
    resourceId: 'sorcery-points',
    resourceCost: 6,
  },
  "srd-2024-class-paladin-core-5-faithful-steed": {
    activation: 'special',
    description:
      'Du wirkst Find Steed, ohne einen Zauberplatz auszugeben. Das beschworene Reittier folgt den Regeln des Zaubers.',
    resourceId: 'faithful-steed',
  },
  "srd-2024-class-fighter-core-2-tactical-mind": {
    activation: 'special',
    description:
      'Wenn dir ein Attributswurf misslingt, kannst du eine Nutzung von Zweites Aufatmen ausgeben und den Wurf um einen W10 erhöhen.',
    resourceId: 'second-wind',
  },
  "srd-2024-class-monk-core-10-self-restoration": {
    activation: 'special',
    description:
      'Am Ende deines Zuges kannst du einen der Zustände Bezaubert, Verängstigt oder Vergiftet beenden. Alternativ kannst du einen Fokus-Punkt ausgeben, um einen solchen Zustand sofort zu beenden.',
  },
  "srd-2024-class-monk-core-13-deflect-energy": {
    activation: 'reaction',
    description:
      'Wenn du mit deiner Reaktion Energieschaden abwehrst, kannst du einen Teil davon auf ein Ziel in Reichweite umlenken.',
  },
  "srd-2024-class-cleric-core-20-greater-divine-intervention": {
    activation: 'action',
    description:
      'Du kannst die mächtigste Form deines Göttlichen Eingreifens erbitten und den dadurch gewährten göttlichen Effekt wirken.',
    resourceId: 'divine-intervention',
  },
  "srd-2014-class-ranger-core-10-hide-in-plain-sight": {
    activation: 'special',
    description:
      'Du verbringst eine Minute damit, natürliche Materialien zu sammeln und dich zu tarnen. Solange du dich nicht bewegst, bist du unter passenden natürlichen Bedingungen schwer zu entdecken.',
  },
  "srd-2014-class-ranger-core-14-vanish": {
    activation: 'bonusAction',
    description: 'Du kannst die Verstecken-Aktion als Bonusaktion ausführen.',
  },
  "srd-2014-subclass-paladin-devotion-20-holy-nimbus": {
    activation: 'action',
    description:
      'Du entfesselst eine heilige Aura, die helles Licht ausstrahlt und feindliche Kreaturen in deiner Nähe beeinträchtigt.',
    resourceId: 'holy-nimbus',
  },
  "srd-2024-subclass-paladin-devotion-20-holy-nimbus": {
    activation: 'action',
    description:
      'Du entfesselst eine heilige Aura, die helles Licht ausstrahlt und feindliche Kreaturen in deiner Nähe beeinträchtigt.',
    resourceId: 'holy-nimbus',
  },
  "srd-2014-class-warlock-core-20-eldritch-master": {
    activation: 'special',
    description:
      'Du führst eine einminütige Zwiesprache mit deinem Patron und stellst alle verbrauchten Zauberplätze deiner Paktmagie wieder her. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.',
    resourceId: 'eldritch-master',
  },
  "srd-2024-class-warlock-core-20-eldritch-master": {
    activation: 'special',
    description:
      'Du führst eine einminütige Zwiesprache mit deinem Patron und stellst alle verbrauchten Zauberplätze deiner Paktmagie wieder her. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.',
    resourceId: 'eldritch-master',
  },
  "srd-2024-class-warlock-core-9-contact-patron": {
    activation: 'special',
    description:
      'Du führst ein einminütiges Ritual aus, um mit deinem Patron Kontakt aufzunehmen und Kontakt zu einer anderen Ebene ohne Zauberplatz zu wirken. Den Rettungswurf des Zaubers bestehst du automatisch.',
    resourceId: 'contact-patron',
  },
  "srd-2014-class-rogue-core-20-stroke-of-luck": {
    activation: 'special',
    description:
      'Wenn ein Angriff dich verfehlt oder ein Attributswurf misslingt, kannst du das Ergebnis in einen Treffer oder einen W20-Wert von 20 verwandeln.',
    resourceId: 'stroke-of-luck',
  },
  "srd-2024-class-rogue-core-20-stroke-of-luck": {
    activation: 'special',
    description:
      'Wenn ein Angriff dich verfehlt oder ein Attributswurf misslingt, kannst du das Ergebnis in einen Treffer oder einen W20-Wert von 20 verwandeln.',
    resourceId: 'stroke-of-luck',
  },
}
