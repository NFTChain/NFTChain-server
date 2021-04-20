require('dotenv');
const multer = require('multer');
const router = require('express').Router();

const nftController = require('./nft-controllers');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), nftController.uploadNFT);

module.exports = router;
