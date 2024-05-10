import React, { useEffect } from 'react'
import { MsgType, useChat } from '../ChatContext';
import { useMessage } from '../MessageContext';

type ContextType = {
    pull: MsgType | null;
    fn: {
        handleRemove: (prev?: boolean) => void;
        handlePull: (msg: MsgType) => void;
    }
}

const Context = React.createContext<ContextType>({
    pull: null,
    fn: {
        handlePull: () => { },
        handleRemove: () => { }
    }
});

export function usePullMessage() {
    return React.useContext(Context)
}

function PullMessageContext({ children }: { children: React.ReactNode }) {


    const { message } = useMessage();
    const { current } = useChat()

    const [pull, setPull] = React.useState<MsgType | null>(null);

    const handlePull = React.useCallback((msg: MsgType) => {
        const find = message.find(cur => cur.id === msg.id);
        if (find) {
            setPull(find);
        }
    }, [message]);

    const handleRemove = React.useCallback(() => {
        setPull(null)
    }, [message]);


    useEffect(() => {
        setPull(null)
    }, [current])


    return (
        <Context.Provider value={{
            pull: pull,
            fn: {
                handleRemove: handleRemove,
                handlePull: handlePull
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default PullMessageContext
