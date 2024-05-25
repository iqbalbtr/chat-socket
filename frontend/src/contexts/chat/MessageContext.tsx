import { useSession } from '@providers/AuthProvider';
import { useSocket } from '@providers/SocketProvider';
import React, { useCallback, useEffect } from 'react'
import { MsgType, useChat } from './ChatContext';
import { useContact } from './ContactContext';
import RouterMessageContext from './message/RouterMessageContext';
import SelectMessageContext from './message/SelectMessageContext';
import PullMessageContext from './message/PullMessage.Context';
import SearchContactContext from './contact/SearchContactContext';
import SendFileContext from './message/SendFileContext';


type ContextType = {
    message: MsgType[],
    fn: {
        sendMessage: ({ input, to, type, fwd }: { input: string, to: string, type: "group" | "private", pull?: string, fwd?: boolean }, callback: (status: boolean, msg?: MsgType) => void) => void;
        removeMessage: (id: string, username: string, callback: (err: string, result?: MsgType) => void) => void;
        removeAllMessage: (username: string, local: boolean) => void;
    }
}

const Context = React.createContext<ContextType>({
    message: [],
    fn: {
        sendMessage: () => { },
        removeMessage: () => { },
        removeAllMessage: () => { },
    }
});

export type MessageType = "group" | "private" | "idle"
export type MessageRouterType = "search" | "user_info" | "back" | "idle"
export type MessageRouterActive = ["search", "user_info"]
export type ModalRouterMessageType = "forward" | "share" | "idle" | "back";
export const ModalRouterMessageActive = ["forward", "share"];

export function useMessage() {
    return React.useContext(Context)
}

function MessageContext({ children }: { children: React.ReactNode }) {

    const [message, setMessage] = React.useState<MsgType[]>([]);
    const { user: { username } } = useSession();
    const { current } = useChat();
    const { socket } = useSocket();
    const { fn: { storeLastInfoUser, storeLastInfoCurrent, storeLastInfoGroup } } = useContact();

    const storeMessage = useCallback((msg: MsgType, group?: string) => {

        if (msg.info_msg.type === "private") {
            if (msg.info_msg.from === current?.username) {

                socket?.emit("readed-msg", { current: current.id, type: current.type })
                storeLastInfoUser(msg, false)
                setMessage(pv => [...pv, msg]);
            } else {
                storeLastInfoUser(msg, true)
            }
        } else {
            if (!group) return
            if (group === current?.username) {
                socket?.emit("readed-msg", { current: current.id, type: current.type })
                storeLastInfoGroup(msg, false, group)
                setMessage(pv => [...pv, msg]);
            } else {
                storeLastInfoGroup(msg, true, group)
            }
        }

    }, [current, socket])

    const sendMessage = React.useCallback(({
        input,
        to,
        type,
        pull,
        fwd
    }: {
        input: string,
        to: string,
        type: "group" | "private",
        pull?: string,
        fwd?: boolean,
    }, callback: (status: boolean, msg?: MsgType) => void) => {

        // if user isn't pick contact
        if (!current) return callback(false);
        if (!input) return callback(false);
        if (!socket) return callback(false)


        const payload: MsgType = {
            msg: input,
            time: new Date(),
            forward: fwd ? true : false,
            info_msg: {
                to: to,
                from: username!,
                respon_read: false,
                sender_read: true,
                read: true,
                type: type,
            },
            pull_msg_id: pull
        }

        // send message using socket
        if (type === "private") {
            socket.emit("private-message", payload);
        } else {
            socket.emit("group-message", payload.info_msg.to, payload);
        }
        console.log("sending Msg => ", payload);


        if (fwd) {
            socket?.emit("readed-msg", { current: current.id, type: current.type })
        }

        callback(true, payload);
    }, [message, current]);

    const removeMessage = React.useCallback((id: string, username: string, callback: (err: string, result?: MsgType) => void) => {
        const find = message.find(msg => msg.id === id);
        if (find) {

            // update message message

            callback("", find);
        } else {
            callback("Message is not found");
        }
    }, [message]);

    const removeAllMessage = React.useCallback((username: string, local: boolean) => {

        // deleting chat if same cuurent
        if (current?.id === username) {
            setMessage([]);
        }

        // remove data from local
        if (local) {
            window.localStorage.removeItem(`_${username}`);
        }

        // reset last msg

    }, [message, current]);


    React.useEffect(() => {
        if (current) {
            setMessage([])
            socket?.emit("get-chat", { username: current.username, type: current.type });
            if (current.last_info.unread >= 1) {
                socket?.emit("readed-msg", { current: current.id, type: current.type })
            }
        }
    }, [current, socket])

    React.useEffect(() => {

        if (username && socket) {
            socket.on("private-message", (msg: MsgType) => {
                console.log("msg receive=>", msg);
                storeMessage(msg);
            });
            socket.on("resend-msg", (msg: MsgType) => {
                console.log("resend =>", msg);
                storeMessage(msg);
            })
            socket.on("result-sending-msg", (msg: MsgType) => {
                console.log("result-sending-msg =>", msg);
                if (msg.info_msg.to === current?.username) {
                    setMessage(pv => [...pv, msg])
                }
                storeLastInfoCurrent(msg)
            })
            socket.on("get-chat", (chat: MsgType[]) => {
                // console.log("get chat =>", chat);
                setMessage(chat)
            })
            socket.on("group-message", (msg: MsgType, group: string) => {
                console.log("group msg =>", msg);
                storeMessage(msg, group);
            })
        }
        return () => {
            if (socket) {
                socket.off("private-message");
                socket.off("result-sending-msg");
                socket.off("resend-msg");
                socket.off("get-chat");
                socket.off("group-message");
            }
        }
    }, [username, socket, current])

    return (
        <Context.Provider value={{
            message: message,
            fn: {
                sendMessage: sendMessage,
                removeMessage: removeMessage,
                removeAllMessage: removeAllMessage,
            }
        }}>
            <RouterMessageContext>
                <SelectMessageContext>
                    <PullMessageContext>
                        <SearchContactContext>
                            <SendFileContext>
                                {children}
                            </SendFileContext>
                        </SearchContactContext>
                    </PullMessageContext>
                </SelectMessageContext>
            </RouterMessageContext>
        </Context.Provider>
    )
}

export default MessageContext
