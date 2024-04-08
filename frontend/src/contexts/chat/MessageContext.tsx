import { useSession } from '@providers/AuthProvider';
import { useSocket } from '@providers/SocketProvider';
import React from 'react'
import { MsgType, useChat } from './ChatContext';
import { useContact } from './ContactContext';

type LocalMessage = {
    username: string;
    data: MsgType[];
}
type ContextType = {
    list: MsgType[],
    pull: MsgType | null;
    forward: MsgType | null;
    fn: {
        sendMessage: ({ input, to, type, fwd }: { input: string, to: string, type: "group" | "private", pull?: MsgType, fwd?: string }, callback: (status: boolean, msg?: MsgType) => void) => void;
        pullMessage: (id: string) => void;
        removePull: () => void;
        removeMessage: (id: string, username: string, callback: (err: string, result?: MsgType) => void) => void;
        removeAllMessage: (username: string) => void;
        handleForward: (msg: MsgType) => void;
        removeForward: () => void;
    }
}

const Context = React.createContext<ContextType>({
    list: [],
    pull: null,
    forward: null,
    fn: {
        sendMessage: () => { },
        pullMessage: () => { },
        removePull: () => { },
        removeMessage: () => { },
        removeAllMessage: () => { },
        handleForward: () => { },
        removeForward: () => { }
    }
});


export function useMessage() {
    return React.useContext(Context)
}

function MessageContext({ children }: { children: React.ReactNode }) {

    const [list, setList] = React.useState<MsgType[]>([]);
    const [pull, setPull] = React.useState<MsgType | null>(null);
    const [forward, setForwards] = React.useState<MsgType | null>(null);
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
            setList(pv => [...pv, msg]);
            storeLastMsg().store(msg.info.from, msg.msg, true);
        } else {
            storeLastMsg().store(msg.info.from, msg.msg, false);
        }

    }, [list, current.username])

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
            data: [...list, { ...payload, info: { ...payload.info, read: true } }]
        } as LocalMessage));

        // message forward will reset current
        if (payload.fwd) {
            removeCurrent();
        } else {
            setList([...list, payload]);
        }

        // store last message read: true because sending is same from current user
        storeLastMsg().store(to, input, true);

        callback(true, payload);
    }, [list, current]);

    const pullMessage = React.useCallback((id: string) => {
        const find = list.find(msg => msg.id === id);
        if (find) {
            setPull(find);
        }
    }, [list]);

    const removePull = React.useCallback(() => {
        setPull(null)
    }, [list]);

    const removeMessage = React.useCallback((id: string, username: string, callback: (err: string, result?: MsgType) => void) => {
        const find = list.find(msg => msg.id === id);
        if (find) {
            
            // update list message
            const insert = list.filter(msg => msg.id !== id);
            setList(insert);

            // store list message to local
            window.localStorage.setItem(`_${username}`, JSON.stringify({
                username: current.username,
                data: insert
            }))

            // if last message is empty or not
            if (list.length === 1) {
                storeLastMsg().store(current.username!, "", true);
            } else {
                storeLastMsg().store(current.username!, insert[insert.length - 1].msg, true);
            }
            callback("", find);
        } else {
            callback("Message is not found");
        }
    }, [list]);

    const removeAllMessage = React.useCallback((username: string) => {

        // deleting chat if same cuurent
        if (current.username === username) {
            setList([]);
        }

        // remove data from local
        window.localStorage.removeItem(`_${username}`);

        // reset last msg
        storeLastMsg().store(current.username!, "", true);
    }, [list, current]);

    const handleForward = React.useCallback((msg: MsgType) => {
        setForwards(msg);
    }, [list, current, forward]);

    const removeForward = React.useCallback(() => {
        setForwards(null);
    }, [list, current, forward]);

    React.useEffect(() => {

        // if data chat is exist from local and will be restore to list
        const get = window.localStorage.getItem(`_${current.username}`)
        if (get !== null) {
            const parse: LocalMessage = JSON.parse(get);
            storeLastMsg().read(parse.username)
            setList(parse.data)
        } else {
            setList([])
        }
    }, [current.username])

    React.useEffect(() => {
        socket.on("private-message", storeMessage);
        return () => {
            socket.off("private-message", storeMessage)
        }
    }, [current.username, list])


    return (
        <Context.Provider value={{
            list: list,
            pull: pull,
            forward: forward,
            fn: {
                pullMessage: pullMessage,
                sendMessage: sendMessage,
                removeMessage: removeMessage,
                removePull: removePull,
                removeAllMessage: removeAllMessage,
                handleForward: handleForward,
                removeForward: removeForward
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default MessageContext
