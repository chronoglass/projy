var express = require('express');
var router = express.Router();
var request = require('request');

/*
routes for admin pages
TODO: add "fill test button to admin page"
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
TODO: spin off service into it's own thread
TODO: create "housekeeping" option to cleanup all test entries
*/

router.get('/thing/filltest/:num/:user', function(req, res){
  //var numposts, tUser;
  if(authorized){
    numPosts = req.params.num;
    request('http://localhost:3000/api/u/byname/testuser'+req.params.user, function(e, res){
      if(res.statusCode == 200){
        tUser = JSON.parse(res.body);
        tUID = tUser[0]['_id']
        if(tUID){
          num = numPosts;
          (function fillLoop(){
            if(num > 0){
              request.post('http://localhost:3000/api/thing/newthing',
                {form: 
                  {"title": "testpost"+num, 
                  "description": "blah blah blah",
                  "createdon": Date.now(),
                  "owner": tUID,
                  "comments": {
                    "body": "", 
                    "date": ""},
                  "tree": {
                    "level": "0"}
                  }}, 
                function(res, e, body){
                  if (!e && res.statusCode == 200) {
                    console.log("posted");
                    console.log(body)
                  }
                });
              
              
              num--;
              fillLoop();
            }
          })();
          //res.redirect('/api/thing/all');
        } else {res.send('invalid test user.');}
      }
    });
  }
});

/* old code with direct db access
converting to make use of the api

router.get('/thing/filltest/:num/:user', function(req, res){
  if(authorized){
    var db = req.db;
    var ucoll = db.get('Users');
    var userid = "testuser" + req.params.user;
    console.log(userid);
    ucoll.findOne({nickname: userid}).on('success', function(doc){
      if(doc){
        var ownerid = doc._id;
        //console.log(ownerid);
        var collection = db.get('things');
        num = req.params.num;
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
*/

module.exports = router;