'use strict'

const router = require('express').Router()
const Category = require('../../db').model('category')

module.exports = router;

router.param('categoryId', function(req, res, next, id) {
  Category.findById(id).then(function(category) {
    if (!category) res.sendStatus(404)
    req.category = category;
    next();
  }).catch(next)
})

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

router.get('/:categoryId', function(req, res) {
  res.json(req.category);
});

router.put('/:categoryId', function(req, res, next) {
  req.category.update(req.body).then(function(category){
    res.status(200).json(category);
  }).catch(next)
});

router.delete('/:categoryId', function(req, res, next) {
  req.category.destroy().then(function(){
    res.sendStatus(204);
  }).catch(next)
});

