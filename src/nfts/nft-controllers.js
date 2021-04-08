require('dotenv');

const NFTs = require('./nft-model');

exports.getNfts = async (req, res) => {
  const users = await NFTs.getAllNfts();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json('Users not found');
  }
};

exports.getNftByID = async (req, res) => {
  const user = await NFTs.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json('User not found');
  }
};

exports.uploadNFT = async (req, res) => {
  const { name, data } = req.file.pic;
  try {
    await NFTs.add({ name, image: data });
    res.send(200).json('Upload was successful');
  } catch (error) {
    res.status(500).json('Upload was unsuccessful');
  }
};
