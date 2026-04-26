<template>
  <div class="form-input" :class="formInputClass">
    <div class="form-input__body">
      <div v-if="props.prefixIcon || $slots.prefix" ref="prefix" class="form-input__prefix">
        <i v-if="props.prefixIcon" :class="`bi bi-${props.prefixIcon}`"></i>
        <slot v-if="$slots.prefix" name="prefix"></slot>
      </div>
      <div class="form-input__main">
        <input v-model="localValue" :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
          :name="name" :placeholder="placeholder" class="form-input__input" :id="name"
          :aria-describedby="ariaDescribedby ?? name + 'Help'" @input="updateValue" @focus="onFocus" @blur="onBlur">
        <label :for="name" class="form-input__label">{{ label }}</label>
      </div>
      <div v-show="props.clearable && localValue" class="form-input__clearable" @mousedown.prevent="clearValue">
        <i class="bi bi-x-circle-fill"></i>
      </div>
      <div v-if="props.type === 'password' && localValue" class="form-input__show-password"
        @mousedown.prevent="togglePassword">
        <i :class="`bi bi-eye${showPassword ? '-slash' : ''}-fill`"></i>
      </div>
      <div v-if="props.suffixIcon || $slots.suffix" class="form-input__suffix">
        <i v-if="props.suffixIcon" :class="`bi bi-${props.suffixIcon}`"></i>
        <slot v-if="$slots.suffix" name="suffix"></slot>
      </div>
    </div>
    <div v-if="hintText" class="form-input__hint">
      {{ hintText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  type: {
    type: String,
    default: 'text',
    validator: (v: string) => ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'month', 'week'].includes(v)
  },
  name: {
    type: String,
    default: 'input'
  },
  placeholder: {
    type: String,
    default: 'Enter value'
  },
  ariaDescribedby: String,
  value: {
    type: String,
    default: ''
  },
  hintText: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: undefined,
    validator: (v: string) => ['success', 'error', 'warning', 'info'].includes(v)
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const { status, hintText } = toRefs(props)
const localValue = ref(props.value)

const focus = ref(false)

const emit = defineEmits(['update:value', 'focus', 'blur'])
const clearValue = () => {
  localValue.value = ''
  updateValue()
}

const updateValue = () => {
  emit('update:value', localValue.value)
}

const formInputClass = computed(() => {
  return [
    status?.value ? `form-input--${status.value}` : '',
    focus.value ? 'form-input--focus' : '',
    localValue.value && !focus.value ? 'form-input--filled' : ''
  ]
})

const onFocus = () => {
  focus.value = true
  emit('focus')
}

const onBlur = () => {
  focus.value = false
  emit('blur')
}

const prefix = ref<HTMLDivElement | null>(null)

const prefixWidth = computed(() => {
  if (prefix.value?.offsetWidth) {
    return prefix.value.offsetWidth + 'px'
  }
  return '8px'
})

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value

  if (showPassword.value) {
    const timerId = setTimeout(() => {
      showPassword.value = false
      clearTimeout(timerId)
    }, 2000)
  }
}
</script>

<style scoped lang="scss">
.form-input {
  width: 100%;
  --carent-color: #ccc;
  --carent-shadow: none;

  .form-input__input::placeholder {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  &--focus:not(.form-input--error),
  &--focus:not(.form-input--success),
  &--focus:not(.form-input--warning),
  &--focus:not(.form-input--info) {
    --carent-color: #8c57ff;
    --carent-shadow: 0 0 0 2px rgba(140, 87, 255, 0.25);
  }

  &--error,
  &--error.form-input--focus {
    --carent-color: #ea5455;
    --carent-shadow: 0 0 0 2px rgba(234, 84, 85, 0.25);
  }

  &--success,
  &--success.form-input--focus {
    --carent-color: #28c76f;
    --carent-shadow: 0 0 0 2px rgba(40, 199, 111, 0.25);
  }

  &--warning,
  &--warning.form-input--focus {
    --carent-color: #ff9f43;
    --carent-shadow: 0 0 0 2px rgba(255, 159, 67, 0.25);
  }

  &--info,
  &--info.form-input--focus {
    --carent-color: #00cfe8;
    --carent-shadow: 0 0 0 2px rgba(0, 207, 232, 0.25);
  }

  &--focus,
  &--error.form-input--filled,
  &--success.form-input--filled,
  &--warning.form-input--filled,
  &--info.form-input--filled,
  &.form-input--filled {
    .form-input__label {
      top: 0;
      left: 8px;
      transform: translateY(-50%);
    }

    .form-input__input::placeholder {
      opacity: 1;
    }
  }

  &__body {
    width: 100%;
    position: relative;
    display: flex;
    gap: 0;
    border: 1px solid var(--carent-color);
    box-shadow: var(--carent-shadow);
    border-radius: 0.25rem;
  }

  &__main {
    flex: 1;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    color: var(--carent-color);
  }

  &__input {
    width: 100%;
    padding: 0.5rem 0.25rem;
    border: none;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
    }
  }

  &__label {
    position: absolute;
    top: 14px;
    left: v-bind(prefixWidth);
    background-color: #fff;
    padding: 0 0.5rem;
    color: #6D6777;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
  }

  &:not(.form-input--focus) .form-input__clearable {
    display: none;
  }

  &__clearable {
    padding: 0.65rem 0.5rem 0.25rem 0.25rem;
    font-size: 0.8rem;
  }

  &__show-password {
    padding: 0.3rem 0.5rem 0.3rem 0.25rem;
    font-size: 1.2rem;
  }

  &__clearable,
  &__show-password {
    color: #c4c0c0;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #666;
    }
  }

  &__hint {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--carent-color);
  }
}
</style>