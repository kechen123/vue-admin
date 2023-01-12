import type { App } from 'vue'
import fileRoutes from '~pages' // 引入文件路由表
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { useMenuStore } from '@/store/router'
import { Auth, NotCheckRouter } from '@/utils/auth/permission'
import { getMenus } from '@/utils/common/menu'

export const router = createRouter({
  routes: setupLayouts(fileRoutes),
  history: createWebHistory()
})

router.beforeEach(async (to, from) => {
  let b = false
  for (let fn of Auth) {
    if (NotCheckRouter.indexOf(to.name?.toString() || '') > -1) {
      break
    }
    b = await fn({ to, from, router })
    if (b) {
      break
    }
  }
  if (b) return b
})

router.afterEach(async (to, from, failure) => {
  const menuStore = useMenuStore()
  const menuJson = menuStore.state.menuJson

  const path: AuthRoute.Route[] = getMenus(menuJson, to.fullPath as string)
  menuStore.setBreadcrumb(path)
})
export default (app: App) => app.use(router)
