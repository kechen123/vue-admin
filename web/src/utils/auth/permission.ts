import { router } from './index'
import {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/store/router'

interface Check {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next?: NavigationGuardNext
  router?: Router
}

type CheckFun = (check: Check) => any

const checkLegal: CheckFun = ({ to, from, router }) => {
  // console.log(router?.hasRoute('basePage'))
  // console.log(router?.hasRoute('BasePage/Index'))
  // console.log(from)

  if (router && router.hasRoute(to.name as string)) {
    return true
  } else if (
    (!to.name || (to.name && (to.name as string).indexOf('404') === -1)) &&
    from.matched.length > 1
  ) {
    return (from.matched[0].name as string) + '404'
  }
  return { name: '404' }
}

const checkHome: CheckFun = ({ to, from }) => {
  if (to.path === '/') {
    return { name: 'index' }
  }
  return false
}

const checkLogin: CheckFun = ({ to, from }) => {
  let login = true
  if (!login) {
    return { name: 'login' }
  }
  return false
}

const checkAuth: CheckFun = ({ to, from }) => {
  let auth = true
  if (!auth) {
    return { name: 'login' }
  }
  return false
}

const setMenu: CheckFun = async ({ to, from }) => {
  const menuStore = useMenuStore()
  if (!menuStore.state.isInitAuthRoute) {
    await menuStore.initMenu()
  }
  return false
}

const Auth = [setMenu, checkLegal, checkLogin, checkAuth]

const NotCheckRouter = ['login', '404']

export { Auth, NotCheckRouter }
