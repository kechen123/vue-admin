<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" class="sider" style="background: #fff">
        <Suspense>
          <template v-slot:default>
            <Menu />
          </template>
          <template v-slot:fallback>
            <div>loading...</div>
          </template>
        </Suspense>
      </a-layout-sider>
      <a-layout>
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <Tabs />
        <a-layout-content class="content">
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
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts" >
const Menu = defineAsyncComponent(() => import('./Menu.vue'))
</script>
<style>
.layout {
  width: 100%;
  height: 100%;
}

.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}


.site-layout-background {
  background: #fff;
}

.breadcrumb {
  background: #fff;
  padding: 16px 0 16px 24px;
}

.content {
  background: #fff;
  padding: 24px;
  margin: 0;
  min-height: 280px;
  margin: 16px 24px;
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
  transition: opacity 0.3s ease;
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
