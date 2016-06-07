'use strict';
var db = require('./_db');
var Kit = require('./models/kit')(db);
var Item = require('./models/item')(db);
// var Review = require('./models/review')(db);
var User = require('./models/user')(db);
// var Order = ('./models/order')(db);

// Kit.belongsToMany(Item)
// Kit.hasMany(Review)
// Kit.belongsToMany(Order)
// Review.belongsTo(User)
// Review.belongsTo(Kit)
// Item.belongsToMany(Kit)
// Order.belongsTo(User)

module.exports = db;
