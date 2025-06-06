<template>
  <div class="slide-container" ref="containerRef">
    <div class="main" :style="{ width: layout.contentLayout.realTimeWidth + 'px' }">
      <slot name="main" />
    </div>

    <transition name="slide">
      <div v-if="showSide" id="right" class="side-panel" :style="{ width: layout.rightLayout.realTimeWidth + 'px' }">
        <!-- 拖拽条：仅在 hover 时显示 -->
        <div ref="rightLineRef" class="resizer" />
        <SidePanelWrapper :title="sideTitle">
          <component :is="sideComponent" v-bind="sideProps" ref="sideRef" />
        </SidePanelWrapper>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import useMouse from './useMouseDrop'
import SidePanelWrapper from './SidePanelWrapper.vue'

interface OpenOptions {
  component: any
  props?: Record<string, any>
  method?: string
  width?: number
  title?: string
  onClose?: () => void
}

const layoutStore = useLayoutStore()

const showSide = ref(false)
const sideComponent = shallowRef()
const sideProps = ref({})
const sideRef = ref()
const sideTitle = ref('详情')
const containerRef = ref()
const onCloseCallback = ref<(() => void) | null>(null)
const mainRect = reactive({
  width: 0,
  height: 0
})
const layout = reactive<MainLayout>(layoutStore.mainLayout)

const downRight = () => {
  layout.rightLayout.downWidth = layout.rightLayout.realTimeWidth
}
const moveRight = (e: MouseEvent, mouse: any) => {
  if (mouse.state === 'down') {
    let w = layout.rightLayout.downWidth - mouse.x
    const minWidth = layout.rightLayout.minWidth
    if (w < minWidth) {
      w = minWidth
    }
    layout.rightLayout.realTimeWidth = w
    layout.contentLayout.realTimeWidth = mainRect.width - w
  }
}

const [rightLineRef, addListener] = useMouse({ down: downRight, move: moveRight })


async function open({
  component,
  props = {},
  method = 'init',
  width = 400,
  title = '详情',
  onClose
}: OpenOptions) {
  sideComponent.value = component
  sideProps.value = props
  sideTitle.value = title
  layout.contentLayout.realTimeWidth = mainRect.width - width
  layout.rightLayout.realTimeWidth = width
  onCloseCallback.value = onClose ?? null
  showSide.value = true

  await nextTick()
  addListener()
  if (method && sideRef.value?.[method]) {
    sideRef.value[method](props)
  }
}

function close() {
  showSide.value = false
  onCloseCallback.value?.()
}

onMounted(() => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    mainRect.width = rect.width
    mainRect.height = rect.height
    layout.contentLayout.downWidth = rect.width
    layout.contentLayout.realTimeWidth = rect.width
  }
})


defineExpose({ open, close })
provide('slideClose', close)


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
}

.main {
  flex: 1;
  transition: width 0.3s ease;
  min-width: 0;
  padding: 20px;
  user-select: none;
}

.side-panel {
  position: relative;
  min-width: 0;
  height: 100%;
  border-left: 1px solid var(--main-border-color);
  transition: none;
  user-select: none;
}

.side-panel.is-animating {
  transition: transform 0.3s ease;
}

/* 拖拽线默认隐藏，hover 时显示 */
.side-panel:hover .resizer {
  opacity: 1;
  z-index: 1;
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
  background: var(--gray-60);
}

.resizer:hover {
  background: var(--gray-50);
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
