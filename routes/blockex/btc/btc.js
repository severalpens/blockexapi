var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

var blocksRouter = require("./blocks");
var unconfirmedRouter = require("./unconfirmed");

// router.use('/blocks',blocksRouter);
// router.use('/unconfirmed',unconfirmedRouter);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
