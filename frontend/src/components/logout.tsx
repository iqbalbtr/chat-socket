import { useSocket } from '@providers/SocketProvider';
import React from 'react'

function Logout() {
    const { disconnectSocket } = useSocket();

    async function handleLogout() {
        try {
            disconnectSocket();
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json();

        } catch (error) {
            console.error("Error during registration:", error);
        }
    }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout
