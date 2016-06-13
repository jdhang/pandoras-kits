'use strict'

app.directive('addressForm', (AuthService) => {

  return {
    restrict: 'E',
    templateUrl: 'js/checkout/templates/address-form.html',
    link: function(scope, element, attrs) {
    	scope.user = AuthService.getLoggedInUser()
    	console.log(scope.user)
    }
  }

})
