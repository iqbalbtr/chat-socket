const { required } = require("joi");
const prisma = require("../../prisma/prisma")
const uuid = require("uuid").v4

module.exports = {
    create: async (req) => {
        return prisma.$transaction(async (tx) => {
            const createGroup = await tx.group.create({
                data: {
                    name: req.name,
                    bio: req.bio,
                    group_code: uuid(),
                    last_info: {
                        create: {
                            msg: ""
                        }
                    }
                }
            });
    
            const createMember = req.member.map(async (member) => {
                const user = await prisma.users.findUnique({
                    where: {
                        username: member.username
                    }
                });

                console.log("member =>", user);
    
                if (user) {
                    return tx.group_member.create({
                        data: {
                            group_id: createGroup.id,
                            user_id: user.id,
                            role: member.role,
                        },
                        select: {
                            role: true,
                            user: {
                                select: {
                                    username: true,
                                    email: true,
                                    user_info: true
                                }
                            }
                        }
                    });
                }
            });

            const member = await Promise.all(createMember);

            return {
                ...createGroup,
                member: member
            }
        })
    },
    get: async (req) => {
        return await prisma.group_member.findMany({
            where: {
                user_id: req
            },
            select: {
                group: {
                    include: {
                        group_member: true
                    }
                }
            }
        })
    }
}