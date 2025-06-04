<script setup lang="ts">
import { inject, ref } from 'vue'
import { useResizablePanel } from './useResizablePanel'

const props = defineProps<{ title: string }>()

const close = inject<() => void>('slideClose')

const fullscreen = ref(false)

const { width, startResize } = useResizablePanel({
  storageKey: 'my-app-side-width',
  // onResizeEnd: (newWidth) => {
  //   console.log('面板宽度调整为:', newWidth)
  // }
})

const toggleFullscreen = () => {
  fullscreen.value = !fullscreen.value
}
const onClose = () => close?.()
</script>

<template>
  <div class="side-panel-wrapper" :class="{ fullscreen }" :style="{ width: fullscreen ? '100%' : width + 'px' }">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="actions">
        <button @click="toggleFullscreen">{{ fullscreen ? '还原' : '全屏' }}</button>
        <button @click="onClose">关闭</button>
      </div>
    </div>
    <div class="body">
      <slot />
    </div>
    <!-- 拖拽条：仅在 hover 时显示 -->
    <div v-if="!fullscreen" class="resizer" @mousedown="startResize" />
  </div>
</template>

<style scoped>
.side-panel-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-left: 1px solid #eee;
  transition: all 0.3s ease;
  transform: scale(1);
  overflow: hidden;
}

.side-panel-wrapper.fullscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
}

/* 拖拽线默认隐藏，hover 时显示 */
.side-panel-wrapper:not(.fullscreen):hover .resizer {
  opacity: 1;
}

.resizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  cursor: ew-resize;
  opacity: 0;
  transition: opacity 0.2s ease;
  background: rgba(0, 0, 0, 0.05);
}

.resizer:hover {
  background: rgba(0, 0, 0, 0.15);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: #f5f5f5;
}

.actions button {
  margin-left: 8px;
}

.body {
  flex: 1;
  overflow: auto;
  padding: 16px;
}
</style>
