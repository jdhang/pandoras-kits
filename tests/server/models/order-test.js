'use strict'

const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect
const db = require('../../../server/db')
const Promise = require('sequelize').Promise
const OrderDetail = db.model('order_detail')
const Order = db.model('order')

describe('Order model', function () {

  let testOrderDetail1, testOrderDetail2

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  beforeEach('Create OrderDetails', function () {
    return Promise.all([
      OrderDetail.create({
        price: 10.00,
        quantity: 1
      }),
      OrderDetail.create({
        price: 10.00,
        quantity: 2
      })
    ])
    .spread((orderDetail1, orderDetail2) => {
      testOrderDetail1 = orderDetail1
      testOrderDetail2 = orderDetail2
    })
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
      let order

      return createOrder()
      .then((createdOrder) => {
        order = createdOrder

        return Promise.all([
          testOrderDetail1.setOrder(order),
          testOrderDetail2.setOrder(order)
        ])
      })
      .spread((orderDetail1, orderDetail2) => {
        expect(order.total).to.equal(30)
      })
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
