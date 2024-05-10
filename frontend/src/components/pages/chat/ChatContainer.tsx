// import React from 'react'
import { useMessage, MessageRouterType } from '@contexts/chat/MessageContext';
import NothingChat from './NothingChat';
import ChatListMessage from './fragments/message/mainContent/MessageMainContent';
import { useChat } from '@contexts/chat/ChatContext';
import SwitchLayout from '@components/layouts/SwitchLayout';
import MessageProfileContent from './fragments/message/profileContent/MessageProfileContent';
import MessageSearchContent from './fragments/message/searchContent/MessageSeacrhContent';
import ModalRouteHandler from './fragments/ModalRouteHandler';
import ShareContact from './fragments/message/profileContent/chiild/ShareContact';
import { useRouterMessage } from '@contexts/chat/message/RouterMessageContext';



function ChatContainer() {

  const { chatType } = useChat();
  const { content, modal } = useRouterMessage();

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
        name={content}
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
      <ModalRouteHandler
        name={modal}
        child={[
          {
            name: "forward",
            label: "Teruskan pesan",
            children: ""
          },
          {
            name: "share",
            label: "Bagikan kontak",
            children: <ShareContact />
          }
        ]}
      />
    </div>
  )
}

export default ChatContainer
