import { createContext, useContext } from 'react'
export type Language = 'de' | 'en'
export const LanguageContext = createContext<Language>('de')
export const useLanguage = () => useContext(LanguageContext)
const en: Record<string, string> = {
  'Pfad des Berserkers': 'Path of the Berserker',
  'Krieger der offenen Hand': 'Warrior of the Open Hand',
  'Drakonische Magie': 'Draconic Sorcery',
  Unholdpatron: 'Fiend Patron',
  Hervorrufungsgelehrter: 'Evoker',
  'Angeborene Magie': 'Innate Sorcery',
  'Göttlicher Sinn': 'Divine Sense',

  'Eine Nutzung bei kurzer Rast, alle bei langer Rast':
    'One use on a short rest, all uses on a long rest',
  'Die Klassenmerkmale für SRD 5.2.1 werden separat aufgebaut. Es werden keine Merkmale aus 2014 angezeigt oder übernommen.':
    'SRD 5.2.1 class features are being built separately. No 2014 features are shown or reused.',
  'Der Verbrauch wird gespeichert. Eine kurze Rast stellt je nach Ressource eine oder alle Nutzungen wieder her; eine lange Rast stellt alle wieder her.':
    'Usage is saved. A short rest restores one or all uses depending on the resource; a long rest restores all uses.',

  'Merkmale & Ressourcen': 'Features & resources',
  'Klassen- und Unterklassenfähigkeiten, automatisch nach deiner Stufe freigeschaltet.':
    'Class and subclass abilities, automatically unlocked based on your level.',
  'Rast verwalten': 'Manage rests',
  'Kurze Rast': 'Short rest',
  'Lange Rast': 'Long rest',
  'Erholung bei langer Rast': 'Recharges on a long rest',
  'Erholung bei kurzer Rast': 'Recharges on a short rest',
  'Erholung bei kurzer oder langer Rast': 'Recharges on a short or long rest',
  'Der Verbrauch wird gespeichert. Rast-Aktionen stellen die Ressourcen gemäß ihrer Erholung wieder her.':
    'Usage is saved. Rest actions restore resources according to their recovery rules.',
  FREIGESCHALTET: 'UNLOCKED',
  'Für diese Klasse und dieses Regelwerk sind noch keine Merkmalsdaten hinterlegt.':
    'No feature data is available yet for this class and ruleset.',
  'Die Freischaltung wird anhand von Klasse, Unterklasse und Stufe angezeigt. Mechanische Effekte und vollständige Beschreibungen werden schrittweise ergänzt.':
    'Unlocks are based on class, subclass and level. Mechanical effects and full descriptions will be added incrementally.',

  Klassenressourcen: 'Class resources',
  'AUTOMATISCH BERECHNET': 'CALCULATED AUTOMATICALLY',
  'Ressource verringern': 'Decrease resource',
  'Ressource erhöhen': 'Increase resource',
  'Die Höchstwerte richten sich nach Klasse, Stufe und gewähltem Regelwerk. Der aktuelle Verbrauch wird separat gespeichert.':
    'Maximum values depend on class, level and selected ruleset. Current usage is saved separately.',
  'Automatische Klassenmerkmale': 'Automatic class features',
  'DURCH KLASSE / UNTERKLASSE': 'FROM CLASS / SUBCLASS',
  Unterklasse: 'Subclass',
  Automatisch: 'Automatic',
  'Diese Merkmale werden aus Klasse, Unterklasse und Stufe abgeleitet. Sie müssen nicht manuell eingetragen werden.':
    'These features are derived from class, subclass and level. You do not need to enter them manually.',
  Kampfrausch: 'Rage',
  Bardeninspiration: 'Bardic Inspiration',
  'Kanal göttlicher Energie': 'Channel Divinity',
  Tiergestalt: 'Wild Shape',
  'Ki-Punkte': 'Ki Points',
  'Fokus-Punkte': 'Focus Points',
  'Metamagische Optionen': 'Sorcery Points',
  Zauberpunkte: 'Sorcery Points',
  'Göttliches Niederstrecken': 'Divine Smite',
  'Zweites Aufatmen': 'Second Wind',
  'Arkane Erholung': 'Arcane Recovery',
  Stufe: 'Level',
  Klasse: 'Class',

  'Die deutsche Beschreibung aus dem SRD 5.1 wird ergänzt. Es wird kein Text aus dem SRD 5.2.1 oder eine automatische Übersetzung verwendet.':
    'The German SRD 5.1 description is being added. No text from SRD 5.2.1 or machine translation is used.',
  'Installation: Öffne das Browsermenü. In Chrome oder Edge wählst du „App installieren“ oder „Seite als App installieren“. Auf iPhone/iPad: Teilen → Zum Home-Bildschirm.':
    'Install: Open your browser menu. In Chrome or Edge, choose “Install app” or “Install this site as an app”. On iPhone/iPad: Share → Add to Home Screen.',
  'Adventura als App installieren': 'Install Adventura as an app',
  'Zauberplatz wiederherstellen': 'Restore spell slot',
  'Zauberplatz verbrauchen': 'Spend spell slot',
  'Zauberplätze verfügbar': 'spell slots available',
  von: 'of',
  Übersicht: 'Overview',
  Kopf: 'Head',
  Hals: 'Neck',
  Umhang: 'Cloak',
  Rüstung: 'Armor',
  Haupthand: 'Main hand',
  Nebenhand: 'Off hand',
  Hände: 'Hands',
  Gürtel: 'Belt',
  Füße: 'Feet',
  'Ring 1': 'Ring 1',
  'Ring 2': 'Ring 2',
  Sonstiges: 'Other',
  Belegt: 'Occupied',
  'Freier Slot': 'Empty slot',
  'Gegenstand anlegen': 'Equip item',
  Ablegen: 'Unequip',
  'Gegenstand entfernen': 'Remove item',
  'Füge zuerst Gegenstände zum persönlichen Inventar hinzu.':
    'Add items to your personal inventory first.',
  'Jeder Slot kann genau einen Gegenstand aufnehmen. Beim Anlegen wird er aus deinem Inventar verschoben.':
    'Each slot can hold exactly one item. Equipping an item moves it out of your inventory.',
  'Keine Beschreibung': 'No description',
  Angelegt: 'Equipped',
  'Angelegte Ausrüstung': 'Equipped gear',
  ANGELEGT: 'EQUIPPED',
  Inventaransicht: 'Inventory view',
  'Du hast noch keine Gegenstände angelegt. Markiere Ausrüstung im Inventar als angelegt.':
    'You have not equipped any items yet. Mark gear as equipped in your inventory.',
  'Hier siehst du nur die Gegenstände, die dein Charakter aktuell trägt oder verwendet.':
    'Only items your character currently wears or uses are shown here.',
  Zauberbuchansicht: 'Spellbook view',
  'Meine Zauber': 'My spells',
  'SRD & hinzufügen': 'SRD & add spells',
  'Tippe auf einen Edelstein, um einen Platz zu verbrauchen oder wiederherzustellen.':
    'Tap a gem to spend or restore a spell slot.',
  Paktmagie: 'Pact Magic',
  'Lange Rast · alle Plätze auffüllen': 'Long rest · restore all slots',
  'Kurze Rast · Paktplätze auffüllen': 'Short rest · restore pact slots',
  Charakterbogen: 'Character sheet',
  Inventar: 'Inventory',
  Zauberbuch: 'Spellbook',
  'Level-up': 'Level up',
  CHARAKTERBOGEN: 'CHARACTER SHEET',
  'Am Spieltisch': 'At the table',
  'Dein digitaler Charakterbegleiter.': 'Your digital character companion.',
  'Lokale Speicherung': 'Stored locally',
  'DEIN CHARAKTER IM MITTELPUNKT': 'YOUR CHARACTER, AT THE CENTER',
  'Dein digitaler Charakterbogen – bereit für den nächsten Spieleabend.':
    'Your digital character sheet – ready for the next game night.',
  'Charakter erstellen': 'Create character',
  CHARAKTERE: 'CHARACTERS',
  GEGENSTÄNDE: 'ITEMS',
  'GELERNTE ZAUBER': 'SPELLS LEARNED',
  'In deiner Sammlung': 'In your collection',
  'Persönlich & gemeinsam': 'Personal & party',
  'Dein persönliches Zauberbuch': 'Your personal spellbook',
  'DEINE HELDEN': 'YOUR HEROES',
  'Deine Charaktere': 'Your characters',
  GESPEICHERT: 'SAVED',
  'Charaktere werden geladen …': 'Loading characters …',
  'Charakter öffnen': 'Open character',
  'Dein Charakter wartet auf seinen ersten Auftritt.':
    'Your character is waiting for their first appearance.',
  'Erstelle deinen D&D-Charakter und verwalte Werte, Ausrüstung und Zauber an einem Ort.':
    'Create your D&D character and manage stats, equipment and spells in one place.',
  'Ersten Charakter erstellen': 'Create your first character',
  'Wähle zuerst einen Charakter aus.': 'Select a character first.',
  'Zur Übersicht': 'Back to overview',
  'Automatisch gespeichert': 'Saved automatically',
  LEBENSPUNKTE: 'HIT POINTS',
  'Aktuell / Maximum': 'Current / maximum',
  RÜSTUNGSKLASSE: 'ARMOR CLASS',
  BEWEGUNG: 'SPEED',
  MODIFIKATOR: 'MODIFIER',
  Rettungswürfe: 'Saving throws',
  Fertigkeiten: 'Skills',
  'Weitere Angaben': 'Additional details',
  Spezies: 'Species',
  Hintergrund: 'Background',
  Gesinnung: 'Alignment',
  Spielername: 'Player name',
  Erfahrungspunkte: 'Experience points',
  Trefferwürfel: 'Hit dice',
  Persönlichkeitsmerkmale: 'Personality traits',
  Ideale: 'Ideals',
  Bindungen: 'Bonds',
  Makel: 'Flaws',
  'Merkmale & Fähigkeiten': 'Features & traits',
  Notizen: 'Notes',
  AUSRÜSTUNG: 'EQUIPMENT',
  'Persönliche Gegenstände und gemeinsamer Gruppenbesitz.':
    'Personal items and shared party inventory.',
  Währungen: 'Currency',
  GELDBEUTEL: 'PURSE',
  'Gegenstand hinzufügen': 'Add item',
  Besitz: 'Owner',
  Persönlich: 'Personal',
  Gruppeninventar: 'Party inventory',
  Anzahl: 'Quantity',
  'Wert (GM)': 'Value (GP)',
  'Gewicht (Pfund)': 'Weight (lb)',
  Beschreibung: 'Description',
  'Noch keine Gegenstände vorhanden.': 'No items yet.',
  'Persönliches Inventar': 'Personal inventory',
  Ausgerüstet: 'Equipped',
  'MAGIE & ZAUBER': 'MAGIC & SPELLS',
  'Verwalte bekannte Zauber, Vorbereitung und ihre wichtigsten Details.':
    'Manage known spells, preparation and their key details.',
  'Eigene Zauber hinzufügen': 'Add custom spell',
  'MANUELLE ERFASSUNG': 'MANUAL ENTRY',
  Zaubername: 'Spell name',
  Zaubergrad: 'Spell level',
  Schule: 'School',
  Zauberzeit: 'Casting time',
  Reichweite: 'Range',
  'Komponenten (V/S/M)': 'Components (V/S/M)',
  Wirkungsdauer: 'Duration',
  Konzentration: 'Concentration',
  Ritual: 'Ritual',
  'Beschreibung / Effekt': 'Description / effect',
  'Zauber hinzufügen': 'Add spell',
  'Deine Zauber': 'Your spells',
  'Noch keine Zauber eingetragen. Du kannst sie oben hinzufügen.':
    'No spells added yet. Add them above.',
  ZAUBERTRICK: 'CANTRIP',
  Vorbereitet: 'Prepared',
  'Zauber entfernen': 'Remove spell',
  'Auf höheren Graden:': 'At higher levels:',
  FORTSCHRITT: 'PROGRESSION',
  'Entwickle deinen Charakter weiter. Regelwerk:': 'Advance your character. Ruleset:',
  'AKTUELLE STUFE': 'CURRENT LEVEL',
  'NÄCHSTE STUFE': 'NEXT LEVEL',
  'Stufe erhöhen': 'Level up',
  'Regelbasierte Progression': 'Rules-based progression',
  'Übungsbonus und Zauberplätze werden anhand von Klasse, Unterklasse und Stufe berechnet. Bereits verbrauchte Plätze bleiben beim Stufenaufstieg verbraucht; neu hinzugewonnene Plätze stehen zur Verfügung.':
    'Proficiency bonus and spell slots are calculated from class, subclass and level. Spent slots stay spent when leveling up; new slots are available.',
  'Trefferpunkte, Klassen- und Unterklassenmerkmale, ASI/Talente sowie konkrete Zauberauswahl benötigen weitere Charakterentscheidungen und werden deshalb noch nicht automatisch vergeben.':
    'Hit points, class features, ASIs/feats and spell choices require decisions and are not assigned automatically yet.',
  'Dein Begleiter am Spieltisch.': 'Your companion at the table.',
  'Charakter auswählen': 'Select character',
  'Backup exportieren': 'Export backup',
  'Backup importieren': 'Import backup',
  'Fehler schließen': 'Dismiss error',
  'Charakter löschen': 'Delete character',
  Schließen: 'Close',
  'NEUES ABENTEUER': 'NEW ADVENTURE',
  Charaktername: 'Character name',
  Regelwerk: 'Ruleset',
  'Du kannst Attribute und weitere Eigenschaften direkt im Charakterbogen ergänzen.':
    'You can add stats and details in the character sheet.',
  Abbrechen: 'Cancel',
  'Charakter speichern': 'Save character',
  'Speichert …': 'Saving …',
  'Alle Grade': 'All levels',
  Zaubertricks: 'Cantrips',
  'Nur für meine Klasse und Stufe': 'Only for my class and level',
  'Zauber suchen …': 'Search spells …',
  'SRD-Zauberkatalog': 'SRD spell catalog',
  'Offizielle SRD-Zauber passend zu deinem Regelwerk.': 'Official SRD spells for your ruleset.',
  Treffer: 'results',
  'Klassen-/Gradfilter aktiv': 'class/level filter active',
  'vollständiger Katalog': 'full catalog',
  'Im Buch': 'In spellbook',
  Hinzufügen: 'Add',
  'Klassen:': 'Classes:',
  'Quellen & Lizenz': 'Sources & license',
  'Keine passenden Zauber gefunden. Prüfe den Klassenfilter oder passe deine Suche an.':
    'No matching spells found. Check the class filter or adjust your search.',
  'Alle Zauber': 'All spells',
  'Nicht vorbereitet': 'Unprepared',
  'Suche Zauber in deinem Buch …': 'Search your spellbook …',
  'Keine Zauber entsprechen diesem Filter.': 'No spells match this filter.',
  'Deine Zauber sind noch leer.': 'Your spellbook is empty.',
  'Gelernt auf Stufe': 'Learned at level',
  'Immer vorbereitet': 'Always prepared',
  Zauber: 'spells',
  'Grad ': 'Level ',
  Zauberbeschreibung: 'Spell description',
  'Zauber filtern': 'Filter spells',
}
Object.assign(en, {
  'Willkommen,': 'Welcome,',
  'Abenteurer.': 'adventurer.',
  Stärke: 'Strength',
  Geschicklichkeit: 'Dexterity',
  Konstitution: 'Constitution',
  Intelligenz: 'Intelligence',
  Weisheit: 'Wisdom',
  Charisma: 'Charisma',
  Akrobatik: 'Acrobatics',
  'Mit Tieren umgehen': 'Animal Handling',
  'Arkane Kunde': 'Arcana',
  Athletik: 'Athletics',
  Täuschen: 'Deception',
  Geschichte: 'History',
  'Motiv erkennen': 'Insight',
  Einschüchtern: 'Intimidation',
  Nachforschungen: 'Investigation',
  Heilkunde: 'Medicine',
  Naturkunde: 'Nature',
  Wahrnehmung: 'Perception',
  Auftreten: 'Performance',
  Überzeugen: 'Persuasion',
  Religion: 'Religion',
  Fingerfertigkeit: 'Sleight of Hand',
  Heimlichkeit: 'Stealth',
  Überlebenskunst: 'Survival',
  'CHARAKTERBOGEN · ': 'CHARACTER SHEET · ',
  'Stufe ': 'Level ',
  Übungsbonus: 'Proficiency bonus',
  MODIFIKATOR: 'MODIFIER',
  'ÜBUNGSBONUS +': 'PROFICIENCY BONUS +',
  'KEINE · GEÜBT · EXPERTISE': 'NONE · PROFICIENT · EXPERTISE',
  WÄHRUNGEN: 'CURRENCY',
  GELDBEUTEL: 'PURSE',
  AUSRÜSTUNG: 'EQUIPMENT',
  Inventar: 'Inventory',
  Währungen: 'Currency',
  'Gegenstand hinzufügen': 'Add item',
  'Persönlicher Gegenstand': 'Personal item',
  Gruppeninventar: 'Party inventory',
  ZAUBERBUCH: 'SPELLBOOK',
  'MAGIE & ZAUBER': 'MAGIC & SPELLS',
  Zauberbuch: 'Spellbook',
  'Eigene Zauber hinzufügen': 'Add custom spell',
  'MANUELLE ERFASSUNG': 'MANUAL ENTRY',
  Zaubergrad: 'Spell level',
  Zauberzeit: 'Casting time',
  Reichweite: 'Range',
  Wirkungsdauer: 'Duration',
  FORTSCHRITT: 'PROGRESSION',
  'Level-up': 'Level up',
  'Entwickle deinen Charakter weiter. Regelwerk:': 'Advance your character. Ruleset:',
  'Regelbasierte Progression': 'Rules-based progression',
  'Stufe erhöhen': 'Level up',
  'Dein Begleiter am Spieltisch.': 'Your companion at the table.',
  'NEUES ABENTEUER': 'NEW ADVENTURE',
  'Charakter erstellen': 'Create character',
  Charaktername: 'Character name',
  Klasse: 'Class',
  Regelwerk: 'Ruleset',
  Abbrechen: 'Cancel',
  'Charakter speichern': 'Save character',
  Spielername: 'Player name',
  Trefferwürfel: 'Hit dice',
  Gesinnung: 'Alignment',
  Spezies: 'Species',
  Unterklasse: 'Subclass',
  Hintergrund: 'Background',
  Erfahrungspunkte: 'Experience points',
  Persönlichkeitsmerkmale: 'Personality traits',
  Ideale: 'Ideals',
  Bindungen: 'Bonds',
  Makel: 'Flaws',
  'Merkmale & Fähigkeiten': 'Features & traits',
  Notizen: 'Notes',
  Zaubertrick: 'Cantrip',
  Zaubertricks: 'Cantrips',
  'Alle Grade': 'All levels',
  Ritual: 'Ritual',
  Konzentration: 'Concentration',
  Ausgerüstet: 'Equipped',
  Besitz: 'Owner',
  Anzahl: 'Quantity',
  'Wert (GM)': 'Value (GP)',
  'Gewicht (Pfund)': 'Weight (lb)',
  Beschreibung: 'Description',
  'Charakter öffnen': 'Open character',
  'Zur Übersicht': 'Back to overview',
  'Ersten Charakter erstellen': 'Create your first character',
  'Automatisch gespeichert': 'Saved automatically',
  'Noch keine Gegenstände vorhanden.': 'No items yet.',
  'Noch keine Zauber eingetragen. Du kannst sie oben hinzufügen.':
    'No spells added yet. Add them above.',
  'Charaktere werden geladen …': 'Loading characters …',
  'Wähle zuerst einen Charakter aus.': 'Select a character first.',
  'Du kannst Attribute und weitere Eigenschaften direkt im Charakterbogen ergänzen.':
    'You can add stats and details in the character sheet.',
  'Zauber im Buch': 'Spells in book',
  vorbereitet: 'prepared',
  'im Buch': 'in book',
  Plätze: 'slots',
  übrig: 'remaining',
  Grad: 'Level',
  'Zusätzliche Story- und Gegenstandszauber zählen nicht als Klassenfortschritt.':
    'Story and item spells do not count toward class progression.',
  'Zauber im Buch und Zauberplätze sind getrennt: Zauberplätze geben an, wie oft du Zauber des jeweiligen Grades wirken kannst. Zusätzliche Story- und Gegenstandszauber zählen nicht als Klassenfortschritt.':
    'Spells in your book and spell slots are separate: slots determine how often you can cast spells of that level. Story and item spells do not count toward class progression.',
  Story: 'Story',
  Gegenstand: 'Item',
  Talent: 'Feat',
  Sonstiges: 'Other',
  Quelle: 'Source',
  Nutzen: 'Use',
  'Nutzungen zurücksetzen': 'Reset uses',
  'kurze Rast': 'short rest',
  'lange Rast': 'long rest',
  Morgengrauen: 'dawn',
  manuell: 'manual',
  Herkunft: 'Source',
  'Story / Belohnung': 'Story / reward',
  'Talent / Fähigkeit': 'Feat / feature',
  'Quelle / Gegenstand / Notiz': 'Source / item / note',
  'Nutzungen (0 = unbegrenzt)': 'Uses (0 = unlimited)',
  Erneuerung: 'Refreshes',
  Klassenzauber: 'Class spells',
  Zauberplätze: 'Spell slots',
  'Herkunft für diesen Zauber': 'Source for this spell',
  'z. B. Ring der Zauberei': 'e.g. Ring of Spell Storing',
  'Kurze Rast': 'Short rest',
  'Lange Rast': 'Long rest',
  'Manuell / nie': 'Manual / never',
  'Zauber mit diesen Angaben übernehmen': 'Add spell with these details',
  'Bekannte Klassenzauber': 'Known class spells',
  'Vorbereitete Klassenzauber': 'Prepared class spells',
  'Regelgrenze noch offen': 'Rule limit not available yet',
  'Zaubertricks sind nicht mitgezählt. Zusätzliche Zauber aus Story, Gegenständen und Talenten zählen nicht zum Klassenlimit.':
    'Cantrips are not included. Story, item and feat spells do not count toward the class limit.',
  'Nur vorbereitete Klassenzauber werden gezählt. Zusätzliche Zauberquellen bleiben außen vor.':
    'Only prepared class spells are counted. Additional spell sources are excluded.',
  'Klassenlimit nach Stufe und Zauberattribut. Story-, Gegenstands- und Talentzauber werden separat gezählt.':
    'Class limit based on level and spellcasting ability. Story, item and feat spells are counted separately.',
  'Für Eldritch Knight und Arcane Trickster gelten eigene Lern- und Schulregeln; diese werden noch ergänzt.':
    'Eldritch Knight and Arcane Trickster have special learning and school restrictions; these will be added later.',
  'Für diese Klasse ist die exakte Lern-/Vorbereitungstabelle noch nicht hinterlegt.':
    'The exact learning/preparation table for this class is not available yet.',
})
export const translate = (language: Language, value: string) =>
  language === 'de' ? value : (en[value] ?? value)

