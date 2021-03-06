var express = require('express');
var router = express.Router();

/* 
GET all my things listing in JSON. 
TODO: limit number of things
TODO: require api key
*/
router.get('/api/all', function(req, res, next) {
  var db = req.db;
  var collection = db.get('userThings');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* 
GET one thing by ID in JSON. 
TODO: limit number of things
TODO: require api key
TODO: add error handling
*/
router.get('/api/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('userThings');
  var itemToReturn = req.params.id;
  collection.find({'_id' : itemToReturn},{},function(e,docs){
    res.json(docs);
  });
});

router.post('/adduser', function(req, res){
  var db = req.db;
  var collection = db.get('Users');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    );
  });
});

router.delete('/deleteuser/:id', function(req, res){
  var db = req.db;
  var collection = db.get('Users');
  var userToDelete = req.params.id;
  collection.remove({'_id' : userToDelete}, function(err){
    res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
  });
});

module.exports = router;
