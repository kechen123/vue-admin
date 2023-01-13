import { defineStore } from 'pinia'
import { transformAuthRouteToMenu } from '@/utils/common/menu'

interface State {
  isInitAuthRoute: boolean
  menuJson: AuthRoute.Route[]
  menus: GlobalMenuOption[]
  breadcrumb: AuthRoute.Route[]
}
const menu: AuthRoute.Route[] = [
  {
    id: '1-1',
    path: '/',
    name: '首页',
    icon: 'system-uicons:home-door'
  },
  {
    id: '2',
    name: '系统管理',
    icon: 'system-uicons:settings',
    children: [
      {
        id: '2-1',
        name: '用户管理',
        icon: 'system-uicons:users',
        path: '/system/user'
      },
      {
        id: '2-2',
        name: '权限管理',
        icon: 'system-uicons:users',
        path: '/system/auth'
      }
    ]
  },
  {
    id: '3',
    name: '寻羊冒险记',
    icon: 'system-uicons:alarm-clock',
    disabled: true,
    path: '/test'
  },
  {
    id: '4',
    name: '舞，舞，舞',
    icon: 'system-uicons:arrow-up-circle',
    children: [
      {
        id: '4-1',
        name: '人物',
        icon: 'system-uicons:arrow-up-circle',
        children: [
          {
            name: '叙事者',
            icon: 'system-uicons:arrow-up-circle',
            id: '4-1-1',
            path: '/aaa'
          },
          {
            name: '羊男',
            icon: 'system-uicons:arrow-up-circle',
            id: '4-1-2',
            path: '/bbb'
          }
        ]
      },
      {
        id: '4-2',
        name: '饮品',
        icon: 'system-uicons:camera-noflash',
        children: [
          {
            name: '威士忌',
            id: '4-2-1',
            icon: 'system-uicons:chat-add',
            path: '/ccc'
          }
        ]
      },
      {
        id: '4-3',
        name: '食物',
        icon: 'system-uicons:chat-add',
        children: [
          {
            name: '三明治',
            icon: 'system-uicons:chat-add',
            id: '4-3-1',
            path: '/ddd'
          }
        ]
      },
      {
        id: '4-4',
        name: '过去增多，未来减少',
        icon: 'system-uicons:directions',
        path: '/eee'
      }
    ]
  }
]

export const useMenuStore = defineStore('router', () => {
  const state = reactive<State>({
    isInitAuthRoute: false,
    menuJson: menu,
    menus: [],
    breadcrumb: []
  })

  const initMenu = async () => {
    const data = menu
    if (data) {
      const menus = transformAuthRouteToMenu(data)
      ;(state.menus as GlobalMenuOption[]) = menus
      state.isInitAuthRoute = true
    }
  }

  const setBreadcrumb = async (list: AuthRoute.Route[]) => {
    state.breadcrumb = list
  }
  return { state, initMenu, setBreadcrumb }
})

//use

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/index'

// // hooks一样来使用
// const useMainStore = useMainStore()
// const { count, increment } = storeToRefs(useMainStore)
