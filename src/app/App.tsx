import { BookOpen, Boxes, Compass, Languages, Moon, ScrollText, Shield, Sparkles, WandSparkles } from 'lucide-react'

const navigation = [
  { label: 'Übersicht', icon: Compass, active: true },
  { label: 'Charakter', icon: Shield },
  { label: 'Inventar', icon: Boxes },
  { label: 'Zauberbuch', icon: BookOpen },
  { label: 'Level-up', icon: WandSparkles },
]

export default function App() {
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
      <header className="topbar"><div className="breadcrumb">ADVENTURA <span>/</span> ÜBERSICHT</div><div className="top-actions"><button className="icon-button" aria-label="Sprache"><Languages size={17}/></button><button className="icon-button" aria-label="Farbschema"><Moon size={17}/></button><button className="avatar small-avatar" aria-label="Profil">A</button></div></header>
      <div className="content">
        <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={13}/> DEIN CHARAKTER IM MITTELPUNKT</div><h1>Willkommen, <em>Abenteurer.</em></h1><p className="intro">Dein digitaler Charakterbogen – bereit für den nächsten Spieleabend.</p></div><button className="primary-button"><span>+</span> Charakter erstellen</button></section>
        <section className="stats-grid" aria-label="Zusammenfassung">
          <article className="stat-card"><span>CHARAKTERE</span><strong>0</strong><small>Noch kein Charakter erstellt</small><Shield className="stat-icon"/></article>
          <article className="stat-card"><span>GEGENSTÄNDE</span><strong>0</strong><small>Persönlich & gemeinsam</small><Boxes className="stat-icon"/></article>
          <article className="stat-card"><span>GELERNTE ZAUBER</span><strong>0</strong><small>Dein persönliches Zauberbuch</small><BookOpen className="stat-icon"/></article>
        </section>
        <section className="section-heading"><div><span className="eyebrow">DEIN HELD</span><h2>Dein Charakterbogen</h2></div><span className="muted-label">NOCH NICHT ERSTELLT</span></section>
        <section className="empty-state"><div className="empty-art"><div className="art-ring"/><ScrollText size={42}/><Sparkles className="art-sparkle" size={17}/></div><h3>Dein Charakter wartet auf seinen ersten Auftritt.</h3><p>Erstelle deinen D&D-Charakter, verwalte persönliche und gemeinsame Ausrüstung und behalte deine Zauber samt vollständigen Details griffbereit.</p><button className="secondary-button"><Shield size={16}/> Ersten Charakter erstellen</button></section>
        <footer className="footer-note"><BookOpen size={14}/> Dein Begleiter am Spieltisch. <span>ADVENTURA · D&D 5E 2014 / 2024</span></footer>
      </div>
    </main>
  </div>
}
