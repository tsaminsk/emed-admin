<template>
  <div class="container">
    <h1>Menu Settings</h1>
    <hr>
    <div class="d-flex">
      <CustomSwitch v-model:modelValue="colorScheme" positiveIcon="brightness-high-fill" negativeIcon="moon-stars-fill">
        <span>Change theme</span>
      </CustomSwitch>
    </div>
    <hr>
    <div class="d-flex flex-column" style="gap: 10px; max-width: 450px">
      <template v-for="item in colorsStore.colorVars" :key="item[0]">
        <ColorPicker v-if="item[1].t === defaultColorScheme" :name="item[0]">{{ item[1].l }} ({{ item[1].t }})
        </ColorPicker>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue'
import CustomSwitch from '@/components/form/CustomSwitch.vue'
import { useColorsStore } from '@/stores/colors'
import ColorPicker from '@/components/form/ColorPicker.vue'

const colorsStore = useColorsStore()

const changeColorScheme = inject('changeColorScheme') as (colorScheme: string) => void

const defaultColorScheme = inject('colorScheme') as ComputedRef<string>

const colorScheme = computed({
  get: () => {
    return defaultColorScheme.value === 'light'
  },
  set: (value: boolean) => {
    changeColorScheme(value ? 'light' : 'dark')
  }
})
</script>