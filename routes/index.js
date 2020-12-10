var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

// var blockexRouter = require("./blockex/blockex");

// router.use('/blockex',blockexRouter);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
