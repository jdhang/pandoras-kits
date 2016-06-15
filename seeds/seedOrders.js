'use strict'

const Promise = require('sequelize').Promise
const Order = require('../server/db').model('order')

module.exports = function () {

  let today = new Date()

  let orders = [
    {
      status: 'processing',
      paymentDate: Date.now(),
      createdAt: today.setDate(today.getDate() - 5)
    },
    { status: 'completed' },
    {
      status: 'processing',
      shippedDate: Date.now(),
      createdAt: today.setDate(today.getDate() - 4)
    },
    {
      status: 'completed',
      createdAt: today.setDate(today.getDate() - 2)
    },
    {
      status: 'cancelled',
      createdAt: today.setDate(today.getDate() - 4)
    },
    {
      status: 'processing',
      paymentDate: Date.now(),
      createdAt: today.setDate(today.getDate() - 3)
    },
    {
      status: 'processing',
      createdAt: today.setDate(today.getDate() - 2)
    },
    {
      status: 'processing',
      createdAt: today.setDate(today.getDate() - 1)
    },
    {
      status: 'processing',
      createdAt: today.setDate(today.getDate() - 7)
    },
    {
      status: 'processing',
      createdAt: today.setDate(today.getDate() - 6)
    },
    { status: 'processing' },
    {
      status: 'processing',
      paymentDate: Date.now(),
      createdAt: today.setDate(today.getDate() - 8)
    },
    {
      status: 'cancelled',
      createdAt: Date.now()
    }
  ]

  let creatingOrders = orders.map((orderObj) => {
    return Order.create(orderObj)
  })
  
  return Promise.all(creatingOrders)

}
