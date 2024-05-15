const Joi = require("joi");

module.exports = {
    login: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    logout: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
}