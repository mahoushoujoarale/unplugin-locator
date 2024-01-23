import { render } from 'preact'
import initClient from '../../../dist/core/client'
import { App } from './app.tsx'
import './index.css'

render(<App />, document.getElementById('app')!)

initClient()
