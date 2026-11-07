import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { BookOpen, Boxes, Compass, Download, Moon, Sun, ScrollText, Shield, Sparkles, Trash2, Upload, WandSparkles, X, Plus, ChevronRight } from 'lucide-react'
import type { Character, KnownSpell } from '../domain/character'
import type { StoredCharacter } from '../storage/database'
import type { Dnd5eRuleset } from '../domain/rules'
import { RULESET_LABELS } from '../domain/rules'
import { createPactMagic, createSpellSlots, updatePactMagic, updateSpellSlots } from '../domain/spellcasting'
import { SpellSlotTracker } from './SpellSlotTracker'
import { SpellCatalog } from './SpellCatalog'
import { SpellbookList } from './SpellbookList'
import { LanguageContext, translate } from './i18n'
import { deleteCharacter, getPartyInventory, saveCharacter } from '../storage/database'
import { downloadBackup, importBackup } from '../storage/backup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { IconButton } from '../components/ui/button'
import { TextAreaField, TextInputField } from '../components/ui/form-field'
import { useAppPreferences } from './useAppPreferences'
import { useCharacterCollection } from './useCharacterCollection'
import { PanelHeader } from '../components/ui/panel-header'
import { CharacterSheet } from './CharacterSheet'
import { InventoryPage } from './InventoryPage'

type Page = 'overview' | 'sheet' | 'inventory' | 'spells' | 'levelup'
const abilityDefaults = {str:10,dex:10,con:10,int:10,wis:10,cha:10}
const navItems = [{id:'overview' as const,label:'Übersicht',icon:Compass},{id:'sheet' as const,label:'Charakterbogen',icon:Shield},{id:'inventory' as const,label:'Inventar',icon:Boxes},{id:'spells' as const,label:'Zauberbuch',icon:BookOpen},{id:'levelup' as const,label:'Level-up',icon:WandSparkles}]
const newId = () => crypto.randomUUID()

