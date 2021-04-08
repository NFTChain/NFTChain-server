require('dotenv');
const router = require('express').Router();

const nftController = require('./nft-controllers');

router.get('/', nftController.getNfts);
router.get('/:id', nftController.getNftByID);
router.post('/uplaod', nftController.uploadNFT);

module.exports = router;
