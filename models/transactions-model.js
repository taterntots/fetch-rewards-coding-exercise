const db = require('../data/dbConfig.js');

//FIND ALL TRANSACTIONS
function findAllTransactions() {
  return db('transactions as t')
    .leftOuterJoin('payers as p', 't.payer_id', 'p.id')
    .select([
      't.payer_id',
      'p.name as payer',
      'p.point_balance',
      't.points',
      't.timestamp'
    ])
    .orderBy('t.timestamp', 'asc')
}

//FIND TRANSACTION BY ID
function findTransactionById(transactionId) {
  return db('transactions as t')
    .where('t.id', transactionId)
    .first()
}

//ADD TRANSACTIONS
function addTransaction(transaction) {
  return db('transactions')
    .insert(transaction, 'id')
    .then(([id]) => {
      return findTransactionById(id);
    });
}

//SPEND POINTS, WITH OLDEST POINTS BEING SPENT FIRST BASED ON TRANSACTION TIMESTAMP
function spendPoints(total_points) {
  let points = total_points

  // Find all transactions in order of oldest to newest
  return findAllTransactions()
    .then(transactions => {
      let hash = [] // Hash to store key value pairs of payers and their points
      // Loop through the transactions
      for (const transaction of transactions) {
        // If the total points are ever at zero or below, stop looping
        if (points <= 0) {
          break
          // Otherwise, if a payers point_balance is above 0, update total points by removing transaction amount
        } else if (transaction.point_balance > 0) {
          points -= transaction.points
          let hasPayer = hash.some(payer => payer['payer'] === transaction.payer)

          // If the payer is not in our hash
          if (!hasPayer) {
            // And if points are less than zero, add them to our hash and add the total points to the value
            if (points < 0) {
              hash.push({ payer_id: transaction.payer_id, payer: transaction.payer, point_balance: transaction.point_balance, points: transaction.points + points })
              // Else simply add the payer to the hash with their point value
            } else {
              hash.push({ payer_id: transaction.payer_id, payer: transaction.payer, point_balance: transaction.point_balance, points: transaction.points })
            }
            // Otherwise if the payer is in our hash, simply update the point value
          } else if (hasPayer) {
            let payerIndex = hash.findIndex((obj => obj.payer === transaction.payer))

            if (points < 0) {
              hash[payerIndex].points += transaction.points + points
            } else {
              hash[payerIndex].points += transaction.points
            }
          }
        }
      }

      // Create our results return with negative point values
      let results = hash.map(res => {
        return {
          payer: res.payer,
          points: -Math.abs(res.points)
        }
      })

      // Update the total point balance for each payer using our stored hash
      hash.map(res => {
        let newPayerPointBalance = res.point_balance - res.points

        update(res.payer_id, newPayerPointBalance).then(updatedRes => {
          return results
        })
      })

      // Return our results with negative point values
      return results
    })
}

function update(payerId, newPointBalance) {
  return db('payers')
    .where('id', payerId)
    .update({ point_balance: newPointBalance < 0 ? 0 : newPointBalance }) // If new balance is below zero, reset balance to zero
}

module.exports = {
  findAllTransactions,
  addTransaction,
  spendPoints
};