import { useState } from "react"
import { socket } from "../socket";

type User = {
    name: string;
    id: number;
}
function HomePage() {

    const [user, setUser] = useState<User>()

    function hanldleInput(value: string) {
        
        const generateId = Math.floor(Math.random() * 1000);

        setUser({
            name: value,
            id: generateId
        })
    }

    function handleLogin() {
        if (!user) return
        console.log(user);
        
        socket.emit("add-user", user);
    }

    return (
        <div>
            <input onChange={(e) => hanldleInput(e.target.value)} type="text" />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default HomePage
