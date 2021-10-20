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

//*************** GET ALL PAYERS WITH ONLY POINT BALANCE IN A SINGLE OBJECT *****************//
router.get('/points', (req, res) => {
  Payers.findAllPayersPointBalance()
    .then(payers => {
      res.json(payers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error getting all payers and their point balance in a single object to display'
      });
    });
});

module.exports = router;