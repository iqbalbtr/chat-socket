const prisma = require("../../prisma/prisma");
const ResponseError = require("../errors/error-response");
const userValidation = require("../validation/user-validation");
const validate = require("../validation/validate");
const bcrypt = require('bcrypt');

module.exports = {
    create: async(user) => {

        const req_valid = validate(userValidation.create, user);

        const count = prisma.user.findUnique({
            where: {
                username: req_valid.username
            }
        })

        const password = await bcrypt.hash(req_valid.password, 10);
        
        if (count >= 1) throw new ResponseError(400, "User already exist");

        const create = await prisma.user.create({
            data: {
                username: req_valid.username,
                password: password,
                contact_list: {
                    create: {}
                }
            },
            select: {
                id: true,
                username: true
            }
        });

        return {
            username: create.username
        }
    },
    exist: async(req) => {
        const query = await prisma.user.findFirst({
            where: {
                username: req.username
            }
        })

        return query;
    }
}