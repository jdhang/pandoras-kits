'use strict'

app.directive('detailInfo', () => {

  return {
    restrict: 'E',
    scope: {
      details: '='
    },
    templateUrl: 'js/orders/templates/order-detail-info.html'
  }

})
