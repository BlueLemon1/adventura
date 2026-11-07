import type { ReactNode } from 'react'

export interface SegmentedTabItem<Value extends string> {
  value: Value
  label: string
  icon?: ReactNode
  count?: number
}

interface SegmentedTabsProps<Value extends string> {
  value: Value
  items: SegmentedTabItem<Value>[]
  onChange: (value: Value) => void
  ariaLabel: string
}

export function SegmentedTabs<Value extends string>({
  value,
  items,
  onChange,
  ariaLabel,
}: SegmentedTabsProps<Value>) {
  return (
    <div className="segmented-tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={value === item.value}
          className={value === item.value ? 'active' : ''}
          onClick={() => onChange(item.value)}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.count !== undefined && <small>{item.count}</small>}
        </button>
      ))}
    </div>
  )
}
