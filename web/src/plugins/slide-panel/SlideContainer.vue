<template>
  <div class="slide-container">
    <div class="main" id="main" :style="mainStyle">
      <slot name="main" />
    </div>

    <transition name="slide">
      <div v-if="showSide" id="right" class="side-panel" :style="{ width: sideWidth }">
        <SidePanelWrapper :title="sideTitle">
          <component :is="sideComponent" v-bind="sideProps" ref="sideRef" />
        </SidePanelWrapper>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, nextTick, provide } from 'vue'
import SidePanelWrapper from './SidePanelWrapper.vue'

const showSide = ref(false)
const sideComponent = shallowRef()
const sideProps = ref({})
const sideRef = ref()
const sideWidth = ref('400px')
const sideTitle = ref('详情')
const onCloseCallback = ref<(() => void) | null>(null)

interface OpenOptions {
  component: any
  props?: Record<string, any>
  method?: string
  width?: string | number
  title?: string
  onClose?: () => void
}

async function open({
  component,
  props = {},
  method,
  width = '400px',
  title = '详情',
  onClose
}: OpenOptions) {
  sideComponent.value = component
  sideProps.value = props
  sideWidth.value = typeof width === 'number' ? `${width}px` : width
  sideTitle.value = title
  onCloseCallback.value = onClose ?? null
  showSide.value = true

  await nextTick()
  if (method && sideRef.value?.[method]) {
    sideRef.value[method](props)
  }
}

function close() {
  showSide.value = false
  onCloseCallback.value?.()
}

defineExpose({ open, close })
provide('slideClose', close)

const mainStyle = computed(() =>
  showSide.value ? { width: `calc(100% - ${sideWidth.value})` } : {}
)
</script>

<style scoped>
.slide-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--gray-100);
  transition: all 0.3s;
  padding: 20px;
}

.main {
  flex: 1;
  transition: width 0.3s ease;
  min-width: 0;
}

.main--shrink {
  width: calc(100% - 400px);
  /* 👈 动态缩小主区域 */
}

.side-panel {
  min-width: 0;
  height: 100%;
  background: #fff;
  border-left: 1px solid #eee;
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
