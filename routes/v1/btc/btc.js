var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

var unconfirmedRouter = require("./unconfirmed");

router.use('/unconfirmed',unconfirmedRouter);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
