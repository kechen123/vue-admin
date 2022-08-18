import App from './App.vue'
import './style.css'

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

const loadView = async (name: string) => {
  return (await import(`./views/${name}.vue`)).default || null
}

const loadComponents = async (name: string) => {
  return (await import(`./components/${name}.vue`)).default || null
}

export { init, loadView, loadComponents }
