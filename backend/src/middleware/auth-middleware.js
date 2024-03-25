const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");

module.exports = {
    socket: async (socket, next) => {
        try {
            const auth = socket.handshake.auth;
            jwt.verify(auth.token, process.env.TOKEN_KEY, (err, result) => {
                if (err){
                    throw new ResponseError(401, "Access denied");
                }
                return result;
            });
            const query = await prisma.user.findUnique({
                where: {
                    username: auth.username,
                    socket_token: auth.token
                }
            });

            if (!query) throw new ResponseError("User is not found or not active");

            next();
        } catch (e) {
            console.log(`Access denied for ${socket.id}, message ${e.message}`);
        }
    },
    api: async (req, res, next) => {
        try {
            const _token = await req.cookies.auth_token;
            const verify = jwt.verify(_token, process.env.TOKEN_KEY, (err, result) => {
                if(err){
                    throw new ResponseError(401, "Access denied");
                }
                return result;
            })
            const query = await prisma.user.findFirst({
                where: {
                    username: verify.username,
                    token: _token
                }
            })
            res.locals.decrypt_token = verify;
            if (!query) throw new ResponseError(401, "Access denied");
            next();
        } catch (e) {
            next(e);
        }
    }
}