const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");
const userValidation = require("../validation/user-validation")
const validate = require("../validation/validate")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

module.exports = {
    login: async(req) => {
        const req_valid = validate(userValidation.create, req);

        const count = await prisma.user.findUnique({
            where: {
                username: req_valid.username
            }
        }) 

        if(!count) throw new ResponseError(404, "User is not found");

        const compare_pass = await bcrypt.compare(req_valid.password, count.password); 

        if(!compare_pass) throw new ResponseError(401, "Password or user is wrong")

        const payload_token = {
            id: count.id,
            username: count.username
        }
        const payload_socket = {
            username: count.username,
            active: true
        }

        return prisma.user.update({
            where: {
                id: count.id
            },
            data: {
                token: jwt.sign(payload_token, process.env.TOKEN_KEY),
                socket_token: jwt.sign(payload_socket, process.env.TOKEN_KEY)
            },
            select: {
                id: true,
                username: true,
                token: true,
                socket_token: true
            }
        });

    },
    logout: async(req) => {
        const count = await prisma.user.findFirst({
            where: {
                token: req.token
            }
        })

        if (!count) throw new ResponseError(404, "User is not found");

        return await prisma.user.update({
            where: {
                id: count.id
            }, 
            data: {
                token: null,
                socket_token: null
            },
            select: {
                username: true
            }
        })
    }
}