exports.up = function (knex) {
  return knex.schema
    .createTable('transactions', tbl => {
      tbl.increments();
      tbl.integer('payer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('payers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('points');
      tbl
        .timestamp('timestamp')
        .notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('transactions');
};