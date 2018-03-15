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
router.post('/change_logo',function(req,res,next){
  console.log('logo: ',req.body);
  const logo_url = req.body;
  Administrator.update({},logo_url,function(err){
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
  const agent_email = form_data.email;
  const agent_name = form_data.agent_name;



  // res.send("Queued. Thank you.");

  let to = 'info@rlahre.com'
  // let to = 'josh@allenb.com';
  let subject = "A new host has signed up on RLAH Coming Soon!";

  let host_subject = "Thank you for signing up!";

  var mailcomposer = require('mailcomposer');

  var domain = 'info.rlahre.com';
  var apiKey = 'key-602b6fef248551d53fee98ac2dbdef70';
  var mailgun = require('mailgun-js')({apiKey:apiKey, domain:domain});
  //
  //************Send confirmation email to host:

  var host_mail = mailcomposer({
    subject:host_subject,
    to:agent_email,
    from:'The RLAH Team'+' <'+to+'>',
    html:'<div>Thank you for submitting your property to be a part of our next tour. We will review your submission and get back to you shortly!</div><br/><br/>'
    +'<div>'
    +'Name: '+form_data.agent_name+'<br/>'
    +'Address: '+form_data.address+'<br/>'
    +'Email: '+form_data.email+'<br/>'
    +'Expected price: '+form_data.expected_price+'<br/>'
    +'Estimated sq ft: '+form_data.est_size+'<br/>'
    +'Will show before listing: '+form_data.will_show_before_listing+'<br/>'
    +'Feedback wanted: '+form_data.feedback_wanted.join(', ')
    +'</div>'
  });

  host_mail.build(function(mailBuildError, message){
    var dataToSend = {
        to: agent_email,
        message: message.toString('ascii')
    };
    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
        if (sendError) {
            console.log(sendError);
            return;
        }
        // res.json(body);
    });
  });

  //**********Send new host alert email to RLAH:

  var mail = mailcomposer({
    subject,
    to,
    from:agent_name+' <'+agent_email+'>',
    form_data,
    html:'<div>Re: Coming Soon Tour Host Agent: '+agent_name+'<br/>'+agent_email+'</div><br/><br/>'
    +'<div>'
    +'Name: '+form_data.agent_name+'<br/>'
    +'Address: '+form_data.address+'<br/>'
    +'Email: '+form_data.email+'<br/>'
    +'Expected price: '+form_data.expected_price+'<br/>'
    +'Estimated sq ft: '+form_data.est_size+'<br/>'
    +'Will show before listing: '+form_data.will_show_before_listing+'<br/>'
    +'Feedback wanted: '+form_data.feedback_wanted.join(', ')
    +'</div>'
  });

  mail.build(function(mailBuildError, message){
    var dataToSend = {
        to: to,
        message: message.toString('ascii')
    };
    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
        if (sendError) {
            console.log(sendError);
            return;
        }
        res.json(body);
    });
  });
})


router.post('/submitguestform',function(req,res,next){
  let form_data = req.body;
  console.log('submitting: ',form_data);
  let agent_name = form_data.agent_name;
  let email = form_data.email;
  let to = 'info@rlahre.com';
  // let to = 'josh@allenb.com';
  let subject = "A new guest has signed up on RLAH Coming Soon!";
  let guest_subject = "Thank you for signing up!";

  var mailcomposer = require('mailcomposer');

  var domain = 'info@rlahre.com';
  var apiKey = 'key-602b6fef248551d53fee98ac2dbdef70';
  var mailgun = require('mailgun-js')({apiKey:apiKey, domain:domain});

  //*********** Send confirmation email to guest:

  var guest_mail = mailcomposer({
    subject:guest_subject,
    to:email,
    from:'The RLAH Team'+' <'+to+'>',
    html:'<div>Thank you for submitting your property to be a part of our next Coming Soon Tour. We will review your submission and get back to you shortly!</div><br/><br/>Name: '+form_data.agent_name+'<br/>Email: '+form_data.email
  });

  guest_mail.build(function(mailBuildError, message){
    var dataToSend = {
        to: email,
        message: message.toString('ascii')
    };
    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
        if (sendError) {
            console.log(sendError);
            return;
        }
        // res.json(body);
    });
  });

  //**********Send new guest alert email to RLAH:

  var mail = mailcomposer({
    subject,
    to,
    from:agent_name+' <'+email+'>',
    email,
    html:'<div>Re: Coming Soon Tour Guest: '+agent_name+'<br/>'+email+'</div><br/>'+JSON.stringify(form_data)
  });

  mail.build(function(mailBuildError, message){
    var dataToSend = {
        to: to,
        message: message.toString('ascii')
    };
    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
        if (sendError) {
            console.log(sendError);
            return;
        }
        res.json(body);
    });
  });
});


module.exports = router;
