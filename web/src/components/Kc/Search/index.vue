<template>
  <div class="kc-search">
    <el-form :model="searchData" class="search-form">
      <!-- 搜索区域 -->
      <div class="search-default">
        <div class="search-fields">
          <!-- 所有搜索项都在同一行 -->
          <FormGenerator :fields="allFields" :field-width="config.fieldWidth" v-model="searchData"
            @change="handleFieldChange" />

          <!-- 展开按钮 - 在搜索项末尾 -->
          <el-button v-if="hasMoreFields" @click="toggleExpand" class="expand-btn">
            <el-icon class="expand-icon" :class="{ 'is-expanded': isExpanded }">
              <ArrowDown />
            </el-icon>
            {{ isExpanded ? '收起' : '展开' }}
          </el-button>
        </div>

        <!-- 操作按钮 - 在最右侧 -->
        <div class="search-actions">
          <el-button v-if="config.showSearch !== false" type="primary" @click="handleSearch">
            搜索
          </el-button>
          <el-button v-if="config.showReset !== false" @click="handleReset">
            重置
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import FormGenerator from '../components/FormGenerator.vue'
import type { SearchConfig } from '../types'

interface Props {
  config: SearchConfig
  modelValue?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({ fields: [] }),
  modelValue: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  search: [data: Record<string, any>]
  reset: []
  change: [key: string, value: any]
}>()

const searchData = computed({
  get() {
    return props.modelValue || {}
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const isExpanded = ref(false)

// 默认显示字段数量
const defaultCount = computed(() => props.config.defaultCount || 2)

// 默认显示的字段
const defaultFields = computed(() =>
  props.config.fields.slice(0, defaultCount.value)
)

// 是否有更多字段需要展开
const hasMoreFields = computed(() =>
  props.config.fields.length > defaultCount.value
)

// 当前显示的字段 - 根据展开状态决定
const allFields = computed(() => {
  if (isExpanded.value) {
    return props.config.fields // 展开时显示所有字段
  } else {
    return defaultFields.value // 收起时只显示默认字段
  }
})

// 切换展开状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 处理字段变化
const handleFieldChange = (key: string, value: any) => {
  emit('change', key, value)
}

// 搜索
const handleSearch = () => {
  emit('search', searchData.value)
}

// 重置
const handleReset = () => {
  emit('update:modelValue', {})
  emit('reset')
}
</script>

<style lang="less" scoped>
.kc-search {
  padding: 16px;
  border: solid 1px var(--el-border-color);
  border-radius: 4px;
  margin-bottom: 16px;
  flex-shrink: 0; // 防止搜索区域被压缩

  .search-form {
    .search-default {
      display: flex;
      align-items: flex-end;
      gap: 16px;
      flex-wrap: wrap;

      .search-fields {
        display: flex;
        align-items: flex-end;
        gap: 16px;
        flex-wrap: wrap;
        flex: 1;

        .expand-btn {
          align-self: flex-end;
          margin-bottom: 0;

          .expand-icon {
            margin-right: 4px;
            transition: transform 0.3s;

            &.is-expanded {
              transform: rotate(180deg);
            }
          }
        }
      }

      .search-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
        flex-shrink: 0;
      }
    }
  }
}
</style>
