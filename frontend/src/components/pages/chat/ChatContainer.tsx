// import React from 'react'
import { useMessage, MessageRouterType } from '@contexts/chat/MessageContext';
import NothingChat from './NothingChat';
import ChatListMessage from './fragments/message/mainContent/MessageMainContent';
import { useChat } from '@contexts/chat/ChatContext';
import SwitchLayout from '@components/layouts/SwitchLayout';
import MessageProfileContent from './fragments/message/profileContent/MessageProfileContent';
import MessageSearchContent from './fragments/message/searchContent/MessageSeacrhContent';



function ChatContainer() {

  const { chatType } = useChat();
  const {
    router:{
      current
    }
  } = useMessage();

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
      <SwitchLayout<MessageRouterType>
        name={current}
        data={[
          {
            name: "user_info",
            children: <MessageProfileContent />
          },
          {
            name: "search",
            children: <MessageSearchContent />
          }
        ]}
      />
    </div>
  )
}

export default ChatContainer
