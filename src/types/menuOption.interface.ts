import type { Component } from 'vue'

export interface MenuOption {
  id: string
  label: string
  icon: string
  path?: string | Record<string, any>
  tooltip?: string
  iconComponent?: Component | null
  disabled?: boolean
  children?: MenuOption[]
}
