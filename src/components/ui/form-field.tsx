import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { translate, useLanguage } from '../../app/i18n'

interface TextInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label: string
  value: string
  onChange: (value: string) => void
}

export function TextInputField({
  label,
  value,
  onChange,
  type = 'text',
  ...props
}: TextInputFieldProps) {
  const language = useLanguage()

  return (
    <label className="field-label">
      {translate(language, label)}
      <input
        {...props}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  label: string
  value: string
  onChange: (value: string) => void
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  ...props
}: TextAreaFieldProps) {
  const language = useLanguage()

  return (
    <label className="field-label">
      {translate(language, label)}
      <textarea
        {...props}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
