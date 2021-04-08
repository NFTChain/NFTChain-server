exports.up = function (knex) {
  return knex.schema.createTable('nfts', (table) => {
    table.increments();
    table.string('name', 128).notNullable();
    // table.string("description", 3000).notNullable();
    table.string('image', 128).notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('nfts');
};
