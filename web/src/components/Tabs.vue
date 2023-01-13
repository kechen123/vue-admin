<template>
  <div class="tabs">
    <n-scrollbar x-scrollable>
      <div class="container ">
        <template v-for="(item, i) in tabData.list">
          <div class="item" :class="[item.name === tabData.active.name ? 'active' : '']" @click.stop="tabClick(item)">
            <span class="name">
              {{ item.name }}
            </span>
            <i-material-symbols:close class="close" @click.stop="delPage(item.name)" />
          </div>
        </template>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useTabsStore } from '@/store/tabs'
import { useRouter } from 'vue-router'

const themeVars = ref(useThemeVars())

interface Tab {
  name: string
  path: string
}

interface Tabs {
  active: Tab
  list: Array<Tab>
}
const tabsStore = useTabsStore()
const { active, list } = storeToRefs(tabsStore)
const { delTab, addTab } = tabsStore;
const router = useRouter()
const tabData = reactive<Tabs>({
  list: [],
  active: {
    name: '',
    path: ''
  }
})

const tabClick = (item: Tab) => {
  router.push(item.path)
  addTab(item)
};

const delPage = (item: string) => {
  delTab(item)
};

watch(() => active.value, (val) => {
  const name = router.currentRoute.value.path.split('/')[1].toLowerCase()
  if (val.name === name) {
    router.push(val)
  }
})
watchEffect(() => {
  tabData.list = list.value
  tabData.active = active.value
})
</script>

<style scoped>
.tabs {
  --n-border-color: rgb(239, 239, 245);
  --n-bg-color: #fff;
  @apply relative overflow-hidden select-none;
  background-color: var(--n-bg-color);

  border-bottom: solid 1px var(--n-border-color);
}


.container {
  @apply flex items-center h-8
}

.item {
  /* bg-green-100/70 */
  @apply relative flex items-center pl-4 pr-5 mt-[2px] h-full cursor-pointer hover: bg-light-400/20 hover:text-green-400 rounded-sm
}


.active {
  /* text-green-400 bg-green-100/70 */
  @apply bg-light-400 text-green-400;
}

.name {
  @apply mr-2
}

.close {
  @apply absolute right-2 box-border h-4 w-4 rounded-sm hover: text-light-200 hover:bg-green-400
}

@variants dark {
  .tabs {
    @apply text-gray-400;
    --n-bg-color: rgb(24, 24, 28);
    --n-border-color: rgba(255, 255, 255, 0.09);
  }

  .active {
    /* bg-green-300/20 */
    @apply bg-dark-400 text-green-500;
  }

  .item {
    /* bg-green-300/20 */
    @apply flex items-center pl-6 pr-6 h-full cursor-pointer hover: bg-dark-400
  }
}
</style>
