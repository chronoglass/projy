var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = require('../schema/users');
//var user = require('mongoose').model('user').schema;
var db = mongoose.connection;
/*
routes for API calls
GET all my things listing in JSON. 
TODO: limit number of things
TODO: require api key
TODO: add error handling
TODO: require special access for all /u commands
TODO: add proper authorization
TODO: impliment tags
TODO: freaking data checking

notes:
this whole file will probably become a strongloop instance
*/
var authorized = true;

//return invalid on blank request
router.get('/', function(req, res, send){
  res.json({"error" : "invalid request"});
});

//return all users
//TODO convert to mongoose
router.get('/u/all', function(req, res, next) {
  if(authorized){
    var users = mongoose.model('user');
    db.on('error', console.error.bind(console, 'connection error:'));
    //console.log(users);
    db.once('open', function(callback){
      console.log(callback);
      var collection = db.get('Users');
      collection.find({},{},function(e,docs){
        res.json(docs);
      });
    });
  }
});

//return 1 user document by id
//TODO: return json, not a json object.. effffff
router.get('/u/byid/:id', function(req, res, next) {
  if(authorized){
    var db = req.db;
    var collection = db.get('Users');
    //var itemToReturn = req.params.id;
    collection.find({'_id' : new ObjectId(req.params.id)},{},function(e,docs){
      res.json(docs);
    });
  }
});

//return 1 user document by name
router.get('/u/byname/:id', function(req, res, next) {
  if(authorized){
    var db = req.db;
    var collection = db.get('Users');
    var itemToReturn = req.params.id;
    collection.find({'nickname' : itemToReturn},{},function(e,docs){
      res.json(docs);
    });
  }
});

//add a user function
//TODO: return error for duplicates
//TODO: hash password, or verify it IS a hash before committing
router.post('/u/adduser', function(req, res){
  if(authorized){
    var db = req.db;
    var collection = db.get('Users');
    collection.insert(req.body, function(err, result){
      res.send(
        (err === null) ? {msg: ''} : {msg: err}
      );
    });
  }
});

//delete user by ID
router.delete('/u/deleteuser/:id', function(req, res){
  if(authorized){
    var db = req.db;
    var collection = db.get('Users');
    var userToDelete = req.params.id;
    collection.remove({'_id' : userToDelete}, function(err){
      res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
    });
  }
});

//get a list of all tags
router.get('/tag/all', function(req, res, next) {
  var db = req.db;
  var collection = db.get('Tags');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

//create a new tag
router.post('/tag/newtag', function(req, res){
  if(authorized){
    var db = req.db;
    var collection = db.get('Tags');
    collection.insert(req.body, function(err, result){
      res.send(
        (err === null) ? {msg: ''} : {msg: err}
      );
    });
  }
});

//get a list of all things
router.get('/thing/all', function(req, res, next) {
  var db = req.db;
  var collection = db.get('things');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

//get a list of a specific users things
router.get('/thing/u/:id', function(req, res){
  if(authorized){
    var db = req.db;
    var collection = db.get('things');
    //var userid = new ObjectID(req.params.id);
    collection.find({'ownerid' : new ObjectId(req.params.id)}, {}, function(e, docs){
      res.json(docs);
    });
  }
});

//add a new thing
router.post('/thing/newthing', function(req, res){
  if(authorized){
    var db = req.db;
    var collection = db.get('things');
    collection.insert(req.body, function(err, result){
      res.send(
        (err === null) ? {msg: ''} : {msg: err}
      );
    });
  }
});

module.exports = router;