Object.assign(en, {
  Barbar: 'Barbarian',
  Barde: 'Bard',
  Kleriker: 'Cleric',
  Druide: 'Druid',
  Kämpfer: 'Fighter',
  Mönch: 'Monk',
  Paladin: 'Paladin',
  Waldläufer: 'Ranger',
  Schurke: 'Rogue',
  Zauberer: 'Sorcerer',
  Hexenmeister: 'Warlock',
  Magier: 'Wizard',
  'Andere / eigene Klasse': 'Other / custom class',
  'Arkaner Ritter': 'Eldritch Knight',
  'Arkaner Gauner': 'Arcane Trickster',
  Schattenmagie: 'Shadow Magic',
  Keine: 'None',
  Schaden: 'damage',
  'Zauberwirker-Typ': 'Spellcasting type',
  Vollzauberwirker: 'Full caster',
  Halbzauberwirker: 'Half caster',
  Drittelzauberwirker: 'Third caster',
  'Paktmagie (Hexenmeister)': 'Pact Magic (Warlock)',
  'Keine automatische Zauberprogression': 'No automatic spell progression',
  'Vollzauberwirker verwenden ihre gesamte Klassenstufe für Zauberplätze: Barde, Kleriker, Druide, Zauberer und Magier.':
    'Full casters use their full class level for spell slots: bard, cleric, druid, sorcerer and wizard.',
  'Halbzauberwirker erhalten Zauberplätze auf Basis der halben Klassenstufe, aufgerundet: Paladin und Waldläufer.':
    'Half casters use half their class level, rounded up: paladin and ranger.',
  'Drittelzauberwirker erhalten ab Unterklassenstufe 3 Zauberplätze auf Basis eines Drittels ihrer Klassenstufe, abgerundet: Arkaner Ritter und Arkaner Gauner.':
    'Third casters gain spell slots at subclass level 3, using one third of their class level, rounded down: Eldritch Knight and Arcane Trickster.',
  'Hexenmeister verwenden eigene Paktmagie-Zauberplätze statt der normalen Klassen-Tabelle.':
    'Warlocks use their separate Pact Magic slots instead of the normal class table.',
  'Für diese Klasse sind keine automatischen Zauberplätze hinterlegt.':
    'No automatic spell slots are configured for this class.',
})

