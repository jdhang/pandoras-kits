// Instantiate all models
var expect = require('chai').expect;
var db = require('../../../server/db');
var supertest = require('supertest');
var agent, testReview;

describe('Reviews Route', function () {

    var app, Review;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Review = db.model('review');
        agent = supertest.agent(app);
    });


    beforeEach(function () {
      return Review.create({
        title: 'Best Kit Ever',
        num_stars: 4,
        content: 'Awesome kit!!'
      })
      .then(function(review){
        testReview= review;
      })
    });


describe('GET /reviews', function () {

  it('should respond with 200', function (done) {
    agent.get('/api/reviews/').expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).to.be.instanceof(Array);
      expect(res.body).to.have.length(1);
      done();
    });
  });

});

describe('GET /reviews/:reviewId', function () {

  it('should respond with 200 on a page', function (done) {
    console.log(testReview.id);
    agent.get('/api/reviews/' + testReview.id)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body.title).to.equal(testReview.title);
      done();
    });
  });
});

describe('POST /reviews', function () {

  it('responds with 201', function (done) {
    agent
    .post('/api/reviews/')
    .send({
      title: 'Bury The Body Kit Great for Quick Clean-up!',
      num_stars: 4,
      content: 'Included an extra pair of gloves and some clorox-wipes!! Great Value'
    })
    .expect(201)
    .end(function (err, res) {
      expect(res.body.title).to.equal('Bury The Body Kit Great for Quick Clean-up!');
      done();
    });
  });

});

describe('PUT /reviews/:reviewId',function(){

  it('PUT one', function (done) {
    agent
    .put('/api/reviews/' + testReview.id)
    .send({
      title: 'Review Updated By Test'
    })
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body.title).to.equal('Review Updated By Test');
      Review.findById(testReview.id)
      .then(function (review) {
        expect(review).to.not.be.null;
        done();
      })
      .catch(done);
    });
  });


});

describe('DELETE /reviews/:reviewId', function(){

  it('DELETE one', function (done) {
    agent
    .delete('/api/reviews/' + testReview.id)
    .expect(204)
    .end(function (err, res) {
      if (err) return done(err);
      Review.findById(testReview.id)
      .then(function (review) {
        expect(review).to.be.null;
        done();
      })
      .catch(done);
    });
  });

});

});
