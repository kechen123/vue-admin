<template>
  <AsideHeader />
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical"
    :collapse="isCollapse"
    :router="true"
  >
    <AsideSubItem :item="item" v-for="item in routerPath" />
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouterStore } from '@/stores/router'

const router = useRouter()
const routerSotre = useRouterStore()
const routerPath = routerSotre.roles
const isCollapse = ref(false)
const defaultActive = ref(router.currentRoute.value.path)

watch(
  () => router.currentRoute.value.path,
  (val) => {
    defaultActive.value = val
  }
)
</script>

<style>
.el-menu-vertical {
  --el-menu-bg-color: var(--sidebar-bg-color);
  --el-menu-text-color: var(--sidebar-color);
  --el-menu-hover-bg-color: var(--sidebar-hover-bg-color);
  --el-menu-active-color: var(--sidebar-active-color);
  padding: 20px;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
  border: none;
}
.el-menu-vertical {
  .el-menu-item,
  .el-sub-menu__title {
    border-radius: 10px;
    color: #74798c;
  }
  .el-menu-item.is-active {
    background: #0054fe;
    color: #fff;
  }
}
</style>
