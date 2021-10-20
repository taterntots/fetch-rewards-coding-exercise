const db = require('../data/dbConfig.js');

//FIND ALL PAYERS
function findAllPayers() {
  return db('payers')
}

//FIND ALL PAYERS WITH ONLY POINT BALANCE IN A SINGLE OBJECT
function findAllPayersPointBalance() {
  return db('payers')
    .then(payers => {
      let payerPointsObject = {}

      // Map through the payers and create key value pairs with their name and balance
      Promise.all(payers.map(payer => {
        payerPointsObject[payer.name] = payer.point_balance
      }))

      return payerPointsObject
    })
}

module.exports = {
  findAllPayers,
  findAllPayersPointBalance
};