const router = require('express').Router();
const Transactions = require('../models/transactions-model.js')

//*************** GET ALL TRANSACTIONS *****************//
router.get('/', (req, res) => {
  Transactions.findAllTransactions()
    .then(transactions => {
      res.json(transactions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error getting all transactions to display'
      });
    });
});

//*************** ADD TRANSACTIONS TO THE DATABASE *****************//
router.post('/', (req, res) => {
  let transaction = req.body;
  transaction.timestamp = new Date().toISOString() // Creates timestamp to current time

  Transactions.addTransaction(transaction)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error adding this transaction to the database'
      });
    });
});

//*************** SPEND POINTS, WITH OLDEST POINTS BEING SPENT FIRST BASED ON TRANSACTION TIMESTAMP *****************//
router.put('/spend-points', (req, res) => {
  let { points } = req.body

  Transactions.spendPoints(points)
    .then(spentPoints => {
      res.json(spentPoints);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error spending points'
      });
    });
});

module.exports = router;