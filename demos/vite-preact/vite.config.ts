import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import unpluginLocator from '../../dist/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unpluginLocator(), preact()],
})
