import React, { Dispatch, SetStateAction, useCallback, useState } from "react"
import { Loading } from "@hooks/useFetch";
import { useSession } from "@providers/AuthProvider";
import { ContactType, localMsgType, useChat } from "./ChatContext";
import { useSocket } from "@providers/SocketProvider";

type ContextType = {
    contact: ContactType[];
    seacrh: {
        status: boolean,
        data: ContactType[],
        byRead: boolean
    };
    tgl: {
        tglContent: ComponentContactType,
        tglMenu: boolean
        fn: {
            setTglMenu: Dispatch<SetStateAction<boolean>>;
            setTglContent: (name: ComponentContactType) => void
        }
    }
    error: string;
    fn: {
        addContact: (payload: { username: string, name: string }, callback: (err: string, result?: ContactType) => void) => Promise<void>,
        removeContact: (username: string, callback: (err: string, result?: ContactType) => void) => Promise<void>;
        updateContact: (payload: { id: number, name: string }, callback: (err: string) => void) => Promise<void>;
        storeLastMsg: () => { store: (user: string, msg: string, read: boolean) => void, read: (user: string) => void };
        addContactNew: (username: string) => void;
        seacrhContact: (name: string) => void;
        toggleByRead: () => void;
    }
};

const Context = React.createContext<ContextType>({
    contact: [],
    seacrh: {
        status: false,
        data: [],
        byRead: false
    },
    tgl: {
        tglContent: "idle",
        tglMenu: false,
        fn: {
            setTglMenu: () => { },
            setTglContent: () => { }
        }
    },
    error: "",
    fn: {
        addContact: async () => { },
        addContactNew: () => { },
        removeContact: async () => { },
        updateContact: async () => { },
        storeLastMsg: () => ({ store: () => { }, read: () => { } }),
        seacrhContact: () => { },
        toggleByRead: () => { }
    }
});

export function useContact() {
    return React.useContext(Context);
}

export const componntContact = ["status", "group", "profile", "settings", "new_message"];
export type ComponntContactActive = "status" | "group" | "profile" | "settings" | "new_message"
export type ComponentContactType = "idle" | "status" | "group" | "profile" | "settings" | "new_message";

