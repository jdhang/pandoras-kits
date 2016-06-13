//user routes
'use strict';
var router = require('express').Router();
var db = require('../../db')
var User = db.model('user')
module.exports = router;

router.param('userId', function(req, res, next, id) {
	User.findById(id).then(function(user) {
		if (!user) res.sendStatus(404)
		req.user = user;
		next();
	}).catch(next)
})

router.get('/', function(req, res, next) {
	User.findAll().then(function(users){
		res.json(users);
	}).catch(next)
});

router.post('/', function(req, res, next) {
	User.create(req.body).then(function(user){
		res.status(201).json(user);
	}).catch(next)
});

router.get('/:userId', function(req, res) {
	res.json(req.user);
});

router.put('/:userId', function(req, res, next) {
	console.log("Reached put request!", req.body)
	req.user.update(req.body).then(function(user){
		res.status(200).json(user);
	}).catch(next)
});

router.delete('/:userId', function(req, res, next) {
	req.user.destroy().then(function(){
		res.sendStatus(204);
	}).catch(next)
});
