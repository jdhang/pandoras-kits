'use strict'

app.directive('orderDetailInfo', () => {

  return {
    restrict: 'E',
    scope: {
      details: '='
    },
    templateUrl: 'js/orders/templates/order-detail-info.html'
  }

})
