'use strict'

app.directive('detailInfo', (OrderDetailFactory, $state) => {

  return {
    restrict: 'E',
    scope: {
      details: '=',
      order: '=?',
      editable: '=?',
      buttonName: '@',
      buttonFunction: '='
    },
    templateUrl: 'js/orders/templates/order-detail-info.html',
    link: scope => {

      scope.range = (min, max) => {
        let arr = []
        for (let i = min; i <= max; i++) {
          arr.push(i)
        }
        return arr
      }

      scope.update = orderDetail => {
        return OrderDetailFactory.update(orderDetail)
        .then(() => $state.go($state.current, {}, { reload: true }))
      }

      scope.delete = orderDetail => {
        if (scope.editable) {
          return OrderDetailFactory.delete(orderDetail)
          .then(() => $state.go($state.current, {}, { reload: true }))
        }
      }

      if (scope.details.length) {
        scope.total = scope.details.map(detail => detail.subtotal)
                                 .reduce((prev, curr) => prev + curr)  
      } else {
        scope.total = 0
      }
      

    }
  }

})