Object.assign(en, {
  'Im Regelwerk 2014 beginnt die Zauberprogression für Paladine und Waldläufer ab Stufe 2.':
    'In the 2014 ruleset, paladins and rangers begin spellcasting progression at level 2.',
  'Im Regelwerk 2024 beginnt die Zauberprogression für Paladine und Waldläufer bereits ab Stufe 1.':
    'In the 2024 ruleset, paladins and rangers begin spellcasting progression at level 1.',
  'Für SRD 5.1 sind Zaubernamen und Grunddaten teilweise lokalisiert. Die Beschreibungen bleiben vorerst im Originaltext, damit keine Regeltexte aus SRD 5.2.1 mit den 2014-Regeln vermischt werden.':
    'For SRD 5.1, spell names and metadata are partially localized. Descriptions remain in the original text for now to avoid mixing SRD 5.2.1 rules text with the 2014 rules.',
})

Object.assign(en, {
  'Automatische Klassen- und Unterklassenmerkmale': 'Automatic class and subclass features',
  'Bei 2024-Unterklassen zeigen die Einträge derzeit die korrekten Freischaltungsstufen. Die konkreten Namen und Beschreibungen der Unterklassenmerkmale folgen noch; 2014-Regeltexte werden nicht übernommen.':
    'For 2024 subclasses, entries currently show the correct unlock levels. Exact feature names and descriptions will follow; 2014 rules text is not reused.',
  'Präziser Jäger': 'Precise Hunter',
  'Listige Schläge': 'Devious Strikes',
  'Schlauer Geist': 'Slippery Mind',
  'Patron kontaktieren': 'Contact Patron',
})

