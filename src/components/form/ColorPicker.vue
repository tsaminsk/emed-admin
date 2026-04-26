<template>
  <div class="color-picker d-flex align-items-center py-1 px-2">
    <input type="color" class="form-control form-control-color me-2" :id="`color-picker${props.name}`" :value="color"
      :title="props.title" @input="(e: any) => colorsStore.updateColor(props.name as string, e.target.value)">
    <label :for="`color-picker${name}`" class="color-picker__label me-2">
      <slot />
    </label>
    <a href="#" class="color-picker__reset ms-auto" :class="{ disabled }"
      @click.prevent="colorsStore.resetColor(props.name as string)">
      <i class="bi bi-x-square"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColorsStore } from '@/stores/colors'

const props = defineProps({
  name: {
    type: String,
    Default: '--color-1-d',
  },
  title: {
    type: String,
    default: ''
  }
})

const colorsStore = useColorsStore()

const color = computed(() => {
  return colorsStore.colorVars.get(props.name as any)?.v || colorsStore.colorVars.get(props.name as any)?.d
})

const disabled = computed(() => {
  return !colorsStore.colorVars.get(props.name as any)?.v
})
</script>

<style lang="scss" scoped>
.color-picker {
  border: 1px solid #eee;

  &__reset.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
