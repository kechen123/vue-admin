<template>
  <SlideContainer ref="containerRef">
    <div style="margin-bottom: 16px;">
      <h2>用户列表</h2>
      <el-button @click="openUserDetail('user-123')">查看用户详情</el-button>
      <el-button @click="containerRef.close()">关闭用户详情</el-button>
    </div>

    <KcTable :config="tableConfig">
      <template #actions="{ row }">
        <el-button type="primary" @click="openUserDetail(row.name)">编辑</el-button>
        <el-button type="success" @click="openUserDetail(row.name)">查看详情</el-button>
        <el-button type="danger" @click="handleClick">删除</el-button>
      </template>
    </KcTable>
  </SlideContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getList } from '@/api/test'
import Detail from './_detail.vue'
import BtnList from './_btnList.vue'
import type { TableConfig, ColumnProps } from '@/components/KcTable/types'

const columns: ColumnProps[] = [
  {
    type: 'text',
    prop: 'username',
    label: '姓名',
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      return row.username + '（格式化）'
    },
    show: true,
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'tag',
    show: true,
    options: [
      { value: 2, label: '女', tagType: 'success' },
      { value: 1, label: '男', tagType: 'primary' },
      { value: 0, label: '未知', tagType: 'danger' }
    ]
  },
  {
    prop: 'status',
    label: '激活',
    show: true,
    type: 'switch',
    options: {
      // activeText: '已激活',
      // inactiveText: '未激活',
      activeValue: 1,
      inactiveValue: 0,
      onChange: (val: any) => {
        console.log('change', val)
      }
    },
  },

  {
    label: '操作',
    prop: 'actions',
    show: true,
    type: 'slot',
    width: 400
  }
]

const tableConfig = ref<TableConfig>({
  columns: columns,
  request: getList,
  defaultPagination: { page: 1, size: 10 },
  showPagination: true,
  showLoading: true
})



const containerRef = ref()

function openUserDetail(userId: string) {
  containerRef.value.open({
    default: {
      component: Detail,
      props: { userId },
      width: 600,
      title: '用户详情',
      onClose: () => {
        console.log('onclose')
      }
    },
    footer: {
      component: BtnList,
      props: { userId },
      onClick: () => {
        console.log('onclose')
      }
    }
  })
}
const handleClick = () => {
  console.log('click')
}

</script>
