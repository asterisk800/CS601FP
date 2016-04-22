var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var dateFormat = require('dateformat');
var now = new Date();

var User = require('../models/user');

router.all('/login', function (req, res, next) {
	console.log('Accessing ' + req.url + ': ' + dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
	next(); // pass control to the next handler
});

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

router.get('/profile', function (req, res, next) {
    console.log('Accessing ' + req.url + ': ' + dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
    next(); // pass control to the next handler

});

router.get('/profile', function (req, res, next) {
    res.render('profile');
})

// Profile
//router.get('/profile', function(req, res) {
//    User.find({}, function(err, users) {
//        var userMap = {};
//
//        users.forEach(function(user) {
//            userMap[user._id] = user;
//        });
//
//        res.send(userMap);
//    });
//});



// Add Lighting

router.get('/profile/lighting', function(req, res){
    req.render('highlight');
})

// Register User
router.post('/register', function(req, res){
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});



module.exports = router;