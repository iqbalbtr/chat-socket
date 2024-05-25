const { writeFile } = require("fs")
const path = require("path");
const prisma = require("../../prisma/prisma");



module.exports = {
    uplaodStatus: async (file, current, client_active, socket, callback) => {

        const name = `${current.id}_${new Date().getTime()}.png`;
        const src = "http://localhost:8080/status/" + name;
        const pathName = path.resolve(__dirname, "../../public/status/" + name);
        writeFile(pathName, file.file, async (err) => {
            if (err) {
                return callback("Error store file", null)
            }

            const user = await prisma.contact_list.findFirst({
                where: {
                    id: current.contact_list_id
                },
                select: {
                    contact: {
                        select: {
                            user: {
                                select: {
                                    username: true
                                }
                            }
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                }
            })
            
            const create = await prisma.user_status.create({
                data: {
                    user_id: current.id,
                    src: src,
                    duration: 0,
                    type: "photo",
                    text: file.text

                },
                select: {
                    id: true,
                    create_at: true,
                    duration: true,
                    src: true,
                    text: true,
                    type: true,
                }
            })

            if (!create) {
                return callback("Error update status", null)
            }

            const payload = {
                id: user.user.id,
                contact_id: create.id,
                username: user.user.username,
                created: {
                    ...create,
                    status_read: []
                }
            }


            user.contact.forEach(foo => {
                if(client_active.users.find(us => us.username === foo.user.username)) {
                    socket.to(foo.user.username).emit("status-update", payload.created, current.username)
                }
            })

            callback(null, create)
        })
    },
    readed: async (req, callback) => {

        const readed = await prisma.status_readed.count({
            where: {
                status_id: req.status_id,
                contact_id: req.contact_id
            }
        })

        if (readed >= 1) {
            return callback("User has been readed", null)
        }

        const create = await prisma.status_readed.create({
            data: {
                user_status: {
                    connect: {
                        id: req.status_id
                    }
                },
                contact: {
                    connect: {
                        id: req.contact_id,
                    }
                }
            },
        })

        if (!create) {
            return callback("Error update status", null)
        }

        callback(null, create)
    }
}