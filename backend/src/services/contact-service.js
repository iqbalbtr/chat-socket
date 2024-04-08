const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");

module.exports = {
    create: async (contact_id, req) => {
        const query = await prisma.user.findFirst({
            where: {
                username: req.username
            }
        });

        if (!query) throw new ResponseError(404, "User is not found");

        const exist = await prisma.contact.count({
            where: {
                contactId: contact_id,
                user: {
                    username: req.username
                }
            }
        });

        if(exist >= 1) throw new ResponseError(404, "Contatc already exist");

        return await prisma.contact.create({
            data: {
                contactId: contact_id,
                name: req.name,
                userId: query.id,
            }
        })
    },
    remove: async (contactId) => {
        const query = await prisma.contact.findFirst({
            where: {
                id: +contactId
            }
        })
        if(!query) throw new ResponseError(404, "Contact is not found");
        const result = await prisma.contact.delete({
            where: {
                id: +contactId
            },
            select: {
                id: true,
                name: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })

        return {
            id: result.id,
            name: result.name,
            username: result.user.username
        }
    },
    update: async (contactId, req) => {
        const query = await prisma.contact.findFirst({
            where: {
                id: +contactId
            }
        })

        if(!query) throw new ResponseError(404, "Contact is not found")

        const result = await prisma.contact.update({
            where: {
                id: +contactId
            },
            data: {
                name: req.name
            },
            select:{
                id: true,
                name: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })

        return {
            id: result.id,
            name: result.name,
            username: result.user.username,
        }
    },
    list: async (req) => {
        const result = await prisma.contactList.findFirst({
            where: {
                userId: req
            },
            include: {
                contact: {
                    select: {
                        id: true,
                        name: true,
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                },
                users: true
            }
        })

        return {
            username: result.users.username,
            data: result.contact.map(contact => ({
                id: contact.id,
                username: contact.user.username,
                name: contact.name
            }))
        }
    }
}