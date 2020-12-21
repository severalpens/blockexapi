const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors');

router.use(cors());
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));

const BlockexModel = require('../v1/models/blockex');

const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = graphql.buildSchema(
  `
  type Blockex {
    _id: String 
    blockchain: String 
    source: String 
    sub: String 
  }

  type Value { _hex: String _isBigNumber: Boolean }

type GasLimit { _hex: String _isBigNumber: Boolean }

type GasPrice { _hex: String _isBigNumber: Boolean }

type Transactions { hash: String
  blockHash: String
  blockNumber: Int
  transactionIndex: Int
  confirmations: Int
  from: String
  to: String
  nonce: Int
  data: String
  r: String
  s: String
  v: Int
  creates: String
  chainId: Int
  value: Value
  gasLimit: GasLimit
  gasPrice: GasPrice 
}

type GasUsed { _hex: String _isBigNumber: Boolean }

type Body { hash: String
  parentHash: String
  number: Int
  timestamp: Int
  nonce: String
  difficulty: Int
  miner: String
  extraData: String
  transactions: [Transactions ]
  gasUsed: GasUsed
  gasLimit: GasLimit }


  type Query { 
    blockex: [Blockex]
  }
`);
 
// The root provides a resolver function for each API endpoint
var root = {
  blockex: async () => {
    return await BlockexModel.find({}).exec();
  },
};
 
router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = router;
