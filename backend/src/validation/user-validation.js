const Joi = require("joi");

module.exports = {
    create: Joi.object({
        username: Joi.string().min(6).max(25).required(),
        password: Joi.string().required()
    })
}