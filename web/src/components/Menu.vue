<template>
  <el-menu
    :default-active="openKeys"
    @select="changeMenu"
    :style="{ height: '100%', borderRight: 0 }">
    <SubMenu v-for="item in menu" :menu="item" />
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SubMenu from '@/common/SubMenu.vue';
import { storeToRefs } from 'pinia'
import { useTabsStore } from '@/modules/store/tabs'
interface Menu {
  title: string;
  path: string;
  icon?: string;
  children?: Menu[];
}
const tabsStore = useTabsStore()
const { active } = storeToRefs(tabsStore)
const { addTab } = tabsStore;
const router = useRouter()
const openKeys = ref<string>('home1-1-1')
const menu = ref<Menu[]>([
  {
    title: '无限层级',
    path: 'sub1',
    icon: 'location',
    children: [

      {
        title: 'page1',
        path: '/Page1'
      },
      {
        title: 'page2',
        path: '/Page2'
      },
      {
        title: 'basePage',
        path: '/BasePage/Index'
      },
      {
        title: 'test',
        path: '/BasePage/Test/Index'
      }
    ]
  },
  {
    title: '页面配置',
    path: 'sub2',
    icon: 'location',
  },
  {
    title: 'subnav 3',
    path: 'basePage',
    icon: 'NotificationOutlined',
    children: [
      {
        title: '一层',
        path: '1',
        children: [
          {
            title: '二层',
            path: '1-1',
            children: [
              {
                title: '三层',
                path: 'home'
              }
            ]
          },
          {
            title: '二层-2',
            path: '1-2'
          },
          {
            title: '二层-3',
            path: '1-3'
          }
        ]
      },
      {
        title: 'option10',
        path: '10'
      },
      {
        title: 'option11',
        path: '11'
      },
      {
        title: 'option12',
        path: '12'
      }
    ]
  }
])

const findNode = (func: (node: any) => boolean, tree: any) => {
  for (const node of tree) {
    if (func(node)) return node
    if (node.children) {
      const res = findNode(func, node.children) as any
      if (res) return res
    }
  }
  return null
}
const changeMenu = (index: string, indexPath: string[], item: any, item1: any) => {
  const node = findNode((node) => { return node.path === index }, menu.value)
  if (node) {
    router.push(index)
    addTab({
      name: node.title,
      path: node.path
    })
  }
}
watchEffect(() => {
  openKeys.value = active.value
})
</script>

<style scoped>
</style>