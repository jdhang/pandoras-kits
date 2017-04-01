const expect = require('chai').expect;
const Promise = require('sequelize').Promise
const db = require('../../../server/db')
const promisedSupertest = require('supertest-as-promised')

describe('API Orders Routes', function () {

  let app, Order, agent, testOrder1
  let created = 'created'
  let completed = 'completed'

  beforeEach('Sync DB', function () {
    return db.sync({ force: true })
  })

  beforeEach('Create app', function () {
    app = require('../../../server/app')(db)
    Order = db.model('order')
    agent = promisedSupertest.agent(app)
  })

  beforeEach(function () {
    return Promise.all([
      Order.create({}),
      Order.create({ status: completed }),
      Order.create({ status: completed }),
    ])
    .spread(function(order1){
      testOrder1 = order1
    })
  })

  describe('GET /orders', function () {

    it('responds with 200', function () {
      return agent.get('/api/orders/').expect(200)
      .then(res => {
        expect(res.body).to.be.instanceof(Array)
        expect(res.body).to.have.length(3)
      })
    })

    it('returns filtered orders with query', function () {
      return agent
      .get('/api/orders?status=completed')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.instanceof(Array)
        expect(res.body).to.have.length(2)
      })
    })

  })

  describe('GET /orders/:orderId', function () {

    it('responds with 404 on page that does not exist', function (done) {
      agent.get('/api/orders/randomFakeId').expect(404)
      done()
    })

    it('responds with 200 on a page', function () {
      return agent.get('/api/orders/' + testOrder1.id)
      .expect(200)
      .then(res => {
        expect(res.body.status).to.equal(testOrder1.status)
      })
    })

  })

  describe('POST /orders', function () {

    it('responds with 201', function () {
      return agent
      .post('/api/orders/')
      .send({})
      .expect(201)
      .then(res => {
        expect(res.body).to.not.be.null
        expect(res.body.status).to.equal(created)
      })
    })

  })

  describe('PUT /orders/:orderId',function(){

    it('PUT one', function () {
      return agent
      .put('/api/orders/' + testOrder1.id)
      .send({
        status: completed
      })
      .expect(200)
      .then(res => {
        expect(res.body.status).to.equal(completed)
        return Order.findById(testOrder1.id)
        .then(function (order) {
          expect(order).to.not.be.null
        })
      })
    })

  })

  describe('DELETE /orders/:orderId', function(){

    it('DELETE one', function () {
      return agent
      .delete('/api/orders/' + testOrder1.id)
      .expect(204)
      .then(() => {
        return Order.findById(testOrder1.id)
        .then((order) => {
          expect(order).to.be.null;
        })
      })
    })

  })

})
