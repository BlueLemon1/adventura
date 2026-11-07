import type { Character, KnownSpell } from './character'

export interface SpellCapacity {
  mode: 'known' | 'prepared' | 'unsupported' | 'none'
  maximum?: number
  current: number
  label: string
  note: string
}

const BARD_2014=[0,4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]
const SORCERER_2014=[0,2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15]
const WARLOCK_2014=[0,2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15]
const RANGER_2014=[0,0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]
function normalize(value:string){return value.toLowerCase().trim().replace(/[ä]/g,'ae').replace(/[ö]/g,'oe').replace(/[ü]/g,'ue').replace(/ß/g,'ss').replace(/[^a-z]/g,'')}
function mod(score:number|undefined){return Math.floor(((score??10)-10)/2)}
function classId(value:string){const key=normalize(value);const aliases:Record<string,string>={barde:'bard',kleriker:'cleric',druide:'druid',zauberer:'sorcerer',magier:'wizard',hexenmeister:'warlock',waldlaeufer:'ranger'};return aliases[key]??key}
export function getSpellCapacity(character:Character,spells:KnownSpell[]):SpellCapacity{
 const cls=classId(character.classId),level=character.level,rules=character.ruleset
 const classSpells=spells.filter(s=>(s.source??'class')==='class'&&(s.spellLevel??0)>0)
 const known=classSpells.length,prepared=classSpells.filter(s=>s.prepared||s.alwaysPrepared).length
 const ability=character.abilities
 if(rules==='2014'){
  if(cls==='bard'||cls==='sorcerer'||cls==='warlock'||cls==='ranger'){
   const table=cls==='bard'?BARD_2014:cls==='sorcerer'?SORCERER_2014:cls==='warlock'?WARLOCK_2014:RANGER_2014
   return {mode:'known',maximum:table[level]??0,current:known,label:'Bekannte Klassenzauber',note:'Zaubertricks sind nicht mitgezählt. Zusätzliche Zauber aus Story, Gegenständen und Talenten zählen nicht zum Klassenlimit.'}
  }
  if(cls==='cleric'||cls==='druid'||cls==='wizard'||cls==='paladin'){
   const abilityMod=mod(cls==='wizard'?ability?.int:cls==='paladin'?ability?.cha:ability?.wis)
   const maximum=Math.max(1,(cls==='paladin'?Math.floor(level/2):level)+abilityMod)
   return {mode:'prepared',maximum,current:prepared,label:'Vorbereitete Klassenzauber',note:'Nur vorbereitete Klassenzauber werden gezählt. Zusätzliche Zauberquellen bleiben außen vor.'}
  }
 }
 if(rules==='2024'&&(cls==='cleric'||cls==='druid'||cls==='wizard'||cls==='paladin'||cls==='ranger')){
  const abilityMod=mod(cls==='wizard'?ability?.int:cls==='paladin'?ability?.cha:cls==='ranger'?ability?.wis:ability?.wis)
  const maximum=Math.max(1,(cls==='paladin'||cls==='ranger'?Math.floor(level/2):level)+abilityMod)
  return {mode:'prepared',maximum,current:prepared,label:'Vorbereitete Klassenzauber',note:'Klassenlimit nach Stufe und Zauberattribut. Story-, Gegenstands- und Talentzauber werden separat gezählt.'}
 }
 if(['fighter','rogue'].includes(cls))return {mode:'unsupported',current:known,label:'Unterklassenzauber',note:'Für Eldritch Knight und Arcane Trickster gelten eigene Lern- und Schulregeln; diese werden noch ergänzt.'}
 return {mode:'unsupported',current:known,label:'Klassenzauber',note:'Für diese Klasse ist die exakte Lern-/Vorbereitungstabelle noch nicht hinterlegt.'}
}
