import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unpluginLocator from '../../dist/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unpluginLocator()],
})
