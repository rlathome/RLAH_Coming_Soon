var mongoose = require ('mongoose');

var schema = new mongoose.Schema({
  address: {
    type:String,
    required:false
  },
  est_live: {
    type:String,
    required:false
  },
  est_price: {
    type:String,
    required:false
  },
  est_sq_ft: {
    type:String,
    required:false
  },
  listing_agt: {
    type:String,
    required:false
  },
  listing_url: {
    type:String,
    required:false
  },
  will_sell: {
    type:String,
    required:false
  }
});

var model = mongoose.model('After_Tour_Va',schema);

module.exports = model;
