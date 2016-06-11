'use strict'

const Promise = require('sequelize').Promise
const OrderDetail = require('../server/db').model('orderDetail')

module.exports = function () {

  let orderDetails = [
    {
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
    }
  ]

  let creatingOrderDetails = orderDetails.map((orderDetailObj) => {
    return OrderDetail.create(orderDetailObj)
  })

  return Promise.all(creatingOrderDetails)

}
