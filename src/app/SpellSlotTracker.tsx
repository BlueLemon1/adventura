import { Plus } from 'lucide-react'
import type { Character } from '../domain/character'
import { createPactMagic, createSpellSlots, getSpellcastingProgression } from '../domain/spellcasting'

export function SpellSlotTracker({character,onUpdate}:{character:Character;onUpdate:(patch:Partial<Character>)=>void}) {
  const progression=getSpellcastingProgression(character)
  if(!progression)return null
  const slots=character.spellSlots??createSpellSlots(character)
  const pact=character.pactMagic??createPactMagic(character)
  const restoreAll=()=>onUpdate({spellSlots:slots.map(slot=>({...slot,current:slot.max})),pactMagic:pact?{...pact,current:pact.max}:undefined})
  return <section className="panel">
    <div className="panel-heading"><h2>Zauberplätze</h2><span>{progression.kind==='warlock'?'PACT-MAGIE':progression.kind==='full'?'VOLLER ZAUBERWIRKER':progression.kind==='half'?'HALBER ZAUBERWIRKER':'DRITTEL-ZAUBERWIRKER'}</span></div>
    {progression.kind==='warlock'&&pact?<div className="slot-row"><strong>Paktplatz · Grad {pact.spellLevel}</strong><span>{pact.current} / {pact.max}</span><button className="secondary-button" disabled={pact.current<=0} onClick={()=>onUpdate({pactMagic:{...pact,current:Math.max(0,pact.current-1)}})}>Verbrauchen</button></div>:<div className="slot-list">{progression.slots.map((max,index)=>{const slot=slots.find(item=>item.spellLevel===index+1)??{spellLevel:index+1,max,current:max};return <div className="slot-row" key={slot.spellLevel}><strong>Grad {slot.spellLevel}</strong><span>{slot.current} / {slot.max}</span><button className="secondary-button" disabled={slot.current<=0} onClick={()=>onUpdate({spellSlots:slots.map(item=>item.spellLevel===slot.spellLevel?{...item,current:Math.max(0,item.current-1)}:item)})}>Verbrauchen</button><button className="icon-button" aria-label="Zauberplatz wiederherstellen" disabled={slot.current>=slot.max} onClick={()=>onUpdate({spellSlots:slots.map(item=>item.spellLevel===slot.spellLevel?{...item,current:Math.min(item.max,item.current+1)}:item)})}><Plus size={15}/></button></div>})}</div>}
    <div className="rest-actions"><button className="secondary-button" onClick={restoreAll}>Lange Rast · alle Plätze auffüllen</button>{progression.kind==='warlock'&&<button className="secondary-button" onClick={()=>onUpdate({pactMagic:pact?{...pact,current:pact.max}:createPactMagic(character)})}>Kurze Rast · Paktplätze auffüllen</button>}</div>
  </section>
}
