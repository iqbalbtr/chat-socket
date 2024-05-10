import React, { useEffect } from 'react'
import { useMessage } from '../MessageContext';
import { useChat } from '../ChatContext';

type ContextType = {
    content: MessageRouterType[];
    modal: ModalRouterMessageType[];
    fn: {
        handleRouterMessage: (name: MessageRouterType) => void;
        handleModalMessage: (name: ModalRouterMessageType) => void;
    }
}

const Context = React.createContext<ContextType>({
    content: ["idle"],
    modal: ["idle"],
    fn: {
        handleModalMessage: () => { },
        handleRouterMessage: () => { },
    }
});

export type MessageType = "group" | "private" | "idle"
export type MessageRouterType = "search" | "user_info" | "back" | "idle"
export type MessageRouterActive = ["search", "user_info"]
export type ModalRouterMessageType = "forward" | "share" | "idle" | "back";
export const ModalRouterMessageActive = ["forward", "share"];

export function useRouterMessage() {
    return React.useContext(Context)
}

function RouterMessageContext({ children }: { children: React.ReactNode }) {

    const { message } = useMessage();
    const { current } = useChat();

    const [routerMessage, setRouterMessage] = React.useState<MessageRouterType[]>(["idle"]);
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
            modal: modalMessageRouter,
            fn: {
                handleModalMessage: handleModalRouterMessage,
                handleRouterMessage: handleRouterMessage,
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default RouterMessageContext
