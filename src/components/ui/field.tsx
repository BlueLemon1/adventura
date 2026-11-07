import type { InputHTMLAttributes, ReactNode } from 'react'

interface FieldProps {
  label: string
  htmlFor?: string
  children: ReactNode
  className?: string
}

/** Consistent label/layout wrapper for form controls. */
export function Field({ label, htmlFor, children, className = '' }: FieldProps) {
  return (
    <label className={`field-label ${className}`.trim()} htmlFor={htmlFor}>
      {label}
      {children}
    </label>
  )
}

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
}

/** Shared search input used by catalogs and lists. */
export function SearchField({ icon, className = '', ...props }: SearchFieldProps) {
  return (
    <label className={`search-field ${className}`.trim()}>
      {icon}
      <input type="search" {...props} />
    </label>
  )
}
