require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.uploadNFT = async (req, res) => {
  const file = req.file;
  const metaData = req.body.pinataMetadata;
  const fileStream = fs.createReadStream(file.path);

  let data = new FormData();
  data.append('file', fileStream);
  data.append('pinataMetadata', metaData); // metadata is saved in request because we need the tokenId from the frontend (frontend gets the id from the smart contract)

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append('pinataOptions', pinataOptions);

  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  axios
    .post(url, data, {
      maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.PINATA_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET,
      },
    })
    .then(async (response) => {
      res.status(200).json({
        message: 'upload successful',
        ipfs_hash: response.data.IpfsHash,
      });
      await fs.unlinkSync(file.path); // delete currently saved uploaded file
    })
    .catch(async (error) => {
      res.status(500).json({
        message: 'Upload failed.',
        error,
      });
      await fs.unlinkSync(file.path); // delete currently saved uploaded file
    });
};
