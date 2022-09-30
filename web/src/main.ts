import { createApp } from 'vue'
import './assets/style/main.css'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
