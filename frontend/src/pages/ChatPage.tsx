import MainLayout from '@components/layouts/MainLayout';
import ChatContainer from '@components/pages/chat/ChatContainer';
import ContactContainer from '@components/pages/chat/ContactContainer';
import Header from '@components/pages/chat/Header';

function ChatPage() {

  return (
    <MainLayout>
      <div style={{
        minHeight: "100vh",
        width: "100%",
        position: "fixed",
      }}>
        <Header />
        <div style={{
          display: "grid",
          gridTemplateColumns: "25% 75%"
        }}>
          <ContactContainer/>
          <ChatContainer />
        </div>
      </div>
    </MainLayout>
  )
}

export default ChatPage
