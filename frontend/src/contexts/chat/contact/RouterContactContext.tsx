import React, { ReactNode, useState } from "react"



export const routerContact = ["status", "group", "profile", "settings", "new_message", "new_contact", "archive"];
export type RouterContactActive = "status" | "group" | "profile" | "settings" | "new_message" | "new_contact" | "archivr"
export type RouterContactType = "idle" | "status" | "group" | "profile" | "settings" | "new_message" | "new_contact" | "archive" | "back";

type ContextType = {
    content: RouterContactType[],
    toggle: boolean
    fn: {
        handleToggle: (prev?: boolean) => void;
        handleContent: (name: RouterContactType) => void
    }
};

const Context = React.createContext<ContextType>({
    content: ["idle"],
    toggle: false,
    fn: {
        handleContent: () => { },
        handleToggle: () => { }
    }
});

export function useRouterContact() {
    return React.useContext(Context);
}


export default function RouterContactContext({ children }: { children: ReactNode }) {


    const [content, setContent] = useState<RouterContactType[]>(["idle"])
    const [toggle, setToggle] = useState<boolean>(false);


    const handleContent = React.useCallback((name: RouterContactType) => {
        // setTglContent(pv => ["status", "group", "profile", "settings"].includes(pv) ? "idle" : name);
        setContent(pv =>
            name === "back" ?
                pv.slice(0, -1) :
                pv.includes(name) ?
                    [...pv.filter(route => route !== name), name] :
                    [...pv, name]
        );

        if (toggle) {
            setToggle(false)
        }

    }, [content, toggle]);

    const handleToggle = React.useCallback((prev?: boolean) => {
        setToggle(pv => prev ? prev : !pv)
    }, [content, toggle]);

    return (
        <Context.Provider
            value={{
                content: content,
                toggle: toggle,
                fn: {
                    handleContent: handleContent,
                    handleToggle: handleToggle
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}

