<template>
  <div class="header">
    <div class="logo">
      <img class="logo" alt="Vue logo" src="src/assets/images/logo.png" />
    </div>

    <div class="info">
      <el-switch
        v-model="isDark"
        inline-prompt
        :change="toggleDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        style="--el-switch-on-color: var(--el-color-info-light-7); --el-switch-off-color:var(--el-color-info-light-5)" />


      <el-dropdown>
        <div class="user">
          <el-avatar
            :size="34"
            src="src/assets/images/user.png" />
          <span>admin</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--el-text-color-primary);

  .logo {
    width: 130px;
    height: 50px;
    cursor: pointer;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;

    >* {
      margin-left: 10px;
    }

    .user {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>