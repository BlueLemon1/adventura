import { ChevronRight } from 'lucide-react'
import type { Character } from '../domain/character'
import { updatePactMagic, updateSpellSlots } from '../domain/spellcasting'
import { RULESET_LABELS } from '../domain/rules'
import { Button } from '../components/ui/button'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import { translate, useLanguage } from './i18n'

interface LevelUpPageProps {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

export function LevelUpPage({ character, onUpdate }: LevelUpPageProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)

  function levelUp(nextLevel: number) {
    const nextCharacter = { ...character, level: nextLevel }
    onUpdate({
      level: nextLevel,
      spellSlots: updateSpellSlots(nextCharacter, character.spellSlots),
      pactMagic: updatePactMagic(nextCharacter, character.pactMagic),
    })
  }

  return (
    <>
      <PageIntro
        eyebrow={t('FORTSCHRITT')}
        title={t('Level-up')}
        description={
          <>
            {t('Entwickle deinen Charakter weiter. Regelwerk:')} {RULESET_LABELS[character.ruleset]}
            .
          </>
        }
      />
      <section className="levelup-card">
        <div className="level-number">
          <span>{t('AKTUELLE STUFE')}</span>
          <strong>{character.level}</strong>
        </div>
        <div className="level-arrow">
          <ChevronRight size={25} />
        </div>
        <div className="level-number next">
          <span>{t('NÄCHSTE STUFE')}</span>
          <strong>{Math.min(20, character.level + 1)}</strong>
        </div>
        <Button
          variant="primary"
          disabled={character.level >= 20}
          onClick={() => {
            if (window.confirm('Charakter auf Stufe ' + (character.level + 1) + ' erhöhen?'))
              levelUp(Math.min(20, character.level + 1))
          }}
        >
          Stufe erhöhen <ChevronRight size={15} />
        </Button>
      </section>
      <section className="panel">
        <PanelHeader title={t('Regelbasierte Progression')} />
        <p className="muted-paragraph">
          {t(
            'Übungsbonus und Zauberplätze werden anhand von Klasse, Unterklasse und Stufe berechnet. Bereits verbrauchte Plätze bleiben beim Stufenaufstieg verbraucht; neu hinzugewonnene Plätze stehen zur Verfügung.',
          )}
        </p>
        <p className="muted-paragraph">
          {t(
            'Trefferpunkte, Klassen- und Unterklassenmerkmale, ASI/Talente sowie konkrete Zauberauswahl benötigen weitere Charakterentscheidungen und werden deshalb noch nicht automatisch vergeben.',
          )}
        </p>
      </section>
    </>
  )
}
