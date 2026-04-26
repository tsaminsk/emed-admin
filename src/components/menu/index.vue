<template>
  <div class="menu">
    <template v-for="optionL1 in localOptions" :key="optionL1.label">
      <Label :option="optionL1" :active="active === optionL1.id" :class="{ 'menu__item--small': !isSidebarOpen }"
        :level="1" :data-id="optionL1.id" @click="onClick(optionL1)" @mouseenter="onMouseEnter(optionL1)"
        @mouseleave="(e: Event) => onMouseLeave(optionL1, e)">
        <template #chevron>
          <i v-if="optionL1.children?.length" class="menu__item-chevron ms-auto bi"
            :class="getCurrentOpen(optionL1) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
        </template>
      </Label>
      <div v-if="optionL1?.children?.length" class="menu__children"
        :class="{ 'menu__submenu': !isSidebarOpen, 'menu__submenu--open': !isSidebarOpen && openSubmenu === optionL1.id }"
        :style="{ 'max-height': !isSidebarOpen ? 'none' : (getCurrentOpen(optionL1) ? `${optionL1.children.length * 52 + (optionL1.children.find(child => getCurrentOpen(child))?.children?.length ?? 0) * 52 + 50}px` : '0') }">
        <template v-for="optionL2 in optionL1.children" :key="optionL2.label + ' ' + String(openSubmenu)">
          <Label :option="optionL2" :active="active === optionL2.id" :level="2" @click="onClick(optionL2)">
            <template #chevron>
              <i v-if="optionL2.children?.length" class="menu__item-icon ms-auto bi"
                :class="getCurrentOpen(optionL2) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </template>
          </Label>
          <div v-if="optionL2?.children?.length" class="menu__children"
            :style="{ 'max-height': getCurrentOpen(optionL2) ? `${optionL2.children.length * 52 + 100}px` : '0' }">
            <template v-for="optionL3 in optionL2.children" :key="optionL3.label">
              <Label :option="optionL3" :active="active === optionL3.id" :level="3" @click="onClick(optionL3)">
                <template #chevron>
                  <i v-if="optionL3.children?.length" class="menu__item-icon ms-auto bi"
                    :class="getCurrentOpen(optionL3) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                </template>
              </Label>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onBeforeUnmount, type Ref, onMounted, watch } from 'vue'
import type { MenuOption } from '@/types/menuOption.interface'
import Label from './Label.vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router';
import { useTaskbarStore } from '@/stores/taskbar'

const route = useRoute()

const props = defineProps({
  options: {
    type: Array<MenuOption>,
    default: () => [],
  },
})

const localOptions = ref<MenuOption[]>(props.options)

const isSidebarOpen = inject<Ref<boolean>>('isSidebarOpen')

const open = ref<string | null>((route.name ?? null) as string)
const openSubmenu = ref<string | null>(null)
const submenuHover = ref<string | null>(null)
const active = ref<string | null>((route.name ?? null) as string)

if (route.name === 'article') {
  active.value = route.params.article as string
  open.value = 'article'
}

const getCurrentOpen = computed(() => (option: MenuOption): boolean => {
  return !!(open.value === option.id || option.children?.some(child => getCurrentOpen.value(child)))
})

const currentOption: Ref<MenuOption | null> = ref(null)

const taskbarStore = useTaskbarStore()

taskbarStore.loadFavorites(localOptions.value)

const router = useRouter()
const onClick = (option: MenuOption) => {
  if (option.disabled) return

  if (!option.children?.length) {
    active.value = option.id
    open.value = option.id

    if (currentOption.value) {
      taskbarStore.updateTaskbars(currentOption.value)
      currentOption.value = option
    }

    router.push(option.path as string | Record<string, any>)
    if (!isSidebarOpen?.value && openSubmenu.value) {
      openSubmenu.value = null
    }
    return
  }

  if (open.value === option.id) {
    if (localOptions.value.find((op) => op.id === option.id)) {
      open.value = null
    } else {
      const parent = localOptions.value.find((op) => op?.children?.some((child) => child.id === option.id))
      if (parent) {
        open.value = parent.id
      }
    }
    return
  }

  if (!isSidebarOpen?.value && openSubmenu.value === option.id) {
    openSubmenu.value = null
    return
  }

  if (getCurrentOpen.value(option)) {
    open.value = null
  }
  else if (!isSidebarOpen?.value && !openSubmenu.value) {
    openSubmenu.value = option.id
    setTimeout(() => {
      document.body.addEventListener('click', handler)
    }, 50);
  } else if (!isSidebarOpen?.value && openSubmenu.value) {
    open.value = option.id
  }
  else open.value = option.id
}

taskbarStore.updateCallback(onClick)

const handler = (e: MouseEvent) => {
  if (openSubmenu.value && (e.target as HTMLElement).closest('.menu__submenu')) return

  openSubmenu.value = null
  open.value = null
  document.body.removeEventListener('click', handler)

  const menuItem = (e.target as HTMLElement).closest('.menu__item--small')
  if (menuItem) {
    const openValue = (menuItem as HTMLElement).dataset.id as string
    const current = openValue && localOptions.value.find((op) => op.id === openValue) as MenuOption
    if (current) {
      onClick(current)
    }
  }
}

const timerId = ref<number | undefined>()

const onMouseEnter = (option: MenuOption) => {
  if (isSidebarOpen?.value && true) return
  // if (timerId.value) {
  //   clearInterval(timerId.value)
  //   timerId.value = undefined
  // }
  // openSubmenu.value = option.id
}

const onMouseLeave = (option: MenuOption, e: Event) => {
  if (isSidebarOpen?.value || openSubmenu.value !== option.id || true) return
  // const submenu = (e.currentTarget as HTMLElement)?.nextElementSibling
  // if (submenu) {
  //   timerId.value = setInterval(() => {
  //     if (!submenu?.matches(':hover')) {
  //       openSubmenu.value = null
  //       open.value = null
  //       clearInterval(timerId.value)
  //       timerId.value = undefined
  //     }
  //   }, 2000)
  // }
}

const searchCurrentOption = (list: MenuOption[]) => {
  if (currentOption.value) return
  list.forEach((op: MenuOption) => {
    if (currentOption.value) return
    if (op.id === router.currentRoute.value?.name) {
      if (op.id !== 'article') {
        currentOption.value = op
      } else {
        op.children?.forEach((ch) => {
          if (!currentOption.value && ch.id === router.currentRoute.value?.params.article) {
            currentOption.value = ch
          }
        })
      }
    } else if (op.children) {
      searchCurrentOption(op.children)
    }
  })
}

// если переход по ссылке а не из меню
watch(route, (n: Record<string, any>) => {
  if (active.value !== n.name) {
    currentOption.value = null
    active.value = null
    open.value = null
    searchCurrentOption(localOptions.value)
    if (currentOption.value) {
      active.value = n.name as string
      open.value = n.name as string
    }
  }
})

onMounted(() => {
  searchCurrentOption(localOptions.value)
})

onBeforeUnmount(() => {
  if (timerId.value) {
    clearInterval(timerId.value)
    timerId.value = undefined
  }
})
</script>