const express = require("express");
require("dotenv").config();
const cors = require('cors');

const web = require("express")();
const server = require("http").createServer(web);
const { Server } = require('socket.io');

const api = require("../routes/api");

web.use(express.json());
web.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true,
    allowedHeaders: ["Set-header"]
}));

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:3000"
        ]
    }
});

// Router
web.use(api);

// Io 
io.on("connection", (socket) => {

    console.log('Server connected');

    socket.on("message", (msg) => {
        console.log(msg);
    })
})

module.exports = server;