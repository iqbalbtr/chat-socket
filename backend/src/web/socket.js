const userSevice = require("../services/user-service");

module.exports = (socket) => {
    console.log('Server connected');

    socket.on("message", (msg) => {
        console.log(msg);
    })

    socket.on("add-user", async (data) => {
        console.log(data)
        await userSevice.addUser(data);
    })
}

