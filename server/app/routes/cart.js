'use strict'

const router = require('express').Router()
const Order = require('../../db').model('order')
const OrderDetail = require('../../db').model('orderDetail')
module.exports = router;

router.get('/:userId', function(req, res) {
  Order.findOne({
    where: {
      userId: req.params.userId,
      status: 'created'
    }
  }).then(function(order) {
    res.json(order)
  })
})

router.post('/add/:userId', function(req, res, next) {
  Order.findOrCreate({
    where: {
      userId: req.params.userId,
      status: 'created'
    }
  }).then(function(order) {
    return OrderDetail.findOne({
      where: {
        orderId: order[0].id,
        kitId: req.body.kit.id
      }
    }).then(function(orderDetail) {
      if (orderDetail) {
        return orderDetail.update({
          unitPrice: req.body.kit.price,
          quantity: orderDetail.quantity + req.body.qty
        })
      } else {
        return OrderDetail.create({
          unitPrice: req.body.kit.price,
          quantity: req.body.qty,
          orderId: order[0].id,
          kitId: req.body.kit.id
        })
      }
    })
  }).then(function(orderDetail) {
    res.status(204).json(orderDetail);
  }).catch(next)
})