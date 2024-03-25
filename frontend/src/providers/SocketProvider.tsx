import React, { Dispatch, SetStateAction, useContext } from "react";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Socket } from "socket.io-client";
import useCookie from "@hooks/useCookie";

type SocketContext = {
    socket: Socket,
    connectSocket: (payload: {
        [key: string]: any;
    } | ((cb: (data: object) => void) => void)) => void;
    setUser: Dispatch<SetStateAction<any>>;
    user: any;
    status: boolean;
    disconnectSocket: () => void;
}

const SocketContext = React.createContext<SocketContext>({
    socket: socket,
    connectSocket: () => { },
    setUser: () => { },
    user: null,
    status: false,
    disconnectSocket: () => { }
});

export function useSocket() {
    return useContext(SocketContext);
}

function SocketProvider(props: { children: React.ReactNode }) {

    const { children } = props;
    const [user, setUser] = useState("");
    const [status, setStatus] = useState(false);
    const [reconnect, setReconnect] = useState(false);
    const _user = useCookie("_user");
    const auth_socket = useCookie("auth_socket");

    function connectSocket(payload: {
        [key: string]: any;
    } | ((cb: (data: object) => void) => void)) {
        socket.auth = payload;
        socket.connect();
        setStatus(true);
    }

    function disconnectSocket() {
        socket.emit("logout", {
            username: JSON.parse(_user).username,
            token: auth_socket
        })
    }

    useEffect(() => {

        socket.on(`private-message`, (msg) => {
            console.log(msg);

        })

        socket.on("group-message", (msg) => {
            console.log(msg);
        })

    }, [])

    useEffect(() => {
        if (status) return;
        if (reconnect) return;
        if (_user || auth_socket) {
            console.log("reconnect");
            connectSocket({
                username: JSON.parse(_user).username,
                token: auth_socket
            });
            socket.connect();
            setReconnect(true);
        }
    }, [_user, auth_socket])

    return (
        <SocketContext.Provider
            value={{
                socket,
                connectSocket,
                setUser,
                user,
                status,
                disconnectSocket
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
