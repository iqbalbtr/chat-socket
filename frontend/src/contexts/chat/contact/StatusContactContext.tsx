import React, { ReactNode, useCallback, useEffect } from "react"
import { useContact } from "../ContactContext";
import { useSocket } from "@providers/SocketProvider";
import { useSession } from "@providers/AuthProvider";
import privateApi from "@libs/axios";

type ContextType = {
    status: StatusUser[],
    fn: {
        hanldeReadStatus: (username: string, status_id: string, payload: any) => void;
        handleStoreUser: (payload: any) => void;
        handleAddStatus: () => void;
    }
};

type StatusData = {
    id: string;
    src: string;
    username: string;
    type: "photo" | "video";
    create_at: Date;
    text?: string;
    status_read: {
        id: string;
        contact_id: string;
        read_at: Date;
        status_id: string;

    }[]
}

export interface StatusUser {
        id: string;
        username: string;
        contact_id: string;
        data: StatusData[]
    }

const Context = React.createContext<ContextType>({
    status: [],
    fn: {
        handleAddStatus: () => { },
        hanldeReadStatus: () => { },
        handleStoreUser: () => { }
    }
});

export function useStatusContact() {
    return React.useContext(Context);
}

export default function StatusContentContact({ children }: { children: ReactNode }) {

    const { contact } = useContact();
    const { user } = useSession();
    const socket = useSocket()
    const [status, setStatus] = React.useState<StatusUser[]>([]);

    const handleAddStatus = React.useCallback(() => {

    }, [contact]);

    const handleStoreUser = React.useCallback(async (payload: any) => {
        console.log({ payload });

        setStatus(pv => pv.map(foo => {
            if (foo.username === user.username) {
                return {
                    ...foo,
                    data: [
                        ...foo.data,
                        {
                            ...payload,
                            status_read: []
                        },

                    ]
                }
            } else {
                return foo
            }
        }))
    }, [contact]);

    const getStatus = React.useCallback(async () => {
        try {
            const get = await privateApi.get("/api/status");

            if (get.status === 200) {
                setStatus(get.data)
            }
        } catch (error) {

        }
    }, [contact]);

    const handleReadStatus = React.useCallback((username: string, status_id: string, payload: any) => {
        setStatus(pv => pv.map(foo => {
            if (foo.username === username) {
                return {
                    ...foo,
                    data: foo.data.map(st => {
                        if (st.id === status_id) {
                            return {
                                ...st,
                                status_read: [
                                    ...st.status_read,
                                    payload
                                ]
                            }
                        } else {
                            return st
                        }
                    })
                }
            } else {
                return foo
            }
        }))
    }, [contact]);

    useEffect(() => {
        if (socket.status) {
            socket.socket?.on("status-update", (res: StatusData, username: string) => {
          
                setStatus(pv => pv.map(foo => {
                    if (foo.username === username) {
                        return {
                            ...foo,
                            data: [
                                ...foo.data,
                                res
                            ]
                        }
                    } else {
                        return foo
                    }
                }))
            })
        }

        return () => {
            if (socket.status) {
                socket.socket?.off("status-update")
            }
        }
    }, [socket.status])


    useEffect(() => {
        getStatus()
    }, [])



    return (
        <Context.Provider
            value={{
                status: status,
                fn: {
                    handleAddStatus: handleAddStatus,
                    hanldeReadStatus: handleReadStatus,
                    handleStoreUser: handleStoreUser
                }
            }}
        >
            {children}
        </Context.Provider>
    )
}
