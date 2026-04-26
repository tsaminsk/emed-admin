<template>
  <div ref="adminLayout" class="admin-layout" :class="{ 'admin-layout--sidebar-open': isSidebarOpen }"
    :style="colorsStore.styles">
    <div class="admin-layout__header d-flex justify-content-between">
      <div class="admin-layout__header-left d-flex justify-content-end align-items-center">
        <div class="admin-layout__logo" :style="{ opacity: isSidebarOpen ? 1 : 0 }">eMED</div>
        <a href="javascript:void(0)" class="admin-layout__nav p-2" @click="toggleSidebar">
          <i class="bi bi-list" :style="{ opacity: isSidebarOpen ? 0 : 1 }"></i>
          <i class="bi bi-chevron-left" :style="{ opacity: isSidebarOpen ? 1 : 0 }"></i>
        </a>
      </div>
      <div class="admin-layout__header-main d-flex justify-content-between align-items-center gap-2">
        <div class="admin-layout__user-status" :class="`admin-layout__user-status--${!mute ? 'online' : 'offline'}`">{{
          !mute ? 'Online' : 'Offline' }}</div>
        <div class="admin-layout__name ms-auto">ОАО "Рога и копыта" Тестовая среда</div>
        <a href="javascript:void(0)" class="admin-layout__icon-link" @click="mute = !mute">
          <i :class="`bi bi-volume-${mute ? 'mute' : 'off'}`" style="font-size: 30px;"></i>
        </a>
        <MessagesPopover />
      </div>
      <div class="admin-layout__header-right">
        <UserDropdown />
      </div>
    </div>
    <div class="admin-layout__main">
      <div class="admin-layout__sidebar">
        <div class="admin-layout__menu custom-scroll">
          <Menu :options="menuOptions" :key="menuOptionsKey" />
        </div>
        <div class="admin-layout__sidebar-footer d-flex justify-content-center align-items-center">
          <Tools />
        </div>
      </div>
      <div class="admin-layout__body">
        <div class="admin-layout__content" :style="contentTransitionStyles">
          <slot />
        </div>
        <div class="admin-layout__footer d-flex justify-content-between align-items-center px-2">
          <div class="admin-layout__footer-copy">© {{ new Date().getFullYear() }} <a href="https://mapsoft.by"
              target="_blank">mapsoft.by</a></div>
          <div class="admin-layout__footer-version">Демо: версия: 0.0.1</div>
        </div>
      </div>
    </div>
    <Taskbar />
    <div class="admin-layout__popup" id="admin-layout__popup"></div>
    <div :class="`offcanvas offcanvas-${drawerData.position}`" tabindex="-1" id="drawer"
      :style="{ '--drawer-width': `${drawerData.width}px` }">
      <div class="offcanvas-header">
        <h5 v-if="drawerData.showTitle" class="offcanvas-title">{{ drawerData.title }}</h5>
        <button type="button" class="btn-close" :class="{ 'btn-close-white': colorScheme === 'dark' }"
          @click="(drawerData.offcanvas as any)?.hide()"></button>
      </div>
      <div class="offcanvas-body" id="drawer-body" v-html="drawerData.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, computed, reactive } from 'vue'
import Tools from '@/components/blocks/Tools.vue'
import Menu from '@/components/menu/index.vue'
import type { MenuOption } from '@/types/menuOption.interface'
import { useMenuStore } from '@/stores/menu'
import loadArticles from '@/utils/loadArticles'
import { useRouter } from 'vue-router'
import UserDropdown from '@/components/blocks/UserDropdown.vue'
import MessagesPopover from '@/components/blocks/MessagesPopover.vue'
import Taskbar from '@/components/blocks/taskbar/index.vue'
import { useColorsStore } from '@/stores/colors'

const props = defineProps({
  taskbar: {
    type: Boolean,
    default: true,
  },
})


const colorsStore = useColorsStore()

const isSidebarOpen = ref(true)
const mute = ref(false)

provide('isSidebarOpen', isSidebarOpen)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const menuOptionsKey = ref(0)

loadArticles((newArticles: any[]) => {
  menuStore.updateMenuOptions(newArticles)
  menuOptionsKey.value++
})

const menuStore = useMenuStore()
const menuOptions = computed<MenuOption[]>(() => menuStore.menuOptions)

const adminLayout = ref<HTMLElement | null>(null)

const colorScheme = ref<string>('light')
const changeColorScheme = (newColorScheme: string) => {
  colorScheme.value = newColorScheme
  if (adminLayout.value) {
    adminLayout.value.style.setProperty('color-scheme', newColorScheme)
  }
  localStorage.setItem('color-scheme', newColorScheme)
}

provide('colorScheme', computed(() => colorScheme.value))
provide('changeColorScheme', changeColorScheme)

const isVisible = ref(true)

const contentTransitionStyles = computed(() => ({
  opacity: isVisible.value ? 1 : 0,
  filter: isVisible.value ? 'blur(0px)' : 'blur(8px)',
}))

const router = useRouter()
router.beforeEach(async (to, from) => {
  isVisible.value = false
  await new Promise((resolve) => setTimeout(resolve, 250))
  isVisible.value = true
})

const drawerData = reactive({
  showTitle: true,
  title: 'Заголовок',
  content: '<p>Здесь может быть ваше меню или любой другой контент.</p>',
  position: 'end',
  drawer: '',
  offcanvas: null,
  width: 450,
})

provide('drawerData', drawerData)

onMounted(() => {
  colorScheme.value = localStorage.getItem('color-scheme') || 'light'
  if (adminLayout.value) {
    adminLayout.value.style.setProperty('color-scheme', colorScheme.value)
  }
  drawerData.drawer = document.getElementById('drawer') as any
  drawerData.offcanvas = new (window as any).bootstrap.Offcanvas(drawerData.drawer)
})
</script>