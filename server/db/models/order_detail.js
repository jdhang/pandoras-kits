'use strict'

const Sequelize = require('sequelize')

module.exports = function (db) {

  return db.define('orderDetail', {
    unitPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    getterMethods: {
      subtotal: function () {
        return this.unitPrice * this.quantity
      }
    },
    classMethods: {
    }
  })

}
