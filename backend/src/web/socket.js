let client_active = {
    count: 0,
    users: [],
};

module.exports = (socket) => {

    const current_user = socket.user;
    socket.join(current_user.username);

    const existing_user = client_active.users.find(client => client.username === current_user.username);
    if (!existing_user) {
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
                if (client.username === current_user.username) {
                    return {
                        ...client,
                        active: true
                    }
                } else {
                    return client
                }
            })
        }
    }
    socket.broadcast.emit("user-status", client_active.users.filter(user => user.active));

    console.log("User active => ", client_active.users.map((client) => ({ username: client.username, active: client.active })));
    console.log("User count => ", client_active.count)

    return {
        on_private: async (msg) => {
            const find = client_active.users.find(user => user.username === msg.info.to);
            console.log({find});
            if(!find || !find.active){
                client_active.users.map(user => {
                    if(user.username === msg.info.to){
                        return {
                            ...user,
                            pendingMsg: [
                                ...user.pendingMsg,
                                msg
                            ]
                        }
                    } else {
                        return user
                    }
                })
            } else {
                socket.to(msg.info.to).emit("private-message", msg);
            }
            console.log(client_active.users);
        },
        disconnect: async () => {
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

            socket.broadcast.emit("user-status", client_active.users.filter(user => !user.active));
            console.log(`${current_user.username} has been disconnect`);
            console.log("disconnect =>", client_active.users.map((client) => ({ username: client.username, active: client.active })));
        },
        on_group: async (name, msg) => {
            socket.to(name).emit("group-message", msg);
        },
        on_logout: async (value) => {
            client_active = {
                count: client_active.count - 1,
                users: client_active.users.filter(client => client.username !== value)
            }
            console.log("logout => ", client_active.users.map((client) => ({ username: client.username, active: client.active })));
        }
    }
}

