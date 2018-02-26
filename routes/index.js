var express = require('express');
var router = express.Router();
var https = require('https');
var Administrator = require('../models/administrator.js');


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
  const agenda = req.body.agenda;
  Administrator.update({},{
      'agenda':agenda,
      'event_date':req.body.event_date,
      'slots_available':req.body.slots_avail
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
router.post('/login',function(req,res,next){
  console.log('data: ',req.body)
  let real_password;
  let submitted_password = req.body.password;
  let type = req.body.type;
  let admin;
  Administrator.find({},'',function(err,resp){
    if(err) console.log('err, ',err)
    admin = resp[0];
    console.log('admin: ',admin)
    switch(type){
      case 'admin':
      real_password = admin.admin_password;
      break;
      case 'guest':
      real_password = admin.guest_password;
      break;
      case 'host':
      real_password = admin.host_password;
      break;
    }
    if(real_password===submitted_password){
      res.send('success');
    }else{
      res.send('fail');
    }
  });

});

router.post('/submithostform',function(req,res,next){
  let form_data = req.body;
  console.log('submitting: ',form_data);
  res.send("Queued. Thank you.");
})

router.post('/submitguestform',function(req,res,next){
  let form_data = req.body;
  console.log('submitting: ',form_data);
  res.send("Queued. Thank you.");
})

module.exports = router;
