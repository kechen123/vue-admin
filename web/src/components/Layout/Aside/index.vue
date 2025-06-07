<template>
  <LayoutAsideHeader />
  <el-menu :default-active="defaultActive" class="el-menu-vertical" :collapse="isCollapse" :router="true">
    <LayoutAsideSubItem :item="item" :key="index" v-for="(item, index) in routerPath" />
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

<style lang="less">
.el-menu-vertical {
  // --el-menu-bg-color: var(--el-color-primary-light-3);
  --el-menu-text-color: var(--el-text-color-primary);
  --el-menu-hover-bg-color: var(--el-color-primary-light-7);
  --el-menu-active-color: var(--el-text-color-primary);
  --el-menu-active-bg-color: var(--el-color-primary-light-7);
  --el-menu-item-height: 50px;
  --el-menu-sub-item-height: 50px;
  padding: 0 14px;

}


.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
  border: none;
}

@keyframes scale-pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}


.el-menu-item,
.el-sub-menu__title {
  border-radius: 10px;

  i,
  span {
    transition: transform 0.3s ease;
  }

  &:hover {

    i {
      animation: scale-pop 0.3s ease;
    }


  }
}



.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-3) !important;
  color: var(--el-text-color-primary);
}
</style>
