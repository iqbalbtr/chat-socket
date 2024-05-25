const prisma = require("../../prisma/prisma")

module.exports = {
    getChat: async (req, current_user, socket) => {

        /**
         * 
         * query by type chat
         */
        const result = req.type === "private" ?
            await prisma.contact.findFirst({
                where: {
                    contact_list_id: current_user.contact_list_id,
                    user: {
                        username: req.username
                    }
                },
                include: {
                    message: {
                        include: {
                            info_msg: true,
                            pull_msg: {
                                include: {
                                    msg: {
                                        include:{
                                            info_msg: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }) :
            await prisma.group.findFirst({
                where: {
                    group_code: req.username
                },
                include: {
                    message: {
                        include: {
                            info_msg: true,
                            pull_msg: {
                                include: {
                                    msg: {
                                        include:{
                                            info_msg: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })

        const payload = result !== null && result.message.length ? result.message.map(foo => ({
            id: foo.id,
            msg: foo.msg,
            time: foo.time,
            forward: foo.forward,
            info_msg: {
                id: foo.info_msg.id,
                to: foo.info_msg.to,
                from: foo.info_msg.from,
                sender_read: foo.info_msg.sender_read,
                respon_read: foo.info_msg.respon_read,
                type: foo.info_msg.type
            },
            ...(foo.pull_msg.status && {
                pull_msg: {
                    id: foo.pull_msg.msg.id,
                    msg: foo.pull_msg.msg.msg,
                    time: foo.pull_msg.msg.time,
                    forward: false,
                    info_msg: {
                        ...foo.pull_msg.msg.info_msg
                    }
                }
            })
        })) : []


        /**
         * 
         * sending result to sender
         */
        socket.emit("get-chat", payload)
    }
}