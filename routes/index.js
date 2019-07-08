var express = require('express');
var router = express.Router();
var https = require('https');
var Administrator = require('../models/administrator.js');
var AgendaItem = require('../models/agenda_items.js');
var AfterTour = require('../models/after_tours.js');
var AfterTourVa = require('../models/after_tour_vas.js');
var AfterTourMd = require('../models/after_tour_mds.js');

router.get('/test',function(req,res,next){
  console.log('getting request');
  res.send('Connected in truth');
});

router.get('/admin_info',function(req,res,next){
  Administrator.find({},'',function(err,admin){
    if(err) console.log('err! - , ',err)
    //console.log('admin: ',admin);
    admin[0].after_tour.forEach((item)=>{
      console.log(JSON.stringify(item));
    })
    res.json(admin);
  })
});

router.get('/agenda_items',(req,res,next)=>{
  AgendaItem.find({},'',(err,agenda)=>{
    if(err) console.log('err! - ',err);
    console.log('THE AGENDA - ',agenda)
    res.json(agenda);
  })
});
router.post('/submitagenda',function(req,res,next){
  console.log('agenda: ',req.body);
  Administrator.update({},{
      'event_date':req.body.event_date,
      'slots_available':req.body.slots_avail
    },function(err){
    if(err) ()=>console.log('error: ',err);
    res.send('success');
  });
});

router.post('/update_agenda_item/:id',(req,res,next)=>{
  AgendaItem.findByIdAndUpdate(req.params.id,req.body,(err)=>{
    if(err) console.log('err - ',err);
    AgendaItem.find({},'',(err,agenda)=>{
      if(err) console.log('err - ',err);
      res.json(agenda);
    })
  });
});

router.post('/add_agenda_item',(req,res,next)=>{
  const post = new AgendaItem(req.body);
    console.log('post - ',post);
  post.save((err)=>{
    if(err) console.log('err ! - ',err);
    AgendaItem.find({},'',(err,agenda)=>{
      if(err) console.log('err - ',err);
      res.json(agenda);
    })
  });
});

router.post('/delete_event/:id',function(req,res,next){
  const id = req.params.id;
  //const agenda = req.body.agenda;
  AgendaItem.findByIdAndRemove(id,(err)=>{
    if(err) console.log('err')
    // console.log('deleted agenda - ',agenda);
    // res.send('success');
    AgendaItem.find({},'',(err,agenda)=>{
      console.log('deleted agenda - ',agenda)
      res.json(agenda);
    })
  })
});
// this function is the best way I could come up with to automatically migrate data from my Administrator collection into the new separate collections in a few milliseconds

router.get('/after_tour_mapping',function(req,res,next){
  Administrator.find({},'',function(err,admin){
    if(err) console.log('mapping err  - ',err);
    console.log('ADMIN - ',admin);

    //Change this definiton
    const after_tour = admin[0].after_tour_va;

    console.log('AFTER TOUR: ',after_tour);
    after_tour.forEach((item)=>{
      console.log('TO CREATE: ',item);

      //Change this definition
      var post = new AfterTourVa({

        address: item.address,
        est_live: item.est_live,
        est_price: item.est_price,
        est_sq_ft: item.est_sq_ft,
        listing_agt: item.listing_agt,
        listing_url: item.listing_url,
        will_sell: item.will_sell
      });
      console.log('post: ',post);
      post.save(function(err,save){
        if(err) console.log('SAVING ERROR ',err);
      });
    });
    res.status(200).json(after_tour);
  });
});

router.get('/after_tour',function(req,res,next){
  AfterTour.find({},'',function(err,after_tour){
    if(err) console.log('error! - ',err);
    res.json(after_tour);
  });
});

router.get('/after_tour_va',function(req,res,next){
  AfterTourVa.find({},'',function(err,after_tour_va){
    if(err) console.log('error! - ',err);
    res.json(after_tour_va);
  });
});

