import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ContactType, MsgType, useChat } from "../ChatContext";
import { useMessage } from "../MessageContext";
import { colors } from "../../../constants/color";

export type MessageSearchType = {
    value: string;
    data: MsgType[];
}

type ContextType = {
    search: MessageSearchType,
    fn: {
        handleSearch: (value: string) => void;
        handleRefClick: (id: string) => void;
        handleReset: () => void;
    }
}

const Context = React.createContext<ContextType>({
    search: {
        value: "",
        data: []
    },
    fn: {
        handleSearch: () => { },
        handleRefClick: () => { },
        handleReset: () => {}
    }
})

export function useSearchMessage() {
    return useContext(Context);
}

export default function SearchMessageContext({ children }: { children: ReactNode }) {

    const { message } = useMessage();
    const { current } = useChat()
    const [search, setSearch] = useState<MessageSearchType>({
        value: "",
        data: []
    })

    function hanldeSearch(value: string) {

        if (!value) return setSearch({ value: "", data: [] });

        setSearch(pv => ({
            ...pv,
            value: value
        }))

        message.forEach(msg => {
            const text = msg.msg.split(" ");
            text.forEach(foo => {
                if (foo.toLocaleLowerCase() === value.toLowerCase()) {
                    const regx = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    let pattern = new RegExp(`${regx}`, "gi");
                    setSearch(prev => ({
                        ...prev,
                        data: prev.data.find(mc =>
                            mc.id === msg.id
                        ) ?
                            prev.data :
                            [
                                {
                                    ...msg,
                                    msg: msg.msg.replace(
                                        pattern, match =>
                                        `<span style="color: ${colors.GREEN_ACCENT}; font-weight: 700;">${match}</span>`
                                    )
                                },
                                ...prev.data
                            ]
                    }));
                }
            })
        })
    }

    const handleRefClick = React.useCallback((id: string) => {
        const ref = document.getElementById(id);
        const messageContainer = document.getElementById("message-container")

        if (ref && messageContainer) {
            const topOffset = ref.offsetTop - messageContainer.offsetTop;
            messageContainer.scrollTo({ top: topOffset, behavior: "smooth" });
            ref.style.background = "var(--icon-color)";
            setTimeout(() => ref.style.background = "", 400)
        }

    }, [message]);

    const handleReset = React.useCallback(() => {
        setSearch({
            value: "",
            data: []
        })
    }, [message]);

    useEffect(() => {
        setSearch({
            data: [],
            value: ""
        })
    }, [current])


    return (
        <Context.Provider
            value={{
                search: search,
                fn: {
                    handleSearch: hanldeSearch,
                    handleRefClick: handleRefClick,
                    handleReset: handleReset
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}