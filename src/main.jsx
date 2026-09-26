import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './New Structure/App'
import './index.css'
import { ProviderContext } from './New Structure/contexts/Context'
import { SettingsProvider } from './contexts/SettingsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SettingsProvider>
  <ProviderContext>
    <HashRouter>
      <App />
    </HashRouter>
  </ProviderContext>
  </SettingsProvider>
)
