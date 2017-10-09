var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Express' });
});
/* 简历 */
router.get('/SelfIntroduction', function(req, res, next) {
  res.render('SelfIntroduction');
});

module.exports = router;
