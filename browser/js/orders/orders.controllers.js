'use strict'

app.controller('OrdersController', (orders, $scope) => {

  $scope.orders = orders

})


app.controller('OrderDetailController', (order, $scope, $state, AuthService, OrdersFactory) => {

  $scope.order = order
  $scope.order.subtotal = order.orderDetails.length
					      ? order.orderDetails
					        .map((orderDetail) => orderDetail.subtotal )
					        .reduce((prev, curr) => prev + curr )
					      : 0

  $scope.checkout = function() {
    AuthService.getLoggedInUser().then(function(user) {
      if (user) return $state.go('checkout')
      else {
        $state.go('signup')
      }
    })
  }

  $scope.goToCart = function() {
    return $state.go('cart')
  }

  $scope.submitOrder = function(order) {
    return OrdersFactory.updateOrder(order.id, { status: 'processing'}).then(function() {
      return $state.go('success')
    })
  }

  $scope.range = function(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
  };

})
