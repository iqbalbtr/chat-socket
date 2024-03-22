const authService = require("../services/auth-service");
const userService = require("../services/user-service");

module.exports = {
    register: async (req, res, next) => {
        try {
            const body = req.body;
            const result = await userService.create(body);
            res.status(200).json({ result });
        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const body = req.body;
            const result = await authService.login(body);
            res.cookie("auth_age", result, {httpOnly: true, maxAge: 20 * 60 * 60 * 60 * 1000})
            res.status(200).json({result});
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            res.status(200).json({

            })
        } catch (e) {
            next(e);
        }
    }
}