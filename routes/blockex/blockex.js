const crypto = require('crypto');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require('cors');
router.use(cors());
const ethers = require('ethers');
var blockexModel = require('./models/blockex');

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));

router.use(cors());
var ethRouter = require('./eth/eth');
var btcRouter = require('./btc/btc');

router.use('/eth', ethRouter); 
router.use('/btc', btcRouter); 


router.get("/",  function(req, res, next) {
  const query = blockexModel.find({});
  query.exec((err, blocks) => {
      if (err != null) {
        return res.send(err);
      } 
      else{
        return res.send(blocks);
      }
    });
});


router.get("/reset", async function (req, res, next) {
  await blockexModel.deleteMany({}).exec();
  res.json({ 'msg': 'block table has been reset' })
});

module.exports = router;