Object.assign(en, {
  Raserei: 'Frenzy',
  'Geisteslose Wut': 'Mindless Rage',
  Vergeltung: 'Retaliation',
  'Einschüchternde Präsenz': 'Intimidating Presence',
  'Zusätzliche Fertigkeiten': 'Bonus Proficiencies',
  'Schneidende Worte': 'Cutting Words',
  'Magische Entdeckungen': 'Magical Discoveries',
  'Unvergleichliche Fertigkeit': 'Peerless Skill',
  'Jünger des Lebens': 'Disciple of Life',
  'Zauber der Lebensdomäne': 'Life Domain Spells',
  'Leben bewahren': 'Preserve Life',
  'Gesegneter Heiler': 'Blessed Healer',
  'Überragende Heilung': 'Supreme Healing',
  'Zauber des Landzirkels': 'Circle of the Land Spells',
  'Hilfe des Landes': 'Land’s Aid',
  'Natürliche Erholung': 'Natural Recovery',
  'Schutz der Natur': 'Nature’s Ward',
  Naturheiligtum: 'Nature’s Sanctuary',
  'Verbesserter kritischer Treffer': 'Improved Critical',
  'Bemerkenswerter Athlet': 'Remarkable Athlete',
  'Zusätzlicher Kampfstil': 'Additional Fighting Style',
  'Heroischer Krieger': 'Heroic Warrior',
  'Überlegener kritischer Treffer': 'Superior Critical',
  Überlebenskünstler: 'Survivor',
  'Technik der offenen Hand': 'Open Hand Technique',
  'Ganzheit des Körpers': 'Wholeness of Body',
  'Fließender Schritt': 'Fleet Step',
  'Zitternde Handfläche': 'Quivering Palm',
  'Zauber des Schwurs der Hingabe': 'Oath of Devotion Spells',
  'Heilige Waffe': 'Sacred Weapon',
  'Aura der Hingabe': 'Aura of Devotion',
  'Schützendes Niederstrecken': 'Smite of Protection',
  'Heiliger Nimbus': 'Holy Nimbus',
  Jägerkunde: 'Hunter’s Lore',
  Jägerbeute: 'Hunter’s Prey',
  'Defensive Taktiken': 'Defensive Tactics',
  'Überlegene Jägerbeute': 'Superior Hunter’s Prey',
  'Überlegene Verteidigung': 'Superior Hunter’s Defense',
  'Schnelle Hände': 'Fast Hands',
  'Arbeit in luftiger Höhe': 'Second-Story Work',
  'Meisterlicher Schleicher': 'Supreme Sneak',
  'Magische Gegenstände benutzen': 'Use Magic Device',
  Diebesreflexe: 'Thief’s Reflexes',
  'Drakonische Widerstandskraft': 'Draconic Resilience',
  'Drakonische Zauber': 'Draconic Spells',
  'Elementare Affinität': 'Elemental Affinity',
  Drachenflügel: 'Dragon Wings',
  Drachengefährte: 'Dragon Companion',
  'Segnung des Dunklen': 'Dark One’s Blessing',
  'Zauber des Unholds': 'Fiend Spells',
  'Dunkler eigener Glücksfall': 'Dark One’s Own Luck',
  Unholdresilienz: 'Fiendish Resilience',
  'Durch die Hölle schicken': 'Hurl Through Hell',
  Hervorrufungsexperte: 'Evocation Savant',
  'Kraftvoller Zaubertrick': 'Potent Cantrip',
  'Zauber formen': 'Sculpt Spells',
  'Ermächtigte Hervorrufung': 'Empowered Evocation',
  Überladung: 'Overchannel',
  'Wenn du während deines Kampfrauschs Rücksichtsloser Angriff nutzt, verursacht dein erster Treffer mit einem Stärke-Angriff zusätzlichen Schaden.':
    'While raging, using Reckless Attack lets your first hit with a Strength-based attack deal extra damage.',
  'Während des Kampfrauschs bist du immun gegen Bezaubert und Verängstigt; bestehende Zustände enden beim Beginn des Kampfrauschs.':
    'While raging, you are immune to Charmed and Frightened; either condition ends when you enter your Rage.',
  'Wenn dich eine Kreatur innerhalb von 1,5 Metern verletzt, kannst du als Reaktion einen Nahkampfangriff ausführen.':
    'When a creature within 5 feet damages you, you can use your Reaction to make a melee attack.',
  'Du kannst Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht testen lassen.':
    'You can force nearby creatures to make a Wisdom save or become Frightened.',
  'Du erhältst Übung in drei Fertigkeiten deiner Wahl.':
    'You gain proficiency in three skills of your choice.',
  'Du kannst eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um einen Wurf oder Schadenswurf eines sichtbaren Wesens zu verringern.':
    'You can spend a Reaction and Bardic Inspiration to reduce a visible creature’s roll or damage roll.',
  'Du lernst zwei zusätzliche Zauber von der Kleriker-, Druiden- oder Magier-Zauberliste.':
    'You learn two additional spells from the Cleric, Druid, or Wizard spell list.',
  'Wenn du einen Attributswurf ablegst, kannst du eine Nutzung deiner Bardeninspiration einsetzen und den Würfel zum Ergebnis addieren.':
    'When you make an ability check, you can expend Bardic Inspiration and add the die to the result.',
  'Heilzauber, die du mit einem Zauberplatz wirkst, stellen zusätzliche Trefferpunkte in Höhe von 2 plus Zauberplatzgrad wieder her.':
    'When a spell slot restores Hit Points, the target regains extra Hit Points equal to 2 plus the slot’s level.',
  'Die Zauber deiner Domäne sind abhängig von deiner Klerikerstufe stets vorbereitet.':
    'You always have your domain spells prepared at the listed Cleric levels.',
  'Du kannst Kanal göttlicher Energie einsetzen, um Trefferpunkte auf verwundete Kreaturen in deiner Nähe zu verteilen.':
    'You can expend Channel Divinity to distribute healing among nearby Bloodied creatures.',
  'Wenn du andere mit einem Heilzauber heilst, erhältst du selbst zusätzliche Trefferpunkte zurück.':
    'When you heal others with a spell, you also regain Hit Points.',
  'Bei Heilwürfeln deiner Zauber verwendest du statt des Würfelwurfs den höchstmöglichen Wert.':
    'For your spell’s healing dice, use the maximum result instead of rolling.',
  'Nach einer langen Rast wählst du eine Landschaft und hast deren passende Zirkelzauber vorbereitet.':
    'After a Long Rest, choose a land type and prepare its Circle spells.',
  'Du kannst eine Nutzung deiner Tiergestalt ausgeben, um in einem Bereich nekrotischen Schaden zu verursachen und eine Kreatur zu heilen.':
    'You can expend Wild Shape to deal Necrotic damage in an area and heal one creature.',
  'Du kannst nach einer kurzen Rast Zauberplätze zurückgewinnen und erhältst zusätzliche Vorteile für deine Landzauber.':
    'You regain spell slots after a Short Rest and gain additional benefits for your land spells.',
  'Du bist gegen bestimmte Zustände und Umwelteinflüsse geschützt, abhängig von deiner gewählten Landschaft.':
    'Your chosen land grants protection against certain conditions and environmental effects.',
  'Natürliche Kreaturen können dich nicht ohne Weiteres angreifen oder sich dir feindlich nähern.':
    'Natural creatures are hindered from attacking or approaching you hostilely.',
  'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 19 oder 20 einen kritischen Treffer.':
    'Your weapon attacks score a Critical Hit on a d20 roll of 19 or 20.',
  'Du erhältst Vorteile auf bestimmte Initiative- und körperliche Attributswürfe.':
    'You gain benefits to certain Initiative and physical ability checks.',
  'Du erhältst ein weiteres Talent für Kampfstil.': 'You gain another Fighting Style feat.',
  'Zu Beginn deines Zuges kannst du Heldenmut erhalten, wenn du keinen hast.':
    'At the start of your turn, you can gain Heroic Inspiration if you don’t have it.',
  'Deine Waffenangriffe erzielen bereits bei einem W20-Ergebnis von 18 bis 20 einen kritischen Treffer.':
    'Your weapon attacks score a Critical Hit on a d20 roll of 18 to 20.',
  'Zu Beginn deines Zuges kannst du Trefferpunkte zurückgewinnen, wenn du angeschlagen bist.':
    'At the start of your turn, you can regain Hit Points if you are Bloodied.',
  'Treffer aus Hagel der Schläge können Gelegenheitsangriffe verhindern, Ziele wegstoßen oder zu Fall bringen.':
    'Flurry of Blows hits can prevent Opportunity Attacks, push targets, or knock them Prone.',
  'Du kannst als Bonusaktion Trefferpunkte in Höhe deines Kampfkunstwürfels plus Weisheitsmodifikator zurückgewinnen.':
    'As a Bonus Action, regain Hit Points equal to your Martial Arts die plus your Wisdom modifier.',
  'Nach einer anderen Bonusaktion kannst du zusätzlich Schritt des Windes einsetzen.':
    'After another Bonus Action, you can also use Step of the Wind.',
  'Du kannst Fokus-Punkte einsetzen, um tödliche Schwingungen in einem getroffenen Ziel zu hinterlassen.':
    'You can spend Focus Points to set up lethal vibrations in a creature you hit.',
  'Die Zauber deines Schwurs sind abhängig von deiner Paladinstufe stets vorbereitet.':
    'You always have your Oath spells prepared at the listed Paladin levels.',
  'Du kannst Kanal göttlicher Energie einsetzen, um eine Nahkampfwaffe vorübergehend magisch zu stärken.':
    'You can expend Channel Divinity to temporarily empower a melee weapon.',
  'Du und Verbündete in deiner Schutzaura seid gegen den Zustand Bezaubert immun.':
    'You and allies in your Aura of Protection are immune to Charmed.',
  'Dein Göttliches Niederstrecken gewährt dir und Verbündeten in deiner Aura vorübergehend halbe Deckung.':
    'Your Divine Smite grants you and allies in your aura Half Cover until your next turn.',
  'Du strahlst eine heilige Aura aus, die Licht spendet und Feinde in deiner Nähe schwächt.':
    'You radiate a holy aura that sheds light and weakens nearby foes.',
  'Während ein Ziel von deinem Mal des Jägers betroffen ist, erkennst du seine Schadensimmunitäten, Resistenzen und Anfälligkeiten.':
    'While a creature is marked by Hunter’s Mark, you learn its damage Immunities, Resistances, and Vulnerabilities.',
  'Du wählst eine Jagdtechnik, etwa zusätzlichen Schaden gegen bereits verwundete Ziele.':
    'Choose a hunting technique, such as extra damage against already wounded targets.',
  'Du erhältst eine defensive Jagdtechnik gegen Angriffe oder Flächengefahren.':
    'You gain a defensive hunting technique against attacks or area effects.',
  'Deine Jagdtechnik wird verbessert und kann zusätzliche Ziele oder Effekte betreffen.':
    'Your Hunter’s Prey technique improves with additional effects.',
  'Du erhältst eine weitere defensive Jagdtechnik.':
    'You gain another defensive hunting technique.',
  'Du kannst zusätzlich bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.':
    'You can take certain object and skill actions as a Bonus Action.',
  'Klettern kostet dich keine zusätzliche Bewegung und Sprünge profitieren von deiner Geschicklichkeit.':
    'Climbing costs no extra movement, and your jumps benefit from Dexterity.',
  'Du kannst dich unter bestimmten Bedingungen mit einer Bonusaktion verstecken.':
    'You can Hide as a Bonus Action under certain conditions.',
  'Du kannst Schriftrollen und magische Gegenstände vielseitiger einsetzen.':
    'You can use spell scrolls and magic items more flexibly.',
  'Du erhältst zu Beginn eines Kampfes einen zusätzlichen Zug unter bestimmten Voraussetzungen.':
    'You can take an additional turn at the start of combat under certain conditions.',
  'Dein Trefferpunktemaximum steigt; ohne Rüstung berechnet sich deine Grund-Rüstungsklasse aus Geschicklichkeit und Charisma.':
    'Your Hit Point maximum increases; while unarmored, your base AC equals 10 plus Dexterity and Charisma modifiers.',
  'Die Zauber deiner drakonischen Abstammung sind abhängig von deiner Zaubererstufe stets vorbereitet.':
    'You always have your Draconic spells prepared at the listed Sorcerer levels.',
  'Du erhältst Resistenz gegen einen gewählten Drachenschadenstyp und kannst passenden Zauberschaden verstärken.':
    'Gain Resistance to a chosen dragon damage type and add Charisma to a matching spell damage roll.',
  'Du kannst für eine begrenzte Zeit Flügel manifestieren und eine Flugbewegungsrate erhalten.':
    'Manifest wings for a limited time and gain a Fly Speed.',
  'Du kannst einen drakonischen Geist als Gefährten beschwören.':
    'You can summon a Draconic spirit as a companion.',
  'Wenn ein Feind in deiner Nähe auf 0 Trefferpunkte sinkt, erhältst du temporäre Trefferpunkte.':
    'When an enemy nearby drops to 0 Hit Points, you gain Temporary Hit Points.',
  'Die Zauber deines Patrons sind abhängig von deiner Hexenmeisterstufe stets vorbereitet.':
    'You always have your Patron spells prepared at the listed Warlock levels.',
  'Du kannst einen Attributswurf oder Rettungswurf mit einem zusätzlichen W10 verbessern.':
    'You can add a d10 to an ability check or saving throw.',
  'Nach einer Rast wählst du einen Schadensarttyp, gegen den du resistent bist.':
    'After a rest, choose a damage type against which you have Resistance.',
  'Einmal pro Zug kannst du ein getroffenes Ziel in die Unteren Ebenen schleudern und ihm psychischen Schaden zufügen.':
    'Once per turn, you can send a creature you hit through the Lower Planes and deal Psychic damage.',
  'Das Kopieren von Hervorrufungszaubern in dein Zauberbuch kostet weniger Zeit und Gold.':
    'Copying Evocation spells into your spellbook takes less time and gold.',
  'Deine Schadenszaubertricks verursachen auch bei erfolgreichen Rettungswürfen Schaden.':
    'Your damaging cantrips still deal damage on a successful saving throw.',
  'Du kannst sichere Bereiche für Verbündete in deinen Hervorrufungszaubern schaffen.':
    'You can create safe spaces for allies in your Evocation spells.',
  'Du addierst deinen Intelligenzmodifikator zu einem Schadenswurf deiner Hervorrufungszauber.':
    'You add your Intelligence modifier to one damage roll of your Evocation spells.',
  'Du kannst einen Zauber verstärken, um maximalen Schaden zu verursachen, riskierst dabei aber Rückschlag.':
    'You can overchannel a spell for maximum damage, risking a harmful backlash.',
})

