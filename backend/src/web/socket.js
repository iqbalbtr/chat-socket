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
    }
}

