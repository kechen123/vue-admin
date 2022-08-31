import { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

interface Check {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next?: NavigationGuardNext
  router?: Router
}

type CheckFun = (check: Check) => any

const checkLegal: CheckFun = ({ to, from, router }) => {
  console.log(router?.hasRoute('basePage'))
  console.log(router?.hasRoute('BasePage/Index'))
  console.log(to)

  if (router && router.hasRoute(to.name as string)) {
    return true
  }
  return { name: '404' }
}

const checkHome: CheckFun = ({ to, from }) => {
  if (to.path === '/') {
    return { name: 'home' }
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

const Auth = [checkHome, checkLegal, checkLogin, checkAuth]

const NotCheckRouter = ['login', '404']

export { Auth, NotCheckRouter }
