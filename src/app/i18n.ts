import { createContext, useContext } from 'react'
export type Language = 'de' | 'en'
export const LanguageContext = createContext<Language>('de')
export const useLanguage = () => useContext(LanguageContext)
const en: Record<string, string> = {
  'EN – englischer Ersatztext': 'EN – English fallback text',
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
  'Dunamancy-Zugang': 'Dunamancy access',
  Verfügbarkeit: 'Availability',
  'Andere Klassen nur mit Zustimmung der Spielleitung': 'Other classes require DM approval',
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
  'Während deines Kampfrauschs kannst du einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen.':
    'While raging, you can make one additional melee attack as a Bonus Action.',
  'Du stellst als Aktion Trefferpunkte in Höhe des Dreifachen deiner Mönchsstufe wieder her.':
    'As an Action, you regain Hit Points equal to three times your Monk level.',
  'Du setzt Kanal göttlicher Energie ein, um Trefferpunkte unter verwundeten Kreaturen in deiner Nähe zu verteilen.':
    'You expend Channel Divinity to distribute healing among nearby wounded creatures.',
})

Object.assign(en, {
  'Betäubender Schlag': 'Stunning Strike',
  'Geschosse abwehren': 'Deflect Missiles',
  'Angriffe abwehren': 'Deflect Attacks',
  'Langsamer Fall': 'Slow Fall',
  'Göttliches Niederstrecken': 'Divine Smite',
  'Du kannst bei deinem ersten Angriff in diesem Zug Vorteil auf Stärke-Nahkampfangriffe erhalten; bis zu deinem nächsten Zug haben Angriffe gegen dich ebenfalls Vorteil.':
    'When you make your first attack on your turn, you can gain Advantage on Strength-based melee attacks; attack rolls against you also have Advantage until your next turn.',
  'Wenn du mit einem Nahkampfangriff triffst, kannst du einen Ki- oder Fokus-Punkt ausgeben, um das Ziel zu einem Konstitutionsrettungswurf gegen Betäubung zu zwingen.':
    'When you hit with a melee attack, you can expend a Ki or Focus Point to force the target to make a Constitution saving throw or be Stunned.',
  'Wenn dich ein Fernkampfangriff mit einer Waffe trifft, kannst du den Schaden mit deiner Reaktion reduzieren; unter bestimmten Bedingungen kannst du das Geschoss auffangen und zurückwerfen.':
    'When a ranged weapon attack hits you, you can use your Reaction to reduce the damage and, in certain circumstances, catch and throw the projectile.',
  'Wenn dich ein Angriff trifft, kannst du deine Reaktion einsetzen, um den erlittenen Schaden zu reduzieren und den Angriff möglicherweise zurückzulenken.':
    'When an attack hits you, you can use your Reaction to reduce the damage and potentially deflect the attack.',
  'Wenn du fällst, kannst du deine Reaktion einsetzen, um den erlittenen Fallschaden zu reduzieren.':
    'When you fall, you can use your Reaction to reduce the falling damage you take.',
  'Wenn du eine Kreatur mit einer Nahkampfwaffe triffst, kannst du einen Zauberplatz ausgeben, um zusätzlichen gleißenden Schaden zu verursachen.':
    'When you hit a creature with a melee weapon, you can expend a spell slot to deal extra Radiant damage.',
})

Object.assign(en, { Merkmalsbeschreibung: 'Feature description' })

Object.assign(en, {
  'kurze Rast (+1) / lange Rast (alle)': 'Short Rest (+1) / Long Rest (all)',
  'kurze oder lange Rast': 'Short or Long Rest',
})

Object.assign(en, {
  'Hagel der Schläge': 'Flurry of Blows',
  'Geduldige Verteidigung': 'Patient Defense',
  'Schritt des Windes': 'Step of the Wind',
  'Quelle der Magie': 'Font of Magic',
  Abwehrzauber: 'Abjure Foes',
  'Nach der Angriffsaktion kannst du einen Ki- oder Fokus-Punkt ausgeben, um zwei zusätzliche unbewaffnete Schläge als Bonusaktion auszuführen.':
    'After taking the Attack action, you can expend a Ki or Focus Point to make two additional Unarmed Strikes as a Bonus Action.',
  'Du nutzt deine Bonusaktion zur Verteidigung. Im Regelwerk 2024 kannst du dich kostenlos zurückziehen oder mit einem Fokus-Punkt zusätzlich ausweichen; 2014 kostet die Ausweichaktion einen Ki-Punkt.':
    'You use your Bonus Action defensively. In the 2024 rules, you can Disengage for free or also Dodge by spending a Focus Point; in 2014, Dodging as a Bonus Action costs a Ki Point.',
  'Du nutzt deine Bonusaktion für Sprinten oder Zurückziehen und kannst deine Sprungweite erhöhen. Die genauen Kosten unterscheiden sich zwischen 2014 und 2024.':
    'You use your Bonus Action to Dash or Disengage and can increase your jump distance. The exact costs differ between the 2014 and 2024 rules.',
  'Du wandelst Zauberplätze in Zauberpunkte um oder gibst Zauberpunkte aus, um Zauberplätze zu erschaffen.':
    'You convert spell slots into Sorcery Points or expend Sorcery Points to create spell slots.',
  'Du setzt Kanal göttlicher Energie ein, um ausgewählte Kreaturen in deiner Nähe mit einem Weisheitsrettungswurf gegen Furcht und Handlungsunfähigkeit zu belegen.':
    'You expend Channel Divinity to force chosen nearby creatures to make a Wisdom saving throw or become Frightened and Incapacitated.',
})

Object.assign(en, {
  'Diese Ressource speist deine Kanal-göttlicher-Energie-Effekte. Wähle im Zauberbuch den konkreten Effekt, etwa Untote vertreiben, Leben bewahren, Heilige Waffe oder Abwehrzauber.':
    'This resource powers your Channel Divinity effects. Choose the specific effect in the spellbook, such as Turn Undead, Preserve Life, Sacred Weapon, or Abjure Foes.',
  'Ki-Punkte sind die Ressource für besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung, Schritt des Windes und Leerer Körper.':
    'Ki Points fuel special Monk techniques such as Flurry of Blows, Patient Defense, Step of the Wind, and Empty Body.',
  'Fokus-Punkte sind die Ressource für besondere Mönchsmanöver wie Hagel der Schläge, Geduldige Verteidigung und Schritt des Windes.':
    'Focus Points fuel special Monk techniques such as Flurry of Blows, Patient Defense, and Step of the Wind.',
  'Wenn du keine Nutzungen von Tiergestalt mehr hast, kannst du eine Nutzung durch Ausgeben eines Zauberplatzes zurückgewinnen. Außerdem kannst du einmal pro langer Rast eine Nutzung von Tiergestalt ausgeben, um einen Zauberplatz des 1. Grades zu erhalten.':
    'If you have no uses of Wild Shape left, you can regain one by expending a spell slot. In addition, once per Long Rest, you can expend one use of Wild Shape to regain a level 1 spell slot.',
  'Wenn du Handauflegen einsetzt, kannst du zusätzlich Zustände vom Ziel entfernen. Jeder entfernte Zustand kostet fünf Trefferpunkte aus deinem Heilungsvorrat.':
    'When you use Lay on Hands, you can also remove conditions from the target. Each condition removed costs five Hit Points from your healing pool.',
  'Du manifestierst für eine Stunde Flügel und erhältst Flugbewegungsrate. Nach der Nutzung musst du lange rasten oder drei Zauberpunkte ausgeben, um die Nutzung wiederherzustellen.':
    'You manifest wings for one hour and gain a Fly Speed. After using this feature, you must finish a Long Rest or spend three Sorcery Points to restore its use.',
})

