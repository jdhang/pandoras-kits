'use strict'

const Sequelize = require('sequelize')

module.exports = function (db) {

  return db.define('order', {
    paymentDate: {
      type: Sequelize.DATE
    },
    shippedDate: {
      type: Sequelize.DATE
    }
  }, {
    getterMethods: {
      total: function () {
        return this.getOrderDetails()
        .then((orderDetails) => {
          return orderDetails.map((orderDetail) => {return orderDetail.subtotal })
                             .reduce((prev, current) => { return prev + current }, 0)
        })
      },
      paid: function () {
        return this.paymentDate !== null
      },
      shipped: function () {
        return this.shippedDate !== null
      }
    }
  })
}
