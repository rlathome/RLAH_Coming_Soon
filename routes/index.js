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

router.post('/submitagenda',function(req,res,next){
  console.log('agenda: ',req.body);
  const agenda = req.body;
  Administrator.update({},{
      'agenda':agenda
    },function(err){
    if(err) ()=>console.log('error: ',err);
    res.send('success');
  });
});
router.post('/change_password',function(req,res,next){
  console.log('password: ',req.body);
  const password = req.body.password;
  const type = req.body.type;
  let query = {};
  query[type]=password;
  Administrator.update({},query,function(err){
    if(err) ()=>console.log('error: ',err);
    res.send('success');
  });
});
// router.get('/agenda',function(req,res,next){
//   Administrator.find({})
// })

module.exports = router;
