
<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Header />
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
          <Tabs />
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

</script>
<style lang="less">
.layout {
  width: 100%;
  height: 100vh;
  background-color: var(--el-bg-color);
  color: var(--el-text-color-primary);

  .el-header {
    position: relative;
    z-index: 9999;
    background-color: var(--el-fill-color);
    color: var(--el-text-color-primary);
    border-bottom: var(--el-border);
  }

  .el-aside {
    background: var(--el-fill-color-light);

    .el-menu {
      border-right: none;
      padding: 0;
    }
  }

  .el-container {
    width: 100%;
    height: 100%;
    background-color: var(--el-bg-color-page);
  }
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
