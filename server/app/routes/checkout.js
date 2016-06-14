'use strict'

const router = require('express').Router()

var stripe = require("stripe")("sk_test_XgiEaA9iBtEWcpfiFsvFBizL");

module.exports = router;

// router.param('categoryId', function(req, res, next, id) {
//   Category.findById(id).then(function(category) {
//     if (!category) res.sendStatus(404)
//     req.category = category;
//     next();
//   }).catch(next)
// })

router.post('/', function(req, res, next) {
  console.log(req.body.random);
   var stripeToken = req.body.stripeToken;
   var charge = stripe.charges.create({
     amount: 1000, // amount in cents, again
     currency: "usd",
     source: stripeToken,
     description: "Example charge"
   }, function(err, charge) {
     if (err && err.type === 'StripeCardError') {
       // The card has been declined
     }
   });

  res.sendStatus(200);

});

// router.post('/', function(req, res, next) {
//   Category.create(req.body)
//   .then(category => res.send(category))
//   .catch(next);
// });

// router.get('/:categoryId', function(req, res) {
//   res.json(req.category);
// });

// router.put('/:categoryId', function(req, res, next) {
//   req.category.update(req.body).then(function(category){
//     res.status(200).json(category);
//   }).catch(next)
// });

// router.delete('/:categoryId', function(req, res, next) {
//   req.category.destroy().then(function(){
//     res.sendStatus(204);
//   }).catch(next)
// });




// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form


