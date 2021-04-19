require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const NFTs = require('./nft-model');
const fs = require('fs');
const util = require('util');

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

exports.uploadNFT = async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  res.status(200).send({ imagePath: result.key });
};

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getNftByID = async (req, res) => {
  const key = req.params.id;
  const readStream = getFileStream(key);

  readStream.pipe(res);
};

exports.getNfts = async (req, res) => {
  const users = await NFTs.getAllNfts();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json('Users not found');
  }
};
