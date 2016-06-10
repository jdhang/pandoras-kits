'use strict'

app.config(($stateProvider) => {

  $stateProvider.state('orders', {
    url: '/orders',
    templateUrl: 'js/orders/templates/orders.html',
    controller: 'OrdersController',
    resolve: {
      orders: (OrdersFactory) => {
        return OrdersFactory.getAll()
      }
    }
  })

  $stateProvider.state('orderDetail', {
    url: '/orders/:orderId',
    templateUrl: 'js/orders/templates/order_detail.html',
    controller: 'OrderDetailController',
    resolve: {
      order: (OrdersFactory, $stateParams) => {
        return OrdersFactory.getById($stateParams.orderId)
      }
    }
  })
})
