import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/less/app.css'
import '@/assets/less/theme.less'

const init = async () => {
  const app = createApp(App)
  try {
    const modulesFiles = import.meta.glob('./modules/**/index.ts')
    const modules = await Promise.all(
      Object.keys(modulesFiles).map(async (path) => {
        const module = await modulesFiles[path]()
        return module
      })
    )
    modules.forEach((module) => {
      const { default: plugin }: any = module
      if (plugin) {
        app.use(plugin)
      }
    })
  } catch (error) {
    console.error(error)
  }

  return app
}

const vueModuleFile = import.meta.glob(`./views/**/*.vue`, {
  import: 'default',
  eager: true
})

const loadView = (name: string) => {
  const path = `./views/${name}.vue`
  const keys = Object.keys(vueModuleFile)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === path) {
      return vueModuleFile[key]
    }
  }
  return null
}

const loadComponents = async (name: string) => {
  return (await import(`./components/${name}.vue`)).default || null
}

export { init, loadView, loadComponents }
