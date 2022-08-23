<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    @click="changeMenu"
    :style="{ height: '100%', borderRight: 0 }">
    <SubMenu v-for="item in menu" :menu="item" />
  </a-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SubMenu from '@/common/SubMenu.vue';
import { useTabsStore } from '@/modules/store/tabs'
interface Menu {
  title: string;
  path: string;
  icon?: string;
  children?: Menu[];
}

const tabStore = useTabsStore()
const router = useRouter()
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>(['sub1'])
const menu = ref<Menu[]>([
  {
    title: 'subnav 1',
    path: 'sub1',
    icon: 'MenuUnfoldOutlined',
    children: [
      {
        title: 'option 1',
        path: '1',
        children: [
          {
            title: 'option1-1',
            path: '1-1',
            children: [
              {
                title: 'home1-1-1',
                path: 'home'
              }
            ]
          },
          {
            title: 'option1-2',
            path: '1-2'
          },
          {
            title: 'option1-3',
            path: '1-3'
          }
        ]
      },
      {
        title: 'option2',
        path: 'page1'
      },
      {
        title: 'option3',
        path: 'page2'
      },
      {
        title: 'option4',
        path: '4'
      }
    ]
  },
  {
    title: 'subnav 2',
    path: 'sub2',
    icon: 'LaptopOutlined',
    children: [
      {
        title: 'option5',
        path: '5'
      },
      {
        title: 'option6',
        path: '6'
      },
      {
        title: 'option7',
        path: '7'
      },
      {
        title: 'option8',
        path: '8'
      }
    ]
  },
  {
    title: 'subnav 3',
    path: 'sub3',
    icon: 'NotificationOutlined',
    children: [
      {
        title: 'option9',
        path: '9'
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
const changeMenu = (e: any) => {
  router.push(e.key)
  tabStore.addTab(e.key)
}
watchEffect(() => {
  selectedKeys.value = [tabStore.active]
})
</script>

<style scoped>
</style>