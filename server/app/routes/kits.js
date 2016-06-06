'use strict';
var router = require('express').Router();
var Kit = require('../../db/models/kit');
module.exports = router;

router.get('/', function(req, res, next) {
	Kit.findAll().then(function(kits){
		res.json(kits);
	}).catch(next)
});

router.get('/:kitId', function(req, res, next) {
	Kit.findOne({
		where: {
			id: req.params.kitId
		}
	}).then(function(kit){
		res.json(kit);
	}).catch(next)
});

router.get('/:category', function(req, res, next) {
	Kit.findByCategory(req.params.category).then(function(kits){
		res.json(kits);
	}).catch(next)
});
