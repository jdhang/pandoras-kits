app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $kookies, $q, CartFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;

        AuthService.login(loginInfo)
        .then(function () {
          return AuthService.getLoggedInUser().then(function(user) {
            let currCart = $kookies.get('cart')
            if (currCart) {
                if (currCart.length) {
                    currCart = currCart.map(function(e) {
                      return CartFactory.addToCart(e.kit, e.qty, user)
                    })
                    $kookies.remove('cart')
                    return $q.all(currCart).then(function() {
                      $state.go('cart')
                    })
                }
            } else {
                $state.go('home');
            }
          })
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});