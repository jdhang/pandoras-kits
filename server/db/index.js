const db = require('./_db');
const Review = require('./models/review')(db);
const Item = require('./models/item')(db);
const User = require('./models/user')(db);
const Category= require('./models/categories')(db);
const OrderDetail = require('./models/order_detail')(db);
const Order = require('./models/order')(db);
const Kit = require('./models/kit')(db);
const Address= require('./models/address')(db);

Order.hasMany(OrderDetail)
Order.belongsTo(User)
OrderDetail.belongsTo(Kit)
OrderDetail.belongsTo(Order)
Review.belongsTo(Kit)
Review.belongsTo(User)
Kit.hasMany(Review)
Category.belongsToMany(Kit, {through: 'categoryKits'})
Address.belongsTo(User);
Order.belongsToMany(Address, {through: 'orderAddresses'});
Address.belongsToMany(Order, {through: 'orderAddresses'});
User.hasMany(Address);
User.hasMany(Review)
User.hasMany(Order)

Order.addScope('defaultScope', { include: [{ model: OrderDetail }] }, { override: true })
OrderDetail.addScope('defaultScope', { include: [{ model: Kit }]}, { override: true })
Kit.addScope('defaultScope', { include: [{ model: Review }]}, { override: true })
Review.addScope('defaultScope', { include: [{ model: User }]}, { override: true })

module.exports = db