router.get('/after_tour_md',function(req,res,next){
  AfterTourMd.find({},'',function(err,after_tour_md){
    if(err) console.log('error! - ',err);
    res.json(after_tour_md);
  });
});



router.post('/delete_after_tour_event/:tour/:id',(req,res,next)=>{
  console.log(req.params.tour, ' - ',req.params.id);
  const tour = req.params.tour;
  const gid = req.params.id;
  switch(tour){
    case 'after_tour':
    AfterTour.findByIdAndRemove(gid,(err)=>{
      if(err) console.log('err - ',err)
      res.send('success');
    });
    break;
    case 'after_tour_va':
    AfterTourVa.findByIdAndRemove(gid,(err)=>{
      if(err) console.log('err - ',err)
      res.send('success');
    });
    break;
    case 'after_tour_md':
    AfterTourMd.findByIdAndRemove(gid,(err)=>{
      if(err) console.log('err - ',err)
      res.send('success');
    });
    break;
  };
});

router.post('/change_after_tour_event/:id/:tour',(req,res,next)=>{
  console.log(`tour to update: ${req.body.items}, ${req.params.id}, ${req.params.tour}`)
  const id = req.params.id;
  const tour = req.params.tour;
  switch(tour){
    case 'after_tour':
    AfterTour.findByIdAndUpdate(
      id,
      req.body.items,
      {new:true},
      (err)=>{
        console.log('err -',err)
        res.send(req.body.items);
      }
    )
    break;
    case 'after_tour_va':
    AfterTourVa.findByIdAndUpdate(
      id,
      req.body.items,
      {new:true},
      (err)=>{
        console.log('err -',err)
        res.send(req.body.items);
      }
    )
    break;
    case 'after_tour_md':
    AfterTourMd.findByIdAndUpdate(
      id,
      req.body.items,
      {new:true},
      (err)=>{
        console.log('err -',err)
        res.send(req.body.items);
      }
    )
    break;
  };
});
router.post('/create_after_tour_event/:tour',(req,res,next)=>{
  console.log(`tour to update: ${req.body.items}, ${req.params.tour}`)
  const tour = req.params.tour;
  let house;
  switch(tour){
    case 'after_tour':
    house = new AfterTour(req.body.items);
    house.save((err,house)=>{
      if(err) console.log('err! - ',err);
      res.send(req.body.items);
    });
    break;
    case 'after_tour_va':
    house = new AfterTourVa(req.body.items);
    house.save((err,house)=>{
      if(err) console.log('err! - ',err);
      res.send(req.body.items);
    });
    break;
    case 'after_tour_md':
    house = new AfterTourMd(req.body.items);
    house.save((err,house)=>{
      if(err) console.log('err! - ',err);
      res.send(req.body.items);
    });
    break;
  };
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
router.post('/change_next_tour_date',function(req,res,next){
  console.log('next_tour: ',req.body.next_tour);
  const next_tour = req.body.next_tour.toString();
  Administrator.update({},{
    'next_tour':next_tour
  },function(err){
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
router.post('/change_footer_logo',function(req,res,next){
  console.log('footer logo: ',req.body);
  const footer_logo_url = req.body;
  Administrator.update({},footer_logo_url,function(err){
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
    //console.log('admin: ',admin)
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
      case 'hotlist':
      real_password = admin.hotlist_password;
    }
    if(real_password===submitted_password){
      res.send('success');
    }else{
      res.send('fail');
    }
  });

});

router.post('/hideguestslots',function(req,res,next){
  let data = req.body;
  console.log('HIDE GUESTS? ',data.cmd);
  switch(data.cmd){
    case 'on':
    Administrator.update({},{hide_guest_slots:true},function(err){
      if(err) ()=> console.log('error: ',err);
      res.send(data.cmd);
    });
    break;
    case 'off':
    Administrator.update({},{hide_guest_slots:false},function(err){
      if(err) ()=> console.log('error: ',err);
      res.send(data.cmd);
    });
    break;
    default:
    Administrator.update({},{hide_guest_slots:false},function(err){
      if(err) ()=> console.log('error: ',err);
      res.send(data.cmd);
    });
  }
});

router.post('/submithostform',function(req,res,next){
  let form_data = req.body;
  console.log('submitting: ',form_data);
  const agent_email = form_data.email;
  const agent_name = form_data.agent_name;
  const extra_media = (form_data.extra_media) ? form_data.extra_media : 'none entered';
  const est_live = (form_data.est_live) ? form_data.est_live : 'none entered';
  const other_text = form_data.other_text;
  // res.send("Queued. Thank you.");

  let to = 'comingsoontour@gmail.com'
  let subject = "A new host has signed up on the Coming Soon Tour!";
  let host_subject = "Thank you for signing up!";
  var mailcomposer = require('mailcomposer');
  var domain = 'info.comingsoontour.com';
  var apiKey = 'key-30c5713300a403cced1a5f5adaa0ffa8';
  var mailgun = require('mailgun-js')({apiKey:apiKey, domain:domain});
  //
  //************Send confirmation email to host:

  var host_mail = mailcomposer({
    subject:host_subject,
    to:agent_email,
    from:'<'+to+'>',
    html:'<div>Thank you for submitting your property to be a part of our next Coming Soon Tour. We will review your submission and get back to you shortly!</div><br/><br/>'
    +'<div>'
    +'Name: '+form_data.agent_name+'<br/>'
    +'Address: '+form_data.address+'<br/>'
    +'Email: '+form_data.email+'<br/>'
    +'Expected price: '+form_data.expected_price+'<br/>'
    +'BR/BA: '+form_data.est_size+'<br/>'
    +'Will show before listing: '+form_data.will_show_before_listing+'<br/>'
    +'Feedback wanted: '+form_data.feedback_wanted.join(', ')+'<br/>'
    + other_text+'<br/>'
    +'Extra media provided: '+extra_media+'<br/>'
    +'Estimated date property will be active: '+est_live+'<br/>'
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
    +'BR/BA: '+form_data.est_size+'<br/>'
    +'Will show before listing: '+form_data.will_show_before_listing+'<br/>'
    +'Feedback wanted: '+form_data.feedback_wanted.join(', ')
    +'</div>'
    + other_text+'<br/>'
    +'Extra media provided: '+extra_media+'<br/>'
    +'Estimated date property will be active: '+est_live+'<br/>'
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
  let needs_reserve = form_data.needs_reserve;

  let to = 'comingsoontour@gmail.com';
  //let to = 'josh@allenb.com';
  let subject = "A new guest has signed up on the Coming Soon Tour!";
  let guest_subject = "Thank you for signing up!";

  var mailcomposer = require('mailcomposer');

  var domain = 'info.comingsoontour.com';
  var apiKey = 'key-30c5713300a403cced1a5f5adaa0ffa8';
  var mailgun = require('mailgun-js')({apiKey:apiKey, domain:domain});

console.log(`RECEIVING THIS INFO: AGENT NAME: ${agent_name} EMAIL: ${email} NEEDS RESERVE: ${needs_reserve}`)
  //*********** Send confirmation email to guest:

  var guest_mail = mailcomposer({
    subject:guest_subject,
    to:email,
    from:'<'+to+'>',
    html:`<div>Thank you for your submission! We’ll have a seat for you on the tour!</div><br/><br/>Name: ${agent_name}<br/>Email: ${email}<br/>I need to reserve a spot in the caravan: ${needs_reserve}<br/>`
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
    //html:'<div>Re: Coming Soon Tour Guest: '+agent_name+'<br/>'+email+'</div><br/>'+JSON.stringify(form_data)
    html:`<div>Re: Coming Soon Tour Guest: </div><br/><br/>Name: ${agent_name}<br/>Email: ${email}<br/>Needs to reserve a spot in the caravan: ${needs_reserve}<br/>`
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
