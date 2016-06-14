'use strict'

const router = require('express').Router()
const db = require('../../db')
const Address = db.model('address')
const User = db.model('user')

router.get('/', function (req, res, next) {
  let options = {}
  if (req.query) {
    options = {
      where: req.query
    }
  }
  
  Address.findAll(options)
  .then(addresses => { res.json(addresses) })
  .catch(next)
})

router.post('/', function (req, res, next) {
  req.body.form.userId = req.user.id
  
  Address.findOrCreate({
    where: req.body.form
  })
  .spread(function(address){
    return address.addOrders([req.body.order.id])
  })
  .then(function(address) {
    res.json(address);
  })
  
})

router.delete('/:orderId', function (req, res, next) {
  req.order.destroy()
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router