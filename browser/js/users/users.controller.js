app.controller('UsersController', function ($scope, UsersFactory, users, $state, currUser) {

	$scope.currUser=currUser;
	$scope.users=users;

	$scope.deleteUser= function(user){
		UsersFactory.deleteUser(user)
		.then(function(users){
			$scope.users=users;
		});
	}

	$scope.triggerPasswordReset= function(user){
		user.passwordReset= true;
		UsersFactory.updateUser(user);

	}

	$scope.update= UsersFactory.updateUser;


});

app.controller('AccountCtrl', ($scope, $q, UsersFactory, AuthService, $state, $stateParams) => {

  AuthService.getLoggedInUser()
  .then(user => {
    $scope.user = user
    return $q.all([
      UsersFactory.getReviewsOf(user.id),
      UsersFactory.getOrdersOf(user.id)
    ])
  })
  .then(results => {
    $scope.user.reviews = results[0]
    $scope.user.orders = results[1]
  })

  $scope.error = null
  $scope.success = null

  $scope.changePw = (p) => {
    $scope.error = null
    $scope.success = null

    UsersFactory.changePw($scope.user.id, p.op, p.np)
    .then(() => {
      $scope.error = null
      $scope.success = 'Password change was successful.'
      $state.go('account.password', { success: true })
    })
    .catch(() => {
      $scope.success = null
      $scope.error = 'Invalid password.'
      $state.go('account.password', { error: true })
    })
  }

})

