import { useEffect, useState } from 'react'
import type { Language } from './i18n'

type Theme = 'dark' | 'light'

export function useAppPreferences() {
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem('adventura-language') === 'en' ? 'en' : 'de',
  )
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('adventura-theme') === 'light' ? 'light' : 'dark',
  )

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.theme = theme
    localStorage.setItem('adventura-language', language)
    localStorage.setItem('adventura-theme', theme)
  }, [language, theme])

  return { language, setLanguage, theme, setTheme }
}
