require('dotenv').config();

exports.uploadNFT = async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  res.status(200).send({ imagePath: result.key });
};
