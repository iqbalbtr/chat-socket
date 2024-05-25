const prisma = require("../../prisma/prisma");
const messageService = require("../services/message-service");
const userService = require("../services/user-service")

module.exports = {
    private: async (msg, current, socket) => {

        /**  
         * Validate is user responder exist in database
        */
        const userIsExist = await userService.getByUsername(msg.info_msg.to);

        if (userIsExist) {
            await messageService.private(msg, current, (err, result, newContact) => {
                if (!err) {

                    if(newContact){
                        socket.to(msg.info_msg.to).emit("new-contact", newContact);
                    }
                    
                    // sending message to responder
                    socket.to(msg.info_msg.to).emit("private-message", result);


                    // sending result message to sender
                    socket.emit("result-sending-msg", result);

                    // socket.to(msg.info_msg.to).emit("last_info", result);
                }
            })
        }
    },
    group: async (code, msg, current, socket) => {

        /**  
         * Validate is group responder exist in database
        */
        const find = await prisma.group.findFirst({
            where: {
                group_code: code
            },
            include: {
                group_member: {
                    include: {
                        user: true
                    }
                }
            }
        })

        await messageService.group(msg, find, current.id, (err, resultMsg) => {
            if (!err) {

                // Sending message for each member group
                find.group_member.forEach(foo => {
                    socket.to(foo.user.username).emit("group-message", resultMsg, find.group_code)
                })

                // Sending message for sender
                socket.emit("result-sending-msg", resultMsg, find.group_code)
            }
        })

    },
    readed: async (req, current) => {

        /**
         * 
         * update contact last info by type contact
         */
        return req.type === "private" ?
            await prisma.contact.update({
                where: {
                    id: req.current
                },
                data: {
                    last_info: {
                        update: {
                            unread: 0
                        }
                    }
                }
            }) :
            await prisma.group.update({
                where: {
                    id: req.current
                },
                data: {
                    group_member: {
                        update: {
                            where: {
                                group_id: req.current,
                                user_id: current.id
                            },
                            data: {
                                unread: 0
                            }
                        }
                    }
                }
            })
    }
}