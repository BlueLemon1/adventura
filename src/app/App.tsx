import { BookOpen, Boxes, Compass, Languages, Moon, ScrollText, Shield, Sparkles, Swords, Users } from 'lucide-react'

const navigation = [
  { label: 'Übersicht', icon: Compass, active: true },
  { label: 'Charaktere', icon: Shield },
  { label: 'Kampagnen', icon: Users },
  { label: 'Inventar', icon: Boxes },
  { label: 'Zauberbuch', icon: BookOpen },
]

export default function App() {
  return <div className="app-shell min-h-screen">
    <aside className="sidebar">
      <a className="brand" href="#"><span className="brand-mark"><Sparkles size={19}/></span><span><strong>adventura</strong><small>YOUR ADVENTURE HUB</small></span></a>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list" aria-label="Hauptnavigation">
        {navigation.map(({label,icon:Icon,active})=><a key={label} href="#" className={active?'nav-link active':'nav-link'}><Icon size={18}/><span>{label}</span></a>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="campaign-card"><Swords size={17}/><div><strong>Dein Abenteuer</strong><span>Deine Geschichte beginnt hier.</span></div></div>
        <div className="profile-row"><div className="avatar">A</div><div className="profile-copy"><strong>Abenteurer</strong><span>Lokale Vorschau</span></div><span className="status-dot"/></div>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">ADVENTURA <span>/</span> ÜBERSICHT</div><div className="top-actions"><button className="icon-button" aria-label="Sprache"><Languages size={17}/></button><button className="icon-button" aria-label="Farbschema"><Moon size={17}/></button><button className="avatar small-avatar" aria-label="Profil">A</button></div></header>
      <div className="content">
        <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={13}/> DEIN ABENTEUER BEGINNT</div><h1>Willkommen, <em>Abenteurer.</em></h1><p className="intro">Alles bereit für dein nächstes Kapitel?</p></div><button className="primary-button"><span>+</span> Charakter erstellen</button></section>
        <section className="stats-grid" aria-label="Zusammenfassung">
          <article className="stat-card"><span>CHARAKTERE</span><strong>0</strong><small>Noch keine Helden erstellt</small><Shield className="stat-icon"/></article>
          <article className="stat-card"><span>KAMPAGNEN</span><strong>0</strong><small>Deine Abenteuerreisen</small><Users className="stat-icon"/></article>
          <article className="stat-card"><span>GEGENSTÄNDE</span><strong>0</strong><small>In deinen Inventaren</small><Boxes className="stat-icon"/></article>
        </section>
        <section className="section-heading"><div><span className="eyebrow">DEINE SAMMLUNG</span><h2>Charaktere & Abenteuer</h2></div><span className="muted-label">0 CHARAKTERE</span></section>
        <section className="empty-state"><div className="empty-art"><div className="art-ring"/><ScrollText size={42}/><Sparkles className="art-sparkle" size={17}/></div><h3>Deine Legende wartet noch darauf, geschrieben zu werden.</h3><p>Erstelle deinen ersten Charakter und beginne, deine Abenteuer, Ausrüstung und Zauber an einem Ort zu verwalten.</p><button className="secondary-button"><Shield size={16}/> Ersten Charakter erstellen</button></section>
        <footer className="footer-note"><BookOpen size={14}/> Eine Welt voller Möglichkeiten. <span>ADVENTURA · D&D 5E</span></footer>
      </div>
    </main>
  </div>
}
