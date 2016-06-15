'use strict'

app.controller('OrdersController', (allOrders, userOrders, user, $scope) => {
  $scope.currUser = user;

  if ($scope.currUser) {
    if ($scope.currUser.isAdmin) $scope.orders = allOrders
    else $scope.orders = userOrders
  }

})


app.controller('OrderDetailController', (order, $scope, $state, AuthService, OrdersFactory, AddressFactory, $q) => {

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

  $scope.submitOrder = function(form) {

    return AuthService.getLoggedInUser().then(function(user) {
      form.billing.category = 'billing'
      form.shipping.category = 'shipping'

      var addBilling = AddressFactory.addAddress(form.billing, $scope.order).then(function(address){
        return address
      })

      var addShipping = AddressFactory.addAddress(form.shipping, $scope.order).then(function(address){
        return address
      })

      var updateOrder = OrdersFactory.updateOrder($scope.order.id, { status: 'processing'})

      return $q.all([addBilling, addShipping, updateOrder])
    }).then(() => $state.go('success'))
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
