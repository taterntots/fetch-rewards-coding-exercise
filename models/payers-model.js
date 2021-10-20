const db = require('../data/dbConfig.js');

//FIND ALL PAYERS
function findAllPayers() {
  return db('payers')
}

module.exports = {
  findAllPayers
};