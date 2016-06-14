'use strict'

app.directive('detailInfo', (OrderDetailFactory, $state) => {

  return {
    restrict: 'E',
    scope: {
      details: '=',
      editable: '=?',
      buttonName: '@',
      buttonFunction: '='
    },
    templateUrl: 'js/orders/templates/order-detail-info.html',
    link: function(scope, element, attrs) {

      scope.range = (min, max) => {
        let arr = []
        for (let i = min; i <= max; i++) {
          arr.push(i)
        }
        return arr
      }

    	scope.delete = function(orderDetail) {
        if (scope.editable) {
          return OrderDetailFactory.delete(orderDetail).then(function() {
            return $state.go($state.current, {}, { reload: true })
          })
        }
      }

      scope.total = scope.details.map(detail => detail.subtotal)
                                 .reduce((prev, curr) => prev + curr)

    }
  }

})
