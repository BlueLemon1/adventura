import type { ReactNode } from 'react'

interface PanelHeaderProps {
  title: string
  description?: ReactNode
  meta?: ReactNode
  className?: string
}

/** Standard heading for panels across the application. */
export function PanelHeader({ title, description, meta, className = '' }: PanelHeaderProps) {
  return (
    <div className={`panel-heading ${className}`.trim()}>
      <div>
        <h2>{title}</h2>
        {description && <p className="muted-paragraph">{description}</p>}
      </div>
      {meta && <span>{meta}</span>}
    </div>
  )
}
