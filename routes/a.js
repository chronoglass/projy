var express = require('express');
var router = express.Router();
/*
routes for admin pages
TODO: create actual admin page
*/
var authorized = true;

router.get('/', function(req, res, next) {
  if(authorized){
    res.render('admin', {title: 'DYDIY admin panel'})
  }
});


/*
function for filling the database with test data
TODO: convert to using the API call @ "/api/thing/newthing"
TODO: make api for finduserbyname
TODO: convert to get ID by finding the user by name API call
*/
router.get('/thing/filltest/:id/:user', function(req, res){
  if(authorized){
    var db = req.db;
    var ucoll = db.get('Users');
    var userid = "testuser" + req.params.user;
    console.log(userid);
    ucoll.findOne({nickname: userid}).on('success', function(doc){
      if(doc){
        var ownerid = doc._id;
        console.log(ownerid);
        var collection = db.get('things');
        num = req.params.id;
        (function fillLoop(){
          if(num > 0){
            collection.insert(
             { "ownerid" : ownerid,
               "title" : "test entry " + num, 
               "description" : "test entry", 
               "treeParent" : "root", 
               "treeLevel" : 0, 
               "status" : "active", 
               "perNeed" : 100, 
               "nStep" : "NULL", 
               "tags" : "", 
               "shared" : "false"}, function(err, result){});
             num--;
             fillLoop();
          }
        }());
        res.redirect('/api/thing/all');
      } else {res.send('invalid test user.');}
    });
  }
});

module.exports = router;