'use strict'

const router = require('express').Router()

var stripe = require("stripe")("sk_test_XgiEaA9iBtEWcpfiFsvFBizL");

const db= require('../../db');

const Address= db.model('address');
const Order= db.model('order');

module.exports = router;


router.post('/', function(req, res, next) {
  var orderId= req.body.orderId;
   var stripeToken = req.body.stripeToken;
   var shippingAddress={
    name: req.body.stripeShippingName,
    street: req.body.stripeShippingAddressLine1,
    city: req.body.stripeShippingAddressCity,
    state: req.body.stripeShippingAddressState,
    zipCode: req.body.stripeShippingAddressZip,
    category: 'shipping',
    userId: req.user.id
   }

   var billingAddress={
    name: req.body.stripeBillingName,
    street: req.body.stripeBillingAddressLine1,
    city: req.body.stripeBillingAddressCity,
    state: req.body.stripeBillingAddressState,
    zipCode: req.body.stripeBillingAddressZip,
    category: 'billing',
    userId: req.user.id
   }


   var charge = stripe.charges.create({
     amount: 1000, // amount in cents, again
     currency: "usd",
     source: stripeToken,
     description: "Example charge"
   }, function(err, charge) {
     if (err && err.type === 'StripeCardError') {
       // The card has been declined
       res.sendStatus(404);
     }
     else{
        return Promise.all([Address.findOrCreate({where: shippingAddress}),  Address.findOrCreate({where: billingAddress})])
        .then(function(addresses){
          var shippingAddress= addresses[0][0];
          var billingAddress= addresses[1][0];
          var updateOrder = Order.findById(orderId).then(function(order) {
            return order.update({ status: "processing", paymentDate: Date.now() })
          })
          return Promise.all([shippingAddress.addOrders([orderId]), billingAddress.addOrders([orderId]), updateOrder]);
        })
        .then(function(){
          res.redirect('/');
        });

     }

   });

});



