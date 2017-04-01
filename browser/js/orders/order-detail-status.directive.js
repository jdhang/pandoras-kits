app.directive('orderDetailStatus', () => {

  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: 'js/orders/templates/order-detail-status.html'
  }
})
