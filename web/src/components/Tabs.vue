<template>
  <div class="tabs">
    <div class="list">
      <template v-for="(item, i) in tabData.list">
        <div class="item" :class="[item === tabData.active ? 'active' : '']" @click.stop="tabClick(item)">
          <div class="label">{{ item }}</div>
          <div class="actions">
            <div class="bar">
              <div class="icon" @click.stop="delPage(item)">
                <el-icon>
                  <CloseBold />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTabsStore } from '@/modules/store/tabs'
import { useRouter } from 'vue-router'

type Tab = {
  active: string
  list: Array<string>
}
const tabsStore = useTabsStore()
const { active, list } = storeToRefs(tabsStore)
const { delTab, addTab } = tabsStore;
const router = useRouter()
const tabData = reactive<Tab>({
  list: [],
  active: ''
})

const tabClick = (item: string) => {
  router.push(item)
  addTab(item)
};
const delPage = (item: string) => {
  delTab(item)
};

watch(() => active.value, (val) => {
  const name = router.currentRoute.value.path.split('/')[1].toLowerCase()
  if (val === name) {
    router.push(val)
  }
})
watchEffect(() => {
  tabData.list = list.value
  tabData.active = active.value
})
</script>

<style scoped lang="less">
.tabs {
  position: relative;
  overflow: hidden;
  background-color: var(--el-bg-color);
  user-select: none;

  .list {
    display: flex;
    height: 35px;
    // padding: 6px;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: var(--el-border);

    .item {
      width: 120px;
      min-width: fit-content;
      min-width: -moz-fit-content;
      flex-shrink: 0;
      position: relative;
      display: flex;
      white-space: nowrap;
      cursor: pointer;
      height: 100%;
      box-sizing: border-box;
      padding-left: 10px;
      // margin-right: 4px;
      left: auto;
      color: var(--el-button-text-color);
      border-right: var(--el-border);
      // border: var(--tabs-btn-border);
      // border-radius: 2px;


      .label {
        white-space: nowrap;
        flex: 1;
        margin-top: auto;
        margin-bottom: auto;
        line-height: 35px;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .actions {
        margin-top: auto;
        margin-bottom: auto;
        width: 28px;

        .bar {
          white-space: nowrap;
          display: flex;
          margin: 0 auto;
          padding: 0;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;

          .icon {
            padding: 2px;
            color: inherit;
            border-radius: 5px;
            opacity: 0;

            &:hover {
              background-color: var(--el-color-primary-light-3);
              color: var(--el-text-color-primary);
              opacity: 1;
            }

            >* {
              color: inherit;
              display: block;
            }
          }

        }
      }

      &:hover {
        .actions .bar .icon {
          opacity: 1;
        }
      }
    }

    .active {
      background-color: var(--el-color-primary-light-9);

      .actions .bar .icon {
        opacity: 1;
      }
    }
  }

  .list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .list:hover::-webkit-scrollbar {
    width: 12px;
    height: 4px;
  }

  .list::-webkit-scrollbar-thumb:hover {
    background: #333;
  }

  .list::-webkit-scrollbar-thumb {
    background: rgba(51, 51, 51, 0.4);
  }

  .list::-webkit-scrollbar-track {
    border-radius: 0;
    background: transparent;
  }

}
</style>