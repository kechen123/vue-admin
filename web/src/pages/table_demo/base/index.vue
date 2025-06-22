<template>
  <SlideContainer ref="containerRef">
    <div>
      <h2>用户列表</h2>
      <el-button @click="openUserDetail('user-123')">查看用户详情</el-button>
      <el-button @click="containerRef.close()">关闭用户详情</el-button>
      <KcTable :columns="columns" :data="tableData" :loading="loading">
        <template #actions="{ row }">
          <el-button type="primary" @click="openUserDetail(row.name)">编辑</el-button>
          <el-button type="success" @click="openUserDetail(row.name)">查看详情</el-button>
          <el-button type="danger" @click="handleClick">删除</el-button>
        </template>
      </KcTable>
    </div>
  </SlideContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Detail from './_detail.vue'
import BtnList from './_btnList.vue'

const columns = [
  {
    type: 'text',
    prop: 'name',
    label: '姓名',
    formatter: (row: any, column: any, cellValue: any, index: number) => {
      console.log('formatter', row, column, cellValue, index)
      return row.name + '（格式化）'
    },
    show: true,
  },
  {
    prop: 'status',
    label: '状态',
    type: 'tag',
    show: true,
    options: [
      { value: 1, label: '启用', tagType: 'success' },
      { value: 0, label: '禁用', tagType: 'danger' }
    ]
  },
  {
    prop: 'active',
    label: '激活',
    show: true,
    type: 'switch'
  },

  {
    label: '操作',
    prop: 'actions',
    show: true,
    type: 'slot',
    width: 400
  }

]

const tableData = [
  { name: '张三', status: 1, active: true },
  { name: '李四', status: 0, active: false }
]

const loading = false

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
