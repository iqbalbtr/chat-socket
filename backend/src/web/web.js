
// configuration
const express = require("express");
const { Server } = require('socket.io');
require("dotenv").config();
const cors = require('cors');
const cookie = require('cookie-parser');


// web
const web = require("express")();
const server = require("http").createServer(web);

// router
const public_api = require("../routes/public-api");

// mddleware
const errorMiddleware = require("../middleware/error-middleware");
const authMiddleware = require("../middleware/auth-middleware");
const private_api = require("../routes/private-api");
const { initializeSocket } = require("./socket");

web.use(express.json());
web.use(express.urlencoded({ extended: true }))
web.use(cookie());
web.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    exposedHeaders: ["set-cookie"],
    optionsSuccessStatus: 204,
    credentials: true,
    
}));


const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:3000"
        ],
        credentials: true
    },
    cookie: true
});

// middleware
io.use(authMiddleware.socket);

// Router
web.use(public_api);
web.use(private_api);

/**
 * 
 * initialisasi socket 
 */
initializeSocket(io)

// error handler
web.use(errorMiddleware);

module.exports = server;