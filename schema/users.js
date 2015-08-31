var mongoose = require('mongoose');

var user = new mongoose.Schema({
  username: String,
  name: {first: String, mi: String, last: String},
  email: String,
  location: String,
  ulevel: Number,
  signup: Date,
  lastlogin: Date,
  status: Number,
  security: String,
  meta: {numthings: Number, numtags: Number}
},
{collection: 'Users'});

module.exports = mongoose.model('user', user);