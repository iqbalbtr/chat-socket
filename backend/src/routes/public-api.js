const express = require("express");
const public_api = express.Router();
const authController = require("../controller/auth-cotroller")

public_api.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Server is running"
    })
})

public_api.post("/auth/register", authController.register);
public_api.post("/auth/login", authController.login);

module.exports = public_api;