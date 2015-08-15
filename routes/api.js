var express = require('express');
var router = express.Router();

/*
return invalid on blank request
*/

router.get('/', function(req, res, send){
  res.json({"error" : "invalid request"});
});

/* 
GET all my things listing in JSON. 
TODO: limit number of things
TODO: require api key
TODO: add error handling
TODO: require special access for all /u commands
*/
router.get('/u/all', function(req, res, next) {
  var db = req.db;
  var collection = db.get('Users');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

router.get('/api/u/byid/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('Users');
  var itemToReturn = req.params.id;
  collection.find({'_id' : itemToReturn},{},function(e,docs){
    res.json(docs);
  });
});

router.post('/u/adduser', function(req, res){
  var db = req.db;
  var collection = db.get('Users');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    );
  });
});

router.delete('/u/deleteuser/:id', function(req, res){
  var db = req.db;
  var collection = db.get('Users');
  var userToDelete = req.params.id;
  collection.remove({'_id' : userToDelete}, function(err){
    res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
  });
});

router.get('/tag/all', function(req, res, next) {
  var db = req.db;
  var collection = db.get('Tags');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

router.post('/u/newtag', function(req, res){
  var db = req.db;
  var collection = db.get('Tags');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    );
  });
});

router.get('/thing/all', function(req, res, next) {
  var db = req.db;
  var collection = db.get('things');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

router.post('/thing/newthing', function(req, res){
  var db = req.db;
  var collection = db.get('things');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    );
  });
});

module.exports = router;
