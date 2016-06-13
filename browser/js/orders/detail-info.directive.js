'use strict'

app.directive('detailInfo', (OrderDetailFactory, $state) => {

  return {
    restrict: 'E',
    scope: {
      details: '=',
      editable: '=?'
    },
    templateUrl: 'js/orders/templates/order-detail-info.html',
    link: function(scope, element, attrs) {
    	scope.delete = function(id) {
        return OrderDetailFactory.delete(id).then(function() {
          scope.details = scope.details.filter(function(orderDetail) {
            return orderDetail.id !== id;
          })
        })
      }
    }
  }

})
