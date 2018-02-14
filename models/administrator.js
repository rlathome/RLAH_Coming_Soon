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
  }
});

var model = mongoose.model('Administrator',schema);

module.exports = model;
