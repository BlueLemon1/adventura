import { useMemo, useState } from 'react'
import { Plus, Search, BookOpen, Check } from 'lucide-react'
import type { Character, KnownSpell } from '../domain/character'
import { getSpellcastingProgression } from '../domain/spellcasting'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import spells2014 from '../data/spells-2014.json'
import spells2024 from '../data/spells-2024.json'

interface CatalogSpell {
  id:string; name:string; level:number; school:string; castingTime:string; range:string
  components:string; material:string; duration:string; concentration:boolean; ritual:boolean
  classes:string[]; description:string; higherLevel?:string
}
const catalog2014=spells2014 as CatalogSpell[]
const catalog2024=spells2024 as CatalogSpell[]
function normalize(value:string){return value.toLowerCase().trim().replace(/[ä]/g,'ae').replace(/[ö]/g,'oe').replace(/[ü]/g,'ue').replace(/ß/g,'ss').replace(/[^a-z]/g,'')}
function classKey(value:string){
  const key=normalize(value)
  const aliases:Record<string,string>={barde:'bard',kleriker:'cleric',druide:'druid',zauberer:'sorcerer',magier:'wizard',hexenmeister:'warlock',paladin:'paladin',waldlaeufer:'ranger',kaempfer:'fighter',schurke:'rogue'}
  return aliases[key]??key
}
function schoolLabel(value:string){const labels:Record<string,string>={abjuration:'Bannmagie',conjuration:'Beschwörung',divination:'Erkenntnis',enchantment:'Verzauberung',evocation:'Hervorrufung',illusion:'Illusion',necromancy:'Nekromantie',transmutation:'Verwandlung'};return labels[normalize(value)]??value}
export function SpellCatalog({character,knownSpells,onAdd}:{character:Character;knownSpells:KnownSpell[];onAdd:(spell:KnownSpell)=>void}){
  const [query,setQuery]=useState('')
  const [levelFilter,setLevelFilter]=useState('all')
  const [eligibleOnly,setEligibleOnly]=useState(true)
  const catalog=character.ruleset==='2014'?catalog2014:catalog2024
  const classId=classKey(character.classId)
  const subclass=normalize(character.subclassId??'')
  const spellcasting=getSpellcastingProgression(character)
  const maxSpellLevel=spellcasting?.kind==='warlock'?(spellcasting.pactMagic?.spellLevel??0):(spellcasting?.slots.length??0)
  const allowedClasses=classId==='fighter'&&subclass.includes('eldritchknight')?['wizard']:classId==='rogue'&&subclass.includes('arcanetrickster')?['wizard']:[classId]
  const results=useMemo(()=>{
    const needle=normalize(query)
    return catalog.filter(spell=>{
      const matchesText=!needle||normalize(spell.name+' '+spell.school+' '+spell.description).includes(needle)
      const matchesLevel=levelFilter==='all'||spell.level===Number(levelFilter)
      const matchesClass=!eligibleOnly||spell.classes.some(item=>allowedClasses.includes(classKey(item)))
      const matchesLevelAccess=!eligibleOnly||spell.level===0||spell.level<=maxSpellLevel
      return matchesText&&matchesLevel&&matchesClass&&matchesLevelAccess
    }).sort((a,b)=>a.level-b.level||a.name.localeCompare(b.name))
  },[catalog,query,levelFilter,eligibleOnly,allowedClasses.join(','),maxSpellLevel])
  const learned=new Set(knownSpells.map(spell=>spell.spellId))
  function add(spell:CatalogSpell){
    const components=spell.components+(spell.material?' ('+spell.material+')':'')
    const description=spell.description
    onAdd({spellId:spell.id,learnedAtLevel:character.level,prepared:false,name:spell.name,spellLevel:spell.level,school:schoolLabel(spell.school),castingTime:spell.castingTime,range:spell.range,components,duration:spell.duration,concentration:spell.concentration,ritual:spell.ritual,description,higherLevel:spell.higherLevel})
  }
  return <section className="panel spell-catalog">
    <div className="panel-heading"><div><h2>SRD-Zauberkatalog</h2><p className="muted-paragraph">Offizielle SRD-Zauber passend zu deinem Regelwerk.</p></div><span>{catalog.length} ZAUBER</span></div>
    <div className="catalog-filters">
      <label className="catalog-search"><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Zauber suchen …"/></label>
      <label className="field-label">Grad<Select value={levelFilter} onValueChange={setLevelFilter}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Alle Grade</SelectItem>{Array.from({length:10},(_,i)=><SelectItem key={i} value={String(i)}>{i===0?'Zaubertricks':'Grad '+i}</SelectItem>)}</SelectContent></Select></label>
      <label className="catalog-eligible"><input type="checkbox" checked={eligibleOnly} onChange={event=>setEligibleOnly(event.target.checked)}/> Nur für meine Klasse und Stufe</label>
    </div>
    <div className="catalog-count">{results.length} Treffer · {character.ruleset==='2014'?'SRD 5.1':'SRD 5.2 (2024)'} · {eligibleOnly?'Klassen-/Gradfilter aktiv':'vollständiger Katalog'}</div>
    <div className="catalog-results">{results.slice(0,100).map(spell=>{
      const added=learned.has(spell.id)
      return <details className="catalog-spell" key={spell.id}><summary><span className="catalog-spell-level">{spell.level===0?'TRICK':'GRAD '+spell.level}</span><span className="catalog-spell-name"><strong>{spell.name}</strong><small>{schoolLabel(spell.school)} · {spell.castingTime} · {spell.range}</small></span><span className="catalog-spell-action">{added?<span className="already-added"><Check size={14}/> Im Buch</span>:<button type="button" className="secondary-button" onClick={event=>{event.preventDefault();add(spell)}}><Plus size={14}/> Hinzufügen</button>}</span></summary><div className="catalog-spell-detail"><div>{spell.components}{spell.material?' ('+spell.material+')':''} · {spell.duration}{spell.concentration?' · Konzentration':''}{spell.ritual?' · Ritual':''}</div><p>{spell.description}</p>{spell.higherLevel&&<p><strong>Auf höheren Graden:</strong> {spell.higherLevel}</p>}<small>Klassen: {spell.classes.join(', ')}</small></div></details>
    })}{results.length===0&&<p className="muted-paragraph">Keine passenden Zauber gefunden. Prüfe den Klassenfilter oder passe deine Suche an.</p>}{results.length>100&&<p className="muted-paragraph">Es werden die ersten 100 Treffer angezeigt. Verfeinere deine Suche für weitere Ergebnisse.</p>}</div>
    <p className="catalog-attribution"><BookOpen size={13}/> SRD 5.1 / SRD 5.2 von Wizards of the Coast LLC, CC BY 4.0. <a href="https://github.com/BlueLemon1/adventura/blob/main/src/data/ATTRIBUTION.md" target="_blank" rel="noreferrer">Quellen & Lizenz</a></p>
  </section>
}