Object.assign(en, {
  'Göttlicher Funke': 'Divine Spark',
  'Reinigende Berührung': 'Cleansing Touch',
  'Zauberhafte Erneuerung': 'Sorcerous Restoration',
  'Listiger Schlag': 'Cunning Strike',
  'Listige Schläge': 'Devious Strikes',
  'Du richtest göttliche Energie auf eine Kreatur in bis zu 9 Metern Entfernung. Du heilst sie um 1W8 plus deinen Weisheitsmodifikator oder zwingst sie zu einem Konstitutionsrettungswurf gegen gleißenden oder nekrotischen Schaden. Der Würfel steigt auf 2W8 ab Stufe 7, 3W8 ab Stufe 13 und 4W8 ab Stufe 18.':
    'You direct divine energy at a creature within 30 feet. You either heal it for 1d8 plus your Wisdom modifier or force it to make a Constitution saving throw against Radiant or Necrotic damage. The dice increase to 2d8 at level 7, 3d8 at level 13, and 4d8 at level 18.',
  'Du berührst dich selbst oder eine bereitwillige Kreatur und beendest einen Zauber, der auf ihr liegt.':
    'You touch yourself or a willing creature and end one spell affecting it.',
  'Nach einer kurzen Rast kannst du Zauberpunkte in Höhe von höchstens der Hälfte deiner Zaubererstufe zurückgewinnen. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.':
    'When you finish a Short Rest, you can regain expended Sorcery Points up to half your Sorcerer level. Once used, you must finish a Long Rest before using this feature again.',
  'Wenn du Hinterhältigen Angriffsschaden verursachst, kannst du einen oder mehrere Schadenswürfel aufgeben, um einen Listigen-Schlag-Effekt wie Vergiften, Zu-Fall-Bringen oder Zurückziehen auszulösen.':
    'When you deal Sneak Attack damage, you can forgo one or more damage dice to add a Cunning Strike effect, such as Poison, Trip, or Withdraw.',
  'Wenn du Hinterhältigen Angriffsschaden verursachst, kannst du zusätzliche Schadenswürfel aufgeben, um weitere Listige-Schläge-Effekte wie Benommenheit, Bewusstlosigkeit oder Blindheit auszulösen.':
    'When you deal Sneak Attack damage, you can forgo additional damage dice to add Devious Strike effects such as Daze, Knock Out, or Obscure.',
  'Du öffnest als Bonusaktion deine Sinne und erkennst für zehn Minuten Celestials, Fiends und Untote sowie geweihte oder entweihte Orte und Gegenstände in deiner Nähe.':
    'As a Bonus Action, you open your awareness for 10 minutes to detect Celestials, Fiends, and Undead, as well as consecrated or desecrated places and objects nearby.',
})

Object.assign(en, {
  'Unheilige vertreiben': 'Turn the Unholy',
  'Du präsentierst dein heiliges Symbol und zwingst Unholde und Untote in deiner Nähe zu einem Weisheitsrettungswurf. Bei Misslingen werden sie für bis zu eine Minute vertrieben.':
    'You present your holy symbol and force Fiends and Undead nearby to make a Wisdom saving throw. On a failure, they are turned for up to one minute.',
})

Object.assign(en, {
  'Du verbringst eine Minute damit, natürliche Materialien zu sammeln und dich zu tarnen. Solange du dich nicht bewegst, bist du unter passenden natürlichen Bedingungen schwer zu entdecken.':
    'You spend one minute gathering natural materials to camouflage yourself. While you remain still in suitable natural surroundings, you are difficult to detect.',
})

