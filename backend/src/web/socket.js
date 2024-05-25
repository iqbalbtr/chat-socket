const chatEvent = require("../events/chat-event")
const messageEvent = require("../events/message-event");
const statusEvent = require("../events/status-event");
const userEvent = require("../events/user-event")
const groupService = require("../services/group-service");
const { updateActiveUser } = require("../utils/socket/updateActiveUser");
const { writeFile } = require("fs")

let client_active = {
    count: 0,
    users: [],
};

async function initializeSocket(io) {

    /**
     * 
     * Connect on websocket
     */
    io.on("connection", async (socket) => {

        /**
         * Current user active
         */
        const current_user = socket.user;

        /**
         * 
         * Join user for her room 
         * and group room
         */
        socket.join(current_user.username);
        (await groupService.get(socket.user.id)).
            forEach(foo => {
                // group join
                socket.join(foo.group.group_code);
            })


        /** 
         * 
         * Update store active user
        */
        client_active = updateActiveUser(client_active, current_user);

        /**
         * 
         * Emit user status
         */
        userEvent.active(current_user, client_active, socket);


        /**
         * 
         * Event handler
         */

        socket.on("private-message", msg => messageEvent.private(msg, current_user, socket));
        socket.on("group-message", (msg, code) => messageEvent.group(msg, code, current_user, socket));
        socket.on("readed-msg", msg => messageEvent.readed(msg, current_user));

        socket.on("get-chat", req => chatEvent.getChat(req, current_user, socket))

        socket.on("log-out", req => userEvent.logout(client_active, req, (result) => {client_active = result}));
        socket.on("disconnect", req => userEvent.disconnect(client_active, current_user, socket));

        socket.on("upload-status", (file, callback) => statusEvent.uplaodStatus(file, current_user, client_active, socket, callback))
        socket.on("get-status", (req, callback) => statusEvent.get(current_user, callback))
        socket.on("readed-status", (req, callback) => statusEvent.readed(req, callback))


        // Logging
        console.log("User active => ", client_active.users.map((client) => ({ username: client.username, active: client.active })));
        console.log("User count => ", client_active.count)
    })
}

module.exports = {
    initializeSocket
}