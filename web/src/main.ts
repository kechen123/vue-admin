import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as modules from '@/modules/index'
// import '../mock'
import '@/assets/less/app.less'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
for (const [, module] of Object.entries(modules)) {
  app.use(module)
}
app.mount('#app')
