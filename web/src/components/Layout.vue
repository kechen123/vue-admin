
<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="logo"></div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Suspense>
            <template v-slot:default>
              <Menu />
            </template>
            <template v-slot:fallback>
              <div>正在加载...</div>
            </template>
          </Suspense>
        </el-aside>
        <el-container>
          <el-main>
            <router-view v-slot="{ Component }">
              <template v-if="Component">
                <Transition name="fade" mode="out-in">
                  <keep-alive>
                    <Suspense>
                      <component :is="Component" :key="$route.fullPath" />
                      <template #fallback>
                        正在加载...
                      </template>
                    </Suspense>
                  </keep-alive>
                </Transition>
              </template>
            </router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" >
const Menu = defineAsyncComponent(() => import('./Menu.vue'))
</script>
<style>
.layout {
  width: 100%;
  height: 100vh;
  background-color: var(--el-bg-color-page);
}

.layout .el-container {
  width: 100%;
  height: 100%;
}

.layout .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout .el-menu {
  border-right: none;
}

.layout .el-main {
  padding: 0;
}

.layout .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

/* .fade-enter-active {
  animation: anim 1s ease;
} */

/* .fade-leave-active {
  animation: leaveAnim 1s ease;
} */

@keyframes anim {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes leaveAnim {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-500px);
  }
}
</style>
