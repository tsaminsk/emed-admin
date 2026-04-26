import { computed, ref, type Component, markRaw, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuOption } from '@/types/menuOption.interface'
import { useRouter, type RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/components/layouts/Admin.vue'

export const useMenuStore = defineStore('menu', () => {
  const articles = ref<any[]>([])

  const getRoute = (route: RouteRecordRaw): MenuOption => {
    return {
      id: (route.name as string) || crypto.randomUUID(),
      label: (route.meta?.label as string) || '',
      icon: (route.meta?.icon as string) || '',
      iconComponent: route.meta?.iconComponent
        ? markRaw(route.meta.iconComponent as Component)
        : null,
      disabled: (route.meta?.disabled ?? false) as boolean,
      path: { name: route.name as string },
      ...(route.path === '/articles/:article' && {
        children: (articles.value as any[]).map((article: any) => {
          return {
            id: article.id,
            label: article.title,
            icon: article.icon || 'file-earmark',
            path: { name: 'article', params: { article: article.id } },
          }
        }),
      }),
      ...(route.children &&
        route.children.length > 0 && {
          children: route.children.map((child) => getRoute(child)),
        }),
    }
  }

  const router = useRouter()

  const menuOptions = ref<MenuOption[]>([])

  const updateMenuOptions = (newArticles?: any[]) => {
    if (newArticles && newArticles.length !== 0) {
      articles.value = newArticles
    }
    const routes = router.options.routes
    menuOptions.value = routes
      .filter((route) => route.meta?.layout === AdminLayout && route.meta?.visible !== false)
      .map(getRoute)
  }

  updateMenuOptions([])

  const getCurrentArticle = computed(() => (id: string) => {
    return articles.value.find((article: any) => article.id === id)
  })

  return { menuOptions, updateMenuOptions, getCurrentArticle }
})
