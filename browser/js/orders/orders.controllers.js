'use strict'

app.controller('OrdersController', (orders, $scope) => {

  $scope.orders = orders

})

app.controller('OrderDetailController', (order, $scope, OrdersFactory) => {

  $scope.order = order
  $scope.order.subtotal = order.orderDetails
                            .map((orderDetail) => orderDetail.subtotal )
                            .reduce((prev, curr) => prev + curr )

})
