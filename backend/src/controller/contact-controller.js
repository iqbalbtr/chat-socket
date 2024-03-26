const contactService = require("../services/contact-service");

module.exports = {
    create: async (req, res, next) => {
        try {
            const body = req.body;
            const result = await contactService.create(body);
            res.status(200).json({ result });
        } catch (e) {
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const contactId = req.params.contactId;
            const result = await contactService.remove(contactId);
            res.status(200).json({ result });
        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const body = req.body;
            const contactId = req.params.contactId;
            const result = await contactService.update(contactId, body);
            res.status(200).json({result});
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const userId = res.locals.decrypt_token.id;
            const result = await contactService.list(userId);
            res.status(200).json({result});
        } catch (e) {
            next(e);
        }
    },
}