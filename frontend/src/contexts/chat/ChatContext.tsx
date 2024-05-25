import React from "react";
import MessageContext from "./MessageContext";
import ContactContext from "./ContactContext";
import SearchMessageContext from "./message/SearchMessagteContext";
import { useSocket } from "@providers/SocketProvider";

export type UserContact = {
    id: string;
    first_name: string;
    last_name?: string;
    bio?: string;
    username: string;
    email: string;
}

export type LastInfo = {
    id: string,
    msg: string,
    time: Date,
    unread: number
}

export type GroupType = {
    id: number;
    name: string;
    bio: string;
    group_code: string;
    member: ContactType[];
};

export type ContactType = {
    id: string;
    name: string;
    bio: string;
    username: string;
    last_info: LastInfo;
    last_active: string;
    unsaved: boolean;
    type: "private" | "group"
}

export type MsgType = {
    id?: string;
    msg: string;
    time: Date;
    forward: boolean;
    info_msg: {
        id?: string;
        to: string;
        from: string;
        respon_read: boolean;
        sender_read: boolean;
        read: boolean;
        type: "group" | "private" ;
    },
    pull_msg_id?: string;
    pull_msg?: {
        id: string;
        msg: string;
        time: Date;
        forward: boolean;
        info_msg: {
            id?: string;
            to: string;
            from: string;
            respon_read: boolean;
            sender_read: boolean;
            read: boolean;
            type: "group" | "private" ;
        }
    }
}

type ContextProps = {
    current: ContactType | null;
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
    current: null,
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

    const [current, setCurrent] = React.useState<ContactType | null>(null);
    const [statusChat, setStatusChat] = React.useState<ChatType>("idle");

    // handle current user chat
    const handleCurrent = React.useCallback((curr: ContactType, type: "private" | "group") => {
        setCurrent(curr);
        setStatusChat(type)
    }, [current, statusChat]);

    const removeCurrent = React.useCallback(() => {
        setCurrent(null);
        setStatusChat("idle")
    }, [current, statusChat]);


    console.log(current);


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

function Loading() {
    return (
        <div className=" flex justify-center items-center min-h-screen w-full fixed top-0 left-0 bg-bg-primary">
            <span>Loading</span>
        </div>
    )
}