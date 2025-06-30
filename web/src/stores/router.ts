// import { defineStore } from 'pinia'
// import { useRouter } from 'vue-router'
// import { useMenuStore } from '@/store/router'

// interface Tab {
//   name: string
//   path: string
//   key: string
// }

// type Tabs = Array<Tab>

// const findNode = (func: (node: any) => boolean, tree: any) => {
//   for (const node of tree) {
//     if (func(node)) return node
//     if (node.children) {
//       const res = findNode(func, node.children) as any
//       if (res) return res
//     }
//   }
//   return null
// }

// //https://juejin.cn/post/7057439040911441957

// export const useTabsStore = defineStore('tabs', () => {
//   const router = useRouter()
//   const menuStore = useMenuStore()
//   const menu = menuStore.state.menus
//   const matched = router.currentRoute.value.matched
//   const routerVal = router.currentRoute.value
//   const active = ref<Tab>(
//     (() => {
//       let name: any = '',
//         path = '',
//         key = ''
//       if (matched.length > 1) {
//         const node = findNode((node) => {
//           return node.routePath === routerVal.path
//         }, menu)
//         if (node) {
//           name = node.routeName
//           path = node.routePath
//           key = node.key
//         }
//       }
//       return {
//         name,
//         path,
//         key
//       }
//     })()
//   )

//   let list = reactive<Tabs>(
//     (() => {
//       if (matched.length > 1) {
//         const node = findNode((node) => {
//           return node.routePath === routerVal.path
//         }, menu)
//         if (node) {
//           return [
//             {
//               name: node.routeName,
//               key: node.key,
//               path: node.routePath
//             }
//           ]
//         }
//       }
//       return []
//     })()
//   )

//   const addTab = (tab: Tab): void => {
//     active.value = tab
//     if (list.find((val) => val.name === tab.name)) return
//     list.push(tab)
//   }

//   const setActive = (tab: Tab): void => {
//     if (!list.find((val) => val.name === tab.name)) return
//     active.value = tab
//   }

//   const delTab = (name: string): void => {
//     let index = list.findIndex((item) => item.name === name)
//     if (index < 0) return
//     list.splice(index, 1)
//     if (index > list.length - 1) {
//       index = list.length - 1
//     }
//     active.value = list[index]
//     router.push(list[index].path)
//   }

//   return { active, list, addTab, setActive, delTab }
// })

// //use

// // import { storeToRefs } from 'pinia'
// // import { useMainStore } from '@/store/index'

// // // hooks一样来使用
// // const useMainStore = useMainStore()
// // const { count } = storeToRefs(useMainStore)
// // const { increment } = useMainStore

import axios from '@/utils/http/axios'
export const useRouterStore = defineStore(
  'router',
  () => {
    const roles = ref([])
    const initMenu = async () => {
      const res = await axios.post('/rs/menu')
      if (res.status === 200) {
        roles.value = res.data
      }
      return res
    }
    const addRoles = (r: []) => {
      roles.value = r
    }
    return { roles, initMenu, addRoles }
  },
  {
    persist: true,
  },
)
