<template>
  <div>
    <div>这是用户详情，ID: {{ userId }}</div>
    <el-button @click="handleClose">关闭</el-button>

    <!-- <template #footer>
      <div class="footer-bar">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </template> -->
  </div>
</template>

<script setup lang="ts">
defineProps<{ userId: string }>()

const close = inject<() => void>('slideClose')

function init(props: any) {
  console.log('初始化数据，userId:', props.userId)
}

const handleClose = () => {
  close?.()
}



defineExpose({ init })
</script>
