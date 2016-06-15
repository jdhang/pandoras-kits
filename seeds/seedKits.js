'use strict'

const Faker = require('faker')
const Promise = require('sequelize').Promise
const Kit = require('../server/db').model('kit')

module.exports = function () {

  let categories = [
    'Travel',
    'Life Essentials',
    'Parent Life',
    'Emergencies',
    'First Impression'
  ]

  let kits = [
    {
      name: 'foobar',
      price: 10,
      description: 'lorem ipsum, foobar',
      categories: [ 'Travel', 'Emergencies' ]
    },
    {
      name: 'foo',
      price: 10,
      description: 'lorem ipsum, foo',
      categories: [Faker.random.arrayElement(categories)]
    },
    {
      name: 'bar',
      price: 10,
      description: 'lorem ipsum, bar',
      categories: [Faker.random.arrayElement(categories)]
    },
    {
      name: 'Test Kit 1',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 10.00,
      categories: ['Travel', 'Parent Life'],
      quantity: 20
    },
    {
      name: 'Test Kit 2',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 5.00,
      categories: ['First Impressions', 'Awkward Moments'],
      quantity: 5
    },
    {
      name: 'Test Kit 3',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 10.00,
      categories: ['Parent Life', 'Emergencies'],
      quantity: 10
    },
    {
      name: 'Test Kit 4',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 10.00,
      categories: ['Travel'],
      quantity: 5
    },
    {
      name: 'Test Kit 5',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 20.00,
      categories: ['Emergencies', 'Life Essentials'],
      quantity: 10
    },
    {
      name: Faker.commerce.productName(),
      description: Faker.lorem.paragraph(),
      price: Faker.commerce.price(),
      categories: [Faker.random.arrayElement(categories)],
      quantity: 10,
      imageUrl: Faker.random.image()
    }
  ]

  let creatingKits = kits.map((kitObj) => {
    return Kit.create(kitObj)
  })

  return Promise.all(creatingKits)

}

