const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// plug middleware & connections
server.use(helmet());
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the NFTChain API' });
});

const userRouter = require('./src/users/user-router');
const nftRouter = require('./src/nfts/nft-router');

server.use('/user', userRouter);
server.use('/nft', nftRouter);

const port = process.env.PORT || 5000;

server.listen(port, console.log(`Listening on Port ${port}`));
module.exports = server;
