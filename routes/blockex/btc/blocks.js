var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
require('dotenv').config()
var BlockexModel = require('../models/blockex');
var WebSocket = require('websocket').w3cwebsocket;
var isRunning = false;
let props = {
  blockchain: 'Bitcoin',
  source: 'blockchain.com',
  sub: 'blocks_sub'
}

//Subscribing to new blocks as per: https://www.blockchain.com/api/api_websocket
ws = new WebSocket("wss://ws.blockchain.info/inv");

ws.onopen = function (event) {
  ws.send(JSON.stringify({ "op": "blocks_sub" }));
}

router.get("/", function (req, res, next) {
  const query = BlockexModel.find(props);
  query.exec((err, blocks) => {
    if (err != null) {
      return res.send(err);
    }
    else {
      return res.send(blocks);
    }
  });
});

router.get("/start", async function (req, res, next) {
  ws.onmessage = async function (event) {
    console.log('blocks');
    let blockexModel = new BlockexModel();
    blockexModel.blockchain = props.blockchain;
    blockexModel.source = props.source;
    blockexModel.sub = props.sub;
    blockexModel.body = JSON.parse(event.data);
    await blockexModel.save();
  }
  isRunning = true;
  res.json(isRunning);
});


router.get("/stop", async function (req, res, next) {
  ws.onmessage = function (event) {
  }  
  isRunning  = false;
  res.json(isRunning)
});


router.get("/status", async function (req, res, next) {
  res.json(isRunning)
});

router.get("/reset", async function (req, res, next) {
  let blockchain = 'Bitcoin';
  await BlockexModel.deleteMany(props).exec();
  res.json({'msg': 'Btc blocks have been removed'})
});



module.exports = router;
