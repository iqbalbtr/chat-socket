import React, { useRef } from 'react'
import ChatHeader from './ChatHeader'
import SendMessage from './SendMessage'
import MessageCard from '../cards/MessageCard';
import { useMessage } from '@contexts/chat/MessageContext';
import { useChat } from '@contexts/chat/ChatContext';

function ChatListMessage() {

    const { list } = useMessage();
    const { current } = useChat();
    const container = useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if(container.current){
            container.current.scrollTop = container.current.scrollHeight - container.current.clientHeight
        }
    }, [list, current.username])

    return (
        <div
        style={{ position: "relative", width: "100%" }}
        >
            <ChatHeader />
            <div
            ref={container}
                style={{
                    maxHeight: "83.5vh",
                    height: '83.4vh',
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--bg-primary-color)",
                    overflowY: "scroll",
                }}
            >
                {
                    current.new && (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "35px 20px"
                        }}>
                            <button style={{
                                padding: "8px",
                            }}>Kontak tudak terdaftar</button>
                        </div>
                    )
                }
                {
                    list.map((data, id) => (
                        <MessageCard key={id} data={data} />
                    ))
                }
            </div>
            <SendMessage />
        </div>
    )
}

export default ChatListMessage
