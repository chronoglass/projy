var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var thing = new Schema({
  title: String,
  description: String,
  createdon: Date,
  owner: [{type: Schema.Types.ObjectId, ref: 'user'}],
  comments: [{body: String, date: Date}],
  tree:[{type: Schema.Types.ObjectId, ref: 'thing', level: Number}]
});

module.exports = mongoose.model('thing', thing);