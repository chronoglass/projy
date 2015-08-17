var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Did You Do it Yet?' });
});

router.post('/signin', function(req, res){
  res.redirect("/u/" + req.body.username);
});

router.get('/signup', function(req, res){
	res.render('signup', {title: 'Join the movement'});
});

router.post('/signup', function(req,res){
	var db = req.db;
	var userName = req.body.username;
	var usernamefirst = req.body.userNameFirst;
	var usernamelast = req.body.userNameLast;
	var userEmail = req.body.useremail;
	var loc = req.body.userLocation;
	//TODO: add proper password handling pls
	var pwd = req.body.userPassword;

	var collection = db.get('Users');
	collection.insert({
		"nickname" : userName,
		"nameFirst" : usernamefirst,
		"nameLast" : usernamelast,
		"location" : loc,
		"auth" : pwd,
		"email" : userEmail,
		"userlevel" : "5"
	}, function(err, doc){
		if(err){
			//TODO: lets make a log here huh?
			res.send("db broke");
		} else {
			res.redirect("/u/");
		}
	});
});

module.exports = router;
