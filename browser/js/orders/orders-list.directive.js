'use strict'

app.directive('ordersList', () => {

  return {
    restrict: 'E',
    scope: {
      orders: '='
    },
    templateUrl: 'js/orders/templates/orders-list.html'
  }
})
