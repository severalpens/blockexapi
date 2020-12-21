var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blockexSchema = new Schema({
    blockchain: String,
    source: String,
    sub: String,
    body: Object,
  }, { capped: 10000007, timestamps: { createdAt: 'created_at' } });

   var BlockexModel = mongoose.model("blockex", blockexSchema, process.env.blockexDb);
  
  module.exports = BlockexModel;