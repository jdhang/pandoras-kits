'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('kit', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            defaultValue: 'js/kit/images/placeholderkitsimage.jpg'
        },
        categories: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    }, {
        instanceMethods: {
        },
        classMethods: {
            findByCategory: function(category) {
                return this.findAll({
                    where: {
                        categories: {
                            $overlap: [category]
                        }
                    }
                });
            }
        },
        hooks: {
            beforeValidate: function (kit) {
                //if (kit) {
                    //kit.change
                //}
            }
        }
    });
};
