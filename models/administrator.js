var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  host_password:{
    type:String,
    required:false
  },
  guest_password:{
    type:String,
    required:false
  },
  admin_password:{
    type:String,
    required:false
  },
  agenda:{
    type:Array,
    required:false
  },
  after_tour_dc:{
    type:Array,
    required:false
  },
  after_tour_md:{
    type:Array,
    required:false
  },
  after_tour_va:{
    type:Array,
    required:false
  },
  event_date:{
    type:String,
    required:false
  },
  slots_available:{
    type:String,
    required:false
  },
  logo_url:{
    type:String,
    required:false
  },
  footer_logo_url:{
    type:String,
    required:false
  },
  next_tour:{
    type:String,
    required:false
  }
});

var model = mongoose.model('Administrator',schema);

module.exports = model;
