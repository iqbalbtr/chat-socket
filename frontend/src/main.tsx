import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import SocketProvider from '@providers/SocketProvider.tsx'
import AuthProvider from '@providers/AuthProvider.tsx'
import ChatContext from '@contexts/chat/ChatContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <ChatContext>
            <App />
          </ChatContext>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
