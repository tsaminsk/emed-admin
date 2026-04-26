<template>
  <div class="c-switch d-flex align-items-center" :class="{ 'c-switch--checked': localValue }">
    <div class="c-switch__wrapper">
      <label class="c-switch__label">
        <input v-model="localValue" type="checkbox" class="c-switch__input">
        <div class="c-switch__slider">
          <i :class="'bi bi-' + positiveIcon" :style="{ opacity: localValue ? 1 : 0 }"></i>
          <i :class="'bi bi-' + negativeIcon" :style="{ opacity: localValue ? 0 : 1 }"></i>
        </div>
      </label>
    </div>
    <div v-if="label" class="c-switch__content">{{ label }}</div>
    <div v-else-if="$slots.default" class="c-switch__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  positiveIcon: {
    type: String,
    default: 'brightness-high-fill', // bootstrap icon name
  },
  negativeIcon: {
    type: String,
    default: 'moon-stars-fill', // bootstrap icon name
  },
  label: {
    type: String,
    default: '',
  },
  negativeLabel: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)

const localValue = computed({
  get: () => modelValue.value,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  }
})

const label = computed(() => {
  if (!props.label) return ''
  return localValue.value && props.label ? props.label : (props.negativeLabel || props.label)
}
)
</script>

<style scoped lang="scss">
.c-switch {
  gap: 12px;

  &__wrapper {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
  }
}

.c-switch__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.c-switch__label {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
  box-shadow: 0 0 2px #ccc;

  &:hover {
    box-shadow: 0 0 6px #ccc;
  }
}

.c-switch__slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  transition: .4s;
  border-radius: 50%;
  color: #ccc;
  font-size: 14px;
  line-height: 1;

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .4s;
  }
}

.c-switch--checked .c-switch__label {
  background-color: #2196F3;
}

.c-switch--checked .c-switch__slider {
  transform: translateX(16px);
  color: #2196F3;
}
</style>