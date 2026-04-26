<template>
  <a ref="menuItemRef" class="menu__item"
    :class="{ 'menu__item--active': active, 'menu__item--disabled': option.disabled }" href="javascript:void(0)"
    @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
    <span class="menu__item-bg"></span>

    <span class="menu__item-icon">
      <component v-if="option.iconComponent" :is="option.iconComponent" style="width: 30px" />
      <i v-else-if="option.icon" class="bi" :class="'bi-' + option.icon"></i>
    </span>

    <template v-if="!isSidebarOpen ? level !== 1 : true">
      <span ref="labelRef" class="menu__item-label">{{ option.label
      }}</span>
      <slot name="chevron" />
    </template>
    <teleport v-if="tooltip && showTooltip" to="#admin-layout__popup">
      <span class="menu__item-tooltip" :class="{ 'menu__item-tooltip--show': showTooltip }" :style="tooltipStyles">{{
        tooltip
      }}</span>
    </teleport>
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, inject, type Ref, watch } from 'vue'
import type { MenuOption } from '@/types/menuOption.interface'

const props = defineProps({
  option: {
    type: Object as () => MenuOption,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    default: 0,
  },
})

const tooltip = ref<string | undefined>(undefined)
const labelRef = ref<HTMLElement | null>(null)
const menuItemRef = ref<HTMLElement | null>(null)
const showTooltip = ref<boolean>(false)

const isSidebarOpen = inject<Ref<boolean>>('isSidebarOpen')

const checkOverflow = () => {
  if (!isSidebarOpen?.value && props.level === 1) {
    tooltip.value = props.option.label
    return
  }
  const el = labelRef.value as HTMLElement
  if (el.scrollWidth > el.clientWidth) {
    tooltip.value = props.option.label
  }
}

const tooltipStyles = computed(() => {
  return {
    '--top': (menuItemRef.value as HTMLElement)?.getBoundingClientRect().top - ((isSidebarOpen?.value || props.level === 1) ? -2 : 0) + 'px',
    '--left': (menuItemRef.value as HTMLElement)?.getBoundingClientRect().right +
      ((isSidebarOpen?.value || props.level === 1) ? 20 : 17) + 'px',
  }
})

watch(computed(() => isSidebarOpen?.value), () => {
  setTimeout(() => checkOverflow(), 100)
})

onMounted(checkOverflow)
</script>