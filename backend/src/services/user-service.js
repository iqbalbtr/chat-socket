const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");
const userValidation = require("../validation/user-validation");
const validate = require("../validation/validate");
const bcrypt = require('bcrypt');

module.exports = {
    create: async(user) => {

        const req_valid = validate(userValidation.create, user);

        const count = prisma.users.findUnique({
            where: {
                OR: [
                    {
                        username: req_valid.username
                    },
                    {
                        email: req_valid.email
                    }
                ]
            }
        })

        const password = await bcrypt.hash(req_valid.password, 10);
        
        if (count >= 1) throw new ResponseError(400, "User or email already exist");

        const create = await prisma.users.create({
            data: {
                username: req_valid.username,
                email: req_valid.email,
                password: password,
                user_info: {
                    create: {}
                },
                user_auth: {
                    create: {}
                },
                contact_list: {
                    create: {}
                }
            },
            select: {
                id: true,
                email: true,
                username: true
            }
        });

        return {
            username: create.username
        }
    },
    getByUsername: async(req) => {
        const query = await prisma.users.findFirst({
            where: {
                username: req.username
            }
        })

        return query;
    }
}