<template>
  <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
    <template #title>
      <el-icon v-if="item.icon">
        <MIcon :iconName="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <SubItem :item="item1" v-for="item1 in item.children" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">
    <template #title>
      <el-icon v-if="item.icon">
        <MIcon :iconName="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
interface Props {
  item: {
    name: String
    path: String
    icon?: String
    disabled?: Boolean
    children?: Array<any>
  }
  parentPath?: String
  level?: Number
}

const { item } = defineProps<Props>()
</script>

<style scoped></style>
