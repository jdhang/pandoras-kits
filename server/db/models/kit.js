'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('kit', {
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
            defaultValue: 'PLACEHOLDER: questionmarkimage.jpg' 
        },
        categories: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        instanceMethods: {
        },
        classMethods: {
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
