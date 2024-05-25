import React from "react";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Socket } from "socket.io-client";
import { useSession } from "./AuthProvider";

type SocketContext = {
    socket: Socket | null,
    connect: () => void;
    status: boolean;
    disconnect: () => void;
}

const SocketContext = React.createContext<SocketContext>({
    socket: null,
    connect: () => { },
    status: false,
    disconnect: () => { }
});

export function useSocket() {
    return React.useContext(SocketContext);
}

function SocketProvider(props: { children: React.ReactNode }) {

    const { children } = props;
    const [status, setStatus] = useState(false);
    const auth = useSession();
    const [sc, setSc] = useState<Socket | null>(null);

    const connect = React.useCallback(() => {
        if (auth) {
            console.log("connecting to server");
            socket.auth = {
                username: auth.user.username
            }

            socket.once("connect", () => {
                console.log("your status connect", socket.connected);
                setSc(socket);
                setStatus(true);
            })
            
            socket.once("disconnect", () => {
                setStatus(false);
                console.log("your status disconnect", socket.disconnected);
            })

            return () => {
                socket.off("connect")
                socket.off("disconnect")
            }
        }
    }, [status, auth.user, socket])

    const disconnect = React.useCallback(() => {
        socket.emit("logout", {
            username: auth.user.username,
        });
        setStatus(false);
    }, [status, auth.user]);

    useEffect(() => {

        /** 
        *
        * handler Socket connect if user is Autehticated
        * Store & update status socket 
        */
        if (status) return;

        if (auth.status === "Authorized") {
            if(auth.user.username){
                connect();
            }
        }
        
    }, [auth.user, auth.status])

    return (
        <SocketContext.Provider
            value={{
                socket: sc,
                connect,
                status,
                disconnect
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
