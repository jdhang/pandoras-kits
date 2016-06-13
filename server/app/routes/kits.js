'use strict';
var router = require('express').Router();
var db = require('../../db')
var Kit = db.model('kit')
module.exports = router;

router.param('kitId', function(req, res, next, id) {
	Kit.findById(id).then(function(kit) {
		if (!kit) res.sendStatus(404)
		req.kit = kit;
		next();
	}).catch(next)
})

router.get('/', function(req, res, next) {
	Kit.findAll().then(function(kits){
		res.json(kits);
	}).catch(next)
});

router.post('/', function(req, res, next) {
	Kit.create(req.body).then(function(kit){
		res.status(201).json(kit);
	}).catch(next)
});

router.get('/:kitId', function(req, res) {
	res.json(req.kit);
});

router.put('/:kitId', function(req, res, next) {
	console.log("I am here");
	req.kit.update(req.body).then(function(kit){
		res.status(200).json(kit);
	}).catch(next)
});

router.delete('/:kitId', function(req, res, next) {
	req.kit.destroy().then(function(){
		res.sendStatus(204);
	}).catch(next)
});

router.get('/category/:category', function(req, res, next) {
	Kit.findByCategory(req.params.category).then(function(kits){
		res.json(kits);
	}).catch(next)
});