Object.assign(en, {
  Bonusaktion: 'Bonus Action',
  Reaktion: 'Reaction',
  Aktion: 'Action',
  Spezial: 'Special',
  'Siehe Beschreibung': 'See description',
  Unterklasse: 'Subclass',
  Klasse: 'Class',
  Unterklassenmerkmal: 'Subclass feature',
  Klassenmerkmal: 'Class feature',
  'AKTIVES MERKMAL': 'ACTIVE FEATURE',
  'Aktive Merkmale': 'Active features',
  'Aktive Klassen- und Unterklassenmerkmale': 'Active class and subclass features',
  Merkmale: 'Features',
  'aktive Merkmale': 'active features',
  'Freigeschaltet auf Stufe': 'Unlocked at level',
  'Keine begrenzten Nutzungen': 'No limited uses',
  'Du verfällst in einen Kampfrausch. Er hält bis zu 10 Minuten an und endet vorzeitig unter den im Regelwerk genannten Bedingungen.':
    'You enter a Rage. It lasts up to 10 minutes and ends early under the conditions described in the rules.',
  'Eine Kreatur deiner Wahl in Reichweite erhält einen Inspirationswürfel, den sie innerhalb der nächsten 10 Minuten zu einem passenden W20-Wurf addieren kann.':
    'A creature of your choice within range gains an Inspiration die it can add to an eligible d20 test within the next 10 minutes.',
  'Wenn eine Kreatur in deiner Nähe einen Wurf ablegt, kannst du eine Reaktion und eine Nutzung deiner Bardeninspiration einsetzen, um das Ergebnis zu verringern.':
    'When a nearby creature makes a roll, you can use your Reaction and expend Bardic Inspiration to reduce the result.',
  'Du beginnst eine Aufführung, die Verbündete in deiner Nähe gegen bestimmte Furcht- und Bezauberungseffekte stärkt.':
    'You perform to bolster nearby allies against certain fear and charm effects.',
  'Du setzt deine göttliche Energie frei und wählst einen verfügbaren Effekt deiner Klasse oder Unterklasse.':
    'You channel divine energy and choose an available effect from your class or subclass.',
  'Du präsentierst dein heiliges Symbol und zwingst Untote in deiner Nähe zu einem Weisheitsrettungswurf; bei Misslingen werden sie vertrieben.':
    'You present your holy symbol and force nearby Undead to make a Wisdom saving throw or be Turned.',
  'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.':
    'You expend Channel Divinity to distribute healing among nearby wounded creatures.',
  'Du verwandelst dich in eine zulässige Tiergestalt. Die Verwandlung hält bis zu deiner Rückverwandlung oder bis zum Ablauf der Dauer an.':
    'You transform into an eligible Beast form. The transformation lasts until you revert or its duration expires.',
  'Du gibst eine Nutzung deiner Tiergestalt aus, um Vertrauten finden ohne Materialkomponenten zu wirken.':
    'You expend a use of Wild Shape to cast Find Familiar without Material components.',
  'Du gibst eine Nutzung deiner Tiergestalt aus, um einen Bereich mit nekrotischer Energie zu erfüllen und eine Kreatur zu heilen.':
    'You expend a use of Wild Shape to fill an area with necrotic energy and heal a creature.',
  'Du gewinnst Trefferpunkte zurück. Die Höhe richtet sich nach deiner Kämpferstufe.':
    'You regain Hit Points. The amount is based on your Fighter level.',
  'Du kannst in diesem Zug zusätzlich zu deiner normalen Aktion eine weitere Aktion ausführen.':
    'You can take one additional action on this turn.',
  'Wenn dir ein Rettungswurf misslingt, kannst du ihn wiederholen und musst das neue Ergebnis verwenden.':
    'When you fail a saving throw, you can reroll it and must use the new result.',
  'Du setzt Ki-Punkte ein, um besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung oder Schritt des Windes auszuführen.':
    'You expend Ki or Focus Points to use special Monk options such as Flurry of Blows, Patient Defense, or Step of the Wind.',
  'Du setzt Fokus-Punkte ein, um besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung oder Schritt des Windes auszuführen.':
    'You expend Focus Points to use special Monk options such as Flurry of Blows, Patient Defense, or Step of the Wind.',
  'Du berührst eine Kreatur und stellst Trefferpunkte aus deinem Heilungsvorrat wieder her oder neutralisierst eine Krankheit bzw. ein Gift, sofern die Regeln dies erlauben.':
    'You touch a creature to restore Hit Points from your healing pool or neutralize a disease or poison when permitted by the rules.',
  'Bis zum Ende deines nächsten Zuges nimmst du bestimmte himmlische, untote und dämonische Präsenzen in deiner Nähe wahr.':
    'Until the end of your next turn, you sense certain Celestial, Undead, and Fiend presences nearby.',
  'Du setzt Kanal göttlicher Energie ein, um eine gehaltene Waffe vorübergehend mit heiliger Macht zu erfüllen.':
    'You expend Channel Divinity to temporarily imbue a weapon you hold with holy power.',
  'Du entfesselst deine angeborene Magie für 1 Minute und erhältst die im Merkmal beschriebenen Vorteile.':
    'You unleash your innate magic for 1 minute and gain the benefits described by the feature.',
  'Du führst ein kurzes Ritual aus, um einen Teil deiner verbrauchten Paktmagie-Zauberplätze zurückzugewinnen.':
    'You perform a brief ritual to regain some expended Pact Magic spell slots.',
  'Nach einer kurzen Rast stellst du verbrauchte Zauberplätze bis zu deinem zulässigen Gesamtgrad wieder her.':
    'After a Short Rest, you recover expended spell slots up to your permitted combined levels.',
  'Du erschreckst Kreaturen in deiner Nähe mit deiner bedrohlichen Präsenz; sie müssen einen Weisheitsrettungswurf bestehen.':
    'You frighten nearby creatures with your menacing presence; they must succeed on a Wisdom saving throw.',
  'Wenn dich eine Kreatur in deiner Nähe verletzt, kannst du als Reaktion einen Nahkampfangriff gegen sie ausführen.':
    'When a creature near you damages you, you can use your Reaction to make a melee attack against it.',
  'Du kannst Schritt des Windes einsetzen, nachdem du in diesem Zug bereits eine andere Bonusaktion verwendet hast.':
    'You can use Step of the Wind after already taking another Bonus Action on this turn.',
  'Du setzt Fokus-Punkte ein, um einem getroffenen Ziel tödliche Schwingungen einzuprägen und diese später auszulösen.':
    'You expend Focus Points to set lethal vibrations in a creature you hit and trigger them later.',
  'Du kannst zu Beginn des ersten Kampfzugs unter den im Merkmal genannten Voraussetzungen einen zusätzlichen Zug erhalten.':
    'You can take an additional turn at the start of the first combat round under the feature’s stated conditions.',
  'Du kannst bestimmte Gegenstands- und Fertigkeitsaktionen als Bonusaktion ausführen.':
    'You can take certain object and skill actions as a Bonus Action.',
  'Wenn dich ein sichtbarer Angreifer trifft, kannst du deine Reaktion einsetzen, um den Angriffsschaden zu halbieren.':
    'When a visible attacker hits you, you can use your Reaction to halve the attack damage.',
  'Du nutzt deine Schnelligkeit, um als Bonusaktion zu sprinten, dich zurückzuziehen oder dich zu verstecken.':
    'You use your agility to Dash, Disengage, or Hide as a Bonus Action.',
  'Du gibst deine Bewegung für diesen Zug auf, um bei deinem nächsten Angriff im selben Zug Vorteil zu erhalten.':
    'You forgo your movement this turn to gain Advantage on your next attack roll this turn.',
  'Du manifestierst drakonische Flügel und erhältst eine Flugbewegungsrate.':
    'You manifest draconic wings and gain a Fly Speed.',
  'Wenn du eine Kreatur triffst, kannst du sie einmal pro Zug durch die Unteren Ebenen schleudern und ihr zusätzlichen Schaden zufügen.':
    'When you hit a creature, you can send it through the Lower Planes once per turn and deal extra damage.',
  'Du kannst einen Magierzauber verstärken, um maximalen Schaden zu verursachen; die Anwendung birgt das im Merkmal beschriebene Risiko.':
    'You can empower a Wizard spell to deal maximum damage, with the risk described by the feature.',
})

