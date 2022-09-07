<template>
  <el-card body-style="padding:0;">
    <section>
      <header>
        <BaseFormSearch :searchArr="searchArr" :searchParam="searchParam" @search="search">
          <template #InputText="{ item, value }">
            <el-input @input="(val: string) => change(val, item, value)" />
          </template>
        </BaseFormSearch>
      </header>
      <main>
        <BaseFormTable />
      </main>
    </section>
  </el-card>
</template>

<script setup lang="ts">
import { Search } from '@/common/types/search'
import InputText from '@/components/BaseForm/SearchItem/InputText.vue';

const searchArr: Array<Search> = [
  {
    id: 'name',
    label: '姓名',
    type: 'inputText',
    placeholder: '请输入姓名'
  },
  {
    id: 'age',
    label: '年龄',
    type: 'inputText',
    placeholder: '请输入年龄'
  },
  {
    id: 'sex',
    label: '性别',
    type: 'select',
    placeholder: '请选择性别',
    option: [{ label: '男', value: '1' }, { label: '女', value: '2' }]
  },
  {
    id: 'zdy',
    label: '自定义组件',
    type: 'custom',
    placeholder: '请输入自定义组件',
    slot: 'InputText'
  },
]
const searchParam = reactive<{ [key: string]: any }>({})
const change = (val: string, item: Search, value: string) => {
  console.log(val);
  searchParam[item.id] = val

}
const search = () => {
  console.log(searchParam);
}
</script>

<style scoped lang="less">
section {
  padding: 30px;

  header {
    padding: 20px 0;
    border-bottom: var(--el-border);
  }

  main {
    padding: 20px 0;
  }
}
</style>