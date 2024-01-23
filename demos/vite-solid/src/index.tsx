/* @refresh reload */
import { render } from 'solid-js/web'
import initClient from '../../../dist/core/client'

import './index.css'
import App from './App'

const root = document.getElementById('root')

render(() => <App />, root!)

initClient()
