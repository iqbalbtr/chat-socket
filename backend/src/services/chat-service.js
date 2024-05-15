const prisma = require("../../prisma/prisma")

module.exports = {
    get: async (req) => {

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
                                user: {
                                    select: {
                                        username: true,
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
                            first_name: member.user.user_info.first_name,
                            last_name: member.user.user_info.last_name,
                            bio: member.user.user_info.bio
                        }))
                }))
        ] : []

        const list = [
            ...all
                .contact_list
                .contact
                .map(foo => ({
                    id: foo.id,
                    name: foo.first_name,
                    bio: foo.user.user_info.bio,
                    username: foo.user.username,
                    last_info: foo.last_info,
                    type: "private"
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

        ].sort((a,b) => b.last_info.time - a.last_info.time)


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

/*
    Pyaload response
    
*/