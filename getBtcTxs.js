#!/usr/bin/env node
require("dotenv").config();
const fetch = require('node-fetch');
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ellipticTxDetailsSchema = new Schema({
  blockchain: String,
  source: String,
  sub: String,
  body: Object,
}, { timestamps: { createdAt: 'created_at' } });

const EllipticTxDetailsModel = mongoose.model("ellipticTxDetails", ellipticTxDetailsSchema, "ellipticTxDetails");
const txs = require('./btcTxs.json');
const cnString = process.env.CN_STRING;

mongoose.connect(cnString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongoose_cn = mongoose.connection;
mongoose_cn.on("error", console.error.bind(console, "connection error:"));
mongoose_cn.once("open", async function () {
  await runAsync();
  console.log('finished')
});




async function runAsync() {
  await EllipticTxDetailsModel.deleteMany({}).exec();
  console.log('start')
  let i = 1;
  for (const tx of txs) {
   // let res = await fetch(`https://blockchain.info/rawtx/${tx}`)
   let res = await fetch(`https://api.blockcypher.com/v1/btc/main/txs/${tx}`)
   
    let json = await res.json();
    let blockexModel = new EllipticTxDetailsModel();
    blockexModel.blockchain = "Bitcoin";
    blockexModel.source = "blockchain.com";
    blockexModel.sub = "blockchain.info/rawtx";
    blockexModel.body = json;
    await blockexModel.save();
    console.log(`${i} of ${txs.length}: ${tx}`);
    i++;
  }
}

