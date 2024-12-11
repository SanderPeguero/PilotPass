import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ProviderContext } from './Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProviderContext>
    <HashRouter>
      <App />
    </HashRouter>
  </ProviderContext>
)
