import React from "react";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Socket } from "socket.io-client";
import { useSession } from "./AuthProvider";

type SocketContext = {
    socket: Socket,
    connect: () => void;
    status: boolean;
    disconnect: () => void;
}

const SocketContext = React.createContext<SocketContext>({
    socket: socket,
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

    const connect = React.useCallback(() => {
        socket.auth = {
            username: auth.user.username
        }
        socket.connect();
        setStatus(true);
    }, [status, auth.user])

    const disconnect = React.useCallback(() => {
        socket.emit("logout", {
            username: auth.user.username,
        });
        setStatus(false);
    }, [status, auth.user]);
    
    useEffect(() => {
        if (status) return;
        if (auth.status === "Authorized") {            
            connect();
        }
    }, [auth.user, auth.status])

    React.useEffect(() => {
        socket.on("connect", () => {
            console.log("your status", socket.connected);
        })

        socket.on("disconnect", () => {
            console.log("your status", socket.disconnected);
        })

        return () => {
            socket.off("connect")
            socket.off("disconnect")
        }
    },[])

    return (
        <SocketContext.Provider
            value={{
                socket,
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
