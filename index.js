const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

// plug middleware & connections
server.use(helmet());
server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the NFTChain API" });
});

const userRouter = require("./src/users/user-router");

server.use("/user", userRouter);

const port = process.env.PORT || 5000;

server.listen(port, console.log(`Listening on Port ${port}`));
module.exports = server;
