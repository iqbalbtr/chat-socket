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
            res.cookie(
                "auth_token",
                result.token,
                {
                    httpOnly: true,
                    maxAge: 20 * 60 * 60 * 60 * 1000
                }
            );
            res.cookie(
                "_user",
                JSON.stringify({
                    id: result.id,
                    username: result.username
                }),
                {
                    maxAge: 20 * 60 * 60 * 60 * 1000
                }
            );
            res.cookie(
                "auth_socket",
                result.socket_token,
                {
                    maxAge: 20 * 60 * 60 * 60 * 1000
                }
            )
            res.status(200).json({
                result: {
                    token: result.token,
                    socket_token: result.socket_token
                }
            });
            res.end();
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const reqLogout = {
                auth_token: req.cookies.auth_token,
                socket_token: req.cookies.auth_socket
            }
            await authService.logout(reqLogout);
            const cookies = Object.keys(req.cookies);
            cookies.forEach(cookie => res.clearCookie(cookie));
            res.status(200).json({
                result: "OK"
            })
            res.end();
        } catch (e) {
            next(e);
        }
    }
}