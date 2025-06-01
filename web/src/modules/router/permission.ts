import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useRouterStore } from '@/stores/router'

interface Check {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next?: NavigationGuardNext
  router?: Router
}

type CheckFun = (check: Check) => any

const checkLegal: CheckFun = ({ to, from, router }) => {
  if (router && router.hasRoute(to.name as string)) {
    return false
  }
  // else if (
  //   (!to.name || (to.name && (to.name as string).indexOf('404') === -1)) &&
  //   from.matched.length > 1
  // ) {
  //   // return (from.matched[0].name as string) + '/404'
  //   console.log(from)
  //   return { name: '/404' }
  // }
  return { name: '/404' }
}

const checkHome: CheckFun = ({ to, from }) => {
  if (to.path === '/') {
    return { name: 'index' }
  }
  return false
}

const checkLogin: CheckFun = ({ to, from }) => {
  const token = localStorage.getItem('token')
  const login = token && token !== 'undefined' && token !== 'null' && token !== ''
  const isLoginPage = to.name && (to.name as string).indexOf('login') > -1
  if (!login && !isLoginPage) {
    return { name: '/login' }
  }
  return false
}

const checkAuth: CheckFun = ({ to, from }) => {
  const auth = true
  if (!auth) {
    return { name: '/login' }
  }
  return false
}

const setMenu: CheckFun = async ({ to, from }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return { name: '/login' }
  } else {
    const routerStore = useRouterStore()
    if (!routerStore.roles || routerStore.roles.length === 0) {
      await routerStore.initMenu()
    }
    return false
  }
}

const Auth = [checkLegal, checkLogin, checkAuth, setMenu]

const NotCheckRouter = ['/login', '/404']

export { Auth, NotCheckRouter }
