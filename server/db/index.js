'use strict';
var db = require('./_db');
var Review = require('./models/review')(db);
var Kit = require('./models/kit')(db);
var Item = require('./models/item')(db);
var User = require('./models/user')(db);
const OrderDetail = require('./models/order_detail')(db);
const Order = require('./models/order')(db);

OrderDetail.belongsTo(Kit)
// OrderDetail.belongsTo(Order)
// Kit.belongsToMany(Item)
// Kit.hasMany(Review)
// Kit.belongsToMany(Order)
// Review.belongsTo(User)
// Review.belongsTo(Kit)
// Item.belongsToMany(Kit)
// Order.belongsTo(User)

module.exports = db;
