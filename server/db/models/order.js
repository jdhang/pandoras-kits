'use strict'

const Sequelize = require('sequelize')

module.exports = function (db) {

  return db.define('order', {
    paymentDate: {
      type: Sequelize.DATE
    },
    shippedDate: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
      defaultValue: 'created'
    }
  }, {
    getterMethods: {
      paid: function () {
        return this.paymentDate !== null
      },
      shipped: function () {
        return this.shippedDate !== null
      }
    },
    instanceMethods: {
      getTotal: function () {
        return this.getOrderDetails()
        .then((orderDetails) => {
          return orderDetails.map(orderDetail => orderDetail.subtotal)
            .reduce((prev, curr) => prev + curr)
        })
      }
    },
  })

}
