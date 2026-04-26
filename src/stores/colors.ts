import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useColorsStore = defineStore('color', () => {
  const colorVars = reactive(
    new Map([
      ['--color-1-l', { d: '#f4f5fa', v: '', t: 'light', l: 'Background color' }],
      ['--color-1-d', { d: '#010E3F', v: '', t: 'dark', l: 'Background color' }],
      ['--color-2-l', { d: '#010E3F', v: '', t: 'light', l: 'Text color' }],
      ['--color-2-d', { d: '#fff', v: '', t: 'dark', l: 'Text color' }],
      ['--color-3-l', { d: '#fff', v: '', t: 'light', l: 'Text color 2' }],
      ['--color-3-d', { d: '#010E3F', v: '', t: 'dark', l: 'Text color 2' }],
      ['--color-4-l', { d: '#010E3F', v: '', t: 'light', l: 'Logotipe color' }],
      ['--color-4-d', { d: '#fff', v: '', t: 'dark', l: 'Logotipe color' }],
      ['--color-5-l', { d: '#8c57ff', v: '', t: 'light', l: 'Nav icons color' }],
      ['--color-5-d', { d: '#cdd5fa', v: '', t: 'dark', l: 'Nav icons color' }],
      ['--color-6-l', { d: '#7E4EE6', v: '', t: 'light', l: 'Nav icons color hover' }],
      ['--color-6-d', { d: '#cdd5fa', v: '', t: 'dark', l: 'Nav icons color hover' }],
      ['--color-7-l', { d: 'rgb(247, 42, 69)', v: '', t: 'light', l: 'Active color' }],
      ['--color-7-d', { d: 'yellow', v: '', t: 'dark', l: 'Active color' }],
      ['--color-8-l', { d: '#0D6EFD', v: '', t: 'light', l: 'BS Primary color' }],
      ['--color-8-d', { d: '#8c57ff', v: '', t: 'dark', l: 'BS Primary color' }],
    ]),
  )

  const updateColor = (key: string, value: string) => {
    const current = colorVars.get(key)
    if (current) {
      colorVars.set(key, { ...current, v: value })
      document.documentElement.style.setProperty(key, value)
    }
  }

  const resetColor = (key: string) => {
    document.documentElement.style.removeProperty(key)
    const current = colorVars.get(key)
    if (current) {
      colorVars.set(key, { ...current, v: '' })
      document.documentElement.style.removeProperty(key)
    }
  }

  const styles = computed(() => {
    const res = {} as any
    Object.entries(colorVars).forEach(([key, value]: any) => {
      if (value.v) {
        res[key] = value.v
      }
    })
    return res
  })

  return { colorVars, updateColor, resetColor, styles }
})
