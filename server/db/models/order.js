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
    classMethods: {
      updateCart: function(userId, kit, qty) {
        let OrderDetail = db.model('orderDetail')
        
        return this.findOrCreate({
          where: {
            userId: userId,
            status: 'created'
          }
        }).then(function(order) {
          return OrderDetail.findOne({
            where: {
              orderId: order[0].id,
              kitId: kit.id
            }
          }).then(function(orderDetail) {
            if (orderDetail) {
              return orderDetail.update({
                unitPrice: kit.price,
                quantity: orderDetail.quantity + qty
              })
            } else {
              return OrderDetail.create({
                unitPrice: kit.price,
                quantity: qty,
                orderId: order[0].id,
                kitId: kit.id
              })
            }
          })
        })
      }
    }
  })

}
