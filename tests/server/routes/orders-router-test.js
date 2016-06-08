'use strict'

const expect = require('chai').expect;
const Promise = require('sequelize').Promise
const db = require('../../../server/db')
const supertest = require('supertest')

describe('API Orders Routes', function () {

  let app, Order, agent, testOrder1

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  beforeEach('Create app', function () {
    app = require('../../../server/app')(db)
    Order = db.model('order')
    agent = supertest.agent(app)
  })

  beforeEach(function () {
    return Promise.all([
      Order.create({}),
      Order.create({ status: 'completed' }),
      Order.create({ status: 'completed' }),
    ])
    .spread(function(order1, order2, order3){
      testOrder1 = order1
    })
  })

  describe('GET /orders', function () {

    it('responds with 200', function (done) {
      agent.get('/api/orders/').expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.instanceof(Array)
        expect(res.body).to.have.length(3)
        done()
      })
    })

    it('returns filtered orders with query', function (done) {
      agent
      .get('/api/orders?status=completed')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.instanceof(Array)
        expect(res.body).to.have.length(2)
        done()
      })
    })

  })

  describe('GET /orders/:orderId', function () {

    it('responds with 404 on page that does not exist', function (done) {
      agent.get('/api/orders/randomFakeId').expect(404)
      done()
    })

    it('responds with 200 on a page', function (done) {
      agent.get('/api/orders/' + testOrder1.id)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.status).to.equal(testOrder1.status)
        done()
      })
    })

  })

  describe('POST /orders', function () {

    it('responds with 201', function (done) {
      agent
      .post('/api/orders/')
      .send({})
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.not.be.null
        expect(res.body.status).to.equal('Created')
        done()
      })
    })

  })

  describe('PUT /orders/:orderId',function(){

    it('PUT one', function (done) {
      agent
      .put('/api/orders/' + testOrder1.id)
      .send({
        status: 'Completed'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.status).to.equal('Completed')
        Order.findById(testOrder1.id)
        .then(function (order) {
          expect(order).to.not.be.null
          done()
        })
        .catch(done)
      })
    })

  })

  describe('DELETE /orders/:orderId', function(){

    it('DELETE one', function (done) {
      agent
      .delete('/api/orders/' + testOrder1.id)
      .expect(204)
      .end((err) => {
        if (err) return done(err)
        Order.findById(testOrder1.id)
        .then((order) => {
          expect(order).to.be.null;
          done()
        })
        .catch(done)
      })
    })

  })

})
