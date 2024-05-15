const groupService = require("../services/group-service")

module.exports = {
    create: async(req, res, next) => {
        try {
            const result = await groupService.create(req.body);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    },
    get: async(req, res, next) => {
        try {
            const user_id = res.locals.decrypt_token.id;
            const result = await groupService.get(user_id);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    },
}