import React, { useRef } from 'react'
import ChatHeader from './components/MessageHeader'
import SendMessage from './components/SendMessage'
import MessageCard from '../../cards/MessageCard';
import { useMessage } from '@contexts/chat/MessageContext';
import { useChat } from '@contexts/chat/ChatContext';

function MessageMainContent() {

    const { message  } = useMessage();
    const { current } = useChat();
    const container = useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight - container.current.clientHeight
        }
    }, [message, current])

    return (
        <div
            style={{ position: "relative", width: "100%" }}
        >
            <ChatHeader />
            <div
                ref={container}
                id='message-container'
                style={{
                    maxHeight: "83.5vh",
                    height: '83.4vh',
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--bg-secondary)",
                    overflowY: "scroll",
                    padding: "0 26px"
                }}
            >
                
                {
                    message.map((data, id) => (
                        <MessageCard key={id} data={data} />
                    ))
                }
            </div>
            <SendMessage />
        </div>
    )
}

export default MessageMainContent
