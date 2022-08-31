<template>
  <div>page2
    <el-input v-model="value" placeholder="Basic usage" />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const value = ref<string>('');
    return {
      value,
    };
  },
})
</script>

<style scoped lang="less">
</style>
