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

    //load vue
    // const vueModuleFile = import.meta.glob(`./views/**/*.vue`, {
    //   import: 'default',
    //   eager: true
    // })
    // console.log(vueModuleFile)
    // const vueModule = await Promise.all(
    //   Object.keys(vueModuleFile).map(async (path) => {
    //     const component: any = await vueModuleFile[path]
    //     const result = path.match(/.*\/(.+).vue$/)
    //     console.log(path)
    //     if (result && component) {
    //       const name = result[1]
    //       if (name.toLowerCase() === 'index') {
    //       }
    //       return {
    //         name,
    //         component
    //       }
    //     }
    //   })
    // )
    // vueModule.forEach((module) => {
    //   if (module) {
    //     const { name, component } = module
    //     app.component(name, defineAsyncComponent(component))
    //   }
    // })
  } catch (error) {
    console.error(error)
  }

  return app
}

interface Views {
  [key: string]: any
}

const loadView = (name: string) => {
  const vueModuleFile = import.meta.glob(`./views/**/*.vue`, {
    import: 'default',
    eager: true
  })
  // let views: Views = {}
  // Object.keys(vueModuleFile).forEach((key) => {
  //   const result = key.match(/.*\/(.+).vue$/)
  //   if (result) {
  //     const name = result[1]
  //     const component = vueModuleFile[key]
  //     views[name] = component
  //   }
  // })

  // return views
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

const loadView1 = async (name: string) => {
  return (await import(`./views/${name}.vue`)).default || null
}

const loadComponents = async (name: string) => {
  return (await import(`./components/${name}.vue`)).default || null
}

export { init, loadView, loadComponents }