export default function App() {
  const { language, setLanguage, theme, setTheme } = useAppPreferences()
  const t = (value: string) => translate(language, value)
  const {
    characters,
    setCharacters,
    partyItems,
    setPartyItems,
    selectedId,
    setSelectedId,
    selected,
    loading,
    error,
    setError,
    updateCharacter,
    updateInventory,
    updateSpellbook,
    persistPartyItems,
  } = useCharacterCollection()
  const [page,setPage]=useState<Page>('overview')
  const [showCreate,setShowCreate]=useState(false)
  const [name,setName]=useState('')
  const [classId,setClassId]=useState('')
  const [ruleset,setRuleset]=useState<Dnd5eRuleset>('2024')
  const [level,setLevel]=useState(1)
  const [busy,setBusy]=useState(false)
  const [spellName,setSpellName]=useState('')
  const [spellLevel,setSpellLevel]=useState(0)
  const [spellSchool,setSpellSchool]=useState('')
  const [spellTime,setSpellTime]=useState('1 Aktion')
  const [spellRange,setSpellRange]=useState('')
  const [spellComponents,setSpellComponents]=useState('')
  const [spellDuration,setSpellDuration]=useState('Sofort')
  const [spellDescription,setSpellDescription]=useState('')
  const [spellConcentration,setSpellConcentration]=useState(false)
  const [spellRitual,setSpellRitual]=useState(false)
  const [spellSource,setSpellSource]=useState<KnownSpell['source']>('class')
  const [spellSourceName,setSpellSourceName]=useState('')
  const [spellUsageLimit,setSpellUsageLimit]=useState(0)
  const [spellUsageReset,setSpellUsageReset]=useState<NonNullable<KnownSpell['usageReset']>>('longRest')
  const fileInput=useRef<HTMLInputElement>(null)

  async function createCharacter(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();if(!name.trim()||!classId.trim())return
    setBusy(true);setError('')
    const now=new Date().toISOString()
    const character:Character={id:newId(),name:name.trim(),ruleset,classId:classId.trim().toLowerCase(),level,createdAt:now,updatedAt:now,abilities:{...abilityDefaults},savingThrowProficiencies:[],skillProficiencies:{},armorClass:10,hitPointsMax:10,hitPointsCurrent:10,temporaryHitPoints:0,speed:30,initiativeBonus:0,hitDice:'1d8',spellSlots:createSpellSlots({ruleset,classId:classId.trim().toLowerCase(),level}),pactMagic:createPactMagic({ruleset,classId:classId.trim().toLowerCase(),level}),experiencePoints:0,inspiration:false,deathSaves:{successes:0,failures:0}}
    const stored:StoredCharacter={character,inventory:{personal:[],party:[],currency:{...currencyDefaults}},spellbook:{knownSpells:[]}}
    try {await saveCharacter(stored);setCharacters(current=>[...current,stored]);setSelectedId(character.id);setPage('sheet');setShowCreate(false);setName('');setClassId('');setLevel(1)}
    catch(reason){setError(reason instanceof Error?reason.message:'Charakter konnte nicht angelegt werden.')}finally{setBusy(false)}
  }
  async function removeCharacter(entry:StoredCharacter) {
    if(!window.confirm('„'+entry.character.name+'“ wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'))return
    try {await deleteCharacter(entry.character.id);setCharacters(current=>current.filter(item=>item.character.id!==entry.character.id));if(selectedId===entry.character.id){setSelectedId(null);setPage('overview')}}
    catch(reason){setError(reason instanceof Error?reason.message:'Charakter konnte nicht gelöscht werden.')}
  }
  async function exportData(){setBusy(true);try{await downloadBackup()}catch(reason){setError(reason instanceof Error?reason.message:'Backup fehlgeschlagen.')}finally{setBusy(false)}}
  async function importData(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];event.target.value='';if(!file)return
    if(!window.confirm('Der Import ersetzt alle aktuell gespeicherten Charaktere. Möchtest du fortfahren?'))return
    setBusy(true);setError('')
    try{const imported=await importBackup(await file.text());setCharacters(imported);setPartyItems(await getPartyInventory());setSelectedId(null);setPage('overview')}
    catch(reason){setError(reason instanceof Error?reason.message:'Backup konnte nicht importiert werden.')}finally{setBusy(false)}
  }
  function addSpell(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(!selected||!spellName.trim())return
    const spell:KnownSpell={spellId:newId(),name:spellName.trim(),learnedAtLevel:selected.character.level,prepared:false,spellLevel,school:spellSchool,castingTime:spellTime,range:spellRange,components:spellComponents,duration:spellDuration,concentration:spellConcentration,ritual:spellRitual,description:spellDescription,source:spellSource,sourceName:spellSourceName.trim()||undefined,...(spellUsageLimit>0?{usageLimit:spellUsageLimit,usageRemaining:spellUsageLimit,usageReset:spellUsageReset}:{})}
    updateSpellbook([...selected.spellbook.knownSpells,spell])
    setSpellName('');setSpellLevel(0);setSpellSchool('');setSpellRange('');setSpellComponents('');setSpellDescription('');setSpellConcentration(false);setSpellRitual(false);setSpellSource('class');setSpellSourceName('');setSpellUsageLimit(0);setSpellUsageReset('longRest')
  }
  const totalItems=characters.reduce((sum,entry)=>sum+entry.inventory.personal.length,0)+partyItems.length
  const totalSpells=characters.reduce((sum,entry)=>sum+entry.spellbook.knownSpells.length,0)
  function changeLevel(nextLevel:number) {
    if(!selected)return
    const nextCharacter={...selected.character,level:nextLevel}
    updateCharacter({level:nextLevel,spellSlots:updateSpellSlots(nextCharacter,selected.character.spellSlots),pactMagic:updatePactMagic(nextCharacter,selected.character.pactMagic)})
  }

  return <LanguageContext.Provider value={language}><div className="app-shell min-h-screen">
    <aside className="sidebar">
      <a className="brand" href="#" onClick={event=>{event.preventDefault();setPage('overview');setSelectedId(null)}}><span className="brand-mark"><Sparkles size={19}/></span><span><strong>adventura</strong><small>YOUR ADVENTURE COMPANION</small></span></a>
      <div className="workspace-label">{t('CHARAKTERBOGEN')}</div>
      <nav className="nav-list" aria-label="Hauptnavigation">{navItems.map(({id,label,icon:Icon})=><button key={id} onClick={()=>{if(id!=='overview'&&!selected){setError('Wähle zuerst einen Charakter aus.');return}setPage(id)}} className={page===id?'nav-link active':'nav-link'}><Icon size={18}/><span>{t(label)}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="campaign-card"><ScrollText size={17}/><div><strong>{t('Am Spieltisch')}</strong><span>{t('Dein digitaler Charakterbegleiter.')}</span></div></div><div className="profile-row"><div className="avatar">A</div><div className="profile-copy"><strong>{selected?.character.name??'Abenteurer'}</strong><span>{t('Lokale Speicherung')}</span></div><span className="status-dot"/></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">ADVENTURA <span>/</span> {page.toUpperCase()} {selected&&page!=='overview'&&<><span>/</span> {selected.character.name.toUpperCase()}</>}</div><div className="top-actions">
        {selected&&<Select value={selectedId??''} onValueChange={setSelectedId}><SelectTrigger className="character-switcher" ariaLabel="Charakter auswählen"><SelectValue placeholder="Charakter" /></SelectTrigger><SelectContent>{characters.map(entry=><SelectItem key={entry.character.id} value={entry.character.id}>{entry.character.name}</SelectItem>)}</SelectContent></Select>}
        <IconButton className="preference-button" label={language==='de'?'Sprache: Deutsch. Zu Englisch wechseln':'Language: English. Switch to German'} title={language==='de'?'Deutsch → English':'English → Deutsch'} onClick={()=>setLanguage(v=>v==='de'?'en':'de')}><span className="language-flag" aria-hidden="true">{language==='de'?'🇩🇪':'🇬🇧'}</span></IconButton><IconButton label={theme==='dark'?'Light mode':'Dark mode'} title={theme==='dark'?'Light mode':'Dark mode'} onClick={()=>setTheme(v=>v==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</IconButton>
        <IconButton label="Backup exportieren" onClick={()=>void exportData()} disabled={busy}><Download size={16}/></IconButton><IconButton label="Backup importieren" onClick={()=>fileInput.current?.click()} disabled={busy}><Upload size={16}/></IconButton><input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={event=>void importData(event)}/>
      </div></header>
      <div className="content">
        {error&&<div className="error-banner" role="alert">{error}<button onClick={()=>setError('')} aria-label="Fehler schließen"><X size={15}/></button></div>}
        {page==='overview'&&<><section className="welcome-row"><div><div className="eyebrow"><Sparkles size={13}/> {t('DEIN CHARAKTER IM MITTELPUNKT')}</div><h1>{t('Willkommen,')} <em>{t('Abenteurer.')}</em></h1><p className="intro">{t('Dein digitaler Charakterbogen – bereit für den nächsten Spieleabend.')}</p></div><button className="primary-button" onClick={()=>setShowCreate(true)}><Plus size={16}/> {t('Charakter erstellen')}</button></section>
          <section className="stats-grid"><article className="stat-card"><span>{t('CHARAKTERE')}</span><strong>{loading?'–':characters.length}</strong><small>{t('In deiner Sammlung')}</small><Shield className="stat-icon"/></article><article className="stat-card"><span>{t('GEGENSTÄNDE')}</span><strong>{totalItems}</strong><small>{t('Persönlich & gemeinsam')}</small><Boxes className="stat-icon"/></article><article className="stat-card"><span>{t('GELERNTE ZAUBER')}</span><strong>{totalSpells}</strong><small>{t('Dein persönliches Zauberbuch')}</small><BookOpen className="stat-icon"/></article></section>
          <section className="section-heading"><div><span className="eyebrow">{t('DEINE HELDEN')}</span><h2>{t('Deine Charaktere')}</h2></div><span className="muted-label">{characters.length} GESPEICHERT</span></section>
          {loading?<section className="empty-state"><p>{t('Charaktere werden geladen …')}</p></section>:characters.length?<section className="character-grid">{characters.map(entry=><article className="character-card" key={entry.character.id}><div className="character-card-top"><div className="character-emblem"><Shield size={22}/></div><IconButton className="delete-button" onClick={()=>void removeCharacter(entry)} label="Charakter löschen"><Trash2 size={15}/></IconButton></div><h3>{entry.character.name}</h3><p>{entry.character.classId} · Level {entry.character.level}</p><span className="ruleset-pill">{RULESET_LABELS[entry.character.ruleset]}</span><button className="open-character" onClick={()=>{setSelectedId(entry.character.id);setPage('sheet')}}>{t('Charakter öffnen')} <ChevronRight size={14}/></button></article>)}</section>:<section className="empty-state"><div className="empty-art"><div className="art-ring"/><ScrollText size={42}/><Sparkles className="art-sparkle" size={17}/></div><h3>{t('Dein Charakter wartet auf seinen ersten Auftritt.')}</h3><p>{t('Erstelle deinen D&D-Charakter und verwalte Werte, Ausrüstung und Zauber an einem Ort.')}</p><button className="secondary-button" onClick={()=>setShowCreate(true)}><Shield size={16}/> {t('Ersten Charakter erstellen')}</button></section>}</>}
        {page!=='overview'&&!selected&&<section className="empty-state"><h3>{t('Wähle zuerst einen Charakter aus.')}</h3><button className="secondary-button" onClick={()=>setPage('overview')}>{t('Zur Übersicht')}</button></section>}
        {page==='sheet'&&selected&&<CharacterSheet character={selected.character} onUpdate={updateCharacter}/>}
        {page==='inventory'&&selected&&<InventoryPage inventory={selected.inventory} partyItems={partyItems} onUpdateInventory={updateInventory} onSavePartyItems={persistPartyItems}/>}
        {page==='spells'&&selected&&<>
          <SpellSlotTracker character={selected.character} onUpdate={updateCharacter}/><section className="page-intro"><div><span className="eyebrow">{t('MAGIE & ZAUBER')}</span><h1>{t('Zauberbuch')}</h1><p className="intro">{t('Verwalte bekannte Zauber, Vorbereitung und ihre wichtigsten Details.')}</p></div></section>
          <SpellCatalog character={selected.character} knownSpells={selected.spellbook.knownSpells} language={language} onAdd={spell=>updateSpellbook([...selected.spellbook.knownSpells,spell])}/><section className="panel"><PanelHeader title={t('Eigene Zauber hinzufügen')} meta="MANUELLE ERFASSUNG" /><form onSubmit={addSpell}><div className="form-grid spell-form"><TextInputField label="Zaubername" value={spellName} onChange={setSpellName} required/><label className="field-label">Zaubergrad<Select value={String(spellLevel)} onValueChange={next=>setSpellLevel(Number(next))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Array.from({length:10},(_,i)=><SelectItem key={i} value={String(i)}>{i===0?'Zaubertrick':'Grad '+i}</SelectItem>)}</SelectContent></Select></label><TextInputField label="Schule" value={spellSchool} onChange={setSpellSchool}/><TextInputField label="Zauberzeit" value={spellTime} onChange={setSpellTime}/><TextInputField label="Reichweite" value={spellRange} onChange={setSpellRange}/><TextInputField label="Komponenten (V/S/M)" value={spellComponents} onChange={setSpellComponents}/><TextInputField label="Wirkungsdauer" value={spellDuration} onChange={setSpellDuration}/></div><div className="form-grid spell-origin-form"><label className="field-label">Herkunft<Select value={spellSource??'other'} onValueChange={next=>setSpellSource(next as KnownSpell['source'])}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="class">Klassenzauber</SelectItem><SelectItem value="story">Story / Belohnung</SelectItem><SelectItem value="item">Gegenstand</SelectItem><SelectItem value="feat">Talent / Fähigkeit</SelectItem><SelectItem value="other">Sonstiges</SelectItem></SelectContent></Select></label><TextInputField label="Quelle / Gegenstand / Notiz" value={spellSourceName} onChange={setSpellSourceName}/><TextInputField label="Nutzungen (0 = unbegrenzt)" type="number" value={String(spellUsageLimit)} onChange={value=>setSpellUsageLimit(Math.max(0,Math.min(1000,Number(value)||0)))}/>{spellUsageLimit>0&&<label className="field-label">Erneuerung<Select value={spellUsageReset} onValueChange={next=>setSpellUsageReset(next as NonNullable<KnownSpell['usageReset']>)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="shortRest">Kurze Rast</SelectItem><SelectItem value="longRest">Lange Rast</SelectItem><SelectItem value="dawn">Morgengrauen</SelectItem><SelectItem value="none">Manuell / nie</SelectItem></SelectContent></Select></label>}</div><div className="spell-flags"><label><input type="checkbox" checked={spellConcentration} onChange={e=>setSpellConcentration(e.target.checked)}/> Konzentration</label><label><input type="checkbox" checked={spellRitual} onChange={e=>setSpellRitual(e.target.checked)}/> Ritual</label></div><TextAreaField label="Beschreibung / Effekt" value={spellDescription} onChange={setSpellDescription}/><button className="primary-button form-submit" type="submit"><Plus size={15}/> Zauber hinzufügen</button></form></section>
          <SpellbookList spells={selected.spellbook.knownSpells} character={selected.character} spellSlots={selected.character.spellSlots??[]} pactMagic={selected.character.pactMagic} onUse={id=>updateSpellbook(selected.spellbook.knownSpells.map(item=>item.spellId===id?{...item,usageRemaining:Math.max(0,(item.usageRemaining??item.usageLimit??0)-1)}:item))} onReset={id=>updateSpellbook(selected.spellbook.knownSpells.map(item=>item.spellId===id?{...item,usageRemaining:item.usageLimit}:item))} onTogglePrepared={(spellId,prepared)=>updateSpellbook(selected.spellbook.knownSpells.map(item=>item.spellId===spellId?{...item,prepared}:item))} onRemove={spellId=>updateSpellbook(selected.spellbook.knownSpells.filter(item=>item.spellId!==spellId))}/>
        </>}
        {page==='levelup'&&selected&&<><section className="page-intro"><div><span className="eyebrow">{t('FORTSCHRITT')}</span><h1>{t('Level-up')}</h1><p className="intro">{t('Entwickle deinen Charakter weiter. Regelwerk:')} {RULESET_LABELS[selected.character.ruleset]}.</p></div></section>
          <section className="levelup-card"><div className="level-number"><span>{t('AKTUELLE STUFE')}</span><strong>{selected.character.level}</strong></div><div className="level-arrow"><ChevronRight size={25}/></div><div className="level-number next"><span>{t('NÄCHSTE STUFE')}</span><strong>{Math.min(20,selected.character.level+1)}</strong></div><button className="primary-button" disabled={selected.character.level>=20} onClick={()=>{if(window.confirm('Charakter auf Stufe '+(selected.character.level+1)+' erhöhen?'))changeLevel(Math.min(20,selected.character.level+1))}}>Stufe erhöhen <ChevronRight size={15}/></button></section>
          <section className="panel"><PanelHeader title={t('Regelbasierte Progression')} /><p className="muted-paragraph">{t('Übungsbonus und Zauberplätze werden anhand von Klasse, Unterklasse und Stufe berechnet. Bereits verbrauchte Plätze bleiben beim Stufenaufstieg verbraucht; neu hinzugewonnene Plätze stehen zur Verfügung.')}</p><p className="muted-paragraph">{t('Trefferpunkte, Klassen- und Unterklassenmerkmale, ASI/Talente sowie konkrete Zauberauswahl benötigen weitere Charakterentscheidungen und werden deshalb noch nicht automatisch vergeben.')}</p></section>
        </>}
        <footer className="footer-note"><BookOpen size={14}/> {t('Dein Begleiter am Spieltisch.')} <span>ADVENTURA · D&D 5E 2014 / 2024</span></footer>
      </div>
    </main>
    {showCreate&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setShowCreate(false)}}><section className="create-modal" role="dialog" aria-modal="true" aria-labelledby="create-title"><div className="modal-heading"><div><span className="eyebrow">{t('NEUES ABENTEUER')}</span><h2 id="create-title">{t('Charakter erstellen')}</h2></div><IconButton label="Schließen" onClick={()=>setShowCreate(false)}><X size={17}/></IconButton></div><form onSubmit={createCharacter}><TextInputField label="Charaktername" value={name} onChange={setName} required/><TextInputField label="Klasse" value={classId} onChange={setClassId} required/><div className="form-row"><label className="field-label">Regelwerk<Select value={ruleset} onValueChange={next=>setRuleset(next as Dnd5eRuleset)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2014">D&D 5e (2014)</SelectItem><SelectItem value="2024">D&D 5e (2024)</SelectItem></SelectContent></Select></label><TextInputField label="Level" type="number" value={String(level)} onChange={v=>setLevel(Math.min(20,Math.max(1,Number(v)||1)))}/></div><p className="modal-hint">{t('Du kannst Attribute und weitere Eigenschaften direkt im Charakterbogen ergänzen.')}</p><div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setShowCreate(false)}>{t('Abbrechen')}</button><button type="submit" className="primary-button" disabled={busy}>{busy?t('Speichert …'):t('Charakter speichern')}</button></div></form></section></div>}
  </div></LanguageContext.Provider>
}

