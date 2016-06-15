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
      name: 'Foobar',
      price: 10,
      description: 'lorem ipsum, foobar',
      categories: [ 'Travel', 'Emergencies' ],
      imageUrl: 'js/kit/images/1.jpeg'
    },
    {
      name: 'Foo',
      price: 10,
      description: 'lorem ipsum, foo',
      categories: [Faker.random.arrayElement(categories)],
      imageUrl: 'js/kit/images/2.jpeg'
    },
    {
      name: 'Bar',
      price: 10,
      description: 'lorem ipsum, bar',
      categories: [Faker.random.arrayElement(categories)],
      imageUrl: 'js/kit/images/3.jpeg'
    },
    {
      name: 'Test Kit 1',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 10.00,
      categories: ['Travel', 'Parent Life'],
      quantity: 20,
      imageUrl: 'js/kit/images/4.jpeg'
    },
    {
      name: 'Test Kit 2',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 5.00,
      categories: ['First Impressions', 'Awkward Moments'],
      quantity: 5,
      imageUrl: 'js/kit/images/5.jpeg'
    },
    {
      name: 'Test Kit 3',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 10.00,
      categories: ['Parent Life', 'Emergencies'],
      quantity: 10,
      imageUrl: 'js/kit/images/6.jpeg'
    },
    {
      name: 'Test Kit 4',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 10.00,
      categories: ['Travel'],
      quantity: 5,
      imageUrl: 'js/kit/images/7.jpeg'
    },
    {
      name: 'Test Kit 5',
      description: 'Bacon ipsum dolor amet cow pork filet mignon ham bresaola shankle sausage rump flank chicken pancetta. Ham hock ribeye flank cow. Leberkas fatback t-bone, kielbasa shankle biltong bresaola boudin pig ham hock pork belly. Pancetta ball tip tongue short ribs capicola andouille. Meatball tongue picanha rump, drumstick ham beef ribs andouille short ribs alcatra. Sirloin sausage pancetta short loin, pork bresaola venison spare ribs.',
      price: 20.00,
      categories: ['Emergencies', 'Life Essentials'],
      quantity: 10,
      imageUrl: 'js/kit/images/example_kit.jpg'
    },
    {
      name: Faker.commerce.productName(),
      description: Faker.lorem.paragraph(),
      price: Faker.commerce.price(),
      categories: [Faker.random.arrayElement(categories)],
      quantity: 10,
      imageUrl: 'js/kit/images/placeholderkitsimage.jpg'
    }
  ]

  let creatingKits = kits.map((kitObj) => {
    return Kit.create(kitObj)
  })

  return Promise.all(creatingKits)

}

