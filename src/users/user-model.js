const db = require('../../data/dbConfig');

function getAllUsers() {
  return db('users');
}

async function find() {
  const users = await db('users').select(
    'id',
    'username',
    'device_push_token',
    'password',
    'email'
  );
  return users;
}

async function findBy(email) {
  const user = await db('users').where({ email }).first();

  return user;
}

async function findByUsername(username) {
  const user = await db('users').where({ username }).first();

  return user;
}

async function findByForLogin(email) {
  let user = await db('users').where(email).first();

  return user;
}

async function findById(id) {
  const user = await db('users').where({ id }).first();
  return user;
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findById(id);
}

async function update(id, body) {
  const updatedUser = await db('users').where({ id }).update(body);

  if (updatedUser) {
    const user = await findById(id);
    return user;
  }
  return updatedUser;
}

async function remove(id) {
  const user = await findById(id);
  if (user) {
    const deleted = await db('users').where({ id }).del();
    if (deleted) {
      return user;
    }
  }
}

module.exports = {
  getAllUsers,
  find,
  findBy,
  findByUsername,
  findByForLogin,
  findById,
  add,
  remove,
  update,
};
