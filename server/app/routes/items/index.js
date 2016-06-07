'use strict'

const router = require('express').Router()
const Item = require('../../db').model('item')

router.param('itemId', function (req, res, next, id) {
  Item.findById(id)
  .then((item) => {
    if (!kit) res.sendStatus(404)
    req.item = item
  })
  .catch(next)
})

router.get('/', function (req, res, next) {
  Item.findAll({})
  .then((items) => { res.json(items) })
  .catch(next)
})

router.post('/', function (req, res, next) {
  Item.create(req.body)
  .then((item) => res.status(201).json(item))
  .catch(next)
})

router.get('/:itemId', function (req, res, next) {
  res.json(req.item)
})

router.put('/:itemId', function (req, res, next) {
  req.item.update(req.body)
  .then((item) => res.status(200).json(item))
  .catch(next)
})

router.delete('/:itemId', function (req, res, next) {
  req.item.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router
