var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());
var BlockexModel = require('../models/blockex');

var blocksRouter = require("./blocks");

router.use('/blocks',blocksRouter);

router.get("/",  function(req, res, next) {
  const query = BlockexModel.find({'blockchain': 'Ethereum'});
  query.exec((err, blockex) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(blockex);
      }
    });
});


module.exports = router;
