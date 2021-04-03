const db = require('../../data/dbConfig');

async function findById(id, tableName) {
  const user = await db(tableName)
    .where({ id })
    .first();
  return user;
}

async function add(data, tableName) {
  const [id] = await db(tableName).insert(data, 'id');

  return findById(id, tableName);
}

module.exports = {
  findById,
  add,
};
