'use strict'

const Promise = require('sequelize').Promise
const db = require('../server/db')
const Kit = db.model('kit')
const Order = db.model('order')
const OrderDetail = db.model('orderDetail')

let seedOrders = function () {

  let orders = [
    {
      status: 'processing',
      paymentDate: Date.now()
    },
    {
      status: 'completed'
    },
    {
      status: 'processing',
      shippedDate: Date.now()
    },
    {
      status: 'cancelled'
    }
  ]

  let creatingOrders = orders.map((orderObj) => {
    return Order.create(orderObj)
  })

  return Promise.all(creatingOrders)

}

let seedKits = function () {

  let kits = [
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
    }
  ]

  let creatingKits = kits.map((kitObj) => {
    return Kit.create(kitObj)
  })

  return Promise.all(creatingKits)

}

let seedOrderDetails = function () {

  let orderDetails = [
    {
      unitPrice: 10.00,
      quantity: 1
    },
    {
      unitPrice: 5.00,
      quantity: 2
    },
    {
      unitPrice: 10.00,
      quantity: 1
    },
    {
      unitPrice: 10.00,
      quantity: 1
    },
    {
      unitPrice: 10.00,
      quantity: 2
    }
  ]

  let creatingOrderDetails = orderDetails.map((orderDetailObj) => {
    return OrderDetail.create(orderDetailObj)
  })

  return Promise.all(creatingOrderDetails)

}

let seedAssociations = function () {

  return Promise.all([
    Order.findById(1),
    Order.findById(2),
    Order.findById(3),
    Order.findById(4),
    Kit.findById(1),
    Kit.findById(2),
    Kit.findById(3),
    OrderDetail.findById(1),
    OrderDetail.findById(2),
    OrderDetail.findById(3),
    OrderDetail.findById(4),
    OrderDetail.findById(5),
  ])
  .spread((order1, order2, order3, order4, kit1, kit2, kit3, orderDetail1, orderDetail2, orderDetail3, orderDetail4, orderDetail5) => {
    return Promise.all([
      // kit2 and orderDetail2 are 5.00
      // ORDER 1
      orderDetail1.setOrder(order1),
      orderDetail2.setOrder(order1),
      orderDetail1.setKit(kit1),
      orderDetail2.setKit(kit2),
      order1.addOrderDetails([orderDetail1, orderDetail2]),
      // ORDER 2
      orderDetail3.setOrder(order2),
      orderDetail3.setKit(kit1),
      order2.addOrderDetail(orderDetail3),
      // ORDER 3
      orderDetail4.setOrder(order2),
      orderDetail4.setKit(kit3),
      order3.addOrderDetail(orderDetail4),
      // ORDER 4
      orderDetail5.setOrder(order4),
      orderDetail5.setKit(kit3),
      order4.addOrderDetail(orderDetail5)
    ])
  })

}

module.exports = {
  Kits: seedKits,
  Orders: seedOrders,
  OrderDetails: seedOrderDetails,
  Associations: seedAssociations
}
