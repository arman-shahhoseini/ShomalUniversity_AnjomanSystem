import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminPanel from './AdminPanel'
import './index.css'

// Simple router based on URL path
const AppRouter = () => {
  const path = window.location.pathname
  
  if (path === '/admin' || path === '/admin/') {
    return <AdminPanel />
  }
  
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)