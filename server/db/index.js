'use strict';

var db = require('./_db');
var Review = require('./models/review')(db);
var Kit = require('./models/kit')(db);
var Item = require('./models/item')(db);
var User = require('./models/user')(db);
const OrderDetail = require('./models/order_detail')(db);
const Order = require('./models/order')(db);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Kit);
OrderDetail.belongsTo(Order);
Review.belongsTo(User);
Kit.hasMany(Review)
Order.belongsTo(User)

Order.addScope('defaultScope', { include: [{ model: OrderDetail }] }, { override: true })
OrderDetail.addScope('defaultScope', { include: [{ model: Kit }]}, { override: true })
Kit.addScope('defaultScope', { include: [{ model: Review }]}, { override: true })

module.exports = db;
