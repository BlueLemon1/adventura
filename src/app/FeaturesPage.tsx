import type { Character } from '../domain/character'
import { getAutomaticClassFeatures, getClassResources } from '../domain/classFeatures'
import { getContentSourceAbbreviation } from '../domain/contentSources'
import { RULESET_LABELS } from '../domain/rules'
import { PanelHeader } from '../components/ui/panel-header'
import { PageIntro } from '../components/ui/page-intro'
import { translate, useLanguage } from './i18n'

interface FeaturesPageProps {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

export function FeaturesPage({ character, onUpdate }: FeaturesPageProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const resources = getClassResources(character)
  const features = getAutomaticClassFeatures(character, language)
  const unlockedCount = features.filter((feature) => feature.unlocked).length
  const saved = character.classResources ?? []
  const activationLabels = {
    action: 'Aktion',
    bonusAction: 'Bonusaktion',
    reaction: 'Reaktion',
    special: 'Spezial',
  } as const

  function setResource(id: string, current: number) {
    onUpdate({ classResources: [...saved.filter((entry) => entry.id !== id), { id, current }] })
  }

  function takeRest(kind: 'short' | 'long') {
    onUpdate({
      classResources: resources.map((resource) => {
        const current = saved.find((entry) => entry.id === resource.id)?.current ?? resource.maximum
        const recoverAll =
          kind === 'long' || resource.recovery === 'short-or-long' || resource.recovery === 'short'
        const next = recoverAll
          ? resource.maximum
          : kind === 'short' && resource.recovery === 'short-one-or-long'
            ? Math.min(resource.maximum, current + 1)
            : current
        return { id: resource.id, current: next }
      }),
    })
  }

  return (
    <>
      <PageIntro
        eyebrow={RULESET_LABELS[character.ruleset]}
        title={t('Merkmale & Ressourcen')}
        description={t(
          'Alle Klassen- und Unterklassenmerkmale deines Regelwerks – aktive, passive und zukünftige.',
        )}
      />
      <div className="rest-actions">
        <span>{t('Rast verwalten')}</span>
        <button type="button" className="secondary-button" onClick={() => takeRest('short')}>
          {t('Kurze Rast')}
        </button>
        <button type="button" className="secondary-button" onClick={() => takeRest('long')}>
          {t('Lange Rast')}
        </button>
      </div>
      {resources.length > 0 && (
        <section className="panel">
          <PanelHeader title={t('Klassenressourcen')} meta={t('AUTOMATISCH BERECHNET')} />
          <div className="class-resource-list">
            {resources.map((resource) => {
              const current = Math.min(
                resource.maximum,
                Math.max(
                  0,
                  saved.find((entry) => entry.id === resource.id)?.current ?? resource.maximum,
                ),
              )
              return (
                <div className="class-resource-row" key={resource.id}>
                  <div>
                    <strong>{t(resource.label)}</strong>
                    <small>
                      {t(
                        resource.recovery === 'long'
                          ? 'Erholung bei langer Rast'
                          : resource.recovery === 'short'
                            ? 'Erholung bei kurzer Rast'
                            : resource.recovery === 'short-one-or-long'
                              ? 'Eine Nutzung bei kurzer Rast, alle bei langer Rast'
                              : 'Erholung bei kurzer oder langer Rast',
                      )}
                    </small>
                  </div>
                  <div className="resource-counter">
                    <button
                      type="button"
                      aria-label={t('Ressource verringern')}
                      disabled={current <= 0}
                      onClick={() => setResource(resource.id, current - 1)}
                    >
                      −
                    </button>
                    <strong>
                      {current} / {resource.maximum}
                    </strong>
                    <button
                      type="button"
                      aria-label={t('Ressource erhöhen')}
                      disabled={current >= resource.maximum}
                      onClick={() => setResource(resource.id, current + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="muted-paragraph">
            {t(
              'Der Verbrauch wird gespeichert. Eine kurze Rast stellt je nach Ressource eine oder alle Nutzungen wieder her; eine lange Rast stellt alle wieder her.',
            )}
          </p>
        </section>
      )}
      <section className="panel">
        <PanelHeader
          title={t('Alle Klassen- und Unterklassenmerkmale')}
          meta={`${unlockedCount} / ${features.length} ${t('FREIGESCHALTET')}`}
        />
        {features.length > 0 ? (
          <div className="automatic-feature-list">
            {features.map((feature) => (
              <article
                className={`automatic-feature-row${feature.unlocked ? '' : ' is-locked'}`}
                key={feature.id}
              >
                <div>
                  <strong>
                    {language === 'de' ? (feature.localizedName ?? feature.name) : feature.name}
                  </strong>
                  <small className="automatic-feature-meta">
                    <span className={`automatic-feature-source is-${feature.source}`}>
                      {t(feature.source === 'subclass' ? 'Unterklasse' : 'Klasse')}
                    </span>
                    <span>
                      {t('Stufe')} {feature.level}
                    </span>
                    {feature.contentSourceId && (
                      <span className="automatic-feature-source-book">
                        {getContentSourceAbbreviation(feature.contentSourceId) ?? feature.contentSourceId}
                      </span>
                    )}
                    {feature.activation && (
                      <span className="automatic-feature-activation">
                        {t(activationLabels[feature.activation])}
                      </span>
                    )}
                    {feature.usedFallback && (
                      <span className="language-fallback">{t('EN – englischer Ersatztext')}</span>
                    )}
                  </small>
                  {feature.description && <p className="muted-paragraph">{feature.description}</p>}
                </div>
                <span className={`automatic-feature-badge${feature.unlocked ? '' : ' is-locked'}`}>
                  {feature.unlocked ? t('Freigeschaltet') : `${t('Ab Stufe')} ${feature.level}`}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <p className="muted-paragraph">
            {t('Für diese Klasse und dieses Regelwerk sind noch keine Merkmalsdaten hinterlegt.')}
          </p>
        )}
        <p className="muted-paragraph">
          {t(
            'Auch zukünftige Merkmale werden angezeigt. Gesperrte Merkmale werden erst auf der angegebenen Stufe freigeschaltet.',
          )}
        </p>
      </section>
    </>
  )
}
