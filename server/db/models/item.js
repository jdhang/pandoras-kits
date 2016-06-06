'use strict'

const Sequelize = require('sequelize')

module.exports = function (db) {

  db.define('item', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'http://placehold.it/300x500'
    },
    categories: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    hooks: {
    },
    instanceMethods: {
      inStock: function () {
        return this.quantity !== 0
      }
    },
    classMethods: {
    }
  })
}
