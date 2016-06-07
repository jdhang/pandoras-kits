'use strict';
var router = require('express').Router();
var Kit = require('../../db/models/kit');
module.exports = router;

router.param('kitId', function(req, res, next, id) {
	Kit.findById(id).then(function(kit) {
		if (!kit) res.sendStatus(404)
		req.kit = kit;
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
	req.kit.update(req.body).then(function(kit){
		res.status(200).json(kit);
	}).catch(next)
});

router.delete('/:kitId', function(req, res, next) {
	req.kit.destroy().then(function(){
		res.sendStatus(204);
	}).catch(next)
});

router.get('/:category', function(req, res, next) {
	Kit.findByCategory(req.params.category).then(function(kits){
		res.json(kits);
	}).catch(next)
});
