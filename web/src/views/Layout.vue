<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Base'
})
</script>

<style scoped lang="less">
.layout {
  margin-left: 300px
}
</style>
