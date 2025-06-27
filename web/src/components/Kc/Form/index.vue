<template>
  <el-form ref="formRef" :model="formData" :rules="config.rules" :label-width="config.labelWidth || '100px'"
    :inline="config.inline || false" class="kc-form">
    <FormGenerator :fields="config.fields" v-model="formData" :field-width="config.fieldWidth"
      @change="handleFieldChange" />
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElForm } from 'element-plus'
import FormGenerator from '../components/FormGenerator.vue'
import type { FormField } from '../types'

interface FormConfig {
  fields: FormField[]
  rules?: Record<string, any>
  labelWidth?: string | number
  fieldWidth?: string | number
  inline?: boolean
}

interface Props {
  config: FormConfig
  modelValue?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  submit: [data: Record<string, any>]
  reset: []
  change: [key: string, value: any]
}>()

const formRef = ref()
const formData = ref<Record<string, any>>({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  formData.value = { ...val }
}, { deep: true })

watch(formData, (val) => {
  emit('update:modelValue', val)
}, { deep: true })

const handleFieldChange = (key: string, value: any) => {
  emit('change', key, value)
}
</script>

<style lang="less" scoped>
.kc-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  align-items: flex-start;

  .el-form-item {
    margin-bottom: 0;
    align-items: flex-start;
    min-width: 250px;
    flex: 0 0 250px;
    box-sizing: border-box;

    .el-form-item__label {
      text-align: right;
      font-weight: 500;
      color: var(--el-text-color-regular);
      padding-right: 8px;
      white-space: normal;
      word-break: break-all;
    }

    .el-form-item__content {
      text-align: left;
    }
  }
}
</style>
