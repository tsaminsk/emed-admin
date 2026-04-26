<template>
  <div v-if="taskbarStore.show" class="taskbar d-flex">
    <div class="task-item  position-relative">
      <div class="task-item__nav task-item--main d-flex align-items-center justify-content-center"
        @click="handleChangeOpenMenu">
        <i class="bi bi-menu-up" style="font-size: 20px"></i>
      </div>

      <div class="taskbar__menu position-absolute p-3" :class="{ 'taskbar__menu--open': openMenu }">
        <div class="taskbar__favorites mb-3">
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-star me-2" style="font-size: 20px"></i>
            <span style="font-size: 20px">Избранное</span>
          </div>
          <div v-if="taskbarStore.favorites?.size > 0" class="taskbar__favorites-list">
            <div v-for="task in taskbarStore.favorites" :key="task[0]"
              class="taskbar__favorites-item position-relative d-flex flex-column p-1"
              @click="goToFavorite(task[1].path as Record<'name', string>)">
              <div class="taskbar__favorites-item_icon">
                <Icon :task="task" class="me-2" />
              </div>
              <div class="taskbar__favorites-item_text text-overflow text-ellipsis">{{ task[1].label }}</div>
              <div class="taskbar__favorites-item_action position-absolute d-flex align-items-center pt-1"
                @click.prevent="(e) => handlerRemove(e, task[0])">
                <i class="bi bi-trash me-2"></i>
              </div>
            </div>
          </div>
          <div v-else class="taskbar__favorites-empty d-flex flex-column justify-content-center align-items-center p-3">
            <i class="bi bi-folder-x"></i>
            <div class="taskbar__favorites-empty_title">Пока ничего нет</div>
            <small>(для добавления клик ПКМ)</small>
          </div>

        </div>
        <div class="taskbar__settings">
          <div class="d-flex align-items-center mb-2">

            <i class="bi bi-gear me-2" style="font-size: 20px"></i>
            <span>Настройки</span>
          </div>

          <CustomSwitch v-model="showTray" positiveIcon="eye" negativeIcon="eye-slash" label="Панель сообщений" />
        </div>
      </div>
    </div>
    <div v-if="taskbarStore.taskbars?.size > 0" class="taskbar__divider"></div>
    <Task v-for="(task, i) in taskbarStore.taskbars" :key="task[0]" :task="task" @mouseover="hovered = task[0]"
      @mouseleave="hovered = null" :hovered="!openMenu && hovered === task[0]"
      @click.left="(e: Event) => handlerClick(task, e)" />
    <div v-if="taskbarStore.showTray" class="taskbar__tray d-flex align-items-center pe-3">
      <div class="taskbar__divider"></div>
      <div class="taskbar__tray-button">
        <Messages />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskbarStore } from '@/stores/taskbar'
import Task from './Task.vue'
import Icon from './Icon.vue'
import CustomSwitch from '@/components/form/CustomSwitch.vue'
import Messages from '@/components/blocks/Messages.vue'
import { useRouter } from 'vue-router'

const taskbarStore = useTaskbarStore()

const handlerClick = (task: Record<string, any>, e: Event) => {
  if ((e.target as HTMLElement).closest('.task-item__popup')) return
  taskbarStore.callBack(task[1])
}

const handlerRemove = (e: Event, id: string) => {
  e.preventDefault()
  e.stopPropagation()
  taskbarStore.removeFavorites(id)
}

const openMenu = ref(false)
const hovered = ref<string | null>(null)

const handleChangeOpenMenu = () => {
  openMenu.value = !openMenu.value

  const handler = (e: Event) => {
    if ((e.target as HTMLElement).closest('.task-item--main')) return

    if (!(e.target as HTMLElement).closest('.taskbar__menu')) {
      document.removeEventListener('click', handler)
      openMenu.value = false
    }
  }

  if (openMenu.value) {
    document.addEventListener('click', handler)
  } else {
    document.removeEventListener('click', handler)
  }
}

const router = useRouter()

const goToFavorite = (path: Record<'name', string>) => {
  if (path) {
    router.push(path)
    openMenu.value = false
  }
}

const showTray = computed({
  get: () => taskbarStore.showTray,
  set: () => taskbarStore.toggleTray()
})
</script>

<style lang="scss">
.taskbar {
  height: 40px;
  background-color: var(--taskbar-bg-color);
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  color: var(--text-color-light);

  &__divider {
    width: 1px;
    height: 30px;
    margin: 5px 20px;
    background-color: var(--text-color-light);
  }

  &__menu {
    z-index: 100;
    top: 0;
    left: 0;
    width: 300px;
    min-height: 300px;
    transform: translateY(110%);
    background-color: #2A2D1F;
    color: var(--taskbar-bg-color);
    opacity: 0;
    transition: all 0.3s ease-in-out;

    &--open {
      transform: translateY(calc(-100% - 1px));
      opacity: 1;
      color: var(--text-color-light);
    }
  }

  &__favorites-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px
  }

  &__favorites-item {
    width: 120px;
    height: 90px;
    cursor: pointer;
    font-size: 12px;
    background-color: #3d4133;

    &:hover .taskbar__favorites-item_action {
      opacity: 1;
    }
  }

  &__favorites-item_icon {
    flex: 1;
    padding: 18px 0 0;
    margin: 0 auto;
  }

  &__favorites-item_text {
    height: 18px;
    text-align: center;
  }

  &__favorites-item_action {
    z-index: 100;
    top: 0px;
    right: 0px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &__favorites-empty {

    i {
      font-size: 40px;
    }

    &_title {
      font-size: 20px;
    }
  }

  &__tray {
    margin-left: auto;
  }
}
</style>