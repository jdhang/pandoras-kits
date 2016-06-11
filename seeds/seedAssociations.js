'use strict'

const Promise = require('sequelize').Promise
const db = require('../server/db')
const Order = db.model('order')
const Kit = db.model('kit')
const OrderDetail = db.model('orderDetail')
const Review = db.model('review')
const User = db.model('user')

module.exports = function () {

  return Promise.all([
    Order.findAll(),
    Kit.findAll(),
    OrderDetail.findAll(),
    Review.findAll(),
    User.findAll()
  ])
  .spread((orders, kits, orderDetails, reviews, users) => {
    return Promise.all([
      orderDetails[0].setOrder(orders[0]),
      orderDetails[1].setOrder(orders[0]),
      orderDetails[0].setKit(kits[0]),
      orderDetails[1].setKit(kits[0]),
      orders[0].addOrderDetails([orderDetails[0], orderDetails[1]]),
      orderDetails[2].setOrder(orders[1]),
      orderDetails[2].setKit(kits[0]),
      orders[1].addOrderDetail(orderDetails[2]),
      orderDetails[3].setOrder(orders[1]),
      orderDetails[3].setKit(kits[2]),
      orders[2].addOrderDetail(orderDetails[3]),
      orderDetails[4].setOrder(orders[3]),
      orderDetails[4].setKit(kits[2]),
      orders[3].addOrderDetail(orderDetails[4]),
      reviews[0].setUser(users[0]),
      reviews[1].setUser(users[0]),
      reviews[2].setUser(users[1]),
      reviews[3].setUser(users[1]),
      kits[3].addReviews([reviews[0], reviews[2]]),
      kits[4].addReviews([reviews[1], reviews[3]])
    ])
  })

}


