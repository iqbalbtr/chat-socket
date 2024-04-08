import MainLayout from '@components/layouts/MainLayout';
import ChatContainer from '@components/pages/chat/ChatContainer';
import ContactContainer from '@components/pages/chat/ContactContainer';

function ChatPage() {

  return (
    <MainLayout>
      <div style={{
        minHeight: "100vh",
        width: "100%",
        position: "fixed",
        display: "flex"
      }}>
        <ContactContainer />
        <ChatContainer />
      </div>
    </MainLayout>
  )
}

export default ChatPage
