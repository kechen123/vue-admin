import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

interface Tab {
  name: string
  path: string
}

type Tabs = Array<Tab>

//https://juejin.cn/post/7057439040911441957

export const useTabsStore = defineStore('tabs', () => {
  const router = useRouter()
  const matched = router.currentRoute.value.matched
  const routerVal = router.currentRoute.value
  const active = ref<Tab>(
    (() => {
      let name: any = '',
        path = ''
      if (matched.length > 1) {
        name = routerVal.name
        path = routerVal.path
      }
      return {
        name,
        path
      }
    })()
  )

  let list = reactive<Tabs>(
    (() => {
      if (matched.length > 1) {
        const name: any = routerVal.name
        const path = routerVal.path
        if (name && path) {
          return [
            {
              name,
              path
            }
          ]
        }
      }
      return []
    })()
  )

  const addTab = (tab: Tab): void => {
    active.value = tab
    if (list.find((val) => val.name === tab.name)) return
    list.push(tab)
  }

  const setActive = (tab: Tab): void => {
    if (!list.find((val) => val.name === tab.name)) return
    active.value = tab
  }

  const delTab = (name: string): void => {
    let index = list.findIndex((item) => item.name === name)
    if (index < 0) return
    list.splice(index, 1)
    if (index > list.length - 1) {
      index = list.length - 1
    }
    active.value = list[index]
    router.push(list[index].path)
  }

  return { active, list, addTab, setActive, delTab }
})

//use

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/index'

// // hooks一样来使用
// const useMainStore = useMainStore()
// const { count } = storeToRefs(useMainStore)
// const { increment } = useMainStore