Object.assign(en, {
  Kampfrausch: 'Rage',
  Bardeninspiration: 'Bardic Inspiration',
  'Schneidende Worte': 'Cutting Words',
  'Gegenzauberische Melodie': 'Countercharm',
  Gegenzauber: 'Countercharm',
  'Kanal göttlicher Energie': 'Channel Divinity',
  'Untote vertreiben': 'Turn Undead',
  'Leben bewahren': 'Preserve Life',
  'Bewahrung des Lebens': 'Preserve Life',
  Tiergestalt: 'Wild Shape',
  'Wilder Gefährte': 'Wild Companion',
  'Hilfe des Landes': "Land's Aid",
  'Zweites Aufatmen': 'Second Wind',
  Aktionsschub: 'Action Surge',
  Unbeugsam: 'Indomitable',
  Ki: 'Ki',
  'Fokus des Mönchs': "Monk's Focus",
  Handauflegen: 'Lay on Hands',
  'Göttlicher Sinn': 'Divine Sense',
  'Heilige Waffe': 'Sacred Weapon',
  'Angeborene Magie': 'Innate Sorcery',
  'Magische List': 'Magical Cunning',
  'Arkane Erholung': 'Arcane Recovery',
  'Natürliche Erholung': 'Natural Recovery',
  'Einschüchternde Präsenz': 'Intimidating Presence',
  Vergeltung: 'Retaliation',
  'Fließender Schritt': 'Fleet Step',
  'Zitternde Handfläche': 'Quivering Palm',
  Diebesreflexe: "Thief's Reflexes",
  'Schnelle Hände': 'Fast Hands',
  'Unheimliches Ausweichen': 'Uncanny Dodge',
  'Listige Aktion': 'Cunning Action',
  'Sicheres Zielen': 'Steady Aim',
  Drachenflügel: 'Dragon Wings',
  'Durch die Hölle schicken': 'Hurl Through Hell',
  Überladung: 'Overchannel',
  Raserei: 'Frenzy',
  'Ganzheit des Körpers': 'Wholeness of Body',
  'Hund des Unheils': 'Hound of Ill Omen',
  Drachenpräsenz: 'Draconic Presence',
  Waffenbindung: 'Weapon Bond',
  'Göttliches Eingreifen': 'Divine Intervention',
  'Bevorzugter Feind': 'Favored Enemy',
  'Dunkler eigener Glücksfall': "Dark One's Own Luck",
  'Rücksichtsloser Angriff': 'Reckless Attack',
  'Betäubender Schlag': 'Stunning Strike',
  'Geschosse abwehren': 'Deflect Missiles',
  'Angriffe abwehren': 'Deflect Attacks',
  'Langsamer Fall': 'Slow Fall',
  'Göttliches Niederstrecken': 'Divine Smite',
  'Hagel der Schläge': 'Flurry of Blows',
  'Geduldige Verteidigung': 'Patient Defense',
  'Schritt des Windes': 'Step of the Wind',
  'Quelle der Magie': 'Font of Magic',
  Abwehrzauber: 'Abjure Foes',
  'Unvergleichliche Fertigkeiten': 'Peerless Skill',
  'Unvergleichliche Fertigkeit': 'Peerless Skill',
  Mehrfachangriff: 'Multiattack',
  'Magische Hand-Tricks': 'Mage Hand Legerdemain',
  'Vielseitiger Betrüger': 'Versatile Trickster',
  Zauberdieb: 'Spell Thief',
  Kriegsmagie: 'War Magic',
  'Verbesserte Kriegsmagie': 'Improved War Magic',
  'Arkane Aufladung': 'Arcane Charge',
  'Augen der Dunkelheit': 'Eyes of the Dark',
  'Stärke des Grabes': 'Strength of the Grave',
  Schattenwandlung: 'Shadow Walk',
  Schattenform: 'Umbral Form',
  'Treues Ross': 'Faithful Steed',
  'Taktischer Verstand': 'Tactical Mind',
  Selbstheilung: 'Self-Restoration',
  'Abgelenkte Energie': 'Deflect Energy',
  'Großes Göttliches Eingreifen': 'Greater Divine Intervention',
  'Tarnung in der Wildnis': 'Hide in Plain Sight',
  Verschwinden: 'Vanish',
  'Heiliger Nimbus': 'Holy Nimbus',
  'Patron kontaktieren': 'Contact Patron',
  Glückstreffer: 'Stroke of Luck',
  'Leerer Körper': 'Empty Body',
  'Brutaler Schlag': 'Brutal Strike',
  'Wilde Erneuerung': 'Wild Resurgence',
  'Berührende Reinigung': 'Restoring Touch',
  Drachengefährte: 'Dragon Companion',
  'Göttlicher Funke': 'Divine Spark',
  'Reinigende Berührung': 'Cleansing Touch',
  'Zauberhafte Erneuerung': 'Sorcerous Restoration',
  'Listiger Schlag': 'Cunning Strike',
  'Listige Schläge': 'Devious Strikes',
  'Unheilige vertreiben': 'Turn the Unholy',
  'Du beginnst eine inspirierende Aufführung, die Verbündeten in deiner Nähe Vorteil auf Rettungswürfe gegen Bezauberung und Furcht gewährt.':
    'You perform an inspiring tune that grants nearby allies Advantage on saving throws against being Charmed or Frightened.',
  'Während deines Kampfrauschs kannst du in jedem deiner Züge einen zusätzlichen Nahkampfangriff als Bonusaktion ausführen. Wenn der Kampfrausch endet, erhältst du eine Erschöpfungsstufe.':
    'While raging, you can make one additional melee attack as a Bonus Action on each of your turns. When the Rage ends, you gain one level of Exhaustion.',
  'Du gibst vier Ki-Punkte aus, um für eine Minute unsichtbar zu werden und gegen alle Schadensarten außer Energieschaden resistent zu sein.':
    'You spend four Ki Points to become Invisible for one minute and gain Resistance to all damage except Force damage.',
  'Wenn du während deines Kampfrauschs mit einem Stärke-Angriff triffst, kannst du einen zusätzlichen Effekt deines Brutalen Schlags wählen, etwa das Ziel wegzustoßen oder zusätzlichen Schaden zu verursachen.':
    'When you hit with a Strength-based attack while raging, you can choose an additional Brutal Strike effect, such as pushing the target or dealing extra damage.',
  'Du kannst eine Nutzung deiner Tiergestalt ausgeben, um einen Zauberplatz des 1. Grades wiederherzustellen, oder einen Zauberplatz ausgeben, um eine Nutzung deiner Tiergestalt zurückzugewinnen.':
    'You can expend a use of Wild Shape to regain a 1st-level spell slot, or expend a spell slot to regain one use of Wild Shape.',
  'Du beschwörst einmal nach einer langen Rast einen drakonischen Geist als Gefährten, indem du den Zauber Drachen beschwören ohne Zauberplatz und Materialkomponenten wirkst.':
    'Once per Long Rest, you summon a draconic spirit companion by casting Summon Dragon without expending a spell slot or Material components.',
  'Wenn du einen Attributswurf ablegst, kannst du einen Inspirationswürfel ausgeben und sein Ergebnis zum Wurf addieren.':
    'When you make an ability check, you can expend a Bardic Inspiration die and add its result to the check.',
  'Du führst eine deiner gewählten Mehrfachangriffstechniken aus: einen Angriff gegen mehrere Ziele mit Fernkampfwaffen oder mehrere Nahkampfangriffe gegen Kreaturen in deiner Reichweite.':
    'You use one of your chosen Multiattack options: make a ranged attack against multiple targets or make melee attacks against creatures within your reach.',
  'Du kannst deine Magische Hand mit einer Bonusaktion kontrollieren und mit ihr Taschendiebstahl, das Entschärfen von Fallen oder andere geschickte Manipulationen ausführen.':
    'You can control your Mage Hand as a Bonus Action to pick pockets, disarm traps, or perform other delicate tasks.',
  'Du lenkst mit deiner Magischen Hand einen Gegner ab und verschaffst dir dadurch Vorteil auf deinen nächsten Angriff gegen ihn.':
    'You distract a creature with your Mage Hand, giving yourself Advantage on attack rolls against it until the end of the turn.',
  'Wenn eine Kreatur einen Zauber auf dich wirkt, kannst du versuchen, den Zauber mit deiner Reaktion zu vereiteln und seine Magie für dich zu beanspruchen.':
    'When a creature casts a spell on you, you can use your Reaction to try to foil the spell and claim its magic for yourself.',
  'Nachdem du mit deiner Aktion einen Zaubertrick gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.':
    'After you use your action to cast a cantrip, you can make one weapon attack as a Bonus Action.',
  'Nachdem du mit deiner Aktion einen Zauber gewirkt hast, kannst du als Bonusaktion einen Waffenangriff ausführen.':
    'After you use your action to cast a spell, you can make one weapon attack as a Bonus Action.',
  'Wenn du Aktionsschub einsetzt, kannst du dich vor, nach oder zwischen den Aktionen bis zu 9 Meter weit teleportieren.':
    'When you use Action Surge, you can teleport up to 30 feet to an unoccupied space you can see before, after, or between your actions.',
  'Du kannst Dunkelheit mit Zauberpunkten wirken und durch die von dir erzeugte magische Dunkelheit sehen.':
    'You can cast Darkness by spending Sorcery Points and see through the magical darkness you create.',
  'Wenn Schaden dich auf 0 Trefferpunkte reduzieren würde, kannst du mit einem Charisma-Rettungswurf versuchen, stattdessen mit 1 Trefferpunkt stehen zu bleiben.':
    'When damage would reduce you to 0 Hit Points, you can make a Charisma saving throw to drop to 1 Hit Point instead.',
  'Du teleportierst dich von einem Bereich mit dämmrigem Licht oder Dunkelheit zu einem freien Ort mit dämmrigem Licht oder Dunkelheit in deiner Sichtweite.':
    'You teleport from an area of dim light or darkness to an unoccupied space you can see that is also in dim light or darkness.',
  'Du gibst sechs Zauberpunkte aus, um für bis zu eine Minute eine schattenhafte Gestalt anzunehmen, die sich durch feste Gegenstände bewegen kann.':
    'You spend six Sorcery Points to take a shadowy form for up to one minute, allowing you to move through solid objects.',
  'Du wirkst Find Steed, ohne einen Zauberplatz auszugeben. Das beschworene Reittier folgt den Regeln des Zaubers.':
    'You cast Find Steed without expending a spell slot. The summoned mount follows the spell’s rules.',
  'Wenn dir ein Attributswurf misslingt, kannst du eine Nutzung von Zweites Aufatmen ausgeben und den Wurf um einen W10 erhöhen.':
    'When you fail an ability check, you can expend a use of Second Wind to add 1d10 to the check.',
  'Am Ende deines Zuges kannst du einen der Zustände Bezaubert, Verängstigt oder Vergiftet beenden. Alternativ kannst du einen Fokus-Punkt ausgeben, um einen solchen Zustand sofort zu beenden.':
    'At the end of your turn, you can end the Charmed, Frightened, or Poisoned condition on yourself. Alternatively, you can spend a Focus Point to end one of those conditions immediately.',
  'Wenn du mit deiner Reaktion Energieschaden abwehrst, kannst du einen Teil davon auf ein Ziel in Reichweite umlenken.':
    'When you deflect damage with your Reaction, you can spend a Focus Point to redirect some of that damage to a target within range.',
  'Du kannst die mächtigste Form deines Göttlichen Eingreifens erbitten und den dadurch gewährten göttlichen Effekt wirken.':
    'You can invoke the mightiest form of Divine Intervention and produce the divine effect it grants.',
  'Du kannst die Verstecken-Aktion als Bonusaktion ausführen.':
    'You can take the Hide action as a Bonus Action.',
  'Du entfesselst eine heilige Aura, die helles Licht ausstrahlt und feindliche Kreaturen in deiner Nähe beeinträchtigt.':
    'You unleash a holy aura that sheds bright light and hinders hostile creatures nearby.',
  'Du führst ein einminütiges Ritual aus, um mit deinem Patron Kontakt aufzunehmen und den Zauber Kontakt zu einer anderen Ebene ohne Zauberplatz zu wirken.':
    'You perform a one-minute ritual to contact your patron and cast Contact Other Plane without expending a spell slot.',
  'Wenn ein Angriff dich verfehlt oder ein Attributswurf misslingt, kannst du das Ergebnis in einen Treffer oder einen W20-Wert von 20 verwandeln.':
    'When an attack misses you or you fail an ability check, you can turn the result into a hit or a 20 on the d20.',
})

Object.assign(en, {
  'Mystischer Meister': 'Eldritch Master',
  'Du führst eine einminütige Zwiesprache mit deinem Patron und stellst alle verbrauchten Zauberplätze deiner Paktmagie wieder her. Nach der Nutzung musst du eine lange Rast beenden, bevor du das Merkmal erneut einsetzen kannst.':
    'You spend one minute communing with your patron to regain all expended Pact Magic spell slots. Once used, you must finish a Long Rest before using this feature again.',
  'Du lenkst mit deiner Magischen Hand einen Gegner ab und erhältst bis zum Ende deines Zuges Vorteil auf deine Angriffswürfe gegen ihn.':
    'You distract a creature with your Mage Hand, giving yourself Advantage on attack rolls against it until the end of your turn.',
  'Du führst ein einminütiges Ritual aus, um mit deinem Patron Kontakt aufzunehmen und Kontakt zu einer anderen Ebene ohne Zauberplatz zu wirken. Den Rettungswurf des Zaubers bestehst du automatisch.':
    'You perform a one-minute ritual to contact your patron and cast Contact Other Plane without expending a spell slot. You automatically succeed on the spell’s saving throw.',
})

