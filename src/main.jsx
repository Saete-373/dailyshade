import App from './App'
import ReactDOM from "react-dom/client"
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router as BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
