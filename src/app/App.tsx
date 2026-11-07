import { useRef, useState, type ChangeEvent } from 'react'
import { BookOpen, Boxes, Compass, Download, Moon, Sun, ScrollText, Shield, Sparkles, Upload, WandSparkles, X } from 'lucide-react'
import type { Character } from '../domain/character'
import type { StoredCharacter } from '../storage/database'
import type { Dnd5eRuleset } from '../domain/rules'
import { createPactMagic, createSpellSlots } from '../domain/spellcasting'
import { LanguageContext, translate } from './i18n'
import { deleteCharacter, getPartyInventory, saveCharacter } from '../storage/database'
import { downloadBackup, importBackup } from '../storage/backup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { IconButton } from '../components/ui/button'
import { useAppPreferences } from './useAppPreferences'
import { useCharacterCollection } from './useCharacterCollection'
import { CharacterSheet } from './CharacterSheet'
import { InventoryPage } from './InventoryPage'
import { SpellbookPage } from './SpellbookPage'
import { OverviewPage } from './OverviewPage'
import { LevelUpPage } from './LevelUpPage'
import { CreateCharacterDialog } from './CreateCharacterDialog'

type Page = 'overview' | 'sheet' | 'inventory' | 'spells' | 'levelup'
const abilityDefaults = {str:10,dex:10,con:10,int:10,wis:10,cha:10}
const currencyDefaults = {cp:0,sp:0,gp:0,ep:0,pp:0}
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
  const [busy,setBusy]=useState(false)
  const fileInput=useRef<HTMLInputElement>(null)

  async function createCharacter(input: {
    name: string
    classId: string
    ruleset: Dnd5eRuleset
    level: number
  }) {
    setBusy(true)
    setError('')

    const now = new Date().toISOString()
    const character: Character = {
      id: newId(),
      name: input.name,
      ruleset: input.ruleset,
      classId: input.classId,
      level: input.level,
      createdAt: now,
      updatedAt: now,
      abilities: { ...abilityDefaults },
      savingThrowProficiencies: [],
      skillProficiencies: {},
      armorClass: 10,
      hitPointsMax: 10,
      hitPointsCurrent: 10,
      temporaryHitPoints: 0,
      speed: 30,
      initiativeBonus: 0,
      hitDice: '1d8',
      spellSlots: createSpellSlots({
        ruleset: input.ruleset,
        classId: input.classId,
        level: input.level,
      }),
      pactMagic: createPactMagic({
        ruleset: input.ruleset,
        classId: input.classId,
        level: input.level,
      }),
      experiencePoints: 0,
      inspiration: false,
      deathSaves: { successes: 0, failures: 0 },
    }
    const stored: StoredCharacter = {
      character,
      inventory: {
        personal: [],
        party: [],
        currency: { ...currencyDefaults },
      },
      spellbook: { knownSpells: [] },
    }

    try {
      await saveCharacter(stored)
      setCharacters((current) => [...current, stored])
      setSelectedId(character.id)
      setPage('sheet')
      setShowCreate(false)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Charakter konnte nicht angelegt werden.')
    } finally {
      setBusy(false)
    }
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
        {page==='overview'&&<OverviewPage characters={characters} partyItems={partyItems} loading={loading} onCreate={()=>setShowCreate(true)} onRemove={(entry)=>void removeCharacter(entry)} onOpen={(id)=>{setSelectedId(id);setPage('sheet')}}/>}
        {page!=='overview'&&!selected&&<section className="empty-state"><h3>{t('Wähle zuerst einen Charakter aus.')}</h3><button className="secondary-button" onClick={()=>setPage('overview')}>{t('Zur Übersicht')}</button></section>}
        {page==='sheet'&&selected&&<CharacterSheet character={selected.character} onUpdate={updateCharacter}/>}
        {page==='inventory'&&selected&&<InventoryPage inventory={selected.inventory} partyItems={partyItems} onUpdateInventory={updateInventory} onSavePartyItems={persistPartyItems}/>}
        {page==='spells'&&selected&&<SpellbookPage character={selected.character} knownSpells={selected.spellbook.knownSpells} language={language} onUpdateCharacter={updateCharacter} onUpdateSpells={updateSpellbook}/>}
        {page==='levelup'&&selected&&<LevelUpPage character={selected.character} onUpdate={updateCharacter}/>}
        <footer className="footer-note"><BookOpen size={14}/> {t('Dein Begleiter am Spieltisch.')} <span>ADVENTURA · D&D 5E 2014 / 2024</span></footer>
      </div>
    </main>
    {showCreate&&<CreateCharacterDialog busy={busy} onClose={()=>setShowCreate(false)} onCreate={createCharacter}/>}
  </div></LanguageContext.Provider>
}

