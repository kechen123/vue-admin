<template>
  <div class="slide-container" ref="containerRef">
    <div class="main" :style="{ 'flex-basis': layout.contentLayout.realTimeWidth + 'px' }">
      <slot />
    </div>

    <transition name="slide" @after-enter="onSlideInComplete">
      <div v-if="sidePanelState.show" id="right" class="side-panel"
        :style="{ 'flex-basis': layout.rightLayout.realTimeWidth + 'px' }">
        <div ref="rightLineRef" class="resizer" />
        <SidePanelWrapper :title="sidePanelState.title">
          <component :is="sidePanelState.sideComponent" v-bind="sidePanelState.sideProps"
            :ref="(el: any) => (sidePanelState.sideRef = el)" />
          <template #footer>
            <component v-if="sidePanelState.footerComponent" :is="sidePanelState.footerComponent"
              v-bind="sidePanelState.footerProps" :ref="(el: any) => (sidePanelState.footerRef = el)" />
          </template>
        </SidePanelWrapper>
      </div>
    </transition>
  </div>
</template>


<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import useMouse from './useMouseDrop'
import useElementResize from './useElementResize'
import SidePanelWrapper from './SidePanelWrapper.vue'


const layoutStore = useLayoutStore()
const layout = layoutStore.mainLayout

const mainRect = reactive({
  width: 0,
  height: 0
})

const sidePanelState = reactive({
  show: false,
  title: '详情',
  sideComponent: shallowRef(),
  sideProps: {},
  footerComponent: shallowRef(),
  footerProps: {},
  sideRef: null as any,
  footerRef: null as any,
})


const containerRef = ref()
const onCloseCallback = ref<(() => void) | null>(null)

const downRight = () => {
  layout.rightLayout.downWidth = layout.rightLayout.realTimeWidth
}

const moveRight = (e: MouseEvent, mouse: any) => {
  if (mouse.state === 'down') {
    let w = layout.rightLayout.downWidth - mouse.x
    const minWidth = layout.rightLayout.minWidth
    if (w < minWidth) w = minWidth
    layout.rightLayout.realTimeWidth = w
    layout.contentLayout.realTimeWidth = mainRect.width - w
  }
}

const [rightLineRef, addListener] = useMouse({ down: downRight, move: moveRight })
// const [containerRef] = useElementResize({ resize: bodyReSize, className: 'slide-container' })

interface SideOpenOptions {
  default: {
    component: any
    props?: Record<string, any>
    method?: string
    width?: number
    title?: string
    onClose?: () => void
  }
  footer?: {
    component: any
    props?: Record<string, any>
    method?: string
  }
}

async function open(params: SideOpenOptions) {
  const {
    default: {
      component,
      props = {},
      method = 'init',
      width = 400,
      title = '详情',
      onClose
    },
    footer
  } = params

  sidePanelState.sideComponent = component
  sidePanelState.sideProps = props
  sidePanelState.title = title
  sidePanelState.show = true
  onCloseCallback.value = onClose ?? null

  if (footer) {
    sidePanelState.footerComponent = footer.component
    sidePanelState.footerProps = footer.props || {}
  } else {
    sidePanelState.footerComponent = null
    sidePanelState.footerProps = {}
  }
  layout.contentLayout.realTimeWidth = mainRect.width - width
  layout.rightLayout.realTimeWidth = width

  await nextTick()
  addListener()

  // 调用 exposed 方法
  if (method && sidePanelState.sideRef?.[method]) {
    sidePanelState.sideRef[method](props)
  }

  if (footer?.method && sidePanelState.footerRef?.[footer.method]) {
    sidePanelState.footerRef[footer.method](footer.props || {})
  }
}

function close() {
  sidePanelState.show = false
  onCloseCallback.value?.()
}

const onSlideInComplete = () => {
  // updateContentLayout()
}

const updateContentLayout = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    // console.log('updateContentLayout>>.', rect)
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    const width = innerWidth - rect.x - 20
    const height = innerHeight - rect.y - 20
    mainRect.width = width
    mainRect.height = height
    layout.contentLayout.downWidth = width - (sidePanelState.show ? layout.rightLayout.realTimeWidth : 0)
    layout.contentLayout.realTimeWidth = width - (sidePanelState.show ? layout.rightLayout.realTimeWidth : 0)
  }
}

onMounted(() => {
  updateContentLayout()
})

defineExpose({ open, close, updateContentLayout })
provide('slideClose', close)

</script>

<style scoped>
.slide-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--el-bg-color);
  transition: all 0.3s;
  border-radius: 8px;
  border: solid 1px var(--el-border-color);
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
  border-left: 1px solid var(--el-border-color);
  transition: none;
  user-select: none;
}

.side-panel.is-animating {
  transition: transform 0.3s ease;
}

/* 拖拽线默认隐藏，hover 时显示 */
.resizer:hover {
  opacity: 1;
  z-index: 1;
}

.resizer {
  width: 4px;
  height: 100%;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: background-color 0.1s ease-out;
    background: transparent;
  }
}

.hover:before {
  background: var(--el-color-primary);
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
