<template>
  <el-input v-model="value" :placeholder="placeholder" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Search } from '@/common/types/search'
interface Input {
  search: Search
  modelValue: string
}
interface Emit {
  (e: 'update:modelValue', value: string): void
}
export default defineComponent({
  name: 'InputText',
  setup() {

    const props = defineProps<Input>()
    const emit = defineEmits<Emit>()

    const placeholder = ref((() => {
      if (props.search.placeholder && typeof props.search.placeholder === 'string') {
        return props.search.placeholder
      }
      return ''
    })())
    const value = ref(props.modelValue)

    watch(() => value.value, (val) => {
      emit('update:modelValue', val)
    })

    return { value, placeholder }
  }
})
</script>

