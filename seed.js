/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
const db = require('./server/db');
const User = db.model('user');
const Promise = require('sequelize').Promise;
const seed = require('./seeds')

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: true
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = User.bulkCreate(users);

    return Promise.all([creatingUsers])

};

db.sync({ force: true })
    .then(function () {
      return Promise.all([
        seedUsers(),
        seed.Users(),
        seed.Kits(),
        seed.Orders(),
        seed.OrderDetails(),
        seed.Reviews(),
        seed.Categories()
      ]);
    })
    .then(function () {
      return seed.Associations()
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
