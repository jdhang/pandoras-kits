'use strict'

const router = require('express').Router()
const Order = require('../../db').model('order')

module.exports = router;

router.get('/:userId', function(req, res, next) {
  Order.findOne({
    where: {
      userId: req.params.userId,
      status: 'created'
    }
  }).then(function(order) {
    res.json(order)
  }).catch(next)
})

router.post('/add/:userId', function(req, res, next) {
  let kit = req.body.kit;
  let qty = req.body.qty;
  let userId = req.params.userId;

  Order.updateCart(userId, kit, qty).then(function() {
    res.sendStatus(204);
  }).catch(next)
})