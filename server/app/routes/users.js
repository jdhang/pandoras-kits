'use strict'

const router = require('express').Router()
const db = require('../../db')
const User = db.model('user')

module.exports = router

router.param('userId', (req, res, next, id) => {
  User.findById(id).then(user => {
    if (!user) res.sendStatus(404)
    else {
      req.user = user
      next()
    }
	}).catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => res.json(users))
	.catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201).json(user))
	.catch(next)
})

router.get('/:userId', (req, res) => res.json(req.user))

router.put('/:userId', (req, res, next) => {
  req.user.update(req.body)
  .then(user => res.status(200).json(user))
	.catch(next)
})

router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
  .then(() => res.sendStatus(204))
	.catch(next)
})

router.get('/:userId/reviews', (req, res, next) => {
  req.user.getReviews()
  .then(reviews => res.json(reviews))
  .catch(next)
})

router.get('/:userId/orders', (req, res, next) => {
  req.user.getOrders()
  .then(orders => res.json(orders))
  .catch(next)
})

router.put('/:userId/changepw', (req, res, next) => {
  if (req.user.correctPassword(req.body.op)) {
    req.user.update({ password: req.body.np })
    .then(user => res.json(user))
    .catch(next)
  } else {
    res.sendStatus(400)
  }

}
