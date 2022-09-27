<template>
  <n-config-provider :theme="theme">
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, lightTheme } from 'naive-ui'
const { isDark } = useDarks()
console.log(isDark.value)

const theme = ref()
watchEffect(() => {
  theme.value = isDark.value ? darkTheme : lightTheme
})
</script>
