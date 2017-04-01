var Sequelize = require('sequelize');

module.exports = function (db) {

  let OrderDetail = db.model('orderDetail')

    return db.define('kit', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 0
            }
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
            defaultValue: 1,
            validate: {
                min: 0
            }
        }
    }, {
      instanceMethods: {
        toOrderDetail: function (qty) {
          return OrderDetail.create({
            unitPrice: this.price,
            quantity: qty
          })
          .then(orderDetail => orderDetail.setKit(this))
        },
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
        }
    });
};
