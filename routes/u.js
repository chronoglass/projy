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

router.get('/:id', function(req, res){
  if(authorized){
    res.render('uindex', { title: req.params.id });
  } else {
    res.send("Unaothorized access for " + req.params.id);
  }
});

/* 
GET one thing by ID in JSON. 
TODO: limit number of things
TODO: require api key
TODO: add error handling
*/


module.exports = router;
