<template>
  <div class="header">
    <div class="logo"></div>
    <el-switch v-model="isDark" :change="toggleDark" />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 100px;
    height: 40px;
    background-color: aqua;
  }
}
</style>