Object.assign(en, {
  'Zauber & aktive Merkmale': 'Spells & active features',
  'Verwalte Zauber und aktive Klassenfähigkeiten mit ihren wichtigsten Details.':
    'Manage spells and active class features with their key details.',
  'Schneidende Worte': 'Cutting Words',
  'Bewahrung des Lebens': 'Preserve Life',
  'Ganzheit des Körpers': 'Wholeness of Body',
  'Hund des Unheils': 'Hound of Ill Omen',
  Drachenpräsenz: 'Dragon Presence',
  Waffenbindung: 'Weapon Bond',
  'Göttliches Eingreifen': 'Divine Intervention',
  'Dunkler eigener Glücksfall': 'Dark One’s Own Luck',
  'Du flüsterst einer Kreatur magisch Worte zu, die sie verunsichern und für eine begrenzte Zeit verängstigen können.':
    'You magically whisper words to a creature that unsettle and frighten it for a limited time.',
  'Während deines Kampfrauschs kannst du einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen.':
    'While raging, you can make one additional melee attack as a Bonus Action.',
  'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.':
    'As an Action, you regain Hit Points equal to three times your Monk level.',
  'Du gibst drei Zauberpunkte aus, um einen Schattenhund zu beschwören, der ein Ziel jagt und bedrängt.':
    'You expend three Sorcery Points to summon a shadow hound that hunts and harasses a target.',
  'Du gibst fünf Zauberpunkte aus, um deine drakonische Präsenz zu entfalten und Kreaturen in deiner Nähe zu bezaubern oder zu verängstigen.':
    'You expend five Sorcery Points to unleash your draconic presence and charm or frighten nearby creatures.',
  'Du kannst eine gebundene Waffe in deine Hand teleportieren.':
    'You can teleport a bonded weapon into your hand.',
  'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.':
    'You call on your deity for direct aid and produce the effect granted by this feature.',
  'Du wirkst Mal des Jägers ohne Zauberplatz und nutzt dafür eine verfügbare Anwendung dieses Merkmals.':
    'You cast Hunter’s Mark without a spell slot, expending one available use of this feature.',
  'Wenn du einen Attributs- oder Rettungswurf ablegst, kannst du einen zusätzlichen W10 zum Ergebnis addieren.':
    'When you make an ability check or saving throw, you can add an additional d10 to the result.',
})

