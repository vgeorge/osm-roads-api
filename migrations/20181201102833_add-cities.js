exports.up = function (knex) {
  return knex.schema.createTable('cities', function (table) {
    table.string('id').primary();
    table.string('state');
    table.string('name');
    table.boolean('isCapital');
    table.specificType('point', 'geometry(point, 4326)');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cities');
};
