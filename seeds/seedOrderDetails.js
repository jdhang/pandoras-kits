'use strict'

const Promise = require('sequelize').Promise
const OrderDetail = require('../server/db').model('orderDetail')

module.exports = function () {

  let orderDetails = [
    {
<<<<<<< a9ecf3b6a431b2944cbbcda3ca65e279b8a31ffc
      kitId: 1,
      unitPrice: 10.00,
      quantity: 1
=======
      unitPrice: 10.00,
      quantity: 1
    },
    {
      unitPrice: 5.00,
      quantity: 2
    },
    {
      unitPrice: 10.00,
      quantity: 1
    },
    {
      unitPrice: 10.00,
      quantity: 1
    },
    {
      unitPrice: 10.00,
      quantity: 2
>>>>>>> Added faker dependency to help with seed data and create more modular seed data files.
    }
  ]

  let creatingOrderDetails = orderDetails.map((orderDetailObj) => {
    return OrderDetail.create(orderDetailObj)
  })

  return Promise.all(creatingOrderDetails)

}
