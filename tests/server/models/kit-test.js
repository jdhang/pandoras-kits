var sinon = require('sinon');
var expect = require('chai').expect;
var db = require('../../../server/db')
var Kit = db.model('kit');

describe('Kit model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    after('reset DB', function () {
       return db.sync({ force: true });
    });

    describe('properties', function () {

        it('requires name', function() {
            return Kit.build({
                price: 1
            }).validate().then(function(kit) {
                expect(kit.message).to.equal('notNull Violation: name cannot be null');
            })
        });

        it('requires price', function() {
            return Kit.build({
                name: 'foo'
            }).validate().then(function(newkit) {
                expect(newkit.message).to.equal('notNull Violation: price cannot be null');
            })
        });

        it('description, imageUrl, quantity and categories are optional and imageUrl and quantity have default values', function() {
            let kit = Kit.create({
                name: 'foo',
                price: 1
            })

            return kit.then(function(newkit) {
                expect(newkit.description).to.equal(null);
                expect(newkit.categories).to.equal(null);
                expect(newkit.imageUrl).to.be.a('string');
                expect(newkit.quantity).to.equal(1);
            })
        });

    });

    describe('findByCategory method', function () {

        it('should return all kits that are associated with a given category', function () {
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
            ]).then(function (kits) {
                expect(kits).to.have.lengthOf(3);
                return Promise.all([Kit.findByCategory('foo'), Kit.findByCategory('bar')]);
            }).spread(function(fooKits, barKits) {
                expect(fooKits).to.have.lengthOf(2);
                expect(barKits).to.have.lengthOf(2);
            })
        });
    });

});
