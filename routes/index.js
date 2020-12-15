var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

// var blockexRouter = require("./blockex/blockex");

// router.use('/blockex',blockexRouter);

router.get('/', function(req, res, next) {
  res.send("Welcome to blockexapi. To start a feed eg blockchain.com's 'unconfirmed transactions' ws, navigate to '/blockex/btc/unconfirmed/start'. To see the feed go to '/blockex/btc/unconfirmed' ");
});


module.exports = router;
