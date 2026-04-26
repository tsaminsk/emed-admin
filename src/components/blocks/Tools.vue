<template>
  <div class="tools">
    <a href="javascript:void(0)" class="messages__link admin-layout__icon-link" data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample">
      <i class="bi bi-tools" style="font-size: 24px;"></i>
    </a>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
      :style="{ '--drawer-width': `${width}px` }">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Настройки</h5>
        <button type="button" class="btn-close" :class="{ 'btn-close-white': defaultColorScheme === 'dark' }"
          data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body tools__body d-flex flex-column">
        <div class="tools__item">
          <CustomSwitch v-model:modelValue="colorScheme" positiveIcon="brightness-high-fill"
            negativeIcon="moon-stars-fill">
            <span>Изменить тему</span>
          </CustomSwitch>
        </div>
        <div class="tools__item">
          <CustomSwitch v-model:modelValue="taskbarStore.show" positiveIcon="window-plus" negativeIcon="window-dash">
            <span>Панель задач</span>
          </CustomSwitch>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, type ComputedRef } from 'vue'
import CustomSwitch from '@/components/form/CustomSwitch.vue'
import { useTaskbarStore } from '@/stores/taskbar'

const taskbarStore = useTaskbarStore()

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
const width = ref(400)

</script>

<style lang="scss" scoped>
.tools {

  &__body {
    gap: 12px;
  }
}
</style>
