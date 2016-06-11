'use strict'

const Order = require('../server/db').model('order')

module.exports = function () {

  let orders = [
    {
      status: 'processing',
      paymentDate: Date.now()
    },
    { status: 'completed' },
    {
      status: 'processing',
      shippedDate: Date.now()
    },
    { status: 'completed' },
    { status: 'cancelled' },
    { status: 'processing' },
    { status: 'processing' },
    { status: 'processing' },
    { status: 'processing' },
    { status: 'processing' },
    {
      status: 'processing',
      paymentDate: Date.now()
    },
  ]

  let creatingOrders = orders.map((orderObj) => {
    return Order.create(orderObj)
  })

  return Promise.all(creatingOrders)

}
