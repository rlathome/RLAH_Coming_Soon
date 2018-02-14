var express = require('express');
var router = express.Router();
var https = require('https');
var Administrator = require('../models/administrator.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',function(req,res,next){
  console.log('getting request');
  res.send('Connected in truth');
});

router.get('/admin_info',function(req,res,next){
  Administrator.find({},'',function(err,admin){
    if(err) console.log('err, ',err)
    console.log('admin: ',admin);
    res.json(admin);
  })
});

module.exports = router;
