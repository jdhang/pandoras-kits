var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-pandoras-kits';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/kit')(db);

var Kit = db.model('kit');

describe('Kit model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    describe('properties', function () {
        var kit;
        var name = 'testkit';
        var description = 'testkit description lorem ipsum';
        var price = 100;
        var imageUrl = '/testkitimage.jpg';
        var categories = ['test', 'first'];
        var quantity = 10;

        it('has name, description, price, imageUrl, categories, and quantity properties', function() {
            kit = Kit.create({
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
                categories: categories,
                quantity: quantity
            })

            kit.then(function(kit) {
                expect(kit.name).to.be.equal(name);
                expect(kit.description).to.be.equal(description);
                expect(kit.price).to.be.equal(price);
                expect(kit.imageUrl).to.be.equal(imageUrl);
                expect(kit.categories).to.deep.equal(categories);
                expect(kit.quantity).to.be.equal(quantity);    
            })
            
        });

        it('requires name', function() {
            Kit.build({
                price: price
            }).validate().then(function(kit) {
                expect(kit.message).to.equal('notNull Violation: name cannot be null');
            })
        });

        it('requires price', function() {
            Kit.build({
                name: name
            }).validate().then(function(newkit) {
                expect(newkit.message).to.equal('notNull Violation: price cannot be null');
            })
        });

        it('description, imageUrl, quantity and categories are optional and imageUrl and quantity have default values', function() {
            kit = Kit.create({
                name: name,
                price: price
            })

            kit.then(function(newkit) {
                expect(newkit.description).to.equal(null);
                expect(newkit.categories).to.equal(null);
                expect(newkit.imageUrl).to.be.a('string');
                expect(newkit.quantity).to.equal(1);
            })
        });

    });

    describe('findByCategory method', function () {

        it('should return all kits that are associated with a given category', function () {
            Kit.bulkCreate([
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
