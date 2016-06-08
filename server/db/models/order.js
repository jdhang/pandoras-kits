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
      type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
      defaultValue: 'Created'
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
          return orderDetails.map((orderDetail) => { return orderDetail.subtotal })
            .reduce((prev, curr) => { return prev + curr })
        })
      }
    },
    classMethods: {}
  }, {
    defaultScope: {
      include: [{ model: 'OrderDetail' }]
    }
  })
}
