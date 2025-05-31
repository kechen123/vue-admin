<template>
  <el-container class="layout-container">
    <el-aside class="sidebar">
      <Aside />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <Tags />
      <el-main class="main">
        <RouterView v-slot="{ Component, route }">
          <template v-if="Component">
            <Transition name="fade" mode="out-in">
              <KeepAlive>
                <component :is="Component" :key="route.path"></component>
              </KeepAlive>
            </Transition>
          </template>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
  background-color: var(--bg-color);

  .sidebar {
    background-color: var(--sidebar-bg);
    width: var(--sidebar-width);
    transition: all 0.3s ease-in-out;
    transform: translateX(0);
    // border-right: var(--sidebar-border);
    // box-shadow: var(--border);
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: var(--sidebar-border-color);
  }

  .header {
    height: var(--header-height);
    padding: 0;
  }

  .main {
    background-color: var(--main-bg);
  }
}
</style>

<style>
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

.fade-enter-active {
  animation: anim 0.3s ease;
}

.fade-leave-active {
  animation: leaveAnim 0.3s ease;
}

@keyframes anim {
  0% {
    transform: translateX(-20px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes leaveAnim {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(20px);
  }
}
</style>
