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
      // kit2 and orderDetail2 are 5.00
      // ORDER 1
      orderDetails[0].setOrder(orders[0]),
      orderDetails[1].setOrder(orders[0]),
      orderDetails[0].setKit(kit[0]),
      orderDetails[1].setKit(kit[0]),
      orders[0].addOrderDetails([orderDetails[0], orderDetails[1]]),
      // ORDER 2
      orderDetails[2].setOrder(orders[1]),
      orderDetails[2].setKit(kits[0]),
      orders[1].addOrderDetail(orderDetails[2]),
      // ORDER 3
      orderDetails[3].setOrder(orders[1]),
      orderDetails[3].setKit(kits[2]),
      orders[2].addOrderDetail(orderDetails[3]),
      // ORDER 4
      orderDetails[4].setOrder(orders[3]),
      orderDetails[4].setKit(kits[2]),
      orders[3].addOrderDetail(orderDetails[4]),
      // User to Reviews
      reviews[0].setUser(users[0]),
      reviews[1].setUser(users[0]),
      reviews[2].setUser(users[0]),
      reviews[3].setUser(users[0]),
      reviews[4].setUser(users[0]),
      reviews[5].setUser(users[0]),
      reviews[6].setUser(users[0]),
      reviews[7].setUser(users[0]),
      reviews[8].setUser(users[0]),
      reviews[9].setUser(users[0]),
      // Kit Reviews
    ])
  })

}


