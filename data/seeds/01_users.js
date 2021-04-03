exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "Maskim", email: "hello", password: "Hello" },
        { id: 2, username: "Jason", email: "hello", password: "Hello" },
        { id: 3, username: "Pierre", email: "hello", password: "Hello" },
      ]);
    });
};
