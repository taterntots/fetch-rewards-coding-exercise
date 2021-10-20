const db = require('../data/dbConfig.js');

//FIND ALL TRANSACTIONS
function findAllTransactions() {
  return db('transactions')
}

module.exports = {
  findAllTransactions
};