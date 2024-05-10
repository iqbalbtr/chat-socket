import React, { useEffect } from 'react'
import { MsgType, useChat } from '../ChatContext';
import { useMessage } from '../MessageContext';

type SelectType = {
    status: boolean;
    data: MsgType[]
}
type ContextType = {
    select: SelectType;
    fn: {
        handleActive: (prev?: boolean) => void;
        handleSelect: (msg: MsgType) => void;
    }
}

const Context = React.createContext<ContextType>({
    select: {
        status: false,
        data: []
    },
    fn: {
        handleSelect: () => { },
        handleActive: () => { }
    }
});

export function useSelectMessage() {
    return React.useContext(Context)
}

function SelectMessageContext({ children }: { children: React.ReactNode }) {


    const { message } = useMessage();
    const { current } = useChat()

    const [select, setSelect] = React.useState<SelectType>({
        status: false,
        data: []
    });

    const handleSelect = React.useCallback((msg: MsgType) => {
        if (!message.find(msg => msg.id === msg.id)) return
        setSelect(pv => ({
            status: !pv.status ? true : pv.status,
            data: pv.data.find(sel =>
                sel.id === msg.id) ?
                pv.data.filter(fi => fi.id !== msg.id) :
                [...pv.data, msg]

        }))
    }, [message]);

    const handleActive = React.useCallback((prev?: boolean) => {
        if (!message.find(msg => msg.id === msg.id)) return
        setSelect(pv => ({
            data: [],
            status: prev ? prev : !pv.status
        }))
    }, [message]);


    useEffect(() => {
        setSelect({
            data: [],
            status: false
        })
    }, [current])


    return (
        <Context.Provider value={{
            select: select,
            fn: {
                handleActive: handleActive,
                handleSelect: handleSelect
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default SelectMessageContext
