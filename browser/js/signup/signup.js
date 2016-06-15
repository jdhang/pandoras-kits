

app.config(function ($stateProvider) {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '/js/signup/signup.html',
    controller: 'SignupCtrl'
  });

});

app.controller('SignupCtrl', function (AuthService, $scope, $state, $kookies, CartFactory, $q) {

	$scope.signup = {};
  $scope.error = null;

  $scope.sendCredentials = function (creds) {
    AuthService.signup(creds)
    .then(function () {
      return AuthService.getLoggedInUser().then(function(user) {
        let currCart = $kookies.get('cart')
        if (currCart) {
          if (currCart.length) {
            CartFactory.addToCart(currCart[0].kit, currCart[0].qty, user).then(function() {
              currCart.splice(0, 1);
              currCart = currCart.map(function(e) {
                return CartFactory.addToCart(e.kit, e.qty, user)
              })
              $kookies.remove('cart')
              return $q.all(currCart).then(function() {
                $state.go('cart')
              })
            })
          }
        } else {
          $state.go('home');
        }
      })
    }).catch(function(){
    	$scope.error= 'Invalid signup credentials.';
    });
  };

});