Object.assign(en, { 'Zauberer-Inkarnation': 'Sorcery Incarnate' })

Object.assign(en, {
  'Noch nicht freigeschaltet': 'Not unlocked yet',
  Freigeschaltet: 'Unlocked',
  'Ab Stufe': 'At level',
  'Alle passiven Klassen- und Unterklassenmerkmale deines Regelwerks – inklusive kommender Freischaltungen.':
    'All passive class and subclass features for your ruleset, including upcoming unlocks.',
  'Auch zukünftige Merkmale werden angezeigt. Gesperrte Merkmale werden erst auf der angegebenen Stufe freigeschaltet.':
    'Future features are shown too. Locked features become available at the listed level.',
  'Dieses Merkmal gewährt dir einen klassenabhängigen Vorteil. Die vollständigen Regeln richten sich nach dem gewählten Regelwerk.':
    'This feature grants a class-specific benefit. Its full rules depend on the selected ruleset.',
  'Dieses Unterklassenmerkmal gewährt dir einen zusätzlichen Vorteil. Die vollständigen Regeln richten sich nach dem gewählten Regelwerk.':
    'This subclass feature grants an additional benefit. Its full rules depend on the selected ruleset.',
})

Object.assign(en, {
  Geistesruhe: 'Stillness of Mind',
  'Uraltes Bewusstsein': 'Primeval Awareness',
})

Object.assign(en, {
  'Short rules summary available in German only for now.':
    'Short rules summary available in German only for now.',
})

Object.assign(en, {
  'Wenn du zu Beginn eines Kampfes keine Anwendungen deiner Bardeninspiration mehr hast, erhältst du eine Anwendung zurück.':
    'If you have no uses of Bardic Inspiration when you roll Initiative, you regain one use.',
  'Du kannst deine Aktion einsetzen, um einen Bezauberungs- oder Furchteffekt auf dir zu beenden.':
    'You can take an action to end one effect on yourself that is causing you to be Charmed or Frightened.',
  'Du verstehst alle gesprochenen Sprachen. Kreaturen, die mindestens eine Sprache verstehen, können auch dich verstehen.':
    'You understand all spoken languages, and any creature that understands at least one language can understand you.',
  'Du kannst einen Zauberplatz ausgeben, um bestimmte Kreaturenarten in deiner Nähe für kurze Zeit wahrzunehmen.':
    'You can expend a spell slot to sense certain creature types in your vicinity for a short time.',
  'Während deines Kampfrauschs kannst du nicht bezaubert oder verängstigt werden. Bestehende Effekte werden währenddessen unterdrückt.':
    'While raging, you can’t be Charmed or Frightened. Any existing effect is suspended for the duration of your Rage.',
  'Du erhältst Übung in drei Fertigkeiten deiner Wahl.':
    'You gain proficiency in three skills of your choice.',
  'Du lernst zwei zusätzliche Zauber von beliebigen Klassenlisten, die du wirken kannst.':
    'You learn two additional spells from any class spell lists, provided you can cast them.',
  'Du addierst einen Teil deines Übungsbonus auf bestimmte körperliche Attributswürfe und springst weiter.':
    'You add part of your Proficiency Bonus to certain Strength, Dexterity, and Constitution checks, and you jump farther.',
  'Du stehst dauerhaft unter dem Schutz des Zaubers Schutz vor Gut und Böse.':
    'You are constantly protected by the Protection from Evil and Good spell.',
  'Klettern kostet dich keine zusätzliche Bewegung. Außerdem erhöht sich deine Sprungweite um deinen Geschicklichkeitsmodifikator.':
    'Climbing costs you no extra movement, and your jump distance increases by your Dexterity modifier.',
  'Wenn du einen Hervorrufungszauber wirkst, kannst du geschützte Bereiche für Verbündete bestimmen, die dadurch keinen Schaden erleiden.':
    'When you cast an Evocation spell, you can create pockets of safety that protect chosen allies from its effects.',
  'Wenn eine Kreatur einen deiner Schadenszaubertricks mit einem erfolgreichen Rettungswurf abwehrt, erleidet sie trotzdem einen Teil des Schadens.':
    'When a creature succeeds on a saving throw against one of your damaging cantrips, it still takes part of the damage.',
})

Object.assign(en, {
  'Während deines Kampfrauschs kannst du Stärke statt eines anderen Attributs für bestimmte Fertigkeitswürfe verwenden.':
    'While raging, you can use Strength instead of another ability for certain ability checks.',
  'Wenn du deinen Kampfrausch als Bonusaktion beginnst, kannst du dich gleichzeitig bis zur Hälfte deiner Bewegungsrate bewegen.':
    'When you enter your Rage as a Bonus Action, you can move up to half your Speed at the same time.',
  'Deine Brutalen Schläge erhalten zusätzliche taktische Effekte, mit denen du Gegner weiter schwächen oder kontrollieren kannst.':
    'Your Brutal Strikes gain additional tactical effects that let you further weaken or control your foes.',
  'Du wählst eine weitere Metamagie-Option, mit der du die Wirkung deiner Zauber verändern kannst.':
    'You choose one additional Metamagic option to alter the effects of your spells.',
})

