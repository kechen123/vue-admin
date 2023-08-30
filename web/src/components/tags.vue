<template>
  <div class="tags">
    <el-scrollbar>
      <div class="container">
        <template v-for="item in tagsStore.tags">
          <div
            class="item"
            :class="[item.name === tagsStore.active.name ? 'active' : '']"
            @click.stop="tagClick(item)"
          >
            <span class="name">
              {{ item.name }}
            </span>
            <el-icon size="16" class="close" @click.stop="delPage(item.name)">
              <MIcon iconName="Close" />
            </el-icon>
          </div>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useTagsStore } from '@/stores/tags'

const route = useRoute()
const router = useRouter()
const tagsStore = useTagsStore()

watch(route, () => {
  setTags(route)
})

watch(
  () => tagsStore.active.path,
  (newVal) => {
    router.push(newVal)
  }
)

const tagClick = (item: any) => {
  tagsStore.changeTag(item.path)
}

const delPage = (name: string) => {
  tagsStore.removeTag(name)
}

// 设置标签
const setTags = (route: any) => {
  const isExist = tagsStore.tags.some((item) => {
    return item.path === route.fullPath
  })
  if (isExist) {
    tagsStore.changeTag(route.fullPath)
  } else {
    console.log(route.fullPath)
    tagsStore.addTag(route.fullPath)
  }
}
</script>

<style scoped lang="less">
.tags {
  user-select: none;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  // height: 32px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ebeef5;
  }

  .container {
    display: flex;
    align-items: center;
    height: 32px;

    .item {
      display: flex;
      align-items: center;
      height: 100%;
      border-right: solid 1px #ebeef5;
      padding: 0 4px 0 16px;
      cursor: pointer;

      .name {
        font-size: 14px;
        color: #606266;
      }

      &:hover {
        .close {
          opacity: 1;
        }
      }

      .close {
        opacity: 0;
        color: #909399;
        margin-left: 4px;
        border-radius: 4px;
        height: 20px;
        width: 20px;
        cursor: pointer;

        &:hover {
          color: #606266;
          background-color: #d1cfcf;
        }
      }
    }

    .active {
      background-color: #faf9f9;
      position: relative;
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #409eff;
      }

      .name {
        color: #409eff;
      }

      .close {
        opacity: 1;
      }
    }
  }
}
</style>
