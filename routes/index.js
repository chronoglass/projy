var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tags', function(req, res){
	var db = req.db;
	var collection = db.get('tagTypes');
	collection.find({},{},function(e,docs){
		res.render('tags', {
			"tags" : docs
		});
	});
});

router.get('/userAdd', function(req, res){
	res.render('userAdd', {title: 'add new user'});
});

router.post('/userAdd', function(req,res){
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('Users');
	collection.insert({
		"name" : userName,
		"email" : userEmail,
		"userlevel" : "5"
	}, function(err, doc){
		if(err){
			res.send("db broke");
		} else {
			res.redirect("tags");
		}
	});
});

module.exports = router;
