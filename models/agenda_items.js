var mongoose = require ('mongoose');

var schema = new mongoose.Schema({
  property_no: {
    type:String,
    required:false
  },
  listing_url: {
    type:String,
    required:false
  },
  arrival: {
    type:String,
    required:false
  },
  departure: {
    type:String,
    required:false
  },
  address: {
    type:String,
    required:false
  },
  listing_agt: {
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
  will_sell: {
    type:String,
    required:false
  },
  est_live: {
    type:String,
    required:false
  }
});

var model = mongoose.model('Agenda_Item',schema);

module.exports = model;
