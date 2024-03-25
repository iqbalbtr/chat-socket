const prisma = require("../../prisma/prisma")

module.exports = {
    create: async (req) => {
        await prisma.contact.create({
            data: {
                name: req.name,
                contactId: req.contact_id,
                userId: req.user_id
            }
        })
    },
    remove: async (contactId) => {
        await prisma.contact.delete({
            where: {
                id: contactId
            }
        })
    },
    update: async (contactId, req) => {
        await prisma.contact.update({
            where: {
                id: contactId
            },
            data: req
        })
    },
    list: async (req) => {
        await prisma.contactList.findFirst({
            where: {
                userId: req.user_id
            },
            select: {
                contact: true
            }
        })
    },
}