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
