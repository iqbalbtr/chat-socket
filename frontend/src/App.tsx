import ChatPage from "@pages/ChatPage"
import HomePage from "@pages/HomePage"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="chat" element={<ChatPage />} />
    </Routes>
    )
}

export default App
