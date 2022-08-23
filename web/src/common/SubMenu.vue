<!-- <template>
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
</template> -->
<template>
  <template v-if="menu.children && menu.children.length > 0">
    <a-sub-menu :key="menu.path">
      <template #title>
        <span>
          {{ menu.title }}
        </span>
      </template>

      <SubMenu v-for="item in menu.children" :menu="item" />
    </a-sub-menu>
  </template>
  <a-menu-item v-else :key="menu.path">{{ menu.title }}</a-menu-item>
</template>

<script setup lang="ts" name="SubMenu">

interface Menu {
  title: string;
  path: string;
  icon?: string;
  children?: Menu[];
}

// const getIcon = (icon?: string) => {
//   // @ts-ignore
//   return Icon[icon ?? 'UserOutlined'] ?? Icon['UserOutlined']
// };
defineProps<{
  menu: Menu
}>()
</script>

<style lang="scss" scoped>
</style>