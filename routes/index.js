var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blockex API' });
});



module.exports = router;
