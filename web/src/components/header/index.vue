<template>
  <div class="body">
    <!-- <HeaderLeft /> -->
    <HeaderNavigation />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--top-bar-bg);
  color: var(--top-bar-text);
  padding: 10px 20px;
  border-bottom: var(--top-bar-border);
}
</style>
