import { init } from './app'
;(async () => {
  const app = await init()
  app.mount('#app')
})()