Object.assign(en, {
  'Deine Waffenangriffe verursachen zusätzlichen gleißenden Schaden.':
    'Your weapon attacks deal additional Radiant damage.',
  'Du wählst einen Pfad, der deine Kampfrausch-Fähigkeiten erweitert und dir auf höheren Stufen weitere Unterklassenmerkmale gewährt.':
    'You choose a path that enhances your Rage and grants additional subclass features at higher levels.',
  'Du wählst ein Bardenkolleg, das deine Aufführungen und magischen Fähigkeiten spezialisiert.':
    'You choose a Bard College that specializes your performances and magical abilities.',
  'Du wählst eine Domäne, die deine göttlichen Fähigkeiten und deine Domänenzauber bestimmt.':
    'You choose a domain that defines your divine abilities and Domain Spells.',
  'Du trittst einem Druidenzirkel bei, der deine Verbindung zur Natur und deine Tiergestalt prägt.':
    'You join a Druid Circle that shapes your bond with nature and your Wild Shape.',
  'Du wählst einen Archetyp, der deinen Kampfstil und deine besonderen Techniken prägt.':
    'You choose an archetype that shapes your fighting style and special techniques.',
  'Du wählst eine Tradition, die deine Kampfkunst und deinen Umgang mit Fokus spezialisiert.':
    'You choose a tradition that specializes your martial arts and use of Focus.',
  'Du legst einen Schwur ab, der deine heiligen Fähigkeiten und Schwurzauber bestimmt.':
    'You swear an oath that defines your sacred abilities and Oath Spells.',
  'Du wählst einen Archetyp, der deine Jagd- und Überlebensfähigkeiten spezialisiert.':
    'You choose an archetype that specializes your hunting and survival abilities.',
  'Du wählst einen Archetyp, der deine besonderen Fertigkeiten und Tricks erweitert.':
    'You choose an archetype that expands your specialized skills and tricks.',
  'Du wählst eine magische Herkunft, die deine angeborenen Zauberkräfte prägt.':
    'You choose a magical origin that shapes your innate spellcasting.',
  'Du schließt einen Pakt mit einem übernatürlichen Patron, der dir zusätzliche Kräfte verleiht.':
    'You make a pact with a supernatural patron who grants you additional powers.',
  'Du wählst eine Magierschule, die deine arkane Spezialisierung bestimmt.':
    'You choose a Wizard subclass that defines your arcane specialization.',
  'Du lernst einen zusätzlichen Druidenzaubertrick deiner Wahl.':
    'You learn one additional Druid cantrip of your choice.',
  'Du erhältst zusätzliche Zauber passend zu deiner gewählten Landschaft. Diese Zauber sind immer vorbereitet und zählen nicht gegen die Zahl deiner vorbereiteten Zauber.':
    'You gain additional spells associated with your chosen land. These spells are always prepared and do not count against the number of spells you can prepare.',
  'Du bewegst dich ohne zusätzliche Bewegung durch nichtmagisches schwieriges Gelände. Pflanzen mit Dornen oder Stacheln verursachen dir dabei keinen Schaden.':
    'Moving through nonmagical difficult terrain costs you no extra movement. Plants with thorns or spines do not damage you when you move through them.',
  'Wenn du fällst, kannst du als Reaktion den Fallschaden um das Fünffache deiner Mönchsstufe reduzieren.':
    'When you fall, you can use your Reaction to reduce the falling damage by an amount equal to five times your Monk level.',
  'Wenn du Untote vertreibst, erleiden Untote, die ihren Rettungswurf nicht bestehen, zusätzlich gleißenden Schaden.':
    'When you Turn Undead, Undead that fail their saving throw also take Radiant damage.',
  'Der zusätzliche Schaden deiner Gesegneten Schläge steigt auf 2W8.':
    'The extra damage from your Blessed Strikes increases to 2d8.',
  'Wenn du mit einer Waffe angreifst, deren Meisterschaft du beherrschst, kannst du deren Meisterschaftseigenschaft durch Drücken, Schwächen oder Verlangsamen ersetzen.':
    'When you attack with a weapon whose Mastery property you can use, you can replace that property with Push, Sap, or Slow for that attack.',
  'Wenn du eine Kreatur mit einem Angriff verfehlst, erhältst du Vorteil auf deinen nächsten Angriff gegen sie vor Ende deines nächsten Zuges.':
    'If you miss a creature with an attack roll, you have Advantage on your next attack roll against it before the end of your next turn.',
  'Du kannst dich während deines Zuges an vertikalen Flächen und über Flüssigkeiten bewegen, ohne zu fallen, sofern du keine Rüstung oder keinen Schild trägst.':
    'While you are not wearing armor or wielding a Shield, you can move along vertical surfaces and across liquids on your turn without falling.',
  'Deine Fokusmanöver werden stärker: Hagel der Schläge, Geduldige Verteidigung und Schritt des Windes erhalten zusätzliche Vorteile.':
    'Your Focus techniques improve, granting additional benefits to Flurry of Blows, Patient Defense, and Step of the Wind.',
  'Du erhältst Übung in allen Rettungswürfen. Wenn dir ein Rettungswurf misslingt, kannst du einen Fokus-Punkt ausgeben, um ihn zu wiederholen.':
    'You gain proficiency in all saving throws. When you fail a saving throw, you can spend a Focus Point to reroll it.',
  'Wenn du Initiative würfelst und Unheimlicher Stoffwechsel nicht einsetzt, kannst du verbrauchte Fokus-Punkte bis auf vier zurückgewinnen.':
    'When you roll Initiative and do not use Uncanny Metabolism, you can regain expended Focus Points until you have four.',
  'Du erhältst Übung und Expertise in einer Fertigkeit deiner Wahl und lernst zusätzliche Sprachen.':
    'You gain proficiency and Expertise in one skill of your choice and learn additional languages.',
  'Du kannst dich als Bonusaktion unsichtbar machen, bis du angreifst oder ein Zauber endet. Die Nutzung kehrt nach einer langen Rast zurück.':
    'You can take a Bonus Action to become Invisible until you attack or a spell ends. You regain this use after a Long Rest.',
  'Du erreichst die höchste Stufe deiner angeborenen Magie und kannst den Zauber Wunsch ohne Materialkomponenten wirken.':
    'You reach the pinnacle of your innate magic and can cast Wish without Material components.',
  'Du wählst einen Pfad, der deine Kampfrausch-Fähigkeiten erweitert und dir weitere Merkmale auf höheren Stufen gewährt.':
    'You choose a path that enhances your Rage and grants further features at higher levels.',
  'Du wählst eine Mönchstradition, die deine Kampfkunst und deinen Umgang mit Ki spezialisiert.':
    'You choose a Monastic Tradition that specializes your martial arts and use of Ki.',
  'Du schließt einen Pakt mit einem übernatürlichen Wesen, das dir Magie und weitere Klassenmerkmale verleiht.':
    'You make a pact with a supernatural being that grants you magic and additional class features.',
  'Deine Rüstungsklasse berechnet sich ohne Rüstung aus 10 plus deinen relevanten Attributsmodifikatoren.':
    'While unarmored, your Armor Class equals 10 plus the relevant ability modifiers.',
  'Du erkennst Gefahren früh und hast unter den Regelbedingungen Vorteil auf bestimmte Geschicklichkeitsrettungswürfe.':
    'You sense danger early and have Advantage on certain Dexterity saving throws under the conditions described by the rules.',
  'Wenn du die Angriffsaktion ausführst, kannst du mehr als einmal angreifen. Die genaue Anzahl hängt von deiner Klasse und Stufe ab.':
    'When you take the Attack action, you can attack more than once. The number of attacks depends on your class and level.',
  'Deine Bewegungsrate erhöht sich, solange du keine schwere Rüstung trägst.':
    'Your Speed increases while you are not wearing Heavy armor.',
  'Du erhältst Vorteile auf Initiativewürfe und kannst zu Kampfbeginn schneller reagieren.':
    'You gain benefits to Initiative rolls and can react more quickly when combat begins.',
  'Bei einem kritischen Treffer würfelst du zusätzliche Schadenswürfel für deine Nahkampfwaffenangriffe.':
    'When you score a Critical Hit, you roll additional damage dice for your melee weapon attacks.',
  'Du kannst einen misslungenen Rettungswurf während deines Kampfrauschs wiederholen.':
    'You can reroll a failed saving throw while your Rage is active.',
  'Dein Kampfrausch endet nicht mehr vorzeitig unter den üblichen Bedingungen.':
    'Your Rage no longer ends early under the usual conditions.',
  'Wenn dein Stärkewurf niedriger als dein Stärkewert ist, kannst du stattdessen deinen Stärkewert verwenden.':
    'If your Strength check total is lower than your Strength score, you can use your Strength score instead.',
  'Deine Stärke und dein Konstitutionswert steigen, ebenso ihre jeweiligen Höchstwerte.':
    'Your Strength and Constitution scores increase, as do their maximums.',
  'Du addierst die Hälfte deines Übungsbonus auf Attributswürfe, bei denen du deinen Übungsbonus nicht bereits verwendest.':
    'You add half your Proficiency Bonus to ability checks that do not already include it.',
  'Verbündete können während einer kurzen Rast zusätzliche Trefferpunkte zurückgewinnen, wenn du sie mit Musik oder einer Aufführung begleitest.':
    'During a Short Rest, allies can regain additional Hit Points when you accompany them with music or a performance.',
  'Du erhältst verbrauchte Anwendungen deiner Bardeninspiration nach einer kurzen oder langen Rast zurück.':
    'You regain expended uses of Bardic Inspiration when you finish a Short or Long Rest.',
  'Du nutzt eine Aufführung, um Verbündete gegen Bezauberungs- und Furchteffekte zu stärken.':
    'You perform to strengthen allies against Charmed and Frightened effects.',
  'Du lernst zusätzliche Zauber, die normalerweise nicht auf der Bardenzauberliste stehen.':
    'You learn additional spells that are not normally on the Bard spell list.',
  'Du wählst eine Domäne, die dir zusätzliche Merkmale und Domänenzauber gewährt.':
    'You choose a Domain that grants additional features and Domain Spells.',
  'Untote mit einem bestimmten Herausforderungsgrad oder niedriger werden durch dein Untote-Vertreiben-Merkmal zerstört.':
    'Undead of a specified Challenge Rating or lower are destroyed by your Turn Undead feature.',
  'Einmal pro Zug verursachst du bei einem Treffer zusätzlichen Schaden mit deiner Waffe oder deinen Zaubern.':
    'Once per turn, you deal extra damage when you hit with a weapon or spell attack.',
  'Die Magie der Natur verlangsamt deine körperliche Alterung.':
    'The magic of nature slows your physical aging.',
  'Du kannst bestimmte Zauber wirken, während du Tiergestalt verwendest.':
    'You can cast certain spells while using Wild Shape.',
  'Du spezialisierst dich auf eine bestimmte Kampfweise und erhältst einen entsprechenden regeltechnischen Vorteil.':
    'You specialize in a particular fighting style and gain the corresponding rules benefit.',
  'Du wählst eine Kämpfer-Unterklasse, die dir weitere Merkmale auf bestimmten Stufen gewährt.':
    'You choose a Fighter subclass that grants additional features at specific levels.',
  'Du erhältst Vorteile für unbewaffnete Angriffe und Mönchswaffen; deine Kampfkunst bestimmt unter anderem deinen Schadenswürfel.':
    'You gain benefits for Unarmed Strikes and Monk weapons; your Martial Arts die determines your damage die and other benefits.',
  'Du erhältst Ki-Punkte, mit denen du besondere Mönchsmerkmale einsetzt. Die Punkte kehren nach einer kurzen oder langen Rast zurück.':
    'You gain Ki Points to fuel special Monk features. You regain the points when you finish a Short or Long Rest.',
  'Deine Bewegungsrate steigt, solange du keine Rüstung und keinen Schild trägst.':
    'Your Speed increases while you are not wearing armor or a Shield.',
  'Du kannst den Schaden eines Fernkampfangriffs mit deiner Reaktion reduzieren und das Geschoss gegebenenfalls zurückwerfen.':
    'You can use your Reaction to reduce the damage from a ranged weapon attack and potentially catch and throw the projectile.',
  'Deine unbewaffneten Angriffe gelten als magisch, um Resistenzen und Immunitäten zu überwinden.':
    'Your Unarmed Strikes count as magical for overcoming resistances and immunities.',
  'Bei bestimmten Flächengefahren erleidest du bei einem erfolgreichen Geschicklichkeitsrettungswurf keinen Schaden und bei einem misslungenen nur halben.':
    'Against certain area effects, you take no damage on a successful Dexterity saving throw and only half damage on a failure.',
  'Du erhältst Übung in allen Rettungswürfen und kannst Ki einsetzen, um einen misslungenen Rettungswurf zu wiederholen.':
    'You gain proficiency in all saving throws and can spend Ki to reroll a failed saving throw.',
  'Wenn du zu Beginn eines Kampfes keine Ki-Punkte mehr hast, erhältst du einen Teil davon zurück.':
    'When you roll Initiative with no Ki Points remaining, you regain some of them.',
  'Du wählst einen Paladin-Schwur, der dir zusätzliche Merkmale und Schwurzauber gewährt.':
    'You choose a Paladin Oath that grants additional features and Oath Spells.',
  'Du und Verbündete in deiner Nähe addieren deinen Charismamodifikator auf Rettungswürfe.':
    'You and nearby allies add your Charisma modifier to saving throws.',
  'Du und Verbündete in deiner Nähe können nicht verängstigt werden, solange du bei Bewusstsein bist.':
    'You and nearby allies cannot be Frightened while you are conscious.',
  'Deine Nahkampfwaffenangriffe verursachen zusätzlich gleißenden Schaden.':
    'Your melee weapon attacks deal additional Radiant damage.',
  'Du erhältst Expertise in ausgewählten Fertigkeiten und zusätzliche Vorteile beim Erkunden.':
    'You gain Expertise in selected skills and additional exploration benefits.',
  'Du wählst eine Waldläufer-Unterklasse, die dir weitere Merkmale auf bestimmten Stufen gewährt.':
    'You choose a Ranger subclass that grants additional features at specific levels.',
  'Du bewegst dich leichter durch schwieriges natürliches Gelände und widerstehst bestimmten pflanzlichen Gefahren.':
    'You move more easily through difficult natural terrain and resist certain plant-based hazards.',
  'Du addierst deinen Weisheitsmodifikator zu bestimmten Angriffswürfen oder Schadenswürfen gegen deine bevorzugten Feinde.':
    'You add your Wisdom modifier to certain attack or damage rolls against your favored enemies.',
  'Einmal pro Zug verursachst du zusätzlichen Schaden, wenn du unter den festgelegten Bedingungen mit einem passenden Angriff triffst.':
    'Once per turn, you deal extra damage when you hit with a qualifying attack under the feature’s conditions.',
  'Du wählst eine Schurken-Unterklasse, die dir weitere Merkmale auf bestimmten Stufen gewährt.':
    'You choose a Rogue subclass that grants additional features at specific levels.',
  'Bei Fertigkeits- und Werkzeugwürfen mit Übung zählt ein niedriger W20-Wurf mindestens als 10.':
    'When you make an ability check using a skill or tool proficiency, a low d20 roll counts as at least 10.',
  'Du bemerkst die Position verborgener oder unsichtbarer Kreaturen in deiner Nähe, sofern sie nicht vollständig verborgen sind.':
    'You sense the location of hidden or invisible creatures nearby unless they are completely concealed.',
  'Angriffe gegen dich können keinen Vorteil erhalten, solange du nicht kampfunfähig bist.':
    'Attack rolls against you cannot have Advantage while you are not Incapacitated.',
  'Du bist außergewöhnlich schwer zu treffen und kannst Angriffen geschickt ausweichen.':
    'You are exceptionally difficult to hit and can deftly evade attacks.',
  'Du wählst die magische Herkunft deiner Zauberkräfte und erhältst passende Unterklassenmerkmale.':
    'You choose the magical origin of your powers and gain the corresponding subclass features.',
  'Du veränderst die Wirkung deiner Zauber, indem du Zauberpunkte für Metamagie-Optionen ausgibst.':
    'You alter the effects of your spells by spending Sorcery Points on Metamagic options.',
  'Du kannst deine Zauberkräfte kurzzeitig erneuern und erhältst einen letzten Vorteil deiner Klasse.':
    'You can briefly renew your magical power and gain a final class benefit.',
  'Du wirkst Zauber mit Paktmagie-Zauberplätzen, die nach einer kurzen oder langen Rast zurückkehren.':
    'You cast spells using Pact Magic slots, which return when you finish a Short or Long Rest.',
  'Du erhältst übernatürliche Fähigkeiten durch Anrufungen, die du aus einer Liste auswählst.':
    'You gain supernatural abilities by choosing Eldritch Invocations from a list.',
  'Dein Patron gewährt dir eine Paktgabe, die deine Spielweise und weitere Optionen prägt.':
    'Your patron grants you a Pact Boon that shapes your playstyle and additional options.',
  'Du erhältst jeweils einen besonders mächtigen Zauber eines höheren Grades, den du einmal pro langer Rast wirken kannst.':
    'You gain a particularly powerful spell of a higher level that you can cast once per Long Rest.',
  'Du wählst eine Magierschule, die dir zusätzliche Merkmale auf bestimmten Stufen gewährt.':
    'You choose a Wizard school that grants additional features at specific levels.',
  'Du kannst ausgewählte Zauber niedriger Grade ohne Zauberplatz wirken.':
    'You can cast selected low-level spells without expending a spell slot.',
  'Du wählst zwei Zauber, die du jeweils einmal ohne Zauberplatz wirken kannst und nach einer kurzen oder langen Rast zurückerhältst.':
    'You choose two spells that you can each cast once without a spell slot, regaining the ability after a Short or Long Rest.',
  'Du nutzt die Meisterschaftseigenschaften deiner geübten Waffen.':
    'You use the Mastery properties of weapons with which you have proficiency.',
  'Wenn du Zweites Aufatmen einsetzt, kannst du dich zusätzlich bewegen, ohne Gelegenheitsangriffe auszulösen.':
    'When you use Second Wind, you can also move without provoking Opportunity Attacks.',
  'Du erhöhst einen oder mehrere Attributswerte oder wählst stattdessen ein zulässiges Talent.':
    'You increase one or more ability scores or choose an eligible feat instead.',
  'Du erhältst ein Talent des Epischen Segens oder ein anderes Talent, für das du die Voraussetzungen erfüllst.':
    'You gain an Epic Boon feat or another feat for which you qualify.',
  'Du verdoppelst deinen Übungsbonus für ausgewählte Fertigkeiten oder Werkzeuge.':
    'You double your Proficiency Bonus for selected skills or tools.',
  'Du erhältst die Fähigkeit, Zauber deiner Klasse vorzubereiten oder zu kennen und mit den Klassenregeln zu wirken.':
    'You gain the ability to prepare or know spells from your class and cast them using its spellcasting rules.',
  'Du wählst eine göttliche Ausrichtung, die dir zusätzliche Fertigkeits- oder Zauberoptionen gewährt.':
    'You choose a divine order that grants additional skill or spell options.',
  'Du verstärkst deine Zaubertricks oder Waffenangriffe mit göttlicher Energie.':
    'You empower your cantrips or weapon attacks with divine energy.',
  'Dein Göttliches Eingreifen wird zuverlässiger und kann mächtigere Effekte hervorbringen.':
    'Your Divine Intervention becomes more reliable and can produce more powerful effects.',
  'Du kannst ein besonders mächtiges göttliches Eingreifen erbitten.':
    'You can call upon an especially powerful form of Divine Intervention.',
  'Du wählst eine Ausrichtung, die dir zusätzliche druidische Fertigkeiten gewährt.':
    'You choose an order that grants additional Druidic abilities.',
  'Du verstärkst deine Tiergestalt mit elementarer Macht und verursachst zusätzlichen Schaden.':
    'You empower your Wild Shape with elemental force and deal additional damage.',
  'Deine elementaren Angriffe in Tiergestalt werden mächtiger.':
    'Your elemental attacks while using Wild Shape become more powerful.',
  'Du kannst Fokus-Punkte zurückgewinnen, wenn du eine kurze Rast beendest.':
    'You can regain Focus Points when you finish a Short Rest.',
  'Deine fokussierten Mönchsangriffe verursachen zusätzlichen Schaden.':
    'Your Focus-enhanced Monk attacks deal additional damage.',
  'Du kannst deinen Körper von bestimmten Zuständen und Effekten befreien.':
    'You can free your body from certain conditions and effects.',
  'Du kannst deinen Geist und Körper durch Fokus-Punkte vor bestimmten Zuständen schützen.':
    'You can use Focus Points to protect your mind and body from certain conditions.',
  'Du erhältst eine starke defensive Fähigkeit, die Fokus-Punkte nutzt.':
    'You gain a powerful defensive ability that uses Focus Points.',
  'Du kannst mit Handauflegen bestimmte Zustände bei einer Kreatur beenden.':
    'You can use Lay on Hands to end certain conditions affecting a creature.',
  'Du kannst Mal des Jägers ohne Zauberplatz wirken und hast zusätzliche Anwendungen.':
    'You can cast Hunter’s Mark without a spell slot and gain additional free uses.',
  'Du erhältst zusätzliche Bewegungs- und Erkundungsvorteile.':
    'You gain additional movement and exploration benefits.',
  'Du erhältst Expertise in weiteren Fertigkeiten.': 'You gain Expertise in additional skills.',
  'Du erhältst eine zusätzliche defensive oder offensive Verbesserung deiner Jagdfähigkeiten.':
    'You gain an additional defensive or offensive improvement to your hunting abilities.',
  'Du kannst dich als Bonusaktion verstecken und bist schwerer aufzuspüren.':
    'You can take the Hide action as a Bonus Action and are harder to detect.',
  'Deine Angriffe gegen markierte Ziele werden zuverlässiger.':
    'Your attacks against marked targets become more reliable.',
  'Du kannst als Bonusaktion sprinten, dich zurückziehen oder verstecken.':
    'You can Dash, Disengage, or Hide as a Bonus Action.',
  'Du verzichtest auf Bewegung, um bei deinem nächsten Angriff in diesem Zug Vorteil zu erhalten.':
    'You forgo your movement to gain Advantage on your next attack this turn.',
  'Du kannst bei einem Hinterhältigen Angriff Schadenswürfel gegen zusätzliche Effekte eintauschen.':
    'When you deal Sneak Attack damage, you can trade damage dice for additional effects.',
  'Du erhältst zusätzliche Optionen für deine Listigen Schläge.':
    'You gain additional options for your Cunning Strikes.',
  'Du kannst weitere Effekte auslösen, indem du zusätzliche Hinterhältige-Angriff-Würfel aufgibst.':
    'You can trigger further effects by forgoing additional Sneak Attack dice.',
  'Du erhältst Übung in Weisheitsrettungswürfen oder kannst dich mental besser verteidigen.':
    'You gain proficiency in Wisdom saving throws or improve your mental defenses.',
  'Du kannst Zauberpunkte ausgeben, um deine Metamagie zu verstärken und Zauber trotz fehlender Komponenten zu wirken.':
    'You can spend Sorcery Points to enhance Metamagic and cast spells despite missing components.',
  'Du führst ein Ritual aus, um einen Teil deiner verbrauchten Paktmagie-Zauberplätze zurückzugewinnen.':
    'You perform a ritual to regain some of your expended Pact Magic spell slots.',
  'Du kannst mit deinem Patron kommunizieren und einen passenden mächtigen Zauber ohne Zauberplatz wirken.':
    'You can contact your patron and cast an appropriate powerful spell without a spell slot.',
  'Du kannst Rituale aus deinem Zauberbuch wirken und zusätzliche Rituale erlernen.':
    'You can cast rituals from your spellbook and learn additional rituals.',
  'Du erhältst Expertise in einer Fertigkeit, die mit deinem magischen Studium verbunden ist.':
    'You gain Expertise in a skill connected to your magical studies.',
  'Du kannst einen Zauber nach einer kurzen Rast in dein Zauberbuch einprägen und ihn einmal ohne Zauberplatz wirken.':
    'After a Short Rest, you can memorize a spell in your spellbook and cast it once without a spell slot.',
  'Du bündelst göttliche Kraft und nutzt sie für besondere Klassen- oder Unterklasseneffekte.':
    'You channel divine power to fuel special class or subclass effects.',
  'Du präsentierst dein heiliges Symbol und zwingst Untote in deiner Nähe zu einem Weisheitsrettungswurf.':
    'You present your holy symbol and force nearby Undead to make a Wisdom saving throw.',
  'Du verteilst einen Heilvorrat auf Kreaturen in deiner Nähe, die weniger als die Hälfte ihrer Trefferpunkte besitzen.':
    'You distribute a pool of healing among nearby creatures that have less than half their Hit Points remaining.',
  'Du erhältst Übung in zusätzlichen Fertigkeiten oder mit zusätzlicher Ausrüstung.':
    'You gain proficiency in additional skills or equipment.',
  'Deine Heilzauber stellen zusätzliche Trefferpunkte wieder her.':
    'Your healing spells restore additional Hit Points.',
  'Wenn du andere mit einem Heilzauber heilst, erhältst du selbst Trefferpunkte zurück.':
    'When you heal others with a spell, you regain Hit Points yourself.',
  'Deine Heilzauber verwenden bei Heilwürfeln den höchstmöglichen Wert.':
    'Your healing spells use the highest possible result for their healing dice.',
  'Du erhältst zusätzliche Zauber, die mit deiner gewählten Landschaft verbunden sind.':
    'You gain additional spells associated with your chosen land.',
  'Du bewegst dich leichter durch natürliche Landschaften.':
    'You move more easily through natural environments.',
  'Du bist gegen bestimmte natürliche Gefahren und Zustände geschützt.':
    'You are protected against certain natural hazards and conditions.',
  'Natürliche Kreaturen können dich nicht ohne Weiteres angreifen.':
    'Natural creatures cannot easily attack you.',
  'Du verbesserst deine körperlichen Fähigkeiten und bestimmte Initiativewürfe.':
    'You improve your physical abilities and certain Initiative checks.',
  'Du wählst einen weiteren Kampfstil.': 'You choose an additional Fighting Style.',
  'Deine Treffer mit Hagel der Schläge können Ziele zu Fall bringen, wegstoßen oder ihre Reaktionen verhindern.':
    'Your Flurry of Blows hits can knock targets prone, push them away, or prevent their Reactions.',
  'Du kannst dich durch Meditation schützen und nach einer Rast temporäre Trefferpunkte erhalten.':
    'You can protect yourself through meditation and gain Temporary Hit Points after a rest.',
  'Du erhältst zusätzliche Schwurzauber, die stets vorbereitet sind.':
    'You gain additional Oath Spells that are always prepared.',
  'Du und Verbündete in deiner Aura sind gegen Bezauberung immun.':
    'You and allies in your Aura are immune to being Charmed.',
  'Dein Göttliches Niederstrecken schützt dich und Verbündete in deiner Aura.':
    'Your Divine Smite protects you and allies within your Aura.',
  'Du erkennst die Resistenzen, Immunitäten und Anfälligkeiten deiner markierten Beute.':
    'You learn the resistances, immunities, and vulnerabilities of your marked quarry.',
  'Du wählst eine Jagdtechnik, die deine Angriffe gegen Beute verbessert.':
    'You choose a hunting technique that improves your attacks against prey.',
  'Du wählst eine defensive Technik gegen Angriffe oder Flächengefahren.':
    'You choose a defensive technique against attacks or area hazards.',
  'Deine Jagdtechnik wird verbessert und erhält zusätzliche Effekte.':
    'Your hunting technique improves and gains additional effects.',
  'Du erhältst eine Kletterbewegungsrate und kannst aus großer Höhe besser springen.':
    'You gain a climbing speed and can jump more effectively from high places.',
  'Du kannst magische Gegenstände unabhängig von üblichen Klassenbeschränkungen verwenden.':
    'You can use magic items regardless of their usual class restrictions.',
  'Du erhältst zu Beginn eines Kampfes unter bestimmten Bedingungen einen zusätzlichen Zug.':
    'You can gain an additional turn at the start of combat under certain conditions.',
  'Kreaturen haben einen Nachteil auf Rettungswürfe gegen deine Zauber, wenn du aus dem Versteck wirkst.':
    'Creatures have Disadvantage on saving throws against your spells when you cast from hiding.',
  'Deine Waffenangriffe erschweren getroffenen Kreaturen bestimmte Rettungswürfe gegen deine Zauber.':
    'Your weapon attacks hinder hit creatures’ saving throws against certain spells you cast.',
  'Du sprichst Drakonisch und wählst einen Drachentyp, der deine drakonische Magie prägt.':
    'You speak Draconic and choose a dragon type that shapes your draconic magic.',
  'Du erhältst Resistenz gegen deinen Drachenschadenstyp und kannst passenden Zauberschaden verstärken.':
    'You gain Resistance to your dragon’s damage type and can empower matching spell damage.',
  'Du erhältst Dunkelsicht und kannst Dunkelheit mit Zauberpunkten wirken.':
    'You gain Darkvision and can cast Darkness by spending Sorcery Points.',
  'Nach einer kurzen oder langen Rast wählst du eine Schadensart, gegen die du resistent bist.':
    'After a Short or Long Rest, you choose a damage type against which you have Resistance.',
  'Wenn du eine Kreatur auf 0 Trefferpunkte reduzierst, erhältst du temporäre Trefferpunkte.':
    'When you reduce a creature to 0 Hit Points, you gain Temporary Hit Points.',
  'Du kannst in deinen Hervorrufungszaubern sichere Bereiche für Verbündete schaffen.':
    'You can create safe areas for allies within your Evocation spells.',
  'Du lernst zwei mächtige Zauber, die deine Worte der Schöpfung verkörpern.':
    'You learn two powerful spells that embody your Words of Creation.',
  'Du kannst Zauberplätze und Anwendungen deiner Tiergestalt unter den festgelegten Bedingungen austauschen.':
    'You can exchange spell slots and uses of Wild Shape under the feature’s specified conditions.',
  'Du verwandelst dich in eine Tiergestalt, deren Stärke und Dauer von deiner Stufe abhängen.':
    'You transform into a Beast form whose strength and duration depend on your level.',
  'Du gibst eine Nutzung deiner Tiergestalt aus, um Gegner zu schädigen und eine Kreatur zu heilen.':
    'You expend a use of Wild Shape to damage enemies and heal a creature.',
  'Du nutzt Fokus-Punkte, um besondere Mönchsmanöver einzusetzen.':
    'You use Focus Points to fuel special Monk techniques.',
  'Noch nicht freigeschaltet': 'Not unlocked yet',
  Freigeschaltet: 'Unlocked',
  'Ab Stufe': 'At level',
  'Alle Klassen- und Unterklassenmerkmale': 'All class and subclass features',
  'Alle Klassen- und Unterklassenmerkmale deines Regelwerks – aktive, passive und zukünftige.':
    'All active, passive, and upcoming class and subclass features for your ruleset.',
  Merkmalszauber: 'Feature-granted spells',
  MERKMALSZAUBER: 'FEATURE SPELL',
  'Ermöglicht durch': 'Granted by',
  Aktion: 'Action',
  Bonusaktion: 'Bonus Action',
  Reaktion: 'Reaction',
  Spezial: 'Special',
  Klassenmerkmal: 'Class feature',
  Unterklassenmerkmal: 'Subclass feature',
  'Zauber & Merkmalszauber': 'Spells & feature-granted spells',
  'Verwalte deine Zauber und zusätzliche Zauber, die dir Klassenmerkmale gewähren.':
    'Manage your spells and additional spells granted by class features.',
})

