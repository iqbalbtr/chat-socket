import React from "react";
import { useEffect, useState } from "react";
import { socket } from "../socket";


function SocketProvider(props: { children: React.ReactNode }) {

    const { children } = props;

    useEffect(() => {

        socket.on("connection", () => {
            console.log("connect");
            
        })

        socket.on("message", (msg: string) => {
            console.log(msg)
        })
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default SocketProvider
