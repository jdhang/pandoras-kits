'use strict';

var db = require('./_db');
var Review = require('./models/review')(db);
var Kit = require('./models/kit')(db);
var Item = require('./models/item')(db);
var User = require('./models/user')(db);
var Category= require('./models/categories')(db);
const OrderDetail = require('./models/order_detail')(db);
const Order = require('./models/order')(db);

// Setting Associations between models
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Kit);
OrderDetail.belongsTo(Order);
Review.belongsTo(User);
Review.belongsTo(Kit);
Category.belongsToMany(Kit, {through: 'categoryKits'});
// Kit.belongsToMany(Item)
// Kit.hasMany(Review)
// Kit.belongsToMany(Order)
// Item.belongsToMany(Kit)
Order.belongsTo(User)

// Attaching defaultScopes to certain models
Order.addScope('defaultScope', { include: [{ model: OrderDetail }] }, { override: true })
OrderDetail.addScope('defaultScope', { include: [{ model: Kit }]}, { override: true })

module.exports = db;
