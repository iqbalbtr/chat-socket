const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-cotroller")

router.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Server is running"
    })
})

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login)

module.exports = router;