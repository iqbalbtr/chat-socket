const express = require("express");
const private_api = express.Router();
const authController = require("../controller/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const contactController = require("../controller/contact-controller");
const groupController = require("../controller/group-controller");
const statusController = require("../controller/status-controller");

private_api.use(authMiddleware.api);

private_api.patch("/auth/logout", authController.logout);
private_api.get("/auth/me", authController.me);

private_api.get("/api/contacts", contactController.list);
private_api.post("/api/contacts", contactController.create);
private_api.delete("/api/contacts/:contactId", contactController.remove);
private_api.patch("/api/contacts/:contactId", contactController.update);

private_api.get("/api/group", groupController.get);
private_api.post("/api/group", groupController.create);

private_api.get("/api/status", statusController.get);

module.exports = private_api;