import React, { useEffect } from 'react'
import { useMessage } from '../MessageContext';
import { useChat } from '../ChatContext';

type ContextType = {
    content: MessageRouterType[];
    modal: ModalRouterMessageType[];
    inner: MessageInnerType[];
    fn: {
        handleRouterMessage: (name: MessageRouterType) => void;
        handleModalMessage: (name: ModalRouterMessageType) => void;
        handleInnerMessage: (name: MessageInnerType) => void;
    }
}

const Context = React.createContext<ContextType>({
    content: ["idle"],
    modal: ["idle"],
    inner: ["idle"],
    fn: {
        handleModalMessage: () => { },
        handleRouterMessage: () => { },
        handleInnerMessage: () => { }
    }
});

export type MessageType = "group" | "private" | "idle"
export type MessageRouterType = "search" | "user_info" | "back" | "idle"
export type MessageRouterActive = ["search", "user_info"]
export type ModalRouterMessageType = "forward" | "share" | "idle" | "back";
export const ModalRouterMessageActive = ["forward", "share"];
export type MessageInnerType = "send" | "idle" | "back"
export const MessageInnerType = ["send"]

export function useRouterMessage() {
    return React.useContext(Context)
}

function RouterMessageContext({ children }: { children: React.ReactNode }) {

    const { message } = useMessage();
    const { current } = useChat();

    const [routerMessage, setRouterMessage] = React.useState<MessageRouterType[]>(["idle"]);
    const [innerMessage, setInnerMessage] = React.useState<MessageInnerType[]>(["idle"]);
    const [modalMessageRouter, setModalMessageRouter] = React.useState<ModalRouterMessageType[]>(["idle"]);

    const handleRouterMessage = React.useCallback((name: MessageRouterType) => {
        setRouterMessage(pv =>
            name === "back" ?
                pv.slice(0, -1) :
                pv.includes(name) ?
                    [...pv.filter(route => route !== name), name] :
                    [...pv, name]
        )
    }, [message, routerMessage]);

    const handleInnerMessage = React.useCallback((name: MessageInnerType) => {
        setInnerMessage(pv =>
            name === "back" ?
                pv.slice(0, -1) :
                pv.includes(name) ?
                    [...pv.filter(route => route !== name), name] :
                    [...pv, name]
        )
    }, [message, innerMessage]);

    const handleModalRouterMessage = React.useCallback((name: ModalRouterMessageType) => {
        setModalMessageRouter(pv =>
            name === "back" ?
                pv.slice(0, -1) :
                pv.includes(name) ?
                    [...pv.filter(route => route !== name), name] :
                    [...pv, name]
        )

    }, [message, routerMessage]);


    useEffect(() => {
        setRouterMessage(["idle"])
    }, [current])


    return (
        <Context.Provider value={{
            content: routerMessage,
            inner: innerMessage,
            modal: modalMessageRouter,
            fn: {
                handleInnerMessage: handleInnerMessage,
                handleModalMessage: handleModalRouterMessage,
                handleRouterMessage: handleRouterMessage,
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default RouterMessageContext
