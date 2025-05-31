<template>
  <div class="navbar-collapse">
    <ul>
      <li>
        <el-badge :value="12" class="item">
          <el-icon size="20">
            <MIcon iconName="ChatDotSquare" />
          </el-icon>
        </el-badge>
      </li>
      <li>
        <el-icon size="20">
          <MIcon iconName="FullScreen" />
        </el-icon>
      </li>
      <li>
        <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" />
      </li>
      <li>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user">
              <img src="@/assets/user.jpg" />
              <span>柯大晨</span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in dropdownList" :key="item.path" :command="item.path"
                :divided="index == dropdownList.length - 1">
                <el-icon :size="16">
                  <MIcon :iconName="item.icon" />
                </el-icon>
                <span>{{ item.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import UserLogo from '@/assets/svg/user.svg'
const isDark = useDark()
const router = useRouter()
const dropdownList = ref([
  {
    label: '个人中心',
    icon: 'User',
    path: '/user'
  },
  {
    label: '设置',
    icon: 'Setting',
    path: '/setting'
  },
  {
    label: '退出登录',
    icon: 'SwitchButton',
    path: 'logout'
  }
])

const handleCommand = (command: string | number | object) => {
  if (command === 'logout') {
    localStorage.removeItem('token')
    router.push('/login')
  } else {
    router.push(command as string)
  }
}

watch(isDark, (val) => {
  console.log('count 变了:', val)
  useToggle(val)
})
</script>

<style scoped lang="less">
.navbar-collapse {
  display: flex;
  align-items: center;
  width: 100%;

  ul {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    li {
      padding: 0 20px;
      display: flex;
      align-items: center;
      color: var(--top-bar-text);
      cursor: pointer;

      .el-dropdown-link {
        outline: 0;
        color: var(--top-bar-text);

        .user {
          display: flex;
          align-items: center;
          gap: 10px;

          img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }

          .head {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
