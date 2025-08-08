<template>
  <div class="login-container">
    <div class="content">
      <Login class="concept" />
      <div class="login">
        <div class="logo">欢迎登录</div>
        <div class="login-form">
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="账号密码登录" name="first">
              <el-form class="form" ref="ruleFormRef" label-position="left" :model="ruleForm" status-icon
                :rules="rules">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" type="password" autocomplete="off" :prefix-icon="Search" />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="ruleForm.password" type="text" autocomplete="off" :prefix-icon="Calendar" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="loginSubmit" @click="submitForm(ruleFormRef)"
                    :loading="loading">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="second">
              <el-form class="form" ref="ruleFormRef" label-position="left" :model="ruleForm" status-icon
                :rules="rules">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" type="password" autocomplete="off" :prefix-icon="Search" />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="ruleForm.password" type="text" autocomplete="off" :prefix-icon="Calendar" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="loginSubmit" @click="submitForm(ruleFormRef)"
                    :loading="loading">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext, FormInstance, FormRules } from 'element-plus'
import { Calendar, Search } from '@element-plus/icons-vue'
import axios from '@/utils/http/axios'
import Login from '@/assets/svg/login.svg'
import { useRouterStore } from '@/stores/router'

const router = useRouter()
const routerStore = useRouterStore()
const ruleFormRef = ref<FormInstance>()
const activeName = ref('first')
const loading = ref(false)

// const token = useStorage('token', '')
// token.value = ''

const ruleForm = reactive({
  username: 'admin',
  password: '123456'
})

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }]
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      loading.value = true
      axios.post('/op/login', ruleForm).then((res: any) => {
        if (res.status === 200) {
          routerStore.addRoles(res.roles)
          localStorage.setItem('token', res.token)
          router.push('/')
        } else {
          console.log('error submit!')
        }
      }).finally(() => {
        loading.value = false
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<style lang="less" scoped>
.login-container {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  color: #333;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4ebf5 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    gap: 60px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    padding: 50px 60px;

    .concept {
      width: 420px;
      flex-shrink: 0;
    }

    .login {
      width: 360px; // 更紧凑
      background-color: #fff;

      .logo {
        font-size: 26px;
        font-weight: 800;
        color: #2b2b2b;
        letter-spacing: 0.5px;
        margin-bottom: 20px;
      }

      .login-form {
        .tabs {
          --el-font-size-base: 14px;

          :deep(.el-tabs__nav-scroll) {
            justify-content: flex-start; // Tab 居左
          }

          :deep(.el-tabs__active-bar) {
            height: 3px;
            border-radius: 2px;
            background-color: #409eff;
          }
        }

        .form {
          width: 100%;
          margin-top: 20px;

          :deep(.el-input__wrapper) {
            height: 40px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          :deep(.el-input__wrapper.is-focus) {
            box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.3);
          }

          .loginSubmit {
            margin-top: 30px;
            width: 100%;
            height: 40px;
            border-radius: 8px;
            font-size: 14px;
            background: linear-gradient(90deg, #409eff, #66b1ff);
            border: none;
            transition: all 0.3s ease;
          }

          .loginSubmit:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
          }
        }
      }
    }
  }
}

// 响应式
@media (max-width: 900px) {
  .login-container {
    .content {
      flex-direction: column;
      padding: 40px;

      .concept {
        display: none;
      }

      .login {
        width: 100%;
      }
    }
  }
}
</style>

<route lang="json">{
  "meta": {
    "requiresAuth": false,
    "layout": "custom"
  }
}</route>
