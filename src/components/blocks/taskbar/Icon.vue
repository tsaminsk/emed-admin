<template>
  <component v-if="task[1].iconComponent" :is="task[1].iconComponent" :style="`width: ${props.width}px`" />
  <i v-else :class="`bi bi-${task[1].icon}`" :style="`font-size: ${$props.fontSize}px`"></i>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    default: false,
  },
  width: {
    type: Number,
    default: 26,
  },
  fontSize: {
    type: Number,
    default: 24,
  }
})
</script>