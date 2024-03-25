import React from 'react'
import ChatHeader from './fragments/ChatHeader';
import MessageCard from './fragments/cards/MessageCard';
import SendMessage from './fragments/SendMessage';
import _dummy_chat from "../../assets/json/chat.json"

function ChatContainer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatHeader />
      <div
        style={{
          maxHeight: "73.5vh",
          background: "var(--bg-primary-color)",
          overflowY: "scroll",
        }}
      >

        {
          _dummy_chat.map(data => (
            <MessageCard key={data.id} data={data} />
          ))
        }
      </div>
      <SendMessage />
    </div>
  )
}

export default ChatContainer
