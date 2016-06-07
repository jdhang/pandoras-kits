'use strict'

const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect
const db = require('../../../server/db')
const OrderDetail = db.model('order_detail')
const Order = db.model('order')

describe('Order model', function () {

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  afterEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  describe('Getter Methods', function () {

    let createOrder = function (additionalFields) {
      let fields = Object.assign({}, additionalFields)
      return Order.create(fields)
    }

    xdescribe('total method', function () {
    })

    describe('paid method', function () {

      it('returns false by default', function () {
        return createOrder()
        .then((createdOrder) => {
          expect(createdOrder.paid).to.be.false
        })
      })

      it('returns true if paymentDate is not null', function () {
        return createOrder({ paymentDate: Date.now() })
        .then((createdOrder) => {
          expect(createdOrder.paid).to.be.true
        })
      })

    })

    describe('shipped method', function () {

      it('returns false by default', function () {
        return createOrder()
        .then((createdOrder) => {
          expect(createdOrder.shipped).to.be.false
        })
      })

      it('returns true if shippedDate is not null', function () {
        return createOrder({ shippedDate: Date.now() })
        .then((createdOrder) => {
          expect(createdOrder.shipped).to.be.true
        })
      })

    })

  })

  describe('Instance Methods', function () {
  })

  describe('Validations', function () {
  })


})
