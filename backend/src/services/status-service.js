const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");

module.exports = {
    list: async(contact_list_id) => {
            const all = await prisma.contact_list.findFirst({
                where: {
                    id: contact_list_id
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            user_status: {
                                where:{
                                    create_at: {
                                        gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
                                    }
                                },
                                include: {
                                    status_read: {
                                        select: {
                                            contact: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    contact: {
                        where: {
                            NOT: [
                                {
                                    unsaved: true
                                }
                            ]
                        },
                        include: {
                            user: {
                                include: {
                                    user_status: {
                                        where:{
                                            create_at: {
                                                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
                                            }
                                        },
                                        include: {
                                            status_read: {
                                                where: {
                                                    contact: {
                                                        contact_list_id: contact_list_id
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
    
            if (!all) {
                throw new ResponseError(404, "User is not found")
            }
    
            return [
                ...all.contact.map(foo => ({
                    id: foo.user.id,
                    contact_id: foo.id,
                    username: foo.user.username,
                    data: foo.user.user_status.map(fii => ({
                        ...fii,
                        status_read: fii.status_read
                    }))
                })),
                {
                    id: all.user.id,
                    contact_id: "",
                    username: all.user.username,
                    data: all.user.user_status.map(fii => ({
                        ...fii,
                        status_read: fii.status_read
                    }))
                }
            ]
    }
}