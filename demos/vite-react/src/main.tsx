import React from 'react'
import ReactDOM from 'react-dom/client'
import initClient from '../../../dist/core/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

initClient()
