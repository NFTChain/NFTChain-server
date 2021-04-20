require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.uploadNFT = async (req, res) => {
  const file = req.file;
  console.log(file);
  const metaData = req.body.pinataMetadata;
  const fileStream = fs.createReadStream(file.path);

  let data = new FormData();
  data.append('file', fileStream);
  data.append('pinataMetadata', metaData);

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
        pinata_api_key: '4eb04864b87b11627705',
        pinata_secret_api_key:
          '6312329d9eaa3d999a1f637ad27b3539dc2fe7f64153a6f872994b33e1c15042',
      },
    })
    .then(async (response) => {
      res.status(200).json({
        message: 'upload successful',
        ipfs_hash: response.data.IpfsHash,
      });
      await fs.unlinkSync(file.path);
    })
    .catch(async (error) => {
      res.status(500).json({
        message: 'Upload failed.',
        error,
      });
      await fs.unlinkSync(file.path);
    });
};