function ContactContext({ children }: { children: React.ReactNode }) {

    const [list, setList] = React.useState<ContactType[]>([]);
    const [listNew, setListNew] = React.useState<ContactType[]>([]);
    const [search, setSearch] = React.useState<{ status: boolean, byRead: boolean, data: ContactType[] }>({
        status: false,
        data: [],
        byRead: false
    });
    const [status, setStatus] = React.useState<Loading>("idle");
    const [tglContent, setTglContent] = useState<ComponentContactType>("idle")
    const [tglMenu, setTglMenu] = useState<boolean>(false)
    const { user } = useSession();
    const [error, setError] = React.useState("");
    const { current, fn: { handleCurrent } } = useChat();
    const { socket } = useSocket();

    const toggleBYRead = useCallback(() => {
        setSearch(pv => ({
            ...pv,
            byRead: !pv.byRead
        }))
    }, [search])

    const getContact = React.useCallback(async () => {
        setStatus("loading");
        const response = await fetch("http://localhost:8080/api/contacts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const res = await response.json();

        if (!response.ok) {
            setStatus("error");
            setError(res.error.message);
            throw new Error(res.error);
        } else {
            setStatus("success");
            const data = res.result.data.map((con: ContactType) => ({ ...con, new: false }));

            // initial local new_contact
            const get = window.localStorage.getItem("_new_contact")
            if (get) {
                const result = JSON.parse(get);
                setListNew(result);
                setList([...data, ...result]);
            } else {
                setList(data);
            }

            setList(pv => pv.map(con => {
                const last = window.localStorage.getItem(`_${con.username}`);
                if (last !== null) {
                    const parse = JSON.parse(last);
                    if (parse.data.length === 0) return con
                    return {
                        ...con,
                        lastMsg: {
                            msg: parse.data[parse.data.length - 1].msg,
                            read: parse.data[parse.data.length - 1].info.read,
                            time: parse.data[parse.data.length - 1].info.timestamp
                        }
                    }
                } else {
                    return con
                }

            }).sort((a, b) => (b.lastMsg?.time!) - (a.lastMsg?.time!)))
        }


    }, [list, status])

    const addContact = React.useCallback(async (payload: { username: string, name: string }, callback: (err: string, result?: ContactType) => void) => {
        setStatus("loading");
        const response = await fetch("http://localhost:8080/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        const res = await response.json();

        if (!response.ok) {
            setStatus("error");
            setError(res.error.message);
            callback(res.error, undefined);
        } else {
            setStatus("success");
            const exist = list.find(cons => cons.username === res.result.username);

            // If new contact will restore
            if (exist && exist.new) {
                const insert = listNew.filter(cons => cons.username !== exist.username);
                const payload_contact = {
                    username: user.username,
                    data: insert
                }

                window.localStorage.setItem("_new_contact", JSON.stringify(payload_contact));
                setListNew(insert);
                setList(pv => pv.map(cons => {
                    if (cons.username === res.result.username) {
                        return {
                            ...res.result,
                            new: false
                        }
                    } else {
                        return cons
                    }
                }))
            } else {
                setList([...list, res.result]);
            }


            callback("", res.result);
        }
    }, [status, list])

    const removeContact = React.useCallback(async (username: string, callback: (err: string, result?: ContactType) => void) => {

        // if new contact are deleted
        const exist = list.find(cons => cons.username === username && cons.new);
        if (exist) {

            const data = listNew.filter(list => list.username !== username);
            window.localStorage.setItem("_new_contact", JSON.stringify(data));

            setList(pv => pv.filter(cons => cons.username !== username))
            setListNew(pv => pv.filter(cons => cons.username !== username));

            // remove data chat from contact
            window.localStorage.removeItem(`_${username}`)
            return callback("", exist);
        }

        const contact = list.find(cons => cons.username === username && !cons.new);
        if (!contact) return callback("Contact is not found", undefined);

        setStatus("loading");
        const response = await fetch(`http://localhost:8080/api/contacts/${contact.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const res = await response.json();

        if (!response.ok) {
            setStatus("error");
            setError(res.error.message);
            callback(res.error);
        } else {
            setStatus("success");

            // update list contacts & remove data chat contact from local
            setList(cons => cons.filter(fil => fil.username !== res.result.username));
            window.localStorage.removeItem(`_${username}`)

            callback("", res.result)
        }
    }, [list, status]);

    const updateContact = React.useCallback(async (payload: { id: number, name: string }, callback: (err: string) => void) => {
        setStatus("loading");
        const response = await fetch(`http://localhost:8080/api/contacts/${payload.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: payload.name }),
            credentials: "include"
        });

        const res = await response.json();

        if (!response.ok) {
            setStatus("error");
            setError(res.error.message);
            callback(res.error);
        } else {
            setStatus("success");
            setList(pv => pv.map(cons => {
                if (cons.username === res.result.username) {
                    return res.result;
                } else {
                    return cons
                }
            }));

            // redirect user current
            handleCurrent(res.result, "private");
        }
    }, [list, status]);

    const addContactNew = React.useCallback((username: string) => {

        const exist = list.filter(cons => cons.username === username);
        if (exist.length >= 1) return;
        const payload: ContactType = {
            id: Math.floor(Math.random() * 10000),
            name: `@${username}`,
            username: username,
            new: true
        }

        setListNew(pv => [...pv, payload]);
        setList(pv => [...pv, payload])

        window.localStorage.setItem("_new_contact", JSON.stringify([...listNew, payload]))
    }, [list, user, listNew])

    const storeLastMsg = React.useCallback(() => {

        // this function will change list contact and sort contact 
        return {
            store: (user: string, msg: string, read: boolean) => {
                setList(pv => pv.map(con => {
                    if (con.username === user) {
                        return {
                            ...con,
                            lastMsg: {
                                read: read,
                                msg: msg,
                                time: new Date().getTime()
                            }
                        }
                    } else {
                        return con
                    }
                }).sort((a, b) => (b.lastMsg?.time || 0) - (a.lastMsg?.time || 0)));
            },
            read: (user: string) => {
                const local = window.localStorage.getItem(`_${user}`);

                // if data chat exist and will be update
                if (local !== null) {
                    const parse: localMsgType = JSON.parse(local);
                    const payload: localMsgType = {
                        ...parse,
                        data: parse.data.map(last => ({ ...last, info: { ...last.info, read: true } }))
                    }
                    window.localStorage.setItem(`_${current.username!}`, JSON.stringify(payload));
                }

                setList(pv => pv.map(con => {
                    if (con.username === user) {
                        return {
                            ...con,
                            lastMsg: {
                                ...con.lastMsg!,
                                read: true
                            }
                        }
                    } else {
                        return con
                    }
                }).sort((a, b) => (b.lastMsg?.time || 0) - (a.lastMsg?.time || 0)));
            }
        }
    }, [list, listNew, current.username]);

    const searchContact = React.useCallback((name: string) => {

        if (!name) return setSearch(pv => ({
            ...pv,
            status: false,
            data: []
        }))

        setSearch(pv => ({
            ...pv,
            status: true,
            data: list.filter(con => {
                (
                    con.name.includes(name.toLowerCase()) ||
                    con.username.includes(name.toLowerCase()) &&
                    con.lastMsg?.read === search.byRead
                )
            })
        }))

    }, [list, listNew, current.username]);

    const handleTglContent = React.useCallback((name: ComponentContactType) => {
        setTglContent(pv => ["status", "group", "profile", "settings"].includes(pv) ? "idle" : name);
        if (tglMenu) {
            setTglMenu(false)
        }

    }, [tglContent, tglMenu]);

    React.useEffect(() => {
        getContact()

        socket.on("user-status", (val: any) => {
            // upadte contact if user onine or disconnect
            for (const curr of val) {
                setList(pv => pv.map(con => {
                    if (con.username === curr.username) {
                        return {
                            ...con,
                            lastActive: {
                                status: curr.active,
                                time: new Date().getTime()
                            }
                        }
                    } else {
                        return con
                    }
                }))
            }
        })

        return () => {
            socket.off("user-status");
        }
    }, []);


    return (
        <Context.Provider value={{
            contact: list,
            seacrh: search,
            error: error,
            tgl: {
                tglContent: tglContent,
                tglMenu: tglMenu,
                fn: {
                    setTglContent: handleTglContent,
                    setTglMenu: setTglMenu
                }
            },
            fn: {
                addContact: addContact,
                removeContact: removeContact,
                updateContact: updateContact,
                addContactNew: addContactNew,
                storeLastMsg: storeLastMsg,
                seacrhContact: searchContact,
                toggleByRead: toggleBYRead
            }
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContactContext