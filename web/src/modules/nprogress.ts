import { router } from './router'
import NProgress from 'nprogress'

export default () => {
  router.beforeEach(() => {
    console.log('11111')

    NProgress.start()
  })
  router.afterEach(() => {
    console.log('2222')
    NProgress.done()
  })
}
