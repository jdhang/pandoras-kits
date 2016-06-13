'use strict'

const seedUsers = require('./seedUsers')
const seedOrders = require('./seedOrders')
const seedKits = require('./seedKits')
const seedReviews = require('./seedReviews')
const seedOrderDetails = require('./seedOrderDetails')
const seedCategories = require('./seedCategories')
const seedAssociations = require('./seedAssociations')

module.exports = {
  Users: seedUsers,
  Kits: seedKits,
  Reviews: seedReviews,
  Orders: seedOrders,
  OrderDetails: seedOrderDetails,
  Categories: seedCategories,
  Associations: seedAssociations
}
