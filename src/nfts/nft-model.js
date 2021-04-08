const db = require('../../data/dbConfig');

function getAllNfts() {
  return db('nfts');
}

async function findById(id) {
  const user = await db('nfts').where({ id }).first();
  return user;
}

async function add(nft) {
  const [id] = await db('nfts').insert(nft, 'id');

  return findById(id);
}

async function remove(id) {
  const nft = await findById(id);
  if (nft) {
    const deleted = await db('nfts').where({ id }).del();
    if (deleted) {
      return nft;
    }
  }
}

async function add(image) {
  const [id] = await db('nfts').insert(image, 'id');

  return findById(id);
}

module.exports = {
  getAllNfts,
  findById,
  add,
  remove,
};
