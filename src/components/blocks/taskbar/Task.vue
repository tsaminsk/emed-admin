<template>
  <div class="task-item position-relative" :data-name="String($route.name) + ' / ' + $route.meta.label"
    :class="{ 'task-item--active': $route.name !== 'article' ? $route.name === props.task[0] : $route.params.article === task[1].id }"
    @click.right.prevent="handlerRightClick">
    <div class="task-item__nav d-flex align-items-center justify-content-center">
      <Icon :task="props.task" />
    </div>
    <div v-if="showTitle" class="task-item__popup position-absolute p-2 pe-2">
      <div class="task-item__popup-title d-flex">
        <Icon :task="props.task" :width="12" :font-size="11" class="me-2" />
        <span>{{ task[1].label }}</span>
      </div>
    </div>
    <div v-if="showActions" class="task-item__popup position-absolute p-2 pe-2">
      <div class="task-item__action d-flex align-items-center pb-2" @click="toggleFavorites">
        <i :class="`bi bi-${!isFavorite ? 'star' : 'trash'}`"></i>
        <span>{{ isFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }}</span>
      </div>
      <div class="task-item__action d-flex align-items-center pb-2" @click="taskbarStore.remove(props.task[0])">
        <i class="bi bi-x-lg"></i>
        <span>Закрыть</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import Icon from './Icon.vue'
import { useTaskbarStore } from '@/stores/taskbar'

const props = defineProps({
  task: {
    type: Object,
    default: false,
  },
  hovered: {
    type: Boolean,
    default: false
  },
})

const taskbarStore = useTaskbarStore()

const isFavorite = computed(() => taskbarStore.favorites.has(props.task[0]))
const isHovered = computed(() => props.hovered)

const showTitle = ref(false)
const showActions = ref(false)

const timerId = ref<number | null>(null)
watch(isHovered, (v) => {
  if (v) {
    if (showTitle.value) return
    timerId.value = setTimeout(() => {
      showTitle.value = true
      clearTimeout(timerId.value as number)
      timerId.value = null
    }, 300);
  } else {
    showTitle.value = false
    showActions.value = false
    if (timerId.value) {
      clearTimeout(timerId.value as number)
      timerId.value = null
    }
  }
})

const handlerRightClick = () => {
  if (!isHovered.value) return
  showActions.value = !showActions.value
  if (showActions.value && showTitle.value) {
    showTitle.value = false
  }
}

const toggleFavorites = () => {
  if (isFavorite.value) {
    taskbarStore.removeFavorites(props.task[0])
  } else {
    taskbarStore.updateFavorites(props.task[1])
  }
  showActions.value = false
}

</script>

<style lang="scss">
.task-item {
  height: 100%;
  width: 40px;

  &--active .task-item__nav {
    color: var(--active-color);
    background-color: #3d4133;
    border-bottom: 2px solid rgb(103, 103, 247);
  }

  &__nav {
    height: 100%;
    width: 100%;
    background-color: #2A2D1F;
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out, ;
    border-bottom: 2px solid #2A2D1F;

    &:hover {
      background-color: #3d4133;
      border-bottom: 2px solid #3d4133;
    }
  }

  &__popup {
    z-index: 50;
    bottom: 100%;
    left: 50%;
    min-width: 140px;
    max-width: 180px;
    transform: translateX(-50%);
    background-color: var(--taskbar-bg-color);
    color: var(--text-color-light);
    border-radius: 4px 4px 0 0;
  }

  &__popup-title {
    font-size: 12px;
  }

  &__action {
    font-size: 12px;
    gap: 8px;
    cursor: pointer;

    >span {
      word-wrap: none;
      white-space: nowrap;
    }
  }
}
</style>