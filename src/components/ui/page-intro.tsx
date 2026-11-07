import type { ReactNode } from 'react'

interface PageIntroProps {
  eyebrow: ReactNode
  title: ReactNode
  description: ReactNode
  trailing?: ReactNode
}

export function PageIntro({ eyebrow, title, description, trailing }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="intro">{description}</p>
      </div>
      {trailing}
    </section>
  )
}
