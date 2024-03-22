const { PrismaClientInitializationError } = require("@prisma/client/runtime/library");
const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");

module.exports = {
    socket: async (socket, next) => {
        try {
            const auth = socket.handshake.auth;
            const query = await prisma.user.findUnique({
                where: {
                    username: auth.username
                }
            })
    
            if (!query) throw new ResponseError(404, "User is not found");

            next();
        } catch (e) {
            if(e instanceof ResponseError) {
                console.log(e);
            }
        }
    },
    api: async(req, res, next) => {
        try{
            const token = req.cookies.auth_token;
            if(!token) throw new ResponseError(401, "Access denied");
            const query = await prisma.user.findFirst({
                where: {
                    token: token
                }
            });

            if (!query) throw new ResponseError(401, "Access denied");
            next();
        }catch(e){
            next(e);
        }
    }
}