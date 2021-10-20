const router = require('express').Router();
const Payers = require('../models/payers-model.js')

//*************** GET ALL PAYERS *****************//
router.get('/', (req, res) => {
  Payers.findAllPayers()
    .then(payers => {
      res.json(payers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error getting all payers to display'
      });
    });
});

module.exports = router;