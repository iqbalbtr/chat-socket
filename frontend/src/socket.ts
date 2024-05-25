import * as socketIO from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';

export const socket = socketIO.connect(URL!, {
    autoConnect: true,
    withCredentials: true,
    auth: () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = decodeURIComponent(cookies[i].trim());

            if (cookie.split("=").slice(0, 1).toString() === "_user") {
                const find = cookie.split("=").slice(1).toString();
                try {
                    const json = JSON.parse(find);
                    return {
                        username: json.username
                    }
                } catch (e) {
                    return "Unautehnticated"
                }
            } 
        }
    }
});