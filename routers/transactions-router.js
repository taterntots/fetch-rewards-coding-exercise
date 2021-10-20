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

module.exports = router;