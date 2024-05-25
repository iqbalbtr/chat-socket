const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");

module.exports = {
    create: async (contact_list_id, req) => {
        const query = await prisma.users.findFirst({
            where: {
                username: req.username
            }
        });

        if (!query) throw new ResponseError(404, "User is not found");

        const exist = await prisma.contact.count({
            where: {
                contact_list_id: contact_list_id,
                user: {
                    username: req.username
                }
            }
        });

        if (exist >= 1) throw new ResponseError(404, "Contatc already exist");

        const result = await prisma.contact.create({
            data: {
                contact_list_id: contact_list_id,
                first_name: req.first_name,
                last_name: req.last_name,
                user_id: query.id,
                last_info: {
                    create: {
                        msg: ""
                    }
                }
            },
            include:{
                user:{
                    select: {
                        username: true,
                        user_info:{
                            select: {
                                bio: true
                            }
                        },
                        last_active: true
                    }
                },
                last_info: true
            }
        })

        return {
            id: result.id,
            name: `${result.first_name}%2f${result.last_name || ""}`,
            bio: result.user.user_info.bio,
            username: result.user.username,
            last_info: result.last_info,
            last_active: result.user.last_active,
            type: "private"
        }
    },
    remove: async (contactId) => {
        const query = await prisma.contact.findFirst({
            where: {
                id: contactId
            }
        })

        if (!query) throw new ResponseError(404, "Contact is not found");

        await prisma.$transaction([
            prisma.status_readed.deleteMany({
                where: {
                    contact_id: contactId
                }
            }),
            prisma.last_info.delete({
                where: {
                    contact_id: contactId
                }
            }),
            prisma.contact.delete({
                where: {
                    id: contactId
                }
            })
        ])

        return "Success"
    },
    update: async (contactId, req) => {
        const query = await prisma.contact.findFirst({
            where: {
                id: contactId
            }
        })

        if (!query) throw new ResponseError(404, "Contact is not found")

        const result = await prisma.contact.update({
            where: {
                id: contactId
            },
            data: {
                first_name: req.firstname,
                last_name: req.lastname,
                unsaved: false,
            },
            select: {
                id: true,
                last_info: true,
                first_name: true,
                last_name: true,
                unsaved: true,
                user: {
                    select: {
                        username: true,
                        user_info: {
                            select: {
                                bio: true
                            }
                        },
                        last_active: true
                    }
                }
            }
        })

        return {
            id: result.id,
            name: `${result.first_name}%2f${result.last_name || ""}`,
            bio: result.user.user_info.bio,
            username: result.user.username,
            last_info: result.last_info,
            last_active: result.user.last_active,
            type: "private"
        }
    },
    list: async (req) => {

        let all = await prisma.users.findUnique({
            where: {
                id: req,
            },
            include: {
                group_member: {
                    where: {
                        user_id: req
                    },
                    select: {
                        group: {
                            select: {

                                // Group info
                                id: true,
                                name: true,
                                bio: true,
                                last_info: true,
                                group_code: true,

                                // group members
                                group_member: {
                                    select: {
                                        id: true,
                                        role: true,
                                        unread: true,
                                        user: {
                                            select: {

                                                // Member Info
                                                id: true,
                                                username: true,
                                                email: true,
                                                last_active: true,
                                                user_info: {
                                                    select: {
                                                        first_name: true,
                                                        last_name: true,
                                                        bio: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                contact_list: {
                    select: {
                        contact: {
                            select: {

                                // Contact Info
                                id: true,
                                first_name: true,
                                last_name: true,
                                last_info: true,
                                unsaved: true,
                                user: {
                                    select: {
                                        username: true,
                                        last_active: true,
                                        email: true,
                                        user_info: {
                                            select: {
                                                bio: true
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


        const group = all.group_member.length ? [
            ...all
                .group_member
                .map(foo => ({
                    id: foo.group.id,
                    name: foo.group.name,
                    bio: foo.group.bio,
                    group_code: foo.group.group_code,
                    member: foo
                        .group
                        .group_member
                        .map(member => ({
                            id: member.id,
                            role: member.role,
                            username: member.user.username,
                            first_name: member.user.user_info.first_name || member.user.username,
                            last_name: member.user.user_info.last_name,
                            bio: member.user.user_info.bio,
                        }))
                }))
        ] : []

        const list = [
            ...all
                .contact_list
                .contact
                .map(foo => ({
                    id: foo.id,
                    name: `${foo.first_name}%2f${foo.last_name || ""}`,
                    bio: foo.user.user_info.bio,
                    username: foo.user.username,
                    last_info: foo.last_info,
                    last_active: foo.user.last_active,
                    type: "private",
                    unsaved: foo.unsaved
                })),
            ...(
                group.length >= 1 ? [
                    ...all
                        .group_member
                        .map(foo => ({
                            id: foo.group.id,
                            name: foo.group.name,
                            bio: foo.group.bio,
                            username: foo.group.group_code,
                            last_info: {
                                ...foo.group.last_info,
                                unread: foo.group.group_member.find(use => use.user.id === req).unread
                            },
                            type: "group"
                        }))
                ] : []
            )

        ].sort((a, b) => b.last_info.time - a.last_info.time)


        return {
            contact: [
                ...all
                    .contact_list
                    .contact
                    .map(foo => ({
                        id: foo.id,
                        first_name: foo.first_name,
                        last_name: foo.last_name,
                        bio: foo.user.user_info.bio,
                        username: foo.user.username,
                        email: foo.user.email
                    }))
            ],
            group: group,
            list: list
        }
    }
}