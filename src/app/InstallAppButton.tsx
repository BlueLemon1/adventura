import { useEffect, useState } from 'react'
import { AppWindow } from 'lucide-react'
import { IconButton } from '../components/ui/button'
import { translate, useLanguage } from './i18n'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function InstallAppButton() {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const displayMode = window.matchMedia('(display-mode: standalone)')
    if (displayMode.matches) setInstalled(true)

    const handleDisplayModeChange = (event: MediaQueryListEvent) => {
      setInstalled(event.matches)
    }
    const handlePrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }
    const handleInstalled = () => {
      setInstalled(true)
      setInstallPrompt(null)
    }

    displayMode.addEventListener('change', handleDisplayModeChange)
    window.addEventListener('beforeinstallprompt', handlePrompt)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      displayMode.removeEventListener('change', handleDisplayModeChange)
      window.removeEventListener('beforeinstallprompt', handlePrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  async function install() {
    if (!installPrompt) {
      window.alert(
        t(
          'Installation: Öffne das Browsermenü. In Chrome oder Edge wählst du „App installieren“ oder „Seite als App installieren“. Auf iPhone/iPad: Teilen → Zum Home-Bildschirm.',
        ),
      )
      return
    }

    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    setInstallPrompt(null)
    if (choice.outcome === 'accepted') setInstalled(true)
  }

  if (installed) return null

  return (
    <IconButton
      className="install-app-button"
      label={t('Adventura als App installieren')}
      title={t('Adventura als App installieren')}
      onClick={() => void install()}
    >
      <AppWindow size={16} />
    </IconButton>
  )
}
