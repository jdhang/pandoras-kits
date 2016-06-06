'use strict';
var db = require('./_db');
var Kit = require('./models/kit')(db);
var Item = require('./models/item')(db);
var Review = require('./models/review');
var User = require('./models/user')(db);
var Order = ('./models/order')(db);

Kit.hasMany(Item)
Kit.hasMany(Review)
Kit.hasMany(Order)
Review.belongsTo(User)
Review.belongsTo(Kit)
Item.belongsToMany(Kit)
Order.belongsTo(User)
Order.hasMany(Kit)

module.exports = db;
