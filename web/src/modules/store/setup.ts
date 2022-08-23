import { ref } from 'vue'
import { defineStore } from 'pinia'

//https://juejin.cn/post/7057439040911441957
//https://segmentfault.com/a/1190000042290316

export const useMainStore = defineStore('main', () => {
  // 就像写script setup一样来写store
  const count = ref<number>(1)
  const increment = (): void => {
    count.value++
  }

  return { count, increment }
})

//use

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/index'

// // hooks一样来使用
// const useMainStore = useMainStore()
// const { count, increment } = storeToRefs(useMainStore)
