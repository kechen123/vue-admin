import { createRouter, createWebHashHistory } from 'vue-router'
import { loadView, loadComponents } from '@/app'
import baseRoutes from './base'
import { Auth, NotCheckRouter } from './auth'

const customRoutes = [
  {
    path: 'Base',
    name: 'base',
    layout: ''
  },
  {
    path: 'Page1',
    name: 'page1',
    layout: 'Layout'
  },
  {
    path: 'Page2',
    name: 'page2',
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
      const layoutC = await loadComponents.apply(null, [layout])
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

await routes()

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

export default router
