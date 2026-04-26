import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { MenuOption } from '@/types/menuOption.interface'

const STORAGE_KEY = 'favorite-ids'

const loadIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

const saveIds = (favorites: Map<string, MenuOption>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites.keys()]))
}

const findOption = (list: MenuOption[], id: string): MenuOption | null => {
  for (const op of list) {
    if (op.id === id) return op
    if (op.children) {
      const found = findOption(op.children, id)
      if (found) return found
    }
  }
  return null
}

export const useTaskbarStore = defineStore('taskbar', () => {
  const taskbars = reactive(new Map<string, MenuOption>())
  const favorites = reactive(new Map<string, MenuOption>())
  const show = ref(true)

  // Вызывается из menu/index.vue после того, как menuOptions готовы
  const loadFavorites = (menuOptions: MenuOption[]) => {
    favorites.clear()
    for (const id of loadIds()) {
      const option = findOption(menuOptions, id)
      if (option) favorites.set(id, option)
    }
  }

  const updateTaskbars = (v: MenuOption) => {
    taskbars.set(v.id, v)
  }

  const updateFavorites = (v: MenuOption) => {
    if (!favorites.has(v.id)) {
      favorites.set(v.id, v)
      saveIds(favorites) // в localStorage только массив id
    }
  }

  const removeFavorites = (id: string) => {
    if (favorites.has(id)) {
      favorites.delete(id)
      saveIds(favorites)
    }
  }

  const removeFavorite = (id: string) => {
    favorites.delete(id)
    saveIds(favorites)
  }

  const remove = (id: string) => {
    taskbars.delete(id)
  }

  const callBack = ref<Function>(() => {})
  const updateCallback = (f: Function) => (callBack.value = f)

  const showTray = ref(true)
  const toggleTray = () => {
    showTray.value = !showTray.value
  }

  return {
    taskbars,
    updateTaskbars,
    favorites,
    updateFavorites,
    removeFavorite,
    loadFavorites,
    callBack,
    updateCallback,
    remove,
    removeFavorites,
    showTray,
    toggleTray,
    show,
  }
})
