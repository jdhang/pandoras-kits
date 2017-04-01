const Faker = require('faker')
const Promise = require('sequelize').Promise
const User = require('../server/db').model('user')

module.exports = function () {

  let users = []

  for (let i = 0; i < 8; i++) {
    users.push({
      email: Faker.internet.exampleEmail(),
      password: 'test123'
    })
  }

  let creatingUsers = User.bulkCreate(users)

  return Promise.all(creatingUsers)
}
