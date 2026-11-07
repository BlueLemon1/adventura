import { ChevronRight, Compass, Heart, Save, Shield } from 'lucide-react'
import type { Ability, Character, ProficiencyLevel, SkillId } from '../domain/character'
import { ABILITIES, SKILLS } from '../domain/character'
import { RULESET_LABELS } from '../domain/rules'
import { CLASS_OPTIONS, getClassLabel, SPELLCASTING_SUBCLASSES, SUBCLASS_OPTIONS } from '../domain/classes'
import { getClassResources, getAutomaticClassFeatures } from '../domain/classFeatures'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { TextAreaField, TextInputField } from '../components/ui/form-field'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import { translate, useLanguage } from './i18n'

const ABILITY_LABELS: Record<Ability, string> = {
  str: 'Stärke',
  dex: 'Geschicklichkeit',
  con: 'Konstitution',
  int: 'Intelligenz',
  wis: 'Weisheit',
  cha: 'Charisma',
}

const SKILL_LABELS: Record<SkillId, string> = {
  acrobatics: 'Akrobatik',
  animalHandling: 'Mit Tieren umgehen',
  arcana: 'Arkane Kunde',
  athletics: 'Athletik',
  deception: 'Täuschen',
  history: 'Geschichte',
  insight: 'Motiv erkennen',
  intimidation: 'Einschüchtern',
  investigation: 'Nachforschungen',
  medicine: 'Heilkunde',
  nature: 'Naturkunde',
  perception: 'Wahrnehmung',
  performance: 'Auftreten',
  persuasion: 'Überzeugen',
  religion: 'Religion',
  sleightOfHand: 'Fingerfertigkeit',
  stealth: 'Heimlichkeit',
  survival: 'Überlebenskunst',
}

const DEFAULT_ABILITIES = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }

function getModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

function formatModifier(value: number): string {
  return value >= 0 ? `+ ${value}` : `− ${Math.abs(value)}`
}

function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1
}

