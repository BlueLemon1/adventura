import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { BookOpen, Boxes, Compass, Download, Languages, Moon, ScrollText, Shield, Sparkles, Trash2, Upload, WandSparkles, X } from 'lucide-react'
import type { Dnd5eRuleset } from '../domain/rules'
import { RULESET_LABELS } from '../domain/rules'
import type { Character } from '../domain/character'
import { deleteCharacter, getCharacters, saveCharacter, type StoredCharacter } from '../storage/database'
import { downloadBackup, importBackup } from '../storage/backup'

const navigation = [
  { label: 'Übersicht', icon: Compass, active: true },
  { label: 'Charakter', icon: Shield },
  { label: 'Inventar', icon: Boxes },
  { label: 'Zauberbuch', icon: BookOpen },
  { label: 'Level-up', icon: WandSparkles },
]

function createId(): string {
  return crypto.randomUUID()
}

export default function App() {
  const [characters, setCharacters] = useState<StoredCharacter[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [classId, setClassId] = useState('')
  const [ruleset, setRuleset] = useState<Dnd5eRuleset>('2024')
  const [level, setLevel] = useState(1)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  async function refreshCharacters() {
    setCharacters(await getCharacters())
  }

  useEffect(() => {
    getCharacters()
      .then(setCharacters)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Daten konnten nicht geladen werden.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !classId.trim()) return
    setBusy(true)
    setError('')
    const now = new Date().toISOString()
    const character: Character = {
      id: createId(),
      name: name.trim(),
      ruleset,
      classId: classId.trim().toLowerCase(),
      level,
      createdAt: now,
      updatedAt: now,
    }
    const stored: StoredCharacter = {
      character,
      inventory: { personal: [], party: [] },
      spellbook: { knownSpells: [] },
    }
    try {
      await saveCharacter(stored)
      await refreshCharacters()
      setShowCreate(false)
      setName('')
      setClassId('')
      setLevel(1)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Charakter konnte nicht gespeichert werden.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(item: StoredCharacter) {
    if (!window.confirm(`„${item.character.name}“ wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`)) return
    try {
      await deleteCharacter(item.character.id)
      await refreshCharacters()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Charakter konnte nicht gelöscht werden.')
    }
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!window.confirm('Der Import ersetzt alle aktuell gespeicherten Charaktere. Hast du vorher ein Backup erstellt?')) return
    setBusy(true)
    setError('')
    try {
      await importBackup(await file.text())
      await refreshCharacters()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Die Backup-Datei konnte nicht importiert werden.')
    } finally {
      setBusy(false)
    }
  }

  async function handleExport() {
    setBusy(true)
    setError('')
    try {
      await downloadBackup()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Backup konnte nicht erstellt werden.')
    } finally {
      setBusy(false)
    }
  }

  const itemCount = characters.reduce((sum, item) => sum + item.inventory.personal.length + item.inventory.party.length, 0)
  const spellCount = characters.reduce((sum, item) => sum + item.spellbook.knownSpells.length, 0)

  return <div className="app-shell min-h-screen">
    <aside className="sidebar">
      <a className="brand" href="#"><span className="brand-mark"><Sparkles size={19}/></span><span><strong>adventura</strong><small>YOUR ADVENTURE COMPANION</small></span></a>
      <div className="workspace-label">CHARAKTERBOGEN</div>
      <nav className="nav-list" aria-label="Hauptnavigation">
        {navigation.map(({label,icon:Icon,active})=><a key={label} href="#" className={active?'nav-link active':'nav-link'}><Icon size={18}/><span>{label}</span></a>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="campaign-card"><ScrollText size={17}/><div><strong>Am Spieltisch</strong><span>Alles für deinen Charakter an einem Ort.</span></div></div>
        <div className="profile-row"><div className="avatar">A</div><div className="profile-copy"><strong>Abenteurer</strong><span>Lokale Speicherung</span></div><span className="status-dot"/></div>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <div className="breadcrumb">ADVENTURA <span>/</span> ÜBERSICHT</div>
        <div className="top-actions">
          <button className="icon-button" aria-label="Sprache"><Languages size={17}/></button>
          <button className="icon-button" aria-label="Farbschema"><Moon size={17}/></button>
          <button className="icon-button" aria-label="Backup exportieren" title="Backup exportieren" onClick={handleExport} disabled={busy}><Download size={16}/></button>
          <button className="icon-button" aria-label="Backup importieren" title="Backup importieren" onClick={()=>fileInput.current?.click()} disabled={busy}><Upload size={16}/></button>
          <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={handleImport}/>
          <button className="avatar small-avatar" aria-label="Profil">A</button>
        </div>
      </header>
      <div className="content">
        <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={13}/> DEIN CHARAKTER IM MITTELPUNKT</div><h1>Willkommen, <em>Abenteurer.</em></h1><p className="intro">Dein digitaler Charakterbogen – bereit für den nächsten Spieleabend.</p></div><button className="primary-button" onClick={()=>setShowCreate(true)}><span>+</span> Charakter erstellen</button></section>
        {error && <div className="error-banner" role="alert">{error}<button onClick={()=>setError('')} aria-label="Fehlermeldung schließen"><X size={15}/></button></div>}
        <section className="stats-grid" aria-label="Zusammenfassung">
          <article className="stat-card"><span>CHARAKTERE</span><strong>{loading?'–':characters.length}</strong><small>{characters.length===0?'Noch kein Charakter erstellt':'In deiner Sammlung'}</small><Shield className="stat-icon"/></article>
          <article className="stat-card"><span>GEGENSTÄNDE</span><strong>{itemCount}</strong><small>Persönlich & gemeinsam</small><Boxes className="stat-icon"/></article>
          <article className="stat-card"><span>GELERNTE ZAUBER</span><strong>{spellCount}</strong><small>Dein persönliches Zauberbuch</small><BookOpen className="stat-icon"/></article>
        </section>
        <section className="section-heading"><div><span className="eyebrow">DEINE HELDEN</span><h2>Deine Charaktere</h2></div><span className="muted-label">{characters.length} GESPEICHERT</span></section>
        {loading ? <section className="empty-state"><p>Charaktere werden geladen …</p></section> : characters.length ? <section className="character-grid">
          {characters.map((stored)=><article className="character-card" key={stored.character.id}>
            <div className="character-card-top"><div className="character-emblem"><Shield size={22}/></div><button className="icon-button delete-button" aria-label={`${stored.character.name} löschen`} onClick={()=>void handleDelete(stored)}><Trash2 size={15}/></button></div>
            <h3>{stored.character.name}</h3><p>{stored.character.classId} · Level {stored.character.level}</p>
            <span className="ruleset-pill">{RULESET_LABELS[stored.character.ruleset]}</span>
          </article>)}
        </section> : <section className="empty-state"><div className="empty-art"><div className="art-ring"/><ScrollText size={42}/><Sparkles className="art-sparkle" size={17}/></div><h3>Dein Charakter wartet auf seinen ersten Auftritt.</h3><p>Erstelle deinen D&D-Charakter, verwalte persönliche und gemeinsame Ausrüstung und behalte deine Zauber samt vollständigen Details griffbereit.</p><button className="secondary-button" onClick={()=>setShowCreate(true)}><Shield size={16}/> Ersten Charakter erstellen</button></section>}
        <footer className="footer-note"><BookOpen size={14}/> Dein Begleiter am Spieltisch. <span>ADVENTURA · D&D 5E 2014 / 2024</span></footer>
      </div>
    </main>
    {showCreate && <div className="modal-backdrop" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)setShowCreate(false)}}>
      <section className="create-modal" role="dialog" aria-modal="true" aria-labelledby="create-title">
        <div className="modal-heading"><div><span className="eyebrow">NEUES ABENTEUER</span><h2 id="create-title">Charakter erstellen</h2></div><button className="icon-button" onClick={()=>setShowCreate(false)} aria-label="Schließen"><X size={17}/></button></div>
        <form onSubmit={handleCreate}>
          <label className="field-label">Charaktername<input autoFocus value={name} onChange={event=>setName(event.target.value)} placeholder="z. B. Elara Lichtbringer" required maxLength={60}/></label>
          <label className="field-label">Klasse<input value={classId} onChange={event=>setClassId(event.target.value)} placeholder="z. B. Paladin, Magier, Schurke" required maxLength={40}/></label>
          <div className="form-row">
            <label className="field-label">Regelwerk<select value={ruleset} onChange={event=>setRuleset(event.target.value as Dnd5eRuleset)}><option value="2014">D&D 5e (2014)</option><option value="2024">D&D 5e (2024)</option></select></label>
            <label className="field-label">Level<input type="number" min={1} max={20} value={level} onChange={event=>setLevel(Math.min(20,Math.max(1,Number(event.target.value)||1)))}/></label>
          </div>
          <p className="modal-hint">Du kannst weitere Eigenschaften später im Charakterbogen ergänzen.</p>
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setShowCreate(false)}>Abbrechen</button><button type="submit" className="primary-button" disabled={busy}>{busy?'Speichert …':'Charakter speichern'}</button></div>
        </form>
      </section>
    </div>}
  </div>
}
