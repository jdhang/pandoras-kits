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
      type: Sequelize.STRING
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
          return orderDetails.reduce((prev, curr) => {
            return prev.subtotal + curr.subtotal
          })
        })
      }
    }
  })
}
