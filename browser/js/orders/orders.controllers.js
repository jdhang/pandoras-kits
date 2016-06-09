'use strict'

app.controller('OrdersController', (orders, $scope) => {

  $scope.orders = orders

})

app.controller('OrderDetailController', (order, $scope) => {

  $scope.order = order

})
