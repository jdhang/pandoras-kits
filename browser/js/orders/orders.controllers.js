'use strict'

app.controller('OrdersController', (orders, $scope) => {

  $scope.orders = orders

})


app.controller('OrderDetailController', (order, $scope, $state, AuthService) => {

  $scope.order = order
  $scope.order.subtotal = order.orderDetails.length
					      ? order.orderDetails
					        .map((orderDetail) => orderDetail.subtotal )
					        .reduce((prev, curr) => prev + curr )
					      : 0

  $scope.checkout = function() {
    return $state.go('checkout')
  }

  $scope.goToCart = function() {
    return $state.go('cart')
  }

  $scope.range = function(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
  };

})
