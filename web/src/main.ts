import { init } from './app'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
;(async () => {
  const app = await init()
  app.mount('#app')
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
})()
