const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");
const cookie = require("cookie");

module.exports = {
    socket: async (socket, next) => {
        try {

            const cookies = cookie.parse(socket.handshake.headers.cookie);
            socket.cookies = cookies;
            
            const auth = socket.handshake.auth;
            if (!auth.username)
                throw new ResponseError(401, "Access username is denied");
            jwt.verify(cookies.auth_socket, process.env.TOKEN_KEY, (err, result) => {
                if (err){
                    throw new ResponseError(401, "Access denied");
                }
                socket.user = result;
            });
            const query = await prisma.user.findUnique({
                where: {
                    username: auth.username,
                    socket_token: cookies.auth_socket
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