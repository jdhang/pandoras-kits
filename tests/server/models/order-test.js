const Promise = require('sequelize').Promise
const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect
const db = require('../../../server/db')
const OrderDetail = db.model('orderDetail')
const Order = db.model('order')

describe('Order model', () => {

  let falseyOrder, paidOrder, shippedOrder

  beforeEach('Sync DB', () => {
    return db.sync({ force: true })
  })

  after('Clean DB', () => {
    return db.sync({ force: true })
  })

  beforeEach('Create Orders', () => {
    return Promise.all([
      Order.create({}),
      Order.create({ paymentDate: Date.now() }),
      Order.create({ shippedDate: Date.now() })
    ])
    .spread((order1, order2, order3) => {
      falseyOrder = order1
      paidOrder = order2
      shippedOrder = order3
    })
  })

  describe('Getter Methods', () => {

    describe('paid method', () => {

      it('returns false by default', () => {
        expect(falseyOrder.paid).to.be.false
      })

      it('returns true if paymentDate is not null', () => {
        expect(paidOrder.paid).to.be.true
      })

    })

    describe('shipped method', () => {

      it('returns false by default', () => {
        expect(falseyOrder.shipped).to.be.false
      })

      it('returns true if shippedDate is not null', () => {
        expect(shippedOrder.shipped).to.be.true
      })

    })

  })

  describe('Instance Methods', () => {

    describe('getTotal method', () => {

      let associatedOrder

      beforeEach(() => {
        return Promise.all([
          OrderDetail.create({
            unitPrice: 10.00,
            quantity: 2
          }),
          OrderDetail.create({
            unitPrice: 10.00,
            quantity: 1
          })
        ])
        .spread((orderDetail1, orderDetail2) => {
          return Promise.all([
            falseyOrder.addOrderDetails([orderDetail1, orderDetail2]),
            orderDetail1.setOrder(falseyOrder),
            orderDetail2.setOrder(falseyOrder)
          ])
        })
        .spread((order, orderDetail1, orderDetail2) => {
          associatedOrder = order
        })
      })

      it('exists', () => {
        expect(associatedOrder.getTotal).to.be.a('Function')
      })

      it('returns a promise', () => {
        expect(associatedOrder.getTotal().then).to.be.a('Function')
      })

      it('returns a number when the promise is resolved', () => {
        return associatedOrder.getTotal()
        .then((total) => {
          expect(total).to.be.a('Number')
        })
      })

      it('returns the correct total when the promise is resolved', () => {
        return associatedOrder.getTotal()
        .then((total) => {
          expect(total).to.equal(30)
        })
      })

    })

  })

})
