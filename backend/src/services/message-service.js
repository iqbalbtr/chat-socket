const prisma = require("../../prisma/prisma");
const socket = require("../web/socket");

module.exports = {
    private: async (msg, current, callback) => {
        try {

            // get sender information 
            const sender = current.id;

            //  create message
            const createMsg = await prisma.message.create({
                data: {
                    msg: msg.msg,
                    forward: msg.forward,
                    time: new Date(),
                    info_msg: {
                        create: {
                            to: msg.info_msg.to,
                            from: msg.info_msg.from,
                            respon_read: false,
                            sender_read: true,
                            type: "private"
                        }
                    },
                    pull_msg: {
                        create: {
                            status: false
                        }
                    }
                },
                include: {
                    info_msg: true,
                    pull_msg: true
                }
            })

            // validate is rponder exist in database
            const reponUser = await prisma.users.findFirst({
                where: {
                    username: msg.info_msg.to,
                },
                select: {
                    id: true,
                    contact_list: {
                        select: {
                            id: true,
                        }
                    }
                }
            })


            /**
             * find contact sender from user responder
             * if exist update contact last info
             * else create unsaved contact to user responder
             */

            const find = await prisma.contact.findFirst({
                where: {
                    contact_list_id: reponUser.contact_list.id,
                    user: {
                        username: msg.info_msg.from
                    },
                },
                include: {
                    last_info: true
                }
            })

            if (!find) {
                const result = await prisma.contact.create({
                    data: {
                        first_name: `@${msg.info_msg.from}`,
                        contact_list_id: reponUser.contact_list.id,
                        user_id: sender,
                        unsaved: true,
                        last_info: {
                            create: {
                                msg: msg.msg,
                                unread: 0
                            }
                        },
                        message: {
                            connect: {
                                id: createMsg.id
                            }
                        }
                    },
                    include: {
                        last_info: true,
                        user: {
                            include: {
                                user_info: true
                            }
                        }
                    }
                })

                socket.to(msg.info_msg.to).emit("new-contact", {
                    id: result.id,
                    name: `${result.first_name} ${result.last_name || " "}`,
                    bio: result.user.user_info.bio,
                    username: result.user.username,
                    type: "private",
                    last_info: {
                        id: result.last_info.id,
                        msg: result.last_info.msg,
                        time: result.last_info.time,
                        unread: 1,
                    }
                })

            } else {
                const unread = find.last_info.unread++
                await prisma.contact.update({
                    where: {
                        contact_list_id: reponUser.contact_list.id,
                        user_id: find.user_id
                    },
                    data: {
                        last_info: {
                            update: {
                                msg: msg.msg,
                                time: new Date(),
                                unread: unread
                            }
                        },
                        message: {
                            connect: {
                                id: createMsg.id
                            }
                        }
                    }
                })
            }


            // update sender contact last info 
            await prisma.contact.update({
                where: {
                    contact_list_id: current.contact_list_id,
                    user_id: reponUser.id
                },
                data: {
                    last_info: {
                        update: {
                            msg: msg.msg,
                            time: new Date(),
                        }
                    },
                    message: {
                        connect: {
                            id: createMsg.id
                        }
                    }
                }
            })

            const resultMsg = {
                id: createMsg.id,
                ...msg,
                info_msg: {
                    id: createMsg.info_msg.id,
                    ...msg.info_msg
                }
            }

            callback(null, resultMsg);

        } catch (error) {

            /**
             * Handler error contact
             */
            console.log(error);
            callback("Erorr sending message")

        }
    },
    group: async (msg, group, user_id, callback) => {

        try {
            // creae message group
            const createMsg = await prisma.message.create({
                data: {
                    msg: msg.msg,
                    forward: msg.forward,
                    time: new Date(),
                    info_msg: {
                        create: {
                            to: msg.info_msg.to,
                            from: msg.info_msg.from,
                            respon_read: false,
                            sender_read: true,
                            type: "group"
                        }
                    },
                    pull_msg: {
                        create: {
                            status: false
                        }
                    }
                },
                include: {
                    info_msg: true,
                    pull_msg: true
                }
            })


            // update last info current group 
            await prisma.group.update({
                where: {
                    id: group.id
                },
                data: {
                    message: {
                        connect: {
                            id: createMsg.id
                        }
                    },
                    last_info: {
                        update: {
                            msg: createMsg.msg,
                            time: new Date()
                        }
                    },
                    group_member: {
                        updateMany: {
                            where: {
                                group_id: group.id,
                                NOT: [
                                    {
                                        user_id: user_id
                                    }
                                ]
                            },
                            data: {
                                unread: {
                                    increment: 1
                                }
                            }
                        }
                    }
                }
            })

            const resultMsg = {
                id: createMsg.id,
                ...msg,
                info_msg: {
                    id: createMsg.info_msg.id,
                    ...msg.info_msg
                }
            }

            // returm all member group and reuslt msg
            callback(null, resultMsg)
        } catch (error) {
            
            /**
            * Handler error message
            */
           console.log(error);
            callback("Erorr sending message")
        }
    }
}