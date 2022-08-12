<template>
  <a-button type="primary" @click="btnClick('/login')">login</a-button>
  <a-button type="primary" @click="btnClick('/base')">base</a-button>
  <a-button type="primary" @click="btnClick('/page1')">layout page1</a-button>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()
    return {
      btnClick(path: string) {
        console.log('btnClick>' + path)
        router.push(path)
      }
    }
  }
})
</script>

<style scoped lang="less">
</style>
