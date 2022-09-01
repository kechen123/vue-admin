<template>
  <template v-if="menu.children && menu.children.length > 0">
    <el-sub-menu :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <span>
          {{ menu.title }}
        </span>
      </template>

      <SubMenu v-for="item in menu.children" :menu="item" />
    </el-sub-menu>
  </template>
  <el-menu-item v-else :index="menu.path">
    <el-icon>
      <component :is="menu.icon"></component>
    </el-icon>
    <span>
      {{ menu.title }}
    </span>
  </el-menu-item>
</template>

<script setup lang="ts" name="SubMenu">

interface Menu {
  title: string;
  path: string;
  icon?: string;
  children?: Menu[];
}

defineProps<{
  menu: Menu
}>()
</script>

<style lang="less" scoped>
</style>