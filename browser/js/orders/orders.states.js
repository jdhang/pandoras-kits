'use strict'

app.config(($stateProvider) => {

  $stateProvider.state('orders', {
    url: '/orders',
    templateUrl: 'js/orders/templates/orders.html',
    controller: 'OrdersController',
    resolve: {
      allOrders: (OrdersFactory) => {
        return OrdersFactory.getAll()
      },
      userOrders: (OrdersFactory, AuthService) => {
        return AuthService.getLoggedInUser().then(function(user) {
          if (user) {
            return OrdersFactory.getUserOrders(user.id)
          } else return null
        })
      },
      user: AuthService => {
        return AuthService.getLoggedInUser().then(function(user) {
          return user
        })
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
