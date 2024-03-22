
// configuration
const express = require("express");
require("dotenv").config();
const cors = require('cors');
const cookie = require('express-cookie');


// web
const web = require("express")();
const server = require("http").createServer(web);
const { Server } = require('socket.io');

// socket
const { socket_provider } = require('./socket')

// router
const api = require("../routes/api");

// mddleware
const errorMiddleware = require("../middleware/error-middleware");
const authMiddleware = require("../middleware/auth-middleware");

web.use(express.json());
web.use(express.urlencoded({ extended: true }))
web.use(cookie());
web.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));


const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:3000"
        ]
    }
});

// middleware
io.use(authMiddleware.socket);
web.use(authMiddleware.api);

// Router
web.use(api);

// socket
io.on('connection',
    (socket) =>
        socket_provider(socket)
);

// error handler
web.use(errorMiddleware);

module.exports = server;