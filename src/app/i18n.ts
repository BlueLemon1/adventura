import {createContext,useContext} from 'react'
export type Language='de'|'en'
export const LanguageContext=createContext<Language>('de')
export const useLanguage=()=>useContext(LanguageContext)
const en:Record<string,string>={
'Übersicht':'Overview','Charakterbogen':'Character sheet','Inventar':'Inventory','Zauberbuch':'Spellbook','Level-up':'Level up','CHARAKTERBOGEN':'CHARACTER SHEET',
'Am Spieltisch':'At the table','Dein digitaler Charakterbegleiter.':'Your digital character companion.','Lokale Speicherung':'Stored locally',
'DEIN CHARAKTER IM MITTELPUNKT':'YOUR CHARACTER, AT THE CENTER','Dein digitaler Charakterbogen – bereit für den nächsten Spieleabend.':'Your digital character sheet – ready for the next game night.',
'Charakter erstellen':'Create character','CHARAKTERE':'CHARACTERS','GEGENSTÄNDE':'ITEMS','GELERNTE ZAUBER':'SPELLS LEARNED','In deiner Sammlung':'In your collection',
'Persönlich & gemeinsam':'Personal & party','Dein persönliches Zauberbuch':'Your personal spellbook','DEINE HELDEN':'YOUR HEROES','Deine Charaktere':'Your characters',
'GESPEICHERT':'SAVED','Charaktere werden geladen …':'Loading characters …','Charakter öffnen':'Open character',
'Dein Charakter wartet auf seinen ersten Auftritt.':'Your character is waiting for their first appearance.',
'Erstelle deinen D&D-Charakter und verwalte Werte, Ausrüstung und Zauber an einem Ort.':'Create your D&D character and manage stats, equipment and spells in one place.',
'Ersten Charakter erstellen':'Create your first character','Wähle zuerst einen Charakter aus.':'Select a character first.','Zur Übersicht':'Back to overview',
'Automatisch gespeichert':'Saved automatically','LEBENSPUNKTE':'HIT POINTS','Aktuell / Maximum':'Current / maximum','RÜSTUNGSKLASSE':'ARMOR CLASS','BEWEGUNG':'SPEED',
'MODIFIKATOR':'MODIFIER','Rettungswürfe':'Saving throws','Fertigkeiten':'Skills','Weitere Angaben':'Additional details','Spezies':'Species','Hintergrund':'Background',
'Unterklasse':'Subclass','Gesinnung':'Alignment','Spielername':'Player name','Erfahrungspunkte':'Experience points','Trefferwürfel':'Hit dice',
'Persönlichkeitsmerkmale':'Personality traits','Ideale':'Ideals','Bindungen':'Bonds','Makel':'Flaws','Merkmale & Fähigkeiten':'Features & traits','Notizen':'Notes',
'AUSRÜSTUNG':'EQUIPMENT','Persönliche Gegenstände und gemeinsamer Gruppenbesitz.':'Personal items and shared party inventory.','Währungen':'Currency','GELDBEUTEL':'PURSE',
'Gegenstand hinzufügen':'Add item','Besitz':'Owner','Persönlich':'Personal','Gruppeninventar':'Party inventory','Anzahl':'Quantity','Wert (GM)':'Value (GP)',
'Gewicht (Pfund)':'Weight (lb)','Beschreibung':'Description','Noch keine Gegenstände vorhanden.':'No items yet.','Persönliches Inventar':'Personal inventory','Ausgerüstet':'Equipped',
'MAGIE & ZAUBER':'MAGIC & SPELLS','Verwalte bekannte Zauber, Vorbereitung und ihre wichtigsten Details.':'Manage known spells, preparation and their key details.',
'Eigene Zauber hinzufügen':'Add custom spell','MANUELLE ERFASSUNG':'MANUAL ENTRY','Zaubername':'Spell name','Zaubergrad':'Spell level','Schule':'School',
'Zauberzeit':'Casting time','Reichweite':'Range','Komponenten (V/S/M)':'Components (V/S/M)','Wirkungsdauer':'Duration','Konzentration':'Concentration',
'Ritual':'Ritual','Beschreibung / Effekt':'Description / effect','Zauber hinzufügen':'Add spell','Deine Zauber':'Your spells',
'Noch keine Zauber eingetragen. Du kannst sie oben hinzufügen.':'No spells added yet. Add them above.','ZAUBERTRICK':'CANTRIP','Vorbereitet':'Prepared',
'Zauber entfernen':'Remove spell','Auf höheren Graden:':'At higher levels:','FORTSCHRITT':'PROGRESSION','Entwickle deinen Charakter weiter. Regelwerk:':'Advance your character. Ruleset:',
'AKTUELLE STUFE':'CURRENT LEVEL','NÄCHSTE STUFE':'NEXT LEVEL','Stufe erhöhen':'Level up','Regelbasierte Progression':'Rules-based progression',
'Übungsbonus und Zauberplätze werden anhand von Klasse, Unterklasse und Stufe berechnet. Bereits verbrauchte Plätze bleiben beim Stufenaufstieg verbraucht; neu hinzugewonnene Plätze stehen zur Verfügung.':'Proficiency bonus and spell slots are calculated from class, subclass and level. Spent slots stay spent when leveling up; new slots are available.',
'Trefferpunkte, Klassen- und Unterklassenmerkmale, ASI/Talente sowie konkrete Zauberauswahl benötigen weitere Charakterentscheidungen und werden deshalb noch nicht automatisch vergeben.':'Hit points, class features, ASIs/feats and spell choices require decisions and are not assigned automatically yet.',
'Dein Begleiter am Spieltisch.':'Your companion at the table.','Charakter auswählen':'Select character','Backup exportieren':'Export backup','Backup importieren':'Import backup',
'Fehler schließen':'Dismiss error','Charakter löschen':'Delete character','Schließen':'Close','NEUES ABENTEUER':'NEW ADVENTURE','Charaktername':'Character name',
'Klasse':'Class','Regelwerk':'Ruleset','Du kannst Attribute und weitere Eigenschaften direkt im Charakterbogen ergänzen.':'You can add stats and details in the character sheet.',
'Abbrechen':'Cancel','Charakter speichern':'Save character','Speichert …':'Saving …','Alle Grade':'All levels','Zaubertricks':'Cantrips',
'Nur für meine Klasse und Stufe':'Only for my class and level','Zauber suchen …':'Search spells …','SRD-Zauberkatalog':'SRD spell catalog',
'Offizielle SRD-Zauber passend zu deinem Regelwerk.':'Official SRD spells for your ruleset.','Treffer':'results','Klassen-/Gradfilter aktiv':'class/level filter active',
'vollständiger Katalog':'full catalog','Im Buch':'In spellbook','Hinzufügen':'Add','Klassen:':'Classes:','Quellen & Lizenz':'Sources & license',
'Keine passenden Zauber gefunden. Prüfe den Klassenfilter oder passe deine Suche an.':'No matching spells found. Check the class filter or adjust your search.',
'Alle Zauber':'All spells','Nicht vorbereitet':'Unprepared','Suche Zauber in deinem Buch …':'Search your spellbook …','Keine Zauber entsprechen diesem Filter.':'No spells match this filter.',
'Deine Zauber sind noch leer.':'Your spellbook is empty.','Gelernt auf Stufe':'Learned at level','Immer vorbereitet':'Always prepared','Zauber':'spells','Grad ':'Level ',
'Zauberbeschreibung':'Spell description','Zauber filtern':'Filter spells'
}
export const translate=(language:Language,value:string)=>language==='de'?value:(en[value]??value)
