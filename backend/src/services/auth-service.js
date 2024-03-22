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

        const compare_pass = await bcrypt.compare(req_valid.password, count.passwors) 

        if(!compare_pass) throw new ResponseError(401, "Password or user is wrong")

        const payload = {
            id: count.id,
            username: count.username
        }


        return prisma.user.update({
            where: {
                id: count.id
            },
            data: {
                token: jwt.sign(payload, process.env.TOKEN_KEY)
            },
            select: {
                token: true
            }
        })

    },
    logout: async(req) => {
        const count = await prisma.user.findFirst({
            where: {
                token: req
            }
        })

        if (!count) throw new ResponseError(404, "User is not found")

        return await prisma.user.update({
            where: {
                id: count.id
            }, 
            data: {
                token: null
            },
            select: {
                username: true
            }
        })
    }
}