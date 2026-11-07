import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'primary-button',
  secondary: 'secondary-button',
  icon: 'icon-button',
}

/** Shared button wrapper; existing CSS classes keep the visual language consistent. */
export function Button({
  variant = 'secondary',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
}

/** Icon-only actions always get an accessible name. */
export function IconButton({ label, className = '', children, type = 'button', ...props }: IconButtonProps) {
  return (
    <Button
      {...props}
      type={type}
      variant="icon"
      className={className}
      aria-label={label}
    >
      {children}
    </Button>
  )
}
