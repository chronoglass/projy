var express = require('express');
var router = express.Router();
var authorized=true;

/* 
GET all my things listing in JSON. 
TODO: limit number of things
TODO: require api key
*/

router.get('/', function(req, res, next) {
  res.redirect("/");
});

//Displays users profile page for signed in users
router.get('display/:id', function(req, res){
  if(authorized){
    res.render('uindex', { title: req.params.id });
  } else {
    res.send("Unaothorized access for " + req.params.id);
  }
});

//Displays users own page

router.get('/me/:id', function(req, res){
  if(authorized){
    res.render('uindex', { title: req.params.id });
  } else {
    res.send("Unaothorized access for " + req.params.id);
  }
});


module.exports = router;
