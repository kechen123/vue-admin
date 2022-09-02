<template>
  <el-form :inline="true" :model="props.searchParam" class="base-form-search">
    <el-form-item :label="item.label" :key="i" v-for="(item, i) in props.searchArr">

      <!-- <BaseFormSearchItem v-if="item.slot && item.type === 'custom'" :item="item" v-model="formInline[item.id]">
        <template v-slot:[item.slot]>
          <slot :name="item.slot" v-bind="{ item, formInline[item.id] }"></slot>
        </template>
      </BaseFormSearchItem> -->
      <template v-if="item.slot && item.type === 'custom'">
        <slot :name="item.slot" v-bind="{ item, value: props.searchParam[item.id] }"></slot>
      </template>
      <BaseFormSearchItem v-else :item="item" v-model="props.searchParam[item.id]" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { Search } from '@/common/types/search'
// import InputText from './SearchItem/InputText.vue';
interface Props {
  searchArr: Array<Search>
  searchParam: { [key: string]: any }
}
interface Emit {
  (e: 'search'): void
}
interface Form {
  [key: string]: any
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()
// const formInline = reactive((() => {
//   let o: Form = {}
//   props.searchArr.forEach(item => {
//     o[item.id] = ''
//   })
//   return o
// })())

props.searchArr.forEach(item => {
  props.searchParam[item.id] = ''
})


const onSubmit = () => {
  emit('search')
}

</script>

<style scoped lang="less">
.base-form-search {}
</style>