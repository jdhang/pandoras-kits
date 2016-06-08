'use strict'

const Sequelize = require('sequelize')

module.exports = function (db) {

  return db.define('order_detail', {
    price: {
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
        return this.price * this.quantity
      }
    },
    classMethods: {
      findByOrderId: function (orderId) {
        return this.findAll({ where: { orderId: orderId }})
      }
    }
  })

}
