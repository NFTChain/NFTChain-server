require('dotenv');
const router = require('express').Router();
const multer = require('multer');
const nftController = require('./nft-controllers');

const upload = multer({ dest: 'uploads/' });

router.get('/', nftController.getNfts);
router.get('/:id', nftController.getNftByID);
router.post('/upload', upload.single('image'), nftController.uploadNFT);

module.exports = router;
