var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blockex API' });
});


router.get('/', function(req, res, next) {
  res.send("Welcome to blockexapi! <br> To start a feed eg blockchain.com's 'unconfirmed transactions' ws, navigate to '/v1/btc/unconfirmed/start'. To see the feed go to '/v1/btc/unconfirmed/limit/2' ");
});


module.exports = router;
