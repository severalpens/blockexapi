var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
require('dotenv').config();
const ethers = require('ethers');
var BlockexModel = require('../models/blockex');
var isRunning = false
let provider = new ethers.providers.InfuraProvider("homestead", process.env.INFURA);
let props = {
  source: 'Infura',
  sub: 'BlockWithTransactions'
}

async function blockHandler(blockNumber){
  console.log(blockNumber);
  let block = await provider.getBlockWithTransactions(blockNumber);
  let blockexModel = new BlockexModel();
  blockexModel.blockchain = 'Ethereum';
  blockexModel.source = props.source;
  blockexModel.sub = props.sub;
  blockexModel.body = block;
  await blockexModel.save();
}

async function getAddressBalances(block){
  let addresses = [];
  for (const tx of block.transactions) {
    if(!addresses.find((a) => a.address === tx.from)){
      addresses.push({
        block: block.blockNumber,
        address: tx.from, 
        balance: await provider.getBalance(tx.from)
      })
    }
  }
  for (const tx of block.transactions) {
    if(!addresses.find((a) => a.address === tx.to)){
      addresses.push({
        block: block.blockNumber,
        address: tx.to, 
        balance: await provider.getBalance(tx.to)
      })
    }
  }
  return addresses;
}

router.get("/",  function(req, res, next) {
  const query = BlockexModel.find(props);
  query.limit(1);
  query.exec((err, blocks) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(blocks);
      }
    });
});


router.get("/all",  function(req, res, next) {
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


router.get("/start", async function(req, res, next) {
  provider.on("block", blockHandler);
  isRunning = true
  res.json(isRunning)
});


router.get("/stop", async function(req, res, next) {
  provider.off("block",null);
  isRunning = false
  res.json(isRunning)
});


router.get("/status", async function (req, res, next) {
  res.json(isRunning)
});

router.get("/reset", async function(req, res, next) {
  let blockchain = 'Ethereum'
  await BlockexModel.deleteMany(props).exec();
  res.json({'msg': 'Eth blocks have been removed'})
});


module.exports = router;
