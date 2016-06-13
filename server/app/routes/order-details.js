'use strict'

const router = require('express').Router()
const db = require('../../db')
const OrderDetail = db.model('orderDetail')

router.param('orderDetailId', function (req, res, next, id) {
  OrderDetail.findById(id)
  .then(orderDetail => {
    if (!orderDetail) res.sendStatus(404)
    req.orderDetail = orderDetail
    next()
  })
  .catch(next)
})

router.get('/', function (req, res, next) {
  OrderDetail.findAll()
  .then(orders => res.json(orders))
  .catch(next)
})

router.post('/', function (req, res, next) {
  OrderDetail.create(req.body)
  .then(orderDetail => res.status(201).json(orderDetail))
  .catch(next)
})

router.get('/:orderDetailId', function (req, res, next) {
  res.json(req.orderDetail)
})

router.put('/:orderDetailId', function (req, res, next) {
  req.orderDetail.update(req.body)
  .then(orderDetail => res.status(200).json(orderDetail))
  .catch(next)
})

router.delete('/:orderDetailId', function (req, res, next) {
  req.orderDetail.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router