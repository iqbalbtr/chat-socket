import React from "react"
import { Loading } from "@hooks/useFetch";
import { ContactType, GroupType, MsgType, useChat } from "./ChatContext";
import { useSocket } from "@providers/SocketProvider";
import RouterContactContext from "./contact/RouterContactContext";
import SearchContactContext from "./contact/SearchContactContext";
import GroupContactContext from "./contact/GroupContactContext";

type ContextType = {
    contact: ContactType[];
    error: string;
    fn: {
        addContact: (payload: { username: string, last_name: string, first_name: string }, callback: (err: string, result?: ContactType) => void) => Promise<void>,
        removeContact: (username: string, callback: (err: string, result?: ContactType) => void) => Promise<void>;
        updateContact: (payload: { id: number, name: string }, callback: (err: string) => void) => Promise<void>;
        storeLastInfoUser: (msg: MsgType, unread: boolean) => void;
        storeLastInfoGroup: (msg: MsgType, unread: boolean, group: string) => void;
        storeLastInfoCurrent: (msg: MsgType) => void;
        getGroup: (code: string) => GroupType | null
    }
};

const Context = React.createContext<ContextType>({
    contact: [],
    error: "",
    fn: {
        addContact: async () => { },
        removeContact: async () => { },
        updateContact: async () => { },
        storeLastInfoUser: () => {},
        storeLastInfoGroup: () => {},
        storeLastInfoCurrent: () => { },
        getGroup: () => null
    }
});

export function useContact() {
    return React.useContext(Context);
}
function ContactContext({ children }: { children: React.ReactNode }) {

    const socketProvider = useSocket();
    const { socket } = useSocket();

    const [list, setList] = React.useState<ContactType[]>([]);
    const [group, setGroup] = React.useState<GroupType[]>([]);
    const [status, setStatus] = React.useState<Loading>("idle");
    const [error, setError] = React.useState("");


    const { current, fn: { handleCurrent } } = useChat();


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
            setList(res.result.list)
            setGroup(res.result.group)
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
            callback("", res.result);
        }
    }, [status, list])

    const removeContact = React.useCallback(async (username: string, callback: (err: string, result?: ContactType) => void) => {


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
            ;

            // redirect user current
            handleCurrent(res.result, "private");
        }
    }, [list, status]);

    const storeLastInfoUser = React.useCallback((msg: MsgType, unread: boolean) => {

        setList(pv => pv.map(foo => {
            if (foo.username === msg.info_msg.from) {
                return {
                    ...foo,
                    last_info: {
                        ...foo.last_info,
                        unread: unread ? foo.last_info.unread + 1 : 0,
                        msg: msg.msg,
                        time: msg.time
                    }
                }
            } else {
                return foo
            }
        }))
    }, [list, current, current]);

    const storeLastInfoCurrent = React.useCallback((msg: MsgType) => {
        setList(pv => pv.map(foo => {
            if (foo.username === msg.info_msg.to) {
                return {
                    ...foo,
                    last_info: {
                        ...foo.last_info,
                        unread: 0,
                        msg: msg.msg,
                        time: msg.time
                    }
                }
            } else {
                return foo
            }
        }).sort((a, b) => new Date(b.last_info.time).getTime() - new Date(a.last_info.time).getTime())
    )
    }, [list, current?.id]);


    const storeLastInfoGroup = React.useCallback((msg: MsgType, unread: boolean, group: string) => {
        setList(pv => pv.map(foo => {
            if (foo.username === group) {
                return {
                    ...foo,
                    last_info: {
                        ...foo.last_info,
                        unread: unread ? foo.last_info.unread + 1 : 0,
                        msg: msg.msg,
                        time: msg.time
                    }
                }
            } else {
                return foo
            }
        }).sort((a, b) => new Date(b.last_info.time).getTime() - new Date(a.last_info.time).getTime())
    )
    }, [list, current?.id]);

    const getGroup = React.useCallback((code: string) => {
    
        const find = group.find(foo => foo.group_code === code);
        const result = find?.member.map(foo => {
            const exist = list.find(fi => fi.username === foo.username);
            if(exist){
                return exist;
            } else {
                return foo
            }
        }) || []
        
        
        return {
            ...find!,
            member: result
        } || null
    }, [list, current?.id]);

    

    
    const updatelastActive = React.useCallback((type: "online" | "offline", current: any) => {        
        setList(pv => pv.map(foo => {
            if (foo.username === current.username) {
                return {
                    ...foo,
                    last_active: type === "online" ? "online" : (new Date()).toString()
                }
            } else {
                return foo
            }
        }).sort((a, b) => new Date(b.last_info.time).getTime() - new Date(a.last_info.time).getTime())
    )
    }, [list, current?.id]);





    React.useEffect(() => {
        if (socketProvider.status) {
            getContact()

            socket.on("user-online", (cur) => {
                updatelastActive("online", cur)
                console.log(cur);
                
            })
            socket.on("user-offline", (cur) => {
                // upadte contact if user onine or disconnect
                console.log("off =>", cur);
                updatelastActive("offline", cur)
            })
            socket.on("new-contact", (con: ContactType) => {
                setList(pv => [con, ...pv])

            })

            return () => {
                socket.off("user-status");
                socket.off("new-contact");
            }
        }
    }, [socketProvider.status]);

    React.useEffect(() => {
        if (current) {
            setList(pv => pv.map(foo => {
                if (foo.username === current.username) {
                    return {
                        ...foo,
                        last_info: {
                            ...foo.last_info,
                            unread: 0,
                        }
                    }
                } else {
                    return foo
                }
            }))
        }
    }, [current]);


    return (
        <Context.Provider value={{
            contact: list,
            error: error,
            fn: {
                addContact: addContact,
                removeContact: removeContact,
                updateContact: updateContact,
                storeLastInfoUser: storeLastInfoUser,
                storeLastInfoCurrent: storeLastInfoCurrent,
                storeLastInfoGroup: storeLastInfoGroup,
                getGroup: getGroup
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