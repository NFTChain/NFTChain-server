require('dotenv');

const Users = require('./nft-model');

exports.getNfts = async (req, res) => {
  const users = await Users.getAllNfts();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json('Users not found');
  }
};

exports.getNftByID = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json('User not found');
  }
};
