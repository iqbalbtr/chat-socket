// import React from 'react'
import ContactMessageContainer from './fragments/contact/ContactMessageContainer';
import NothingChat from './NothingChat';
import ChatListMessage from './fragments/message/ChatListMessage';
import { useChat } from '@contexts/chat/ChatContext';

function ChatContainer() {

  const { chatType, tgl: { tglModal } } = useChat();

  return (
    <div
      style={{
        display: "flex",
        width: "100%"
      }}
    >
      {
        chatType !== "idle" ? (
          <>
            <ChatListMessage />
          </>
        ) : (
          <NothingChat />
          )
        }
        {tglModal && <ContactMessageContainer />}
    </div>
  )
}

export default ChatContainer
