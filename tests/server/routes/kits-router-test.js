// Instantiate all models
var expect = require('chai').expect;

//var Sequelize = require('sequelize');
// var dbURI = 'postgres://localhost:5432/testing-pandoras-kits';
// var db = new Sequelize(dbURI, {
//     logging: false
// });
// require('../../../server/db/models/kit')(db);
var db = require('../../../server/db');

var supertest = require('supertest');
var agent, testKits;

describe('Kits Route', function () {

    var app, Kit;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Kit = db.model('kit');
        agent = supertest.agent(app)
    })

    beforeEach('Create test kits', function () {
        return Kit.bulkCreate([
            {   name: 'foobar',
                price: 1,
                categories: [ 'foo', 'bar' ]
            },
            {   name: 'foo',
                price: 1,
                categories: [ 'foo' ]
            },
            {   name: 'bar',
                price: 1,
                categories: [ 'bar' ]
            }
        ]).then(function(kits) {
        	testKits = kits
        })
    });

	xdescribe('`/kits` URI', function() {
		it('GET responds with an array of all kits', function(done) {
	      agent
	        .get('/api/kits')
	        .expect(200)
	        .expect('Content-Type', /json/)
	        .end(function(err, res) {
	        	if (err) return done(err);
	          	expect(res.body.length).to.eql(testKits.length);
	          	done()
	        });
	    });

		it('POST creates a new kit', function(done) {
	      agent
	        .post('/api/kits')
	        .send({
	    		name: 'newkit',
	            price: 10,
	            categories: [ 'test', 'kit' ]
	        })
	        .expect(201)
	        .expect('Content-Type', /json/)
	        .end(function(err, res) {
	        	if (err) return done(err);
				expect(res.body.id).to.eql(testKits.length+1);
				expect(res.body.name).to.eql('newkit');
				done()
	        });
	    });
    });

    describe('`/kits/:kitId` URI', function() {
		var id = 3;

		it('GET responds with the kit associated with kitId', function(done) {
	      agent
	        .get('/api/kits/' + id)
	        .expect(200)
	        .expect('Content-Type', /json/)
	        .end(function(err, res) {
	        	if (err) return done(err);
				expect(res.body.name).to.eql('bar')
				expect(res.body.price).to.eql(1)
				expect(res.body.categories).to.eql([ 'bar' ])
				done()
	        });
	    });

	    it('PUT responds with the updated kit after updating its properties', function(done) {
	      agent
	        .put('/api/kits/' + id)
	        .send({
	        	name: 'updatedBar',
	        	price: 10
	        })
	        .expect(200)
	        .expect('Content-Type', /json/)
	        .end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.eql('updatedBar')
				expect(res.body.price).to.eql(10)
				done()
	        });
	    });

	    it('DELETE responds with 204 after deleting the specified kit', function(done) {
	      agent
	        .delete('/api/kits/' + id)
	        .expect(204)
	        .end(function (err, res) {
	          if (err) return done(err);
	          Kit.findById(id)
	          .then(function (kit) {
	            expect(kit).to.be.null;
	            done();
	          })
	          .catch(done);
	        });
	    });
	})

	describe('`/kits/category/:category` URI', function() {
    	var category = 'foo';

		it('GET responds with the kits associated with specified category', function(done) {
	      agent
	        .get('/api/kits/category/' + category)
	        .expect(200)
	        .end(function(err, res) {
	        	if (err) done(err)
				expect(res.body.length).to.eql(2);
				done()
	        });
	    });
	})
});