var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uschema = require('../schema/users');
var tschema = require('../schema/things');

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
    var users = uschema;
    db.on('error', console.error.bind(console, 'connection error:'));
	users.find(function(err, users){res.json(users)});
  } else(res.send("bad news"))
});

//return 1 user document by id
//TODO: return json, not a json object.. effffff
router.get('/u/byid/:id', function(req, res, next) {
  if(authorized){
    var users = uschema;
    db.on('error', console.error.bind(console, 'connection error:'));
    //var itemToReturn = req.params.id;
    users.find({'_id' : new ObjectId(req.params.id)},{},function(e,docs){
      res.json(docs);
    });
  }
});

//return 1 user document by name
router.get('/u/byname/:id', function(req, res, next) {
  if(authorized){
    var collection = uschema;
    db.on('error', console.error.bind(console, 'connection error:'));
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
  console.log(req.body);
    var collection = uschema;
    db.on('error', console.error.bind(console, 'connection error:'));
    var insRec = new collection({
      nickname: req.body.nickname,
      name: {
        first: req.body.nameFirst,
        last: req.body.nameLast,
        mi: req.body.nameMI
        },
        location: req.body.location,
        email: req.body.email,
        ulevel: 5
    });
    insRec.validate(function(err){
      insRec.save(function(err){
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
      });
    });
  }
});

//delete user by ID
//TODO also delete things, or at least put in holding state for a predetermined time
router.delete('/u/deleteuser/:id', function(req, res){
  if(authorized){
    var collection = uschema;
    db.on('error', console.error.bind(console, 'connection error:'));
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

router.get('/thing/all', function(req, res, next) {
  if(authorized){
    var things = tschema;
    db.on('error', console.error.bind(console, 'connection error:'));
	things.find(function(err, things){res.json(things)});
  } else(res.send("bad news"))
});

//get a list of a specific users things
router.get('/thing/u/:id', function(req, res){
  if(authorized){
    var db = req.db;
    var collection = db.get('things');
    collection.find({'ownerid' : new ObjectId(req.params.id)}, {}, function(e, docs){
      res.json(docs);
    });
  }
});

//add a new thing
//TODO: map form to entries
router.post('/thing/newthing', function(req, res){
  if(authorized){
    tschema.addThing(req.body);
    //res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
  }
});

/*
router.post('/thing/newthing', function(req, res){
  if(authorized){
    var connect = mongoose.connection;
    owner = req.body.owner;
    var trecord = tschema;
    connect.on('error', console.error.bind(console, 'connection error:'));
    var insRec = new trecord({
      title: req.body.title,
      description: req.body.description,
      createdon: Date.now(),
      owner: owner,
      comments: {body: "", date: ""},
      tree: {"null": "null", level: 0}
    });
    //insRec.validate(function(err){
      insRec.save(function(err){
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
      });
    //});
  }
});
*/
module.exports = router;
