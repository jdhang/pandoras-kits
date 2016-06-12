'use strict'

const Sequelize = require('sequelize')

module.exports = function (db) {

  return db.define('category', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },{
  	classMethods:{
  		getCategoryArr: function(){
  			return this.findAll()
  			.then(function(categories){
  				return categories.map(category => category.name)
  			})
  		}
  	}

  })

}
