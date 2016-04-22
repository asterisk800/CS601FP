var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');

});

router.get('/profile', ensureAuthenticated, function(req, res){
	res.render('profile');

});

router.get('/about', function(req, res){
	res.render('about');
});

router.get('/features', function(req, res){
	res.render('features');
});

router.get('/appliances', function(req, res){
	res.render('appliances');
})
router.get('/camera', function(req, res){
	res.render('camera');
})
router.get('/lighting', function(req, res){
	res.render('lighting');
})
router.get('/locks', function(req, res){
	res.render('locks');
})

router.get('/temperature', function(req, res){
	res.render('temperature');
})


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;