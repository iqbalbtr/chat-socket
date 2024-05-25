const groupService = require("../services/group-service");
const statusService = require("../services/status-service");

module.exports = {
    get: async(req, res, next) => {
        try {
            const contact_list_id = res.locals.decrypt_token.contact_list_id;
            const result = await statusService.list(contact_list_id);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    },
}