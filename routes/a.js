var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send("No admin for you!");
});

router.get('/users', function(req, res){
	res.render('useradmin', {title: 'User List'})
});

module.exports = router;