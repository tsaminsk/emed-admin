import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/admin/Home.vue'
import Widgets from '@/views/admin/Widgets.vue'
import Components from '@/views/admin/Components.vue'
import Html from '@/views/admin/reference-books/Html.vue'
import Javascript from '@/views/admin/reference-books/Javascript.vue'
import Css from '@/views/admin/reference-books/Css.vue'
import Article from '@/views/admin/articles/index.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import NotFound from '@/views/404.vue'
import Panel from '@/views/admin/Panel.vue'
import Pages from '@/views/admin/Pages.vue'
import Profile from '@/views/admin/Profile.vue'
import Devices from '@/views/admin/Devices.vue'
import Scanner from '@/views/admin/Scanner.vue'

import SearchAndReplaceDuplicates from '@/views/admin/settings/service-functions/SearchAndReplaceDuplicates.vue'

import DefaultLayout from '@/components/layouts/Default.vue'
import AdminLayout from '@/components/layouts/Admin.vue'
import AuthLayout from '@/components/layouts/Auth.vue'
import PasswordRecovery from '@/views/auth/RasswordRecovery.vue'
import WidgetsOutlined from '@/components/icons/WidgetsOutlined.vue'
import ComponentsIcon from '@/components/icons/Components.vue'
import BoxMultipleSearch24Regular from '@/components/icons/BoxMultipleSearch24Regular.vue'
import ArticleOutlined from '@/components/icons/ArticleOutlined.vue'
import CloudServiceManagement from '@/components/icons/CloudServiceManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: AdminLayout,
        label: 'Главная страница',
        icon: 'house-door',
      },
    },
    {
      path: '/widgets',
      name: 'widgets',
      component: Widgets,
      meta: {
        layout: AdminLayout,
        label: 'Виджеты',
        icon: 'widgets',
        iconComponent: WidgetsOutlined,
      },
    },
    // пример скрытого меню
    {
      path: '/pages',
      name: 'pages',
      component: Pages,
      meta: {
        layout: AdminLayout,
        visible: false,
      },
    },
    {
      path: '/panel',
      name: 'panel',
      component: Panel,
      meta: {
        layout: AdminLayout,
        label: 'Панель компонентов',
        icon: 'intersect',
      },
    },
    {
      path: '/reference-books',
      name: 'reference-books',
      meta: {
        layout: AdminLayout,
        label: 'Справочники',
        icon: 'book',
      },
      children: [
        {
          path: 'html',
          name: 'html',
          component: Html,
          meta: {
            label: 'HTML',
            icon: 'book',
          },
        },
        {
          path: 'javascript',
          name: 'javascript',
          component: Javascript,
          meta: {
            label: 'JavaScript',
            icon: 'book',
          },
        },
        {
          path: 'css',
          name: 'css',
          component: Css,
          meta: {
            label: 'CSS',
            icon: 'book',
          },
        },
      ],
    },
    {
      path: '/articles/:article',
      name: 'article',
      component: Article,
      meta: {
        layout: AdminLayout,
        label: 'Статьи',
        icon: 'page',
        iconComponent: ArticleOutlined,
      },
    },
    {
      path: '/development',
      name: 'development',
      meta: {
        layout: AdminLayout,
        label: 'Разработка',
        icon: 'braces',
      },
      children: [
        {
          path: 'development1',
          name: 'development1',
          component: () => import('@/views/admin/development/development1.vue'),
          meta: {
            label: 'Разработка 1',
            icon: 'filetype-html',
          },
        },
        {
          path: 'development2',
          name: 'development2',
          component: () => import('@/views/admin/development/development2.vue'),
          meta: {
            label: 'Разработка 2',
            icon: 'filetype-html',
          },
        },
      ],
    },
    {
      path: '/integration',
      name: 'integration',
      meta: {
        layout: AdminLayout,
        label: 'Интеграция',
        icon: 'globe',
      },
      children: [
        {
          path: 'integration1',
          name: 'integration1',
          component: () => import('@/views/admin/integration/integration1.vue'),
          meta: {
            label: 'integration 1',
            icon: 'filetype-html',
          },
        },
        {
          path: 'integration2',
          name: 'integration2',
          component: () => import('@/views/admin/integration/integration2.vue'),
          meta: {
            label: 'integration 2',
            icon: 'filetype-html',
          },
        },
      ],
    },
    {
      path: '/tables',
      name: 'tables',
      meta: {
        layout: AdminLayout,
        label: 'Таблицы',
        icon: 'table',
      },
      children: [
        {
          path: 'tables1',
          name: 'tables1',
          component: () => import('@/views/admin/tables/tables1.vue'),
          meta: {
            label: 'tables 1',
            icon: 'filetype-html',
          },
        },
        {
          path: 'tables2',
          name: 'tables2',
          component: () => import('@/views/admin/tables/tables2.vue'),
          meta: {
            label: 'tables 2',
            icon: 'filetype-html',
          },
        },
      ],
    },
    // пример неактивного меню
    {
      path: '/components',
      name: 'components',
      meta: {
        layout: AdminLayout,
        label: 'Компоненты',
        iconComponent: ComponentsIcon,
        // disabled: true,
      },
      children: [
        {
          path: 'component',
          name: 'component',
          component: Components,
          meta: {
            label: 'Компонент',
            icon: 'book',
          },
        },
      ],
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        layout: AdminLayout,
        label: 'Настройки',
        icon: 'gear',
        // disabled: true,
      },
      children: [
        {
          path: 'service-functions',
          name: 'service-functions',
          meta: {
            label: 'Сервисные функции',
            iconComponent: CloudServiceManagement,
          },
          children: [
            {
              path: 'search-and-replace-duplicates',
              name: 'search-and-replace-duplicates',
              component: SearchAndReplaceDuplicates,
              meta: {
                label: 'Поиск и замена дубликатов',
                icon: 'search',
              },
            },
            {
              path: 'search-and-batch-replace-duplicates',
              name: 'search-and-batch-replace-duplicates',
              component: () =>
                import('@/views/admin/settings/service-functions/SearchAndBatchReplaceDuplicates.vue'),
              meta: {
                label: 'Пакетный поиск и замена дубликатов',
                icon: 'search',
                iconComponent: BoxMultipleSearch24Regular,
              },
            },
            {
              path: 'search-for-unused-values',
              name: 'search-for-unused-values',
              component: () =>
                import('@/views/admin/settings/service-functions/SearchForUnusedValues.vue'),
              meta: {
                label: 'Поиск неиспользуемых значений',
                icon: 'binoculars',
              },
            },
            {
              path: 'search-for-references-to-objects',
              name: 'search-for-references-to-objects',
              component: () =>
                import('@/views/admin/settings/service-functions/SearchForReferencesToObjects.vue'),
              meta: {
                label: 'Поиск ссылок на объекты',
                icon: 'search-heart',
              },
            },
          ],
        },
        {
          path: 'menu-settings',
          name: 'menu-settings',
          component: () => import('@/views/admin/settings/MenuSettings.vue'),
          meta: {
            label: 'Настройки меню',
            icon: 'sliders',
          },
        },
        {
          path: 'all-tables',
          name: 'all-tables',
          component: () => import('@/views/admin/settings/AllTables.vue'),
          meta: {
            label: 'Все таблицы',
            icon: 'table',
          },
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        layout: AdminLayout,
        visible: false,
      },
    },
    {
      path: '/devices',
      name: 'devices',
      component: Devices,
      meta: {
        layout: AdminLayout,
        visible: false,
      },
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: Scanner,
      meta: {
        layout: AdminLayout,
        visible: false,
      },
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: PasswordRecovery,
      meta: {
        layout: DefaultLayout,
      },
    },
    {
      path: '/conditions',
      name: 'conditions',
      component: () => import('@/views/info/Conditions.vue'),
      meta: {
        layout: DefaultLayout,
      },
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound,
      meta: {
        layout: DefaultLayout,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/not-found',
    },
  ],
})

export default router
