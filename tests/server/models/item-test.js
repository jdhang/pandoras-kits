const sinon = require('sinon')
const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect

// const Sequelize = require('sequelize');
// const dbURI = 'postgres://localhost:5432/testing-pandoras-kits'
// const db = new Sequelize(dbURI, {
//     logging: false
// })

// require('../../../server/db/models/item')(db)
const db = require('../../../server/db')
const Item = db.model('item')

describe('Item model', function () {

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  afterEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  describe('Class Methods', function () {
  })

  describe('Instance Methods', function () {

    let createItem = function (additionalFields) {
      // create default valid item, but can merge additional fields when
      // necessary
      let fields = Object.assign({ name: 'Item 1', price: 10.00 }, additionalFields)
      return Item.create(fields)
    }

    describe('inStock method', function () {

      it('should exist', function (done) {
        createItem()
        .then((createdItem) => {
          expect(createdItem.inStock).to.be.a('function')
          done()
        })
        .catch(done)
      })

      it('should be false when item quantity is equal to 0', function (done) {
        createItem()
        .then((createdItem) => {
          expect(createdItem.inStock()).to.be.false
          done()
        })
        .catch(done)
      })

      it('should be true when item quantity is greater than 0', function (done) {
        createItem({ quantity: 10 })
        .then((createdItem) => {
          expect(createdItem.inStock()).to.be.true
          done()
        })
        .catch(done)
      })
    })
  })

  describe('Validations', function () {

    it('should error without name', function () {
      let item = Item.build({})
      return item
      .validate()
      .then((err) => {
        expect(err).to.exist
        expect(err.errors).to.contain.a.thing.with.property('path', 'name')
      })
    })

    it('should error without price', function () {
      let item = Item.build({})
      return item
      .validate()
      .then((err) => {
        expect(err).to.exist
        expect(err.errors).to.contain.a.thing.with.property('path', 'price')
      })
    })

    it('should error if price is negative', function () {
       let item = Item.build({
        name: 'Test Item',
        price: -10.00
       })
       .validate()
       .then((err) => {
         expect(err).to.exist
         expect(err.errors).to.contain.a.thing.with.property('path', 'price')
       })
    })

    it('should be valid with all above fields', function () {
      let item = Item.build({
        name: 'Test Item',
        price: 10.00
      })
      return item.save()
    })

  })

})
