import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import type { ReactNode } from 'react'

export function Select({ value, defaultValue, onValueChange, children, ariaLabel, disabled }: {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  ariaLabel?: string
  disabled?: boolean
}) {
  return <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled}>
    {children}
    <span className="sr-only" aria-live="polite">{ariaLabel}</span>
  </SelectPrimitive.Root>
}

export function SelectTrigger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <SelectPrimitive.Trigger className={`ui-select-trigger ${className}`} aria-label="Auswahl öffnen">
    {children}<SelectPrimitive.Icon asChild><ChevronDown size={14} className="ui-select-chevron" /></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <SelectPrimitive.Value placeholder={placeholder} />
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <SelectPrimitive.Portal>
    <SelectPrimitive.Content className="ui-select-content" position="popper" sideOffset={6} collisionPadding={10}>
      <SelectPrimitive.ScrollUpButton className="ui-select-scroll-button"><ChevronUp size={14}/></SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="ui-select-viewport">{children}</SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="ui-select-scroll-button"><ChevronDown size={14}/></SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
}

export function SelectItem({ value, children, disabled }: { value: string; children: ReactNode; disabled?: boolean }) {
  return <SelectPrimitive.Item value={value} disabled={disabled} className="ui-select-item">
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator><Check size={14}/></SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
}
