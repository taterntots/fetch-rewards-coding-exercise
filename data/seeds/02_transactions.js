exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('transactions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        { id: 20000, payer_id: 10000, points: 1000, timestamp: '2020-11-02T14:00:00Z' },
        { id: 20001, payer_id: 10001, points: 200, timestamp: '2020-10-31T11:00:00Z' },
        { id: 20002, payer_id: 10000, points: -200, timestamp: '2020-10-31T15:00:00Z' },
        { id: 20003, payer_id: 10002, points: 10000, timestamp: '2020-11-01T14:00:00Z' },
        { id: 20004, payer_id: 10000, points: 300, timestamp: '2020-10-31T10:00:00Z' }
      ]);
    });
};
