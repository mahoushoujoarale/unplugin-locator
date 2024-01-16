import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import unpluginLocator from '../../dist/vite'

export default defineConfig({
  plugins: [solid(), unpluginLocator()],
})
