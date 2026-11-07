import { BookOpen, Boxes, ChevronRight, Plus, ScrollText, Shield, Sparkles, Trash2 } from 'lucide-react'
import type { InventoryItem } from '../domain/character'
import type { StoredCharacter } from '../storage/database'
import { Button, IconButton } from '../components/ui/button'
import { RULESET_LABELS } from '../domain/rules'
import { translate, useLanguage } from './i18n'

interface OverviewPageProps {
  characters: StoredCharacter[]
  partyItems: InventoryItem[]
  loading: boolean
  onCreate: () => void
  onRemove: (character: StoredCharacter) => void
  onOpen: (characterId: string) => void
}

export function OverviewPage({
  characters,
  partyItems,
  loading,
  onCreate,
  onRemove,
  onOpen,
}: OverviewPageProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const totalItems = characters.reduce(
    (total, entry) => total + entry.inventory.personal.length,
    0,
  ) + partyItems.length
  const totalSpells = characters.reduce(
    (total, entry) => total + entry.spellbook.knownSpells.length,
    0,
  )

  return (
    <>
<section className="welcome-row"><div><div className="eyebrow"><Sparkles size={13}/> {t('DEIN CHARAKTER IM MITTELPUNKT')}</div><h1>{t('Willkommen,')} <em>{t('Abenteurer.')}</em></h1><p className="intro">{t('Dein digitaler Charakterbogen – bereit für den nächsten Spieleabend.')}</p></div><Button variant="primary" onClick={onCreate}><Plus size={16}/> {t('Charakter erstellen')}</Button></section>
          <section className="stats-grid"><article className="stat-card"><span>{t('CHARAKTERE')}</span><strong>{loading?'–':characters.length}</strong><small>{t('In deiner Sammlung')}</small><Shield className="stat-icon"/></article><article className="stat-card"><span>{t('GEGENSTÄNDE')}</span><strong>{totalItems}</strong><small>{t('Persönlich & gemeinsam')}</small><Boxes className="stat-icon"/></article><article className="stat-card"><span>{t('GELERNTE ZAUBER')}</span><strong>{totalSpells}</strong><small>{t('Dein persönliches Zauberbuch')}</small><BookOpen className="stat-icon"/></article></section>
          <section className="section-heading"><div><span className="eyebrow">{t('DEINE HELDEN')}</span><h2>{t('Deine Charaktere')}</h2></div><span className="muted-label">{characters.length} GESPEICHERT</span></section>
          {loading?<section className="empty-state"><p>{t('Charaktere werden geladen …')}</p></section>:characters.length?<section className="character-grid">{characters.map(entry=><article className="character-card" key={entry.character.id}><div className="character-card-top"><div className="character-emblem"><Shield size={22}/></div><IconButton className="delete-button" onClick={()=>void onRemove(entry)} label="Charakter löschen"><Trash2 size={15}/></IconButton></div><h3>{entry.character.name}</h3><p>{entry.character.classId} · Level {entry.character.level}</p><span className="ruleset-pill">{RULESET_LABELS[entry.character.ruleset]}</span><button className="open-character" onClick={()=>{onOpen(entry.character.id)}}>{t('Charakter öffnen')} <ChevronRight size={14}/></button></article>)}</section>:<section className="empty-state"><div className="empty-art"><div className="art-ring"/><ScrollText size={42}/><Sparkles className="art-sparkle" size={17}/></div><h3>{t('Dein Charakter wartet auf seinen ersten Auftritt.')}</h3><p>{t('Erstelle deinen D&D-Charakter und verwalte Werte, Ausrüstung und Zauber an einem Ort.')}</p><button className="secondary-button" onClick={onCreate}><Shield size={16}/> {t('Ersten Charakter erstellen')}</Button></section>}
    </>
  )
}
