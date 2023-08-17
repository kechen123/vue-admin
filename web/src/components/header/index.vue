<template>
  <div class="body">
    <HeaderLeft />
    <HeaderNavigation />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--header-bg-color);
  color: var(--header-color);
  padding: 0 20px;
  border-bottom: var(--header-border);
}
</style>
