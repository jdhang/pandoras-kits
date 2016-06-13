'use strict'

app.directive('detailInfo', (OrderDetailFactory, $state) => {

  return {
    restrict: 'E',
    scope: {
      details: '=',
      editable: '=?',
      buttonName: '@'
    },
    templateUrl: 'js/orders/templates/order-detail-info.html',
    link: function(scope, element, attrs) {
    	scope.delete = function(id) {
        if (scope.editable) {
          return OrderDetailFactory.delete(id).then(function() {
            return $state.go($state.current, {}, { reload: true })
          })
        }
      }
    }
  }

})
