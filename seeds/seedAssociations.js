const Promise = require('sequelize').Promise
const db = require('../server/db')
const Order = db.model('order')
const Kit = db.model('kit')
const OrderDetail = db.model('orderDetail')
const Review = db.model('review')
const User = db.model('user')

module.exports = function () {

  return Promise.all([
    Kit.findAll(),
    Review.findAll(),
    User.findAll()
  ])
  .spread((kits, reviews, users) => {
    return Promise.all(
      kits.map(kit => kit.toOrderDetail(1))
      .concat(reviews.map((review, i) => review.setUser(users[i])))
      .concat([
        kits[0].addReviews([reviews[4], reviews[6]]),
        kits[1].addReview(reviews[9]),
        kits[2].addReviews([reviews[8], reviews[5]]),
        kits[3].addReviews([reviews[0], reviews[2]]),
        kits[4].addReviews([reviews[1], reviews[3], reviews[7]])
      ])
      .concat(kits.map(kit => kit.toOrderDetail(2)))
    )
  })
  .then(() => {
    return Promise.all([
      Order.findAll(),
      OrderDetail.findAll()
    ])
    .spread((orders, orderDetails) => {
      return Promise.all(
        orders.map((order, i) => order.addOrderDetail(orderDetails[i]))
        .concat(
          orders.map((order, i) => orderDetails[i].setOrder(order))
        )
        .concat([
          orders[0].addOrderDetail(orderDetails[13]),
          orderDetails[13].setOrder(orders[0]),
          orders[1].addOrderDetail(orderDetails[14]),
          orderDetails[14].setOrder(orders[1]),
          orders[2].addOrderDetail(orderDetails[15]),
          orderDetails[15].setOrder(orders[2]),
          orders[3].addOrderDetail(orderDetails[16]),
          orderDetails[16].setOrder(orders[3])
        ])
      )
    })
  })

}
