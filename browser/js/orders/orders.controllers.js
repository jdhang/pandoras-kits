'use strict'

app.controller('OrdersController', (allOrders, userOrders, user, $scope) => {
  $scope.currUser = user;

  if ($scope.currUser) {
    if ($scope.currUser.isAdmin) $scope.orders = allOrders
    else $scope.orders = userOrders
  }

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
        $state.go('login')
      }
    })
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

  $scope.alert = null

  $scope.update = order => {
    $scope.alert = null
    return OrdersFactory.updateOrder(order.id, order)
    .then(() => {
      $scope.alert = {
        type: 'success',
        msg: 'Order was successfully updated.'
      }
    })
  }

  $scope.close = () => {
    $scope.alert = null
  }

})
