<template>
  <div class="tableContainer">
    <div class="tableContent">
      <el-table :data="tableData" v-loading="loading && showLoading" class="table" v-bind="options.attributes"
        v-on="tableEvents">
        <template v-for="col in columns" :key="col.prop || col.label">
          <RenderColumn :column="col">
            <template #[col.prop]="scope" v-if="col.type === 'slot'">
              <slot :name="col.prop" v-bind="scope" />
            </template>
          </RenderColumn>
        </template>
      </el-table>

      <!-- 分页组件 - 仅在请求模式下显示 -->
      <div class="pagination-wrapper" v-if="showPagination && isRequestMode">

        <el-pagination background v-model:current-page="pagination.page" v-model:page-size="pagination.size"
          :page-sizes="pageSizes" :total="total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TableConfig, PaginationResponse } from './types'
import RenderColumn from './components/Column'
import { useTable } from '@/hooks/useTable'

interface Props {
  config: TableConfig
}

const props = defineProps<Props>()

// 从配置中提取属性
const {
  columns,
  data: staticData,
  request,
  responseAdapter,
  showPagination = true,
  pageSizes = [10, 20, 50, 100],
  showLoading = true,
  options = {}
} = props.config


const tableEvents = computed(() => {
  const events: Record<string, any> = {}

  if (options.events?.onSelectionChange) {
    events['selection-change'] = options.events.onSelectionChange
  }
  if (options.events?.onRowClick) {
    events['row-click'] = options.events.onRowClick
  }
  if (options.events?.onCellClick) {
    events['cell-click'] = options.events.onCellClick
  }
  if (options.events?.onSortChange) {
    events['sort-change'] = options.events.onSortChange
  }
  if (options.events?.onFilterChange) {
    events['filter-change'] = options.events.onFilterChange
  }

  return events
})

// 判断是否为请求模式
const isRequestMode = computed(() => !!request)

// 默认适配器，适配你的接口格式
const defaultAdapter = (raw: any, params: any): PaginationResponse => ({
  list: raw.data,
  total: Number(raw.records),
  page: params.page, // 用请求参数里的当前页
  size: params.size  // 用请求参数里的每页条数
})

// 请求模式下的逻辑
const requestTable = useTable({
  request: async (params) => {
    if (!request) return { list: [], total: 0, page: 1, size: 10 }
    const raw = await request(params)
    return (responseAdapter || defaultAdapter)(raw, params)
  },
  defaultParams: props.config.defaultParams || {},
  defaultPagination: props.config.defaultPagination || {},
  beforeRequest: props.config.beforeRequest,
  immediate: props.config.immediate !== false
})

// 静态数据模式下的逻辑
const staticTableData = ref<any[]>([])
const staticLoading = ref(false)
const staticTotal = ref(0)

// 监听静态数据变化
watch(
  () => staticData,
  (newData) => {
    if (!isRequestMode.value && newData) {
      staticTableData.value = newData
      staticTotal.value = newData.length
    }
  },
  { immediate: true, deep: true }
)

// 统一的数据源
const tableData = computed(() => {
  return isRequestMode.value ? requestTable.data.value : staticTableData.value
})
console.log(requestTable)

const loading = computed(() => {
  return isRequestMode.value ? requestTable.loading.value : staticLoading.value
})

const total = computed(() => {
  return isRequestMode.value ? requestTable.total.value : staticTotal.value
})

const pagination = computed(() => {
  return isRequestMode.value ? requestTable.pagination : { page: 1, size: 10 }
})

// 分页事件处理（仅在请求模式下有效）
const handleSizeChange = (size: number) => {
  if (isRequestMode.value) {
    requestTable.handleSizeChange(size)
  }
}

const handleCurrentChange = (page: number) => {
  if (isRequestMode.value) {
    requestTable.handleCurrentChange(page)
  }
}

// 暴露方法给父组件
const exposedMethods = computed(() => {
  if (isRequestMode.value) {
    return {
      fetchData: requestTable.fetchData,
      resetPagination: requestTable.resetPagination,
      setSearchParams: requestTable.setSearchParams,
      resetSearchParams: requestTable.resetSearchParams,
      refresh: requestTable.refresh,
      searchParams: requestTable.searchParams,
      pagination: requestTable.pagination
    }
  } else {
    return {
      // 静态数据模式下的方法
      updateData: (data: any[]) => {
        staticTableData.value = data
        staticTotal.value = data.length
      },
      setLoading: (loading: boolean) => {
        staticLoading.value = loading
      }
    }
  }
})

defineExpose(exposedMethods.value)

// 配置校验
if (!request && !staticData) {
  console.error('KcTable: 必须提供 request 或 data 参数之一')
}
</script>

<style lang="less" scoped>
.tableContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;

  .tableContent {

    overflow: auto;
    flex: 1;
    display: flex;
    flex-direction: column;


    .table {
      flex: 1;
      border: solid 1px var(--el-border-color);
      border-radius: 4px;

      :deep(.el-table__inner-wrapper) {
        &::before {
          display: none;
        }
      }
    }

    .pagination-wrapper {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
