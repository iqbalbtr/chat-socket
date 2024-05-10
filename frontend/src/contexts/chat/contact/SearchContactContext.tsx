import React, { ReactNode, useCallback } from "react"
import { ContactType } from "../ChatContext";
import { useContact } from "../ContactContext";

type ContextType = {
    search: SearchContactType,
    fn: {
        hanldeSearch: (name: string) => void;
        handleByRead: (prev?: boolean) => void;
    }
};
export type SearchContactType = {
    status: boolean,
    byRead: boolean,
    data: ContactType[]
}

const Context = React.createContext<ContextType>({
    search: {
        byRead: false,
        data: [],
        status: false
    },
    fn: {
        hanldeSearch: () => { },
        handleByRead: () => { }
    }
});

export function useSearchContact() {
    return React.useContext(Context);
}

export default function SearchContactContext({ children }: { children: ReactNode }) {

    const { contact } = useContact();

    const [search, setSearch] = React.useState<SearchContactType>({
        status: false,
        data: [],
        byRead: false
    });

    const handleSearch = React.useCallback((name: string) => {

        if (!name) return setSearch(pv => ({
            ...pv,
            status: false,
            data: []
        }))

        setSearch(pv => ({
            ...pv,
            status: true,
            data: contact.filter(con => {
                (
                    con.name.includes(name.toLowerCase()) ||
                    con.username.includes(name.toLowerCase()) &&
                    con.lastMsg?.read === search.byRead
                )
            })
        }))

    }, [contact]);


    const handleByRead = useCallback((prev?: boolean) => {
        setSearch(pv => ({
            ...pv,
            byRead: prev ? prev : !pv.byRead
        }))
    }, [search])

    return (
        <Context.Provider
            value={{
                search: search,
                fn: {
                    hanldeSearch: handleSearch,
                    handleByRead: handleByRead
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}