interface CharacterSheetProps {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

export function CharacterSheet({ character, onUpdate }: CharacterSheetProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const currentAbilities = character.abilities ?? DEFAULT_ABILITIES
  const prof = getProficiencyBonus(character.level)
  const classResources = getClassResources(character)
  const automaticFeatures = getAutomaticClassFeatures(character)
  const storedResources = character.classResources ?? []
  function updateResource(id: string, current: number) {
    onUpdate({ classResources: [...storedResources.filter((item) => item.id !== id), { id, current }] })
  }

  return (
    <>
      <PageIntro
        eyebrow={<>CHARAKTERBOGEN · {RULESET_LABELS[character.ruleset]}</>}
        title={character.name}
        description={
          <>
            {t(getClassLabel(character.classId))} · Stufe {character.level} · Übungsbonus +{prof}
          </>
        }
        trailing={
          <span className="saved-indicator">
            <Save size={13} /> {t('Automatisch gespeichert')}
          </span>
        }
      />
      <section className="combat-grid">
        <article className="combat-card">
          <Heart />
          <span>{t('LEBENSPUNKTE')}</span>
          <div className="hp-values">
            <input
              aria-label="Aktuelle Trefferpunkte"
              type="number"
              min="0"
              value={character.hitPointsCurrent ?? 0}
              onChange={(e) => onUpdate({ hitPointsCurrent: Math.max(0, Number(e.target.value)) })}
            />
            <b>/</b>
            <input
              aria-label="Maximale Trefferpunkte"
              type="number"
              min="0"
              value={character.hitPointsMax ?? 0}
              onChange={(e) => onUpdate({ hitPointsMax: Math.max(0, Number(e.target.value)) })}
            />
          </div>
          <small>Aktuell / Maximum</small>
        </article>
        <article className="combat-card">
          <Shield />
          <span>{t('RÜSTUNGSKLASSE')}</span>
          <input
            className="combat-number"
            type="number"
            value={character.armorClass ?? 10}
            onChange={(e) => onUpdate({ armorClass: Number(e.target.value) })}
          />
          <small>RK</small>
        </article>
        <article className="combat-card">
          <Compass />
          <span>{t('INITIATIVE')}</span>
          <input
            className="combat-number"
            type="number"
            value={character.initiativeBonus ?? getModifier(currentAbilities.dex)}
            onChange={(e) => onUpdate({ initiativeBonus: Number(e.target.value) })}
          />
          <small>Bonus</small>
        </article>
        <article className="combat-card">
          <ChevronRight />
          <span>{t('BEWEGUNG')}</span>
          <input
            className="combat-number"
            type="number"
            value={character.speed ?? 30}
            onChange={(e) => onUpdate({ speed: Number(e.target.value) })}
          />
          <small>Fuß</small>
        </article>
      </section>
      {(classResources.length > 0 || automaticFeatures.length > 0) && (
        <div className="two-column class-feature-grid">
          {classResources.length > 0 && (
            <section className="panel">
              <PanelHeader title={t('Klassenressourcen')} meta={t('AUTOMATISCH BERECHNET')} />
              <div className="class-resource-list">
                {classResources.map((resource) => {
                  const saved = storedResources.find((item) => item.id === resource.id)
                  const current = Math.min(resource.maximum, Math.max(0, saved?.current ?? resource.maximum))
                  return (
                    <div className="class-resource-row" key={resource.id}>
                      <div><strong>{t(resource.label)}</strong><small>{t(resource.recovery)}</small></div>
                      <div className="resource-counter">
                        <button type="button" aria-label={t('Ressource verringern')} disabled={current <= 0} onClick={() => updateResource(resource.id, current - 1)}>−</button>
                        <strong>{current} / {resource.maximum}</strong>
                        <button type="button" aria-label={t('Ressource erhöhen')} disabled={current >= resource.maximum} onClick={() => updateResource(resource.id, current + 1)}>+</button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="muted-paragraph">{t('Die Höchstwerte richten sich nach Klasse, Stufe und gewähltem Regelwerk. Der aktuelle Verbrauch wird separat gespeichert.')}</p>
            </section>
          )}
          {automaticFeatures.length > 0 && (
            <section className="panel">
              <PanelHeader title={t('Automatische Klassenmerkmale')} meta={t('DURCH KLASSE / UNTERKLASSE')} />
              <div className="automatic-feature-list">
                {automaticFeatures.map((feature) => (
                  <div className="automatic-feature-row" key={feature.id}>
                    <div><strong>{t(feature.name)}</strong><small>{t('Stufe')} {feature.level} · {t(feature.source === 'subclass' ? 'Unterklasse' : 'Klasse')}</small></div>
                    <span className="automatic-feature-badge">{t('Automatisch')}</span>
                  </div>
                ))}
              </div>
              <p className="muted-paragraph">{t('Diese Merkmale werden aus Klasse, Unterklasse und Stufe abgeleitet. Sie müssen nicht manuell eingetragen werden.')}</p>
            </section>
          )}
        </div>
      )}
      <div className="two-column">
        <section className="panel">
          <PanelHeader title={t('Attribute')} meta={t('MODIFIKATOR')} />
          <div className="ability-grid">
            {ABILITIES.map((ability) => (
              <label className="ability-card" key={ability}>
                <span>{t(ABILITY_LABELS[ability])}</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={currentAbilities[ability]}
                  onChange={(e) =>
                    onUpdate({
                      abilities: {
                        ...currentAbilities,
                        [ability]: Math.min(30, Math.max(1, Number(e.target.value) || 1)),
                      },
                    })
                  }
                />
                <strong>{formatModifier(getModifier(currentAbilities[ability]))}</strong>
              </label>
            ))}
          </div>
        </section>
        <section className="panel">
          <PanelHeader title={t('Rettungswürfe')} meta={`${t('ÜBUNGSBONUS +')} ${prof}`} />
          <div className="proficiency-list">
            {ABILITIES.map((ability) => {
              const trained = character.savingThrowProficiencies ?? []
              const bonus =
                getModifier(currentAbilities[ability]) + (trained.includes(ability) ? prof : 0)
              return (
                <label className="proficiency-row" key={ability}>
                  <input
                    type="checkbox"
                    checked={trained.includes(ability)}
                    onChange={(e) =>
                      onUpdate({
                        savingThrowProficiencies: e.target.checked
                          ? [...trained, ability]
                          : trained.filter((value) => value !== ability),
                      })
                    }
                  />
                  <span>{ABILITY_LABELS[ability]}</span>
                  <strong>{formatModifier(bonus)}</strong>
                </label>
              )
            })}
          </div>
        </section>
      </div>
      <section className="panel">
        <PanelHeader title={t('Fertigkeiten')} meta={t('KEINE · GEÜBT · EXPERTISE')} />
        <div className="skills-grid">
          {SKILLS.map((skill) => {
            const training = character.skillProficiencies ?? {}
            const value = training[skill.id] ?? 'none'
            const bonus =
              getModifier(currentAbilities[skill.ability]) +
              (value === 'expertise' ? prof * 2 : value === 'proficient' ? prof : 0)
            return (
              <div className="skill-row" key={skill.id}>
                <span className="skill-ability">{skill.ability.toUpperCase()}</span>
                <span>{t(SKILL_LABELS[skill.id])}</span>
                <strong>{formatModifier(bonus)}</strong>
                <Select
                  value={value}
                  onValueChange={(next) =>
                    onUpdate({
                      skillProficiencies: { ...training, [skill.id]: next as ProficiencyLevel },
                    })
                  }
                >
                  <SelectTrigger
                    className="skill-select"
                    ariaLabel={SKILL_LABELS[skill.id] + ' Übungsgrad'}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">–</SelectItem>
                    <SelectItem value="proficient">Geübt</SelectItem>
                    <SelectItem value="expertise">Expertise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )
          })}
        </div>
      </section>
      <section className="panel">
        <PanelHeader title={t('Weitere Angaben')} />
        <div className="form-grid">
          <label className="field-label">
            {t('Klasse')}
            <Select
              value={character.classId}
              onValueChange={(value) => onUpdate({ classId: value, subclassId: '' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLASS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <TextInputField
            label="Spezies"
            value={character.speciesId ?? ''}
            onChange={(value) => onUpdate({ speciesId: value })}
          />
          <TextInputField
            label="Hintergrund"
            value={character.background ?? ''}
            onChange={(value) => onUpdate({ background: value })}
          />
          {SUBCLASS_OPTIONS[character.classId] ? (
            <label className="field-label">
              {t('Unterklasse')}
              <Select
                value={character.subclassId || 'none'}
                onValueChange={(value) => onUpdate({ subclassId: value === 'none' ? '' : value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t('Keine')}</SelectItem>
                  {SUBCLASS_OPTIONS[character.classId].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          ) : (
            <TextInputField
              label="Unterklasse"
              value={character.subclassId ?? ''}
              onChange={(value) => onUpdate({ subclassId: value })}
            />
          )}
          <TextInputField
            label="Gesinnung"
            value={character.alignment ?? ''}
            onChange={(value) => onUpdate({ alignment: value })}
          />
          <TextInputField
            label="Spielername"
            value={character.playerName ?? ''}
            onChange={(value) => onUpdate({ playerName: value })}
          />
          <TextInputField
            label="Erfahrungspunkte"
            type="number"
            value={String(character.experiencePoints ?? 0)}
            onChange={(value) => onUpdate({ experiencePoints: Math.max(0, Number(value) || 0) })}
          />
          <TextInputField
            label="Trefferwürfel"
            value={character.hitDice ?? ''}
            onChange={(value) => onUpdate({ hitDice: value })}
          />
        </div>
        <div className="form-grid textareas">
          <TextAreaField
            label="Persönlichkeitsmerkmale"
            value={character.personalityTraits ?? ''}
            onChange={(value) => onUpdate({ personalityTraits: value })}
          />
          <TextAreaField
            label="Ideale"
            value={character.ideals ?? ''}
            onChange={(value) => onUpdate({ ideals: value })}
          />
          <TextAreaField
            label="Bindungen"
            value={character.bonds ?? ''}
            onChange={(value) => onUpdate({ bonds: value })}
          />
          <TextAreaField
            label="Makel"
            value={character.flaws ?? ''}
            onChange={(value) => onUpdate({ flaws: value })}
          />
          <TextAreaField
            label="Merkmale & Fähigkeiten"
            value={character.features ?? ''}
            onChange={(value) => onUpdate({ features: value })}
          />
          <TextAreaField
            label="Notizen"
            value={character.notes ?? ''}
            onChange={(value) => onUpdate({ notes: value })}
          />
        </div>
      </section>
    </>
  )
}
