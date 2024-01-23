import { createApp } from 'vue'
import initClient from '../../../dist/core/client'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
initClient()
