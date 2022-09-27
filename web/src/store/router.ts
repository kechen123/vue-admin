import { defineStore } from 'pinia'
import { transformAuthRouteToMenu } from '@/utils/common/menu'

interface State {
  isInitAuthRoute: boolean
  menus: GlobalMenuOption[]
}
const menu: AuthRoute.Route[] = [
  {
    id: '1-1',
    path: '/test',
    name: '且听风吟',
    icon: 'vscode-icons:file-type-config'
  },
  {
    id: '2',
    name: '1973年的弹珠玩具',
    icon: 'vscode-icons:file-type-csharp',
    children: [
      {
        id: '2-1',
        name: '鼠',
        icon: 'vscode-icons:file-type-jenkins',
        path: '/'
      }
    ]
  },
  {
    id: '3',
    name: '寻羊冒险记',
    icon: 'vscode-icons:file-type-jenkins',
    disabled: true,
    path: '/plugin'
  },
  {
    id: '4',
    name: '舞，舞，舞',
    icon: 'vscode-icons:file-type-jenkins',
    children: [
      {
        id: '4-1',
        name: '人物',
        icon: 'simple-icons:vite',
        children: [
          {
            name: '叙事者',
            icon: 'simple-icons:vite',
            id: '4-1-1',
            path: '/plugin'
          },
          {
            name: '羊男',
            icon: 'simple-icons:vite',
            id: '4-1-2',
            path: '/plugin'
          }
        ]
      },
      {
        id: '4-2',
        name: '饮品',
        icon: 'simple-icons:vite',
        children: [
          {
            name: '威士忌',
            id: '4-2-1',
            icon: 'simple-icons:vite',
            path: '/plugin'
          }
        ]
      },
      {
        id: '4-3',
        name: '食物',
        icon: 'simple-icons:vite',
        children: [
          {
            name: '三明治',
            icon: 'simple-icons:vite',
            id: '4-3-1',
            path: '/plugin'
          }
        ]
      },
      {
        id: '4-4',
        name: '过去增多，未来减少',
        icon: 'simple-icons:vite',
        path: '/plugin'
      }
    ]
  }
]

export const useMenuStore = defineStore('router', () => {
  const state = reactive<State>({
    isInitAuthRoute: false,
    menus: []
  })

  const initMenu = async () => {
    const data = menu
    if (data) {
      const menus = transformAuthRouteToMenu(data)
      ;(state.menus as GlobalMenuOption[]) = menus
      state.isInitAuthRoute = true
    }
  }

  return { state, initMenu }
})

//use

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/index'

// // hooks一样来使用
// const useMainStore = useMainStore()
// const { count, increment } = storeToRefs(useMainStore)
