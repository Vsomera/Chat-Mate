import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from "./context/userContext.tsx"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
      <ToastContainer theme="dark" position="top-right" className="toastContainerCss" />
    </UserContextProvider>
  </React.StrictMode>,
)
