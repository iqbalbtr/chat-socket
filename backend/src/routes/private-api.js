const express = require("express");
const private_api = express.Router();
const authController = require("../controller/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const contactController = require("../controller/contact-controller");

private_api.use(authMiddleware.api);

private_api.patch("/auth/logout", authController.logout);

private_api.get("/api/contacts", contactController.list);
private_api.post("/api/contacts", contactController.create);
private_api.delete("/api/contacts/:contactId", contactController.remove);
private_api.patch("/api/contacts/:contactId", contactController.update);

module.exports = private_api;