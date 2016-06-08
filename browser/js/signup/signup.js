

app.config(function ($stateProvider) {

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '/js/signup/signup.html',
    controller: 'SignupCtrl'
  });

});

app.controller('SignupCtrl', function (AuthService, $scope, $state) {

	$scope.signup = {};
    $scope.error = null;

  $scope.sendCredentials = function (creds) {
    AuthService.signup(creds)
    .then(function () {
      $state.go('home');
    })
    .catch(function(){
    	$scope.error= 'Invalid signup credentials.';
    });
  };

});
