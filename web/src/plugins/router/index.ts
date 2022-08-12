import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { loadView } from '@/app'
import baseRoutes from './base'

const customRoutes = [
  {
    path: 'Base',
    name: 'Base',
    layout: ''
  },
  {
    path: 'Page1',
    name: 'Page1',
    layout: 'Layout'
  }
]

const routes = async () => {
  for (const n of customRoutes) {
    const { path, name, layout } = n
    const plugin = await loadView.apply(null, [path])
    if (!plugin) {
      continue
    }
    let component: any = {
      path: '/' + path,
      name,
      component: plugin
    }
    if (layout !== '' && !router.hasRoute(layout)) {
      const layoutC = await loadView.apply(null, [layout])
      if (layoutC) {
        const layoutComponent = {
          path: '/' + layout,
          name: layout,
          component: layoutC
        }
        router.addRoute(layoutComponent)
      }
    }
    if (layout !== '') {
      router.addRoute(layout, component)
    } else {
      router.addRoute(component)
    }
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes
})
routes()
router.beforeEach((to) => {
  console.log(to)
  // if (!hasNecessaryRoute(to)) {
  //   router.addRoute(generateRoute(to))
  //   // 触发重定向
  //   return to.fullPath
  // }
})

export default router
