'use strict'

const router = require('express').Router()
const Category = require('../../db').model('category')

module.exports = router;

router.get('/', function(req, res, next) {
  Category.getCategoryArr()
  .then(categories => res.send(categories))
  .catch(next);
});

router.post('/', function(req, res, next) {
  Category.create(req.body)
  .then(category => res.send(category))
  .catch(next);
});