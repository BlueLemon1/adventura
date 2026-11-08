export function getHigherLevelText(
  englishText: string | undefined,
  localizedText: string | undefined,
  language: 'de' | 'en',
): string | undefined {
  return language === 'de' ? localizedText?.trim() || englishText : englishText
}

interface SpellHigherLevelProps {
  text?: string
  label: string
}

export function SpellHigherLevel({ text, label }: SpellHigherLevelProps) {
  if (!text?.trim()) return null

  return (
    <div className="spell-higher-level">
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  )
}
