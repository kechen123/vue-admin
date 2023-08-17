<template>
  <div class="login-container">
    <Concept class="concept" />
    <div class="login">
      <div class="logo">
        <Logo />
      </div>
      <div class="login-form">
        <el-form ref="ruleFormRef" label-position="top" :model="ruleForm" status-icon :rules="rules" label-width="50px"
          class="form">
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginSubmit" @click="submitForm(ruleFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import axios from '@/utils/http/axios'
import Concept from '@/assets/svg/concept.svg'
import Logo from '@/assets/svg/logo.svg'
import { useRouterStore } from '@/stores/router'

const router = useRouter()
const routerStore = useRouterStore()
const ruleFormRef = ref<FormInstance>()

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
  background-color: #FFF;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  .concept {
    width: 800px;
  }

  .login {
    width: 400px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px #ccc;

    .logo {
      text-align: center;

      svg {
        width: 100px;
        height: 100px;
        fill: var(--sidebar-text-color);
      }
    }

    .login-form {
      margin-top: 20px;

      .form {
        width: 300px;
        margin: 0 auto;

        .loginSubmit {
          margin-top: 40px;
          width: 100%;
          height: 40px;
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
