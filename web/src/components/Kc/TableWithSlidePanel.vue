<template>
  <SlideContainer ref="containerRef">
    <Kc :config="kcConfig">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </Kc>
  </SlideContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SlideContainer from '@/modules/slide-panel/SlideContainer.vue'
import Kc from './index.vue'
import type { KcConfig } from './types'

interface Props {
  config: KcConfig
  // 列显示配置
  columnDisplayConfig?: {
    // 当右侧栏目打开时隐藏的列
    hiddenWhenPanelOpen?: string[]
    // 当右侧栏目打开时始终显示的列（优先级高于隐藏列表）
    alwaysShow?: string[]
  }
}

const props = withDefaults(defineProps<Props>(), {
  columnDisplayConfig: () => ({
    hiddenWhenPanelOpen: [],
    alwaysShow: []
  })
})

// 面板状态
const panelState = ref(false)

// 动态计算列配置
const dynamicColumns = computed(() => {
  const originalColumns = props.config.table?.columns || []

  return originalColumns.map(column => {
    // 如果右侧栏目打开，检查是否需要隐藏该列
    if (panelState.value && column.prop) {
      // 如果列在始终显示列表中，则显示
      if (props.columnDisplayConfig.alwaysShow?.includes(column.prop)) {
        return column
      }
      // 如果列在隐藏列表中，则隐藏
      if (props.columnDisplayConfig.hiddenWhenPanelOpen?.includes(column.prop)) {
        return {
          ...column,
          show: false
        }
      }
    }
    return column
  })
})

// 动态配置
const kcConfig = computed<KcConfig>(() => ({
  ...props.config,
  table: {
    ...props.config.table,
    columns: dynamicColumns.value
  }
}))

const containerRef = ref()

// 打开右侧栏目
const openPanel = (options: {
  component: any
  data?: Record<string, any>
  width?: number
  title?: string
  onClose?: () => void
}) => {
  // 设置面板状态为打开
  panelState.value = true

  containerRef.value.open({
    default: {
      component: options.component,
      data: options.data || {},
      width: options.width || 600,
      title: options.title || '详情',
      onClose: () => {
        // 关闭时重置面板状态
        panelState.value = false
        options.onClose?.()
      }
    }
  })
}

// 关闭右侧栏目
const closePanel = () => {
  panelState.value = false
  containerRef.value?.close()
}

// 暴露方法
defineExpose({
  openPanel,
  closePanel,
  panelState
})
</script>
