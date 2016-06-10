'use strict'

const router = require('express').Router()
const Order = require('../../../db').model('order')
const OrderDetail = require('../../../db').model('orderDetail')

router.param('orderId', function (req, res, next, id) {
  Order.findById(id)
  .then(order => {
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
  // Order.findAll(options)
  // .then(_orders_ => {
  //   orders = _orders_
  //   return Promise.all(orders.map(order => { return order.getOrderDetails() }))
  // })
  // .then(orderDetails => {
  //   res.json(orders.map((order, i) => {
  //     order.orderDetails = orderDetails[i]
  //     return order
  //   }))
  // })
  // .catch(next)
  Order.findAll(options)
  .then(orders => { res.json(orders) })
  .catch(next)
})

router.post('/', function (req, res, next) {
  Order.create(req.body)
  .then(order => res.status(201).json(order))
  .catch(next)
})

router.get('/:orderId', function (req, res, next) {
  res.json(req.order)
})

router.put('/:orderId', function (req, res, next) {
  req.order.update(req.body)
  .then(order => res.status(200).json(order))
  .catch(next)
})

router.delete('/:orderId', function (req, res, next) {
  req.order.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

// router.post('/cart/add', function(req, res) {
  
//   function checkForDuplicate(cart, kitId) {
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i].kit.id === kitId) {
//         return i;
//       }
//     }
//     return false;
//   }

//   if (!req.session.cart) {
//     req.session.cart = [req.body];
//   } else {
//     let cart = req.session.cart;
//     let index = checkForDuplicate(cart, req.body.kit.id);
//     if (index !== false) cart[index].qty = cart[index].qty + req.body.qty;
//     else cart.push(req.body);
//   }

//   res.send(req.session.cart);
// })

router.post('/cart/add/:userId', function(req, res, next) {
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

module.exports = router