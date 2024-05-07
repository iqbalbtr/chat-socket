// import React from 'react'
import ContactMessageContainer from './fragments/contact/mainContent/components/ContactMessageContainer';
import NothingChat from './NothingChat';
import ChatListMessage from './fragments/message/ChatListMessage';
import { useChat } from '@contexts/chat/ChatContext';
import SwitchLayout from '@components/layouts/SwitchLayout';
import MessageSeacrh from './fragments/message/MessageSeacrh';

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
        chatType !== "idle" ?
          <ChatListMessage /> :
          <NothingChat />
      }
      <SwitchLayout
        name={tglModal}
        data={[
          {
            name: "user_info",
            children: <ContactMessageContainer />
          },
          {
            name: "search",
            children: <MessageSeacrh />
          }
        ]}
      />
    </div>
  )
}

export default ChatContainer
