<template>
  <div class="login-container">
    <div class="content">
      <Concept class="concept" />
      <div class="login">
        <div class="logo">欢迎登录</div>
        <div class="login-form">
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="账号密码登录" name="first">
              <el-form
                class="form"
                ref="ruleFormRef"
                label-position="left"
                :model="ruleForm"
                status-icon
                :rules="rules"
              >
                <el-form-item prop="username">
                  <el-input
                    v-model="ruleForm.username"
                    type="password"
                    autocomplete="off"
                    :prefix-icon="Search"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="ruleForm.password"
                    type="text"
                    autocomplete="off"
                    :prefix-icon="Calendar"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="loginSubmit" @click="submitForm(ruleFormRef)"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="second">
              <el-form
                class="form"
                ref="ruleFormRef"
                label-position="left"
                :model="ruleForm"
                status-icon
                :rules="rules"
              >
                <el-form-item prop="username">
                  <el-input
                    v-model="ruleForm.username"
                    type="password"
                    autocomplete="off"
                    :prefix-icon="Search"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="ruleForm.password"
                    type="text"
                    autocomplete="off"
                    :prefix-icon="Calendar"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="loginSubmit" @click="submitForm(ruleFormRef)"
                    >登录</el-button
                  >
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
import Concept from '@/assets/svg/concept.svg'
import { useRouterStore } from '@/stores/router'

const router = useRouter()
const routerStore = useRouterStore()
const ruleFormRef = ref<FormInstance>()
const activeName = ref('first')

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
      axios.post('/op/login', ruleForm).then((res: any) => {
        if (res.status === 200) {
          routerStore.addRoles(res.roles)
          localStorage.setItem('token', res.token)
          router.push('/')
        } else {
          console.log('error submit!')
        }
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
  width: 100%;
  opacity: 1;
  background: linear-gradient(
    180deg,
    rgba(77, 58, 249, 1) 0%,
    rgba(59, 77, 254, 1) 45.72%,
    rgba(26, 104, 255, 1) 100%
  );
  height: 100vh;
  position: relative;

  .content {
    position: absolute;
    top: 80px;
    left: 80px;
    right: 80px;
    bottom: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;
    background: #fff;
    .concept {
      width: 600px;
    }

    .login {
      width: 550px;
      height: 570px;
      background-color: #fff;
      border-radius: 10px;
      padding: 50px 80px;
      border: 1px solid rgba(245, 245, 245, 1);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

      .logo {
        text-align: center;
        font-size: 40px;
        font-weight: 800;
        color: #3d3d3d;
      }

      .login-form {
        margin-top: 40px;

        .tabs {
          --el-font-size-base: 18px;
          :deep(.el-tabs__nav-scroll) {
            display: flex;
            justify-content: center;
          }
          :deep(.el-tabs__nav-wrap::after) {
            height: 0;
          }
        }
        .form {
          width: 300px;
          margin: 40px auto;
          :deep(.el-input__inner) {
            height: 40px;
          }
          .loginSubmit {
            margin-top: 40px;
            width: 100%;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
<route lang="json">
{
  "meta": {
    "requiresAuth": false,
    "layout": "custom"
  }
}
</route>
