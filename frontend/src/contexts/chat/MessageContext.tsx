import { useSession } from '@providers/AuthProvider';
import { useSocket } from '@providers/SocketProvider';
import React from 'react'
import { MsgType, useChat } from './ChatContext';
import { useContact } from './ContactContext';
import RouterMessageContext from './message/RouterMessageContext';
import SelectMessageContext from './message/SelectMessageContext';
import PullMessageContext from './message/PullMessage.Context';
import SearchContactContext from './contact/SearchContactContext';

type LocalMessage = {
    username: string;
    data: MsgType[];
}
type ContextType = {
    message: MsgType[],
    fn: {
        sendMessage: ({ input, to, type, fwd }: { input: string, to: string, type: "group" | "private", pull?: MsgType, fwd?: string }, callback: (status: boolean, msg?: MsgType) => void) => void;
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
    const { current, fn: { removeCurrent } } = useChat();
    const { socket } = useSocket();
    const { fn: { addContactNew, storeLastMsg } } = useContact();

    const storeMessage = React.useCallback((msg: MsgType) => {

        // store message to local
        const get = window.localStorage.getItem(`_${msg.info.from}`);
        if (get !== null) {
            const parse: LocalMessage = JSON.parse(get);
            window.localStorage.setItem(`_${msg.info.from}`, JSON.stringify({
                ...parse,
                data: [...parse.data, msg]
            }));

        } else {
            const payload: LocalMessage = {
                username: msg.info.from,
                data: [msg]
            }
            window.localStorage.setItem(`_${msg.info.from}`, JSON.stringify(payload));
            addContactNew(msg.info.from)
        }

        // if message is from the same receipent or not
        if (current.username === msg.info.from) {
            setMessage(pv => [...pv, msg]);
            storeLastMsg().store(msg.info.from, msg.msg, true);
        } else {
            storeLastMsg().store(msg.info.from, msg.msg, false);
        }

    }, [message, current.username])

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
        pull?: MsgType,
        fwd?: string,
    }, callback: (status: boolean, msg?: MsgType) => void) => {

        // if user isn't pick contact
        if (!current.username) return callback(false);

        const payload: MsgType = {
            id: Math.floor(Math.random() * 100000000).toString(),
            msg: input,
            info: {
                from: username!,
                to: to,
                timestamp: new Date().getTime(),
                read: false,
                type: type
            },
            pull: {
                status: pull ? true : false,
                data: pull ? {
                    ...pull,
                    pull: {
                        status: false,
                        data: undefined
                    }
                } : undefined
            },
            fwd: fwd ? fwd : undefined
        }

        // send message using socket
        socket.emit("private-message", payload);


        // store to local
        window.localStorage.setItem(`_${current.username}`, JSON.stringify({
            username: current.username,
            data: [...message, { ...payload, info: { ...payload.info, read: true } }]
        } as LocalMessage));

        // message forward will reset current
        if (payload.fwd) {
            removeCurrent();
        } else {
            setMessage([...message, payload]);
        }

        // store last message read: true because sending is same from current user
        storeLastMsg().store(to, input, true);

        callback(true, payload);
    }, [message, current]);


    const removeMessage = React.useCallback((id: string, username: string, callback: (err: string, result?: MsgType) => void) => {
        const find = message.find(msg => msg.id === id);
        if (find) {

            // update message message
            const insert = message.filter(msg => msg.id !== id);
            setMessage(insert);

            // store message message to local
            window.localStorage.setItem(`_${username}`, JSON.stringify({
                username: current.username,
                data: insert
            }))

            // if last message is empty or not
            if (message.length === 1) {
                storeLastMsg().store(current.username!, "", true);
            } else {
                storeLastMsg().store(current.username!, insert[insert.length - 1].msg, true);
            }
            callback("", find);
        } else {
            callback("Message is not found");
        }
    }, [message]);

    const removeAllMessage = React.useCallback((username: string, local: boolean) => {

        // deleting chat if same cuurent
        if (current.username === username) {
            setMessage([]);
        }

        // remove data from local
        if (local) {
            window.localStorage.removeItem(`_${username}`);
        }

        // reset last msg
        storeLastMsg().store(current.username!, "", true);
    }, [message, current]);


    React.useEffect(() => {

        // if data chat is exist from local and will be restore to message
        const get = window.localStorage.getItem(`_${current.username}`)
        if (get !== null) {
            const parse: LocalMessage = JSON.parse(get);
            storeLastMsg().read(parse.username)
            setMessage(parse.data)
        } else {
            setMessage([])
        }
    }, [current.username])

    React.useEffect(() => {
        socket.on("private-message", storeMessage);
        return () => {
            socket.off("private-message", storeMessage)
        }
    }, [current.username, message])


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
                            {children}
                        </SearchContactContext>
                    </PullMessageContext>
                </SelectMessageContext>
            </RouterMessageContext>
        </Context.Provider>
    )
}

export default MessageContext
