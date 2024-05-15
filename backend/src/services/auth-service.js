const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");
const userValidation = require("../validation/user-validation")
const validate = require("../validation/validate")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const authValidation = require("../validation/auth-validation");

module.exports = {
    login: async (req) => {
        const req_valid = validate(authValidation.login, req);

        const count = await prisma.users.findFirst({
            where: {
                OR: [
                    {
                        username: req_valid.username
                    },
                    {
                        email: req_valid.username
                    }
                ]
            },
            select: {
                id: true,
                username: true,
                email: true,
                user_info: true,
                password: true,
                user_auth: true,
                contact_list: true
            }
        })

        if (!count) throw new ResponseError(404, "User is not found");

        const compare_pass = await bcrypt.compare(req_valid.password, count.password);

        if (!compare_pass) throw new ResponseError(401, "Password or user is wrong")

        const payload_token = {
            id: count.id,
            username: count.username,
            contact_list_id: count.contact_list.id ,
            email: count.email,
            first_name: count.user_info.first_name,
            last_name: count.user_info.last_name
        }
        const payload_socket = {
            id: count.id,
            username: count.username,
            email: count.email,
            contact_list_id: count.contact_list.id ,
            active: true
        }

        return prisma.user_auth.update({
            where: {
                id: count.user_auth.id
            },
            data: {
                token: jwt.sign(payload_token, process.env.TOKEN_KEY, { expiresIn: "7d" }),
                socket_token: jwt.sign(payload_socket, process.env.TOKEN_KEY, { expiresIn: "7d" })
            },
            select: {
                id: true,
                token: true,
                socket_token: true,
                user: {
                    select:{
                        username: true
                    }
                }
            }
        });

    },
    logout: async (req) => {
        const count = await prisma.user_auth.findFirst({
            where: {
                token: req.auth_token,
                socket_token: req.socket_token
            },
            select: {
                user: {
                    select: {
                        id: true
                    }
                }
            }
        })

        if (!count) throw new ResponseError(404, "User is not found");

        const result = await prisma.user_auth.update({
            where: {
                user_id: count.user.id
            },
            data: {
                token: null,
                socket_token: null
            },
            select: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })

        return result.user.username
    },
    me: async (req) => {
        const query = await prisma.user_auth.findFirst({
            where: {
                token: req
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        if (!query) throw new ResponseError(401, "Access denied");

        return {
            id: query.id,
            username: query.user.username,
            email: query.user.email
        }
    }
}