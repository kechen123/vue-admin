<template>
  <el-input v-if="item.type === 'inputText'" v-model="value"
    :placeholder="item.placeholder ?? '请输入'" />
  <el-select v-if="item.type === 'select'" v-model="value" :placeholder="item.placeholder ?? '请选择'">
    <el-option
      v-for="o in item.option"
      :key="o.value"
      :label="o.label"
      :value="o.value" />
  </el-select>
  <!-- <slot :name="item.slot" v-bind="{ item, value }"></slot> -->
</template>

<script setup lang="ts">
import { Search } from '@/common/types/search'
interface Item {
  item: Search
  modelValue: string
}
interface Emit {
  (e: 'update:modelValue', value: string): void
}
const { item, modelValue } = defineProps<Item>()
console.log(item);


const emit = defineEmits<Emit>()


const value = ref(modelValue)

watch(() => value.value, (val) => {
  emit('update:modelValue', val)
})
</script>

<style scoped>
</style>