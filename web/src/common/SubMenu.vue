<template>
  <template v-for="(item) in menu">
    <template v-if="item.children">
      <a-sub-menu :key="item.path">
        <template #title>
          <span>
            <component :is="getIcon(item.icon)"></component>
            {{ item.title }}
          </span>
        </template>
        <SubMenu :menu="item.children" />
      </a-sub-menu>
    </template>
    <a-menu-item v-else :key="item.path">{{ item.title }}</a-menu-item>
  </template>
</template>

<script setup lang="ts" name="SubMenu">
import * as Icon from '@ant-design/icons-vue';

interface Menu {
  title: string;
  path: string;
  icon?: string;
  children?: Menu[];
}

const getIcon = (icon?: string) => {
  // @ts-ignore
  return Icon[icon ?? 'UserOutlined'] ?? Icon['UserOutlined']
};
defineProps<{
  menu: Menu[]
}>()
</script>

<style lang="scss" scoped>
</style>