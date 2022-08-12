import App from './App.vue'
import './style.css'
const init = async () => {
  const app = createApp(App)
  const plugins = ['router', 'store']
  for (let n of plugins) {
    const plugin = await loadPlugin.apply(null, [n + '/index'])
    if (plugin) {
      app.use(plugin)
    }
  }
  return app
}

const loadPlugin = async (name: string) => {
  return (await import(`./plugins/${name}`)).default || null
}

const loadView = async (name: string) => {
  return (await import(`./views/${name}.vue`)).default || null
}

export { init, loadView }
