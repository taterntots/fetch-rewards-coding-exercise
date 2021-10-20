exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('payers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('payers').insert([
        { id: 10000, name: 'DANNON', point_balance: 1100, timestamp: Date.now() },
        { id: 10001, name: 'UNILEVER', point_balance: 200, timestamp: Date.now() },
        { id: 10002, name: 'MILLER COORS', point_balance: 10000, timestamp: Date.now() }
      ])
    })
}