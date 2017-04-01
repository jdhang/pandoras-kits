const Promise = require('sequelize').Promise
const Category = require('../server/db').model('category')

module.exports = function () {

   let categories = [
     {
       name: 'Travel'
     },
     {
       name:'Life Essentials'
     },
     {
       name:'Parent Life'
     },
     {
       name:'Emergencies'
     },
     {
       name:'First Impressions'
     }
   ]

   let creatingCategories = categories.map(categoriesObj => {
     return Category.create(categoriesObj)
   })

   return Promise.all(creatingCategories)
 }
