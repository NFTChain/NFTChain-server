require('dotenv');
const router = require('express').Router();

const nftController = require('./nft-controllers');

router.post('/upload', nftController.uploadNFT);

module.exports = router;
