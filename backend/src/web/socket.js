let client_active = {
    count: 0,
    users: []
};

module.exports = (socket) => {

    const current_user = socket.handshake.auth;
    socket.join(current_user.username);

    const existing_user = client_active.users.find(client => client.username === current_user.username);
    if(!existing_user){
        client_active = {
            count: client_active.count + 1,
            users: [
                ...client_active.users,
                {
                    active: true,
                    ...current_user
                }
            ]
        }
    } else {
        client_active = {
            ...client_active,
            users: client_active.users.map(client => {
                if(client.username === current_user.username){
                    return {
                        ...client,
                        active: true
                    }
                }else{
                    return client
                }
            })
        }
    } 

    console.log("User active => ", client_active.users.map((client) => ({ username: client.username, active: client.active })));
    console.log("User count => ", client_active.count)
   
    return {
        on_private: (msg) => {
            socket.to(msg.to).emit("private-message", msg);
        },
        disconnect: () => {
            client_active = {
                ...client_active,
                users: client_active.users.map(client => {
                    if (client.username === current_user.username) {
                        return {
                            ...current_user,
                            active: false
                        }
                    } else {
                        return client
                    }
                })
            }

            console.log(`${current_user.username} has been disconnect`);
            console.log("disconnect =>", client_active.users.map((client) => ({ username: client.username, active: client.active })));
        },
        on_group: (name, msg) => {
            socket.to(name).emit("group-message", msg);
        },
        on_logout: (value) => {
            client_active = {
                count: client_active.count - 1,
                users: client_active.users.filter(client => {
                    return(
                        client.username !== value.username &&
                        client.token !== value.token
                    )
                })
            }
            console.log("logout => ", client_active.users.map((client) => ({ username: client.username, active: client.active })));
        }
    }
}

