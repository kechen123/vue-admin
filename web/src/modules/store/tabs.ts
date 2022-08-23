import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

//https://juejin.cn/post/7057439040911441957

export const useTabsStore = defineStore('tabs', () => {
  const router = useRouter()
  const matched = router.currentRoute.value.matched
  const name = router.currentRoute.value.path.split('/')[1].toLowerCase()

  const active = ref<string>(
    (() => {
      if (matched.length > 1) {
        return name
      }
      return ''
    })()
  )

  let list = reactive<Array<string>>(
    (() => {
      if (matched.length > 1) {
        return [name]
      }
      return []
    })()
  )

  const addTab = (name: string): void => {
    active.value = name
    if (list.includes(name)) return
    list.push(name)
  }

  const setActive = (name: string): void => {
    if (!list.includes(name)) return
    active.value = name
  }

  const delTab = (name: string): void => {
    if (!list.includes(name)) return
    let i = list.indexOf(name) - 1
    i = i < 0 ? 0 : i
    list = list.filter((item) => item !== name)
    active.value = list[i]
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
