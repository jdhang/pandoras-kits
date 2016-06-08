'use strict'

const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect
const db = require('../../../server/db')
const Promise = require('sequelize').Promise
const OrderDetail = db.model('orderDetail')
const Order = db.model('order')

describe('Order model', function () {

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  afterEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  let createOrder = function (additionalFields) {
    let fields = Object.assign({}, additionalFields)
    return Order.create(fields)
  }

  describe('Getter Methods', function () {

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

    describe('getTotal method', function () {

      let testOrder, testOrderDetail1, testOrderDetail2

      beforeEach(function () {
        return Promise.all([
          createOrder(),
          OrderDetail.create({
            unitPrice: 10.00,
            quantity: 2
          }),
          OrderDetail.create({
            unitPrice: 10.00,
            quantity: 1
          })
        ])
        .spread((order, orderDetail1, orderDetail2) => {
          return Promise.all([
            order.addOrderDetails([orderDetail1, orderDetail2]),
            orderDetail1.setOrder(order),
            orderDetail2.setOrder(order)
          ])
        })
        .spread((order, orderDetail1, orderDetail2) => {
          testOrder = order
          testOrderDetail1 = orderDetail1
          testOrderDetail2 = orderDetail2
        })
      })


      it('should exist', function (done) {
        expect(testOrder.getTotal).to.be.a('Function')
        done()
      })

      it('should return a promise', function (done) {
        expect(testOrder.getTotal().then).to.be.a('Function')
        done()
      })

      it('should return a number when the promise is resolved', function () {
        return testOrder.getTotal()
        .then((total) => {
          expect(total).to.be.a('Number')
        })
      })

      it('should return the correct total when the promise is resolved', function () {
        return testOrder.getTotal()
        .then((total) => {
          expect(total).to.equal(30)
        })
      })

    })

  })

  describe('Class Methods', function () {
  })

  describe('Validations', function () {
  })


})
