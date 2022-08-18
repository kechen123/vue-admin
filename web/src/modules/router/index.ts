import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
import { loadView, loadComponents } from '@/app'
import baseRoutes from './base'

interface Check {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next?: NavigationGuardNext
}

type CheckFun = (check: Check) => any

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

const checkLogin: CheckFun = ({ to, from }) => {
  let login = true
  if (!login) {
    return { name: 'login' }
  } else {
    return false
  }
}

const checkAuth: CheckFun = ({ to, from }) => {
  let auth = true
  if (!auth) {
    return { name: 'login' }
  } else {
    return false
  }
}
const notCheckRouter = ['login', '404']
const checkFun = [checkLogin, checkAuth]

const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes
})

await routes()

router.beforeEach(async (to, from) => {
  let b = false
  for (let n of checkFun) {
    if (notCheckRouter.indexOf(to.name?.toString() || '') > -1) {
      break
    }
    b = await n({ to, from })
    if (b) {
      break
    }
  }
  if (b) return b
})

export default router
