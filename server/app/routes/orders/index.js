'use strict'

const router = require('express').Router()
const Order = require('../../../db').model('order')

router.param('orderId', function (req, res, next, id) {
  Order.findById(id)
  .then((order) => {
    if (!order) res.sendStatus(404)
    req.order = order
    next()
  })
  .catch(next)
})

router.get('/', function (req, res, next) {
  let options = {}
  if (req.query) {
    options = {
      where: req.query
    }
  }
  Order.findAll(options)
  .then((orders) => { res.json(orders) })
  .catch(next)
})

router.post('/', function (req, res, next) {
  Order.create(req.body)
  .then((order) => res.status(201).json(order))
  .catch(next)
})

router.get('/:orderId', function (req, res, next) {
  res.json(req.order)
})

router.put('/:orderId', function (req, res, next) {
  req.order.update(req.body)
  .then((order) => res.status(200).json(order))
  .catch(next)
})

router.delete('/:orderId', function (req, res, next) {
  req.order.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router
