import React, { useEffect } from "react";
import MessageContext from "./MessageContext";
import ContactContext from "./ContactContext";
import SearchMessageContext from "./message/SearchMessagteContext";

export type ContactType = {
    id: string;
    username: string;
    first_name: string;
    last_name?: string;
    new: boolean;
    unread: MsgType[];
    lastMsg?: {
        msg: string;
        time: number;
    };
    lastActive?: {
        status: boolean;
        time: number
    }
}
export type MsgType = {
    id: string;
    msg: string;
    info: {
        from: string;
        to: string;
        read: boolean;
        timestamp: number;
        type: "private" | "group";
    },
    pull: {
        status: boolean,
        data?: MsgType 
    },
    fwd?: string;
}
export type localMsgType = {
    username: string;
    data: MsgType[];
}

type ContextProps = {
    current: Partial<ContactType>;
    chatType: ChatType;
    fn: {
        handleCurrent: (curr: ContactType, type: "private" | "group") => void;
        removeCurrent: () => void;
    }
}

export type ChatType = "group" | "private" | "idle"
export type ChatRouterType = "search" | "user_info" | "modal_share" | "modal_forward" | "idle"
export type ChatRouterActive = ["search", "user_info", "modal_share", "modal_forward"]

const Context = React.createContext<ContextProps>({
    current: {},
    chatType: "idle",
    fn: {
        handleCurrent: () => { },
        removeCurrent: () => { }
    }
})

export function useChat() {
    return React.useContext(Context);
}


function ChatContext({
    children
}: {
    children: React.ReactNode
}) {

    const [current, setCurrent] = React.useState<Partial<ContactType>>({});
    const [statusChat, setStatusChat] = React.useState<ChatType>("idle");


    // handle current user chat
    const handleCurrent = React.useCallback((curr: ContactType, type: "private" | "group") => {
        setCurrent(curr);
        setStatusChat(type)
    }, [current, statusChat]);

    const removeCurrent = React.useCallback(() => {
        setCurrent({});
        setStatusChat("idle")
    }, [current, statusChat]);

    return (
        <Context.Provider value={{
            chatType: statusChat,
            current: current,
            fn: {
                handleCurrent: handleCurrent,
                removeCurrent: removeCurrent
            }
        }}>
            <ContactContext>
                <MessageContext>
                    <SearchMessageContext>
                        {children}
                    </SearchMessageContext>
                </MessageContext>
            </ContactContext>
        </Context.Provider>
    )
}

export default ChatContext