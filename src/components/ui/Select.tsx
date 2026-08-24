import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

interface SelectFieldProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options?: SelectOption[]
  groups?: SelectOptionGroup[]
  placeholder?: string
}

function Option({ option }: { option: SelectOption }) {
  return (
    <SelectPrimitive.Item className="select__item" value={option.value} disabled={option.disabled}>
      <span className="select__check">
        <SelectPrimitive.ItemIndicator>
          <Check aria-hidden="true" size={15} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <span className="select__item-text">
        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
        {option.hint && <span className="select__hint">{option.hint}</span>}
      </span>
    </SelectPrimitive.Item>
  )
}

export function SelectField({
  label,
  value,
  onValueChange,
  options,
  groups,
  placeholder,
}: SelectFieldProps) {
  return (
    <div className="select">
      <span className="select__label">{label}</span>
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger className="select__trigger" aria-label={label}>
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="select__arrow">
            <ChevronDown aria-hidden="true" size={16} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="select__content" position="popper" sideOffset={6}>
            <SelectPrimitive.ScrollUpButton className="select__scroll">
              <ChevronDown aria-hidden="true" size={14} style={{ rotate: '180deg' }} />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="select__viewport">
              {options?.map((option) => (
                <Option key={option.value} option={option} />
              ))}
              {groups?.map((group) => (
                <SelectPrimitive.Group key={group.label}>
                  <SelectPrimitive.Label className="select__group-label">
                    {group.label}
                  </SelectPrimitive.Label>
                  {group.options.map((option) => (
                    <Option key={option.value} option={option} />
                  ))}
                </SelectPrimitive.Group>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className="select__scroll">
              <ChevronDown aria-hidden="true" size={14} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
}
