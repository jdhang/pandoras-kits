const Sequelize = require('sequelize')

module.exports = function (db) {

  return db.define('address', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city:{
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.ENUM('billing', 'shipping')
    }
  },{
  	classMethods:{

  	}

  })

}