Object.assign(en, {
  'Deine Waffenangriffe verursachen zusätzlich gleißenden Schaden.':
    'Your weapon attacks deal additional Radiant damage.',
})

Object.assign(en, {
  'Wenn du dich in deinem Zug höchstens mit halber Bewegungsrate bewegst, hast du Vorteil auf Geschicklichkeitswürfe (Heimlichkeit).':
    'If you move no more than half your Speed on your turn, you have Advantage on Dexterity (Stealth) checks.',
  'Deine Trefferpunkte steigen bei jedem Zaubererlevel um 1. Ohne Rüstung beträgt deine Rüstungsklasse 13 plus Geschicklichkeitsmodifikator.':
    'Your Hit Point maximum increases by 1 for each Sorcerer level. While you are not wearing armor, your AC equals 13 plus your Dexterity modifier.',
  'Wenn du einen Attributswurf oder Rettungswurf ausführst, kannst du einen W10 addieren. Du kannst dies einmal pro kurzer oder langer Rast einsetzen.':
    'When you make an ability check or saving throw, you can add a d10 to the roll. You can use this feature once per Short or Long Rest.',
})

Object.assign(en, {
  'Du hast stets bestimmte Lebensdomänenzauber vorbereitet, die mit deiner Klerikerstufe wachsen. Sie zählen nicht gegen die Anzahl deiner vorbereiteten Zauber.':
    'You always have certain Life Domain spells prepared as you reach the specified Cleric levels. They do not count against the number of spells you can prepare.',
  'Du hast zusätzliche Schwurzauber auf bestimmten Paladinstufen stets vorbereitet.':
    'You always have additional Oath Spells prepared at the specified Paladin levels.',
  'Die Zauberliste des Hexenmeisters wird um bestimmte Zauber erweitert, die du bei der Auswahl deiner bekannten Zauber berücksichtigen kannst.':
    'The Warlock spell list is expanded with specific spells that you can choose when learning Warlock spells.',
})

