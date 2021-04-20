require('dotenv').config();
const axios = require('axios');

exports.uploadNFT = async (req, res) => {
  const { data } = req.body;
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: '4eb04864b87b11627705',
        pinata_secret_api_key:
          '6312329d9eaa3d999a1f637ad27b3539dc2fe7f64153a6f872994b33e1c15042',
      },
    })
    .then(async (response) => {
      res.status(200).json({
        message: 'Upload success.',
        ipfs_hash: response.data.IpfsHash,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Upload failed.',
        error,
      });
    });
};
