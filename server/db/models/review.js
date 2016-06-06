'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('review', {
        num_stars: {
            type: Sequelize.Integer,
            validate:{ min: 1, max: 5}
        },
        text: {
            type: Sequelize.TEXT
        }
    }, {
        instanceMethods: {
        },
        classMethods: {
        },
        hooks: {
            //placeholder for options
        }
    });
};