Object.assign(en, {
  'Du erhältst weitere mystische Anrufungen deiner Wahl. Die Gesamtzahl richtet sich nach deiner Hexenmeisterstufe.':
    'You gain additional Eldritch Invocations of your choice. The total number is determined by your Warlock level.',
  'Die Reichweite deiner Aura des Schutzes und deiner Aura des Mutes steigt von 3 auf 9 Meter.':
    'The range of your Aura of Protection and Aura of Courage increases from 10 feet to 30 feet.',
  'Du kannst Aktionsschub nun zweimal zwischen kurzen oder langen Rasten einsetzen.':
    'You can now use Action Surge twice between Short or Long Rests.',
})

Object.assign(en, {
  'Der Radius deiner Aura des Schutzes steigt von 3 auf 9 Meter.':
    'The radius of your Aura of Protection increases from 10 feet to 30 feet.',
})

Object.assign(en, {
  'Paladins Niederstrecken': 'Paladin’s Smite',
  'Du hast den Zauber Göttliches Niederstrecken stets vorbereitet und kannst ihn einmal pro langer Rast ohne Zauberplatz wirken.':
    'You always have Divine Smite prepared and can cast it once without expending a spell slot. You regain this ability after a Long Rest.',
  'Du hast Göttliches Niederstrecken stets vorbereitet und kannst es einmal pro langer Rast ohne Zauberplatz wirken.':
    'You always have Divine Smite prepared and can cast it once without expending a spell slot. You regain this ability after a Long Rest.',
})
