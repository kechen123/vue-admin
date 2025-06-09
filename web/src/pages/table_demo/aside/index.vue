<template>
  <AsideContainer ref="containerRef">
    <div style="width: 100%;">
      <h2>用户列表</h2>
      <el-button @click="openUserDetail('user-123')">查看用户详情</el-button>
      <el-button @click="containerRef.close()">关闭用户详情</el-button>
      <div class="table-scroll-container">
        <SmartTable :data="tableData" :loading="loading" :columns="columns" :compactMode="isDrawerOpen">
          <template #statusSwitch="{ row }">
            <el-switch v-model="row.status" />
          </template>

          <template #actions="{ row }">
            <el-button type="primary" size="small" @click="openEditDrawer(row)">编辑</el-button>
          </template>
        </SmartTable>
      </div>
    </div>
  </AsideContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Detail from './_detail.vue'
import BtnList from './_btnList.vue'


const containerRef = ref()

const loading = ref(false)
const isDrawerOpen = ref(false)

const tableData = ref([
  {
    id: 1,
    username: '张三',
    email: 'zhangsan@example.com',
    phone: '13800001111',
    status: true,
    is_vip: true,
    role: '管理员',
    department: '研发部',
    position: '前端工程师',
    tags: ['高级', '付费'],
    created_at: '2024-01-15 09:22:11',
    remark: '超级管理员'
  },
  {
    id: 2,
    username: '李四',
    email: 'lisi@example.com',
    phone: '13700002222',
    status: false,
    is_vip: false,
    role: '用户',
    department: '运维部',
    position: '测试工程师',
    tags: ['普通'],
    created_at: '2024-03-08 12:47:33',
    remark: '限制权限用户'
  },
  {
    id: 3,
    username: '王五',
    email: 'wangwu@example.com',
    phone: '13600003333',
    status: true,
    is_vip: true,
    role: '用户',
    department: '产品部',
    position: '产品经理',
    tags: ['高级'],
    created_at: '2024-05-12 16:03:21',
    remark: '重点跟进'
  }
])


const columns = [
  { label: 'ID', prop: 'id', width: 60, fixed: 'left', },
  { label: '用户名', prop: 'username', width: 120 },
  { label: '邮箱', prop: 'email', width: 200 },
  { label: '手机号', prop: 'phone', width: 140 },
  { label: '状态', prop: 'status', slot: 'statusSwitch', width: 100 },
  { label: 'VIP', prop: 'is_vip', slot: 'vipSwitch', width: 100 },
  { label: '部门', prop: 'department', width: 100 },
  { label: '职位', prop: 'position', width: 120 },
  { label: '标签', prop: 'tags', slot: 'tagSlot', width: 160 },
  { label: '注册时间', prop: 'created_at', width: 180 },
  { label: '备注', prop: 'remark', width: 200, hideInCompact: true },
  { label: '操作', prop: 'actions', slot: 'actions', width: 160, fixed: 'right', }
]


function openEditDrawer(row: any) {
  isDrawerOpen.value = true
  containerRef.value.open({
    default: {
      component: Detail,
      props: row,
      width: 600,
      title: '用户详情',
      onClose: () => {
        console.log('onclose')
      }
    },
    footer: {
      component: BtnList,
      props: row,
      onClick: () => {
        console.log('onclose')
      }
    }
  })
}

function closeEditDrawer() {
  isDrawerOpen.value = false
}

function onStatusChange(row: any) {
  console.log('状态更新：', row)
}

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
</script>

<style lang="less" scoped>
.table-scroll-container {
  width: 100%;
  overflow-x: auto;
}
</style>
