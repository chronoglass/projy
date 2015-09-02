var mongoose = require('mongoose');
var myConnection = mongoose.createConnection('localhost', 'things');

var thing = new mongoose.Schema({
  title: {type : String},
  description: {type : String},
  createdon: {type : Date,
              default : Date.now},
  owner: {type: mongoose.Schema.Types.ObjectId, 
          ref: 'user'},
  comments: {body: {type : String}, 
             date: {type : Date, default: Date.now}},
  tree:{type: mongoose.Schema.Types.ObjectId, 
        ref: 'thing', level: {type : Number}}
},{collection: 'things'});

var thing = myConnection.model('thing', thing);
//module.exports = mongoose.model('thing', thing);

//var myThings = new thing({});

exports.listThings = function(myThings){
  return function(req, res){
    myThings.find({}, function(e, things){
      res.render('list_things', {things : things});
    });
  }
};

exports.addThing = function(newThing){
  return function(req, res){
  console.log(newThing);
  newThing.save();
  }
};