Object.assign(en, {
  Aktivieren: 'Activate',
  'Aktive Klassen- und Unterklassenmerkmale': 'Active class and subclass features',
  'Dunkler eigener Glücksfall': 'Dark One’s Own Luck',
  'Du flüsterst einer Kreatur magisch Worte zu, die sie verunsichern und für eine begrenzte Zeit verängstigen können.':
    'You magically whisper words to a creature that unsettle and frighten it for a limited time.',
  'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.':
    'As an Action, you regain Hit Points equal to three times your Monk level.',
  'Du gibst drei Zauberpunkte aus, um einen Schattenhund zu beschwören, der ein Ziel jagt und bedrängt.':
    'You expend three Sorcery Points to summon a shadow hound that hunts and harasses a target.',
  'Du gibst fünf Zauberpunkte aus, um deine drakonische Präsenz zu entfalten und Kreaturen in deiner Nähe zu bezaubern oder zu verängstigen.':
    'You expend five Sorcery Points to unleash your draconic presence and charm or frighten nearby creatures.',
  'Du kannst eine gebundene Waffe in deine Hand teleportieren.':
    'You can teleport a bonded weapon into your hand.',
  'Du bittest deine Gottheit um direkte Hilfe und wirkst den durch das Merkmal gewährten Effekt.':
    'You call on your deity for direct aid and produce the effect granted by this feature.',
  'Du wirkst Mal des Jägers ohne Zauberplatz und nutzt dafür eine verfügbare Anwendung dieses Merkmals.':
    'You cast Hunter’s Mark without a spell slot, expending one available use of this feature.',
  'Wenn du einen Attributs- oder Rettungswurf ablegst, kannst du einen zusätzlichen W10 zum Ergebnis addieren.':
    'When you make an ability check or saving throw, you can add an additional d10 to the result.',
})


Object.assign(en, {
  'Während deines Kampfrauschs kannst du einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen.': 'While raging, you can make one additional melee attack as a Bonus Action.',
  'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.': 'As an Action, you regain Hit Points equal to three times your Monk level.',
  'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.': 'You expend Channel Divinity to distribute healing among nearby wounded creatures.',
});
