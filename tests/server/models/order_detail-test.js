'use strict'

const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect
const db = require('../../../server/db')
const OrderDetail = db.model('order_detail')
const Order = db.model('order')

describe('Order Detail model', function () {

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  afterEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  describe('Getter Methods', function () {

    describe('subtotal method', function () {

      let orderDetail

      beforeEach(function () {
        return OrderDetail.create({
          price: 10.00,
          quantity: 2
        })
        .then((createdOrderDetail) => {
          orderDetail = createdOrderDetail
        })
      })

      it('should exist', function () {
        expect(orderDetail.subtotal).to.not.be.undefined
      })

      it('should return a number', function () {
        expect(orderDetail.subtotal).to.be.a('Number')
      })

      it('should return the product of the price and quantity', function () {
        expect(orderDetail.subtotal).to.equal(20)
      })

    })
  })

  describe('Class Methods', function () {
  })

  describe('Validations', function () {

    it('should error without price', function () {
      let orderDetail = OrderDetail.build({
        quantity: 1
      })
      return orderDetail
      .validate()
      .then((err) => {
        expect(err).to.exist
        expect(err.errors).to.contain.a.thing.with.property('path', 'price')
      })
    })

    it('should error without quantity', function () {
      let orderDetail = OrderDetail.build({
        price: 10.00
      })
      return orderDetail
      .validate()
      .then((err) => {
        expect(err).to.exist
        expect(err.errors).to.contain.a.thing.with.property('path', 'quantity')
      })
    })

    it('should error if price is negative', function () {
      let orderDetail = OrderDetail.build({
        price: -10.00,
        quantity: 1
      })
      return orderDetail
      .validate()
      .then((err) => {
        expect(err).to.exist
        expect(err.errors).to.contain.a.thing.with.property('path', 'price')
      })
    })

    it('should be valid with all above fields', function () {
      let orderDetail = OrderDetail.build({
        price: 10.00,
        quantity: 1
      })
      return orderDetail.save()
    })

  })

})
