const express = require("express");
const private_api = express.Router();
const authController = require("../controller/auth-cotroller");
const authMiddleware = require("../middleware/auth-middleware");

private_api.use(authMiddleware.api);

private_api.patch("/auth/logout", authController.logout);

module.exports = private_api;