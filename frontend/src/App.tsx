import ChatPage from "@pages/ChatPage"
import HomePage from "@pages/HomePage"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "@components/layouts/AuthLayout"
import LoginForm from "@components/fragments/LoginForm"
import RegisterForm from "@components/fragments/RegisterForm"
import ChatContext from "@contexts/chat/ChatContext"

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="chat"
        element={
          <ChatContext>
            <ChatPage />
          </ChatContext>
        }
      />
      <Route path="auth" element={<AuthLayout />} >
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
    </Routes>
  )
}

export default App
