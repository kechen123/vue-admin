<template>
  <el-table :data="data" border v-loading="loading || false" style="width: 100%">
    <template v-for="col in columns" :key="col.prop || col.label">


      <RenderColumn :column="col">
        <template #[col.prop]="scope" v-if="col.type === 'slot'">
          <slot :name="col.prop" v-bind="scope" />
        </template>
      </RenderColumn>
      <!-- <el-table-column v-bind="col" /> -->
      <!-- <el-table-column :label="col.label" :prop="col.prop" width="120" /> -->
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import type { ColumnProps } from './types'
import RenderColumn from './components/Column'

defineProps<{
  columns: ColumnProps[]
  data: any[]
  loading?: boolean
}>()


</script>
