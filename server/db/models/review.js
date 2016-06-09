'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {

    return db.define('review', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        num_stars: {
            type: Sequelize.INTEGER,
            validate:{ min: 1, max: 5}
        },
        content: {
            type: Sequelize.TEXT
            // validate:{

            // }
        }
    }, {
        instanceMethods: {
        },
        classMethods: {
            findByUser: function(userId){
                return this.findAll({
                    where: {
                       userId: userId
                    }
                });
            }
        }
    });
};

