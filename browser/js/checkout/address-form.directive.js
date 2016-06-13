'use strict'

app.directive('addressForm', (AuthService) => {

  return {
    restrict: 'E',
    templateUrl: 'js/checkout/templates/address-form.html',
    link: function(scope, element, attrs) {
    	AuthService.getLoggedInUser().then(function(user) {
    		scope.user = user;
    	})
    }
  }

})