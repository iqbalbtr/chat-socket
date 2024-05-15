const prisma = require("../../prisma/prisma");

module.exports = {
    logout: async(client_active, value) => {
        client_active = {
            count: client_active.count - 1,
            users: client_active.users.filter(client => client.username !== value)
        }
        console.log("logout => ", client_active.users.map((client) => ({ username: client.username, active: client.active })));
    },
    disconnect: async (client_active, current, socket) => {
        client_active = {
            ...client_active,
            users: client_active.users.map(client => {
                if (client.username === current.username) {
                    return {
                        ...current,
                        active: false
                    }
                } else {
                    return client
                }
            })
        }

        const query = await prisma.contact_list.findUnique({
            where: {
                user_id: current.id
            },
            include: {
                contact: {
                    include: {
                        user: true
                    }
                }
            }
        })

        await prisma.users.update({
            where: {
                username: current.username
            },
            data: {
                last_active: new Date()
            }
        })


        query.contact.forEach(foo => {
            const find = client_active.users.find(use => use.id === foo.user_id);
            if(find && find.active){
                socket.to(foo.user.username).emit("user-offline", current)
            }
        })

        // socket.broadcast.emit("user-status", client_active.users.filter(user => !user.active));
        console.log(`${current.username} has been disconnect`);
        console.log("disconnect =>", client_active.users.map((client) => ({ username: client.username, active: client.active })));
    },
    active: async(current, client_active, socket) => {

        const query = await prisma.contact_list.findUnique({
            where: {
                user_id: current.id
            },
            include: {
                contact: {
                    include: {
                        user: true
                    }
                }
            }
        })


        query.contact.forEach(foo => {
            const find = client_active.users.find(use => use.id === foo.user_id);
            if(find && find.active){
                socket.to(foo.user.username).emit("user-online", current)
            }
        })
    }
}