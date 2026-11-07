import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Dnd5eRuleset } from '../domain/rules'
import { Button, IconButton } from '../components/ui/button'
import { TextInputField } from '../components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { translate, useLanguage } from './i18n'

export interface CreateCharacterInput {
  name: string
  classId: string
  ruleset: Dnd5eRuleset
  level: number
}

interface CreateCharacterDialogProps {
  busy: boolean
  onClose: () => void
  onCreate: (input: CreateCharacterInput) => Promise<void>
}

export function CreateCharacterDialog({ busy, onClose, onCreate }: CreateCharacterDialogProps) {
  const language = useLanguage()
  const t = (value: string) => translate(language, value)
  const [name, setName] = useState('')
  const [classId, setClassId] = useState('')
  const [ruleset, setRuleset] = useState<Dnd5eRuleset>('2024')
  const [level, setLevel] = useState(1)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !classId.trim()) return

    void onCreate({
      name: name.trim(),
      classId: classId.trim().toLowerCase(),
      ruleset,
      level,
    })
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">{t('NEUES ABENTEUER')}</span>
            <h2 id="create-title">{t('Charakter erstellen')}</h2>
          </div>
          <IconButton label="Schließen" onClick={onClose}>
            <X size={17} />
          </IconButton>
        </div>

        <form onSubmit={submit}>
          <TextInputField label="Charaktername" value={name} onChange={setName} required />
          <TextInputField label="Klasse" value={classId} onChange={setClassId} required />

          <div className="form-row">
            <label className="field-label">
              {t('Regelwerk')}
              <Select value={ruleset} onValueChange={(value) => setRuleset(value as Dnd5eRuleset)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2014">D&D 5e (2014)</SelectItem>
                  <SelectItem value="2024">D&D 5e (2024)</SelectItem>
                </SelectContent>
              </Select>
            </label>
            <TextInputField
              label="Level"
              type="number"
              min="1"
              max="20"
              value={String(level)}
              onChange={(value) => setLevel(Math.min(20, Math.max(1, Number(value) || 1)))}
            />
          </div>

          <p className="modal-hint">
            {t('Du kannst Attribute und weitere Eigenschaften direkt im Charakterbogen ergänzen.')}
          </p>

          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose}>
              {t('Abbrechen')}
            </Button>
            <Button variant="primary" type="submit" disabled={busy}>
              {busy ? t('Speichert …') : t('Charakter speichern')}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
