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
