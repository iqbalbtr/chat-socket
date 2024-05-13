import React, { useState } from "react"
import { Loading } from "@hooks/useFetch";
import { useSession } from "@providers/AuthProvider";
import { ContactType, MsgType, localMsgType, useChat } from "./ChatContext";
import { useSocket } from "@providers/SocketProvider";
import RouterContactContext from "./contact/RouterContactContext";
import SearchContactContext from "./contact/SearchContactContext";
import { useLocation } from "react-router-dom";
import GroupContactContext from "./contact/GroupContactContext";

type ContextType = {
    contact: ContactType[];
    error: string;
    fn: {
        addContact: (payload: { username: string, last_name: string, first_name: string }, callback: (err: string, result?: ContactType) => void) => Promise<void>,
        removeContact: (username: string, callback: (err: string, result?: ContactType) => void) => Promise<void>;
        updateContact: (payload: { id: number, name: string }, callback: (err: string) => void) => Promise<void>;
        storeLastMsg: (user: string, msg: string) => void;
        storeLastMsgUnRead: (message: MsgType[], msg: MsgType) => void;
        addContactNew: (username: string) => void;
    }
};

const Context = React.createContext<ContextType>({
    contact: [],
    error: "",
    fn: {
        addContact: async () => { },
        addContactNew: () => { },
        removeContact: async () => { },
        updateContact: async () => { },
        storeLastMsg: () => ({ store: () => { }, read: () => { } }),
        storeLastMsgUnRead: () => { }
    }
});

export function useContact() {
    return React.useContext(Context);
}

type UnReadType = {
    data: MsgType[];
    count: number
}

function ContactContext({ children }: { children: React.ReactNode }) {

    const { user } = useSession();
    const { socket } = useSocket();

    const [list, setList] = React.useState<ContactType[]>([]);
    const [listNew, setListNew] = React.useState<ContactType[]>([]);
    const [status, setStatus] = React.useState<Loading>("idle");
    const [error, setError] = React.useState("");
    const location = useLocation()


    const { current, fn: { handleCurrent } } = useChat();

    function getUnReadMessage(user: string) {
        const local = window.localStorage.getItem(`_${user}`);

        if (local !== null) {
            const result: MsgType[] = (JSON.parse(local) as localMsgType).data.filter(foo => !foo.info.read);

            return result
        } else {
            return []
        }
    }

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
            console.log(res);


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
                    const parse: localMsgType = JSON.parse(last);
                    const unread = getUnReadMessage(con.username);
                    if (parse.data.length === 0) return con
                    return {
                        ...con,
                        lastMsg: {
                            msg: parse.data[parse.data.length - 1].msg,
                            time: parse.data[parse.data.length - 1].info.timestamp,
                        },
                        unread: unread
                    }
                } else {
                    return {
                        ...con,
                        unread: []
                    }
                }

            }).sort((a, b) => (b.lastMsg?.time! || 0) - (a.lastMsg?.time! || 0)))
        }


    }, [list, status])

    const addContact = React.useCallback(async (payload: { username: string, first_name: string, last_name: string }, callback: (err: string, result?: ContactType) => void) => {
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
                            new: false,
                            unread: []
                        }
                    } else {
                        return {
                            ...cons,
                            unread: []
                        }
                    }
                }))
            } else {
                setList([...list, { ...res.result, unread: [] }]);
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
            id: Math.floor(Math.random() * 10000).toString(),
            first_name: `@${username}`,
            username: username,
            new: true,
            unread: []
        }

        setListNew(pv => pv.find(foo => foo.username === payload.username) ? pv : [...pv, payload]);
        setList(pv => pv.find(foo => foo.username === payload.username) ? pv : [...pv, payload])

        window.localStorage.setItem("_new_contact", JSON.stringify([...listNew, payload]))
    }, [list, user, listNew])

    const storeLastMsg = React.useCallback((user: string, msg: string) => {
        setList(pv => {
            const exist = pv.find(cur => cur.username === user);
            if (exist) {
                return [
                    {
                        ...exist,
                        lastMsg: {
                            msg: msg,
                            time: new Date().getTime()
                        }
                    },
                    ...pv.filter(foo => foo.id !== exist.id)
                ]
            } else {
                return pv
            }
        })
    }, [list, listNew, current.username]);

    const storeLastMsgUnRead = React.useCallback((message: MsgType[], msg: MsgType) => {
        const result = [...message.filter(foo => !foo.info.read), ...(current.username !== msg.info.from ? [msg] : [])];
        console.log(result);

        setList(pv => pv.map(foo => {
            if (foo.username === msg.info.from) {
                return {
                    ...foo,
                    unread: result
                }
            } else {
                return foo
            }
        }));

    }, [list, listNew, current.username]);

    const updateLastMsgUnRead = React.useCallback((user: string) => {

        const local = window.localStorage.getItem(`_${user}`);

        if (local !== null) {
            const parse = (JSON.parse(local) as localMsgType).data.map(foo => ({ ...foo, info: { ...foo.info, read: true } }));
            setList(pv => pv.map(foo => {
                if (foo.username === current.username) {
                    return {
                        ...foo,
                        unread: []
                    }
                } else {
                    return foo
                }
            }))


            window.localStorage.setItem(`_${user}`, JSON.stringify({
                username: user,
                data: parse
            }))
        }

    }, [list, listNew, current.username]);


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
    }, [location.pathname]);

    React.useEffect(() => {
        if (current.username) updateLastMsgUnRead(current.username)
    }, [current.username]);


    return (
        <Context.Provider value={{
            contact: list,
            error: error,
            fn: {
                addContact: addContact,
                removeContact: removeContact,
                updateContact: updateContact,
                addContactNew: addContactNew,
                storeLastMsg: storeLastMsg,
                storeLastMsgUnRead: storeLastMsgUnRead
            }
        }}
        >
            <RouterContactContext>
                <GroupContactContext>
                    <SearchContactContext>
                        {children}
                    </SearchContactContext>
                </GroupContactContext>
            </RouterContactContext>
        </Context.Provider>
    )
}

export default ContactContext