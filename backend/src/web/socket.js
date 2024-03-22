
let client_active = [];
module.exports = {
    socket_provider: (socket) => {

        const current_user = socket.handshake.auth;
        socket.join(current_user.username);
        client_active.push(current_user);

    }
}

