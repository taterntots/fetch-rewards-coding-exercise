exports.up = function (knex) {
  return knex.schema
    .createTable('payers', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable();
      tbl
        .integer('point_balance');
      tbl
        .timestamp('timestamp')
        .notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('payers');
};