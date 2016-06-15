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

app.controller('AccountCtrl', ($scope, $q, UsersFactory, AuthService, $state) => {

  $scope.p = {}

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

  $scope.changePw = (p) => {
    console.log($scope.p)
    $scope.alert = null

    UsersFactory.changePw($scope.user.id, p.op, p.np)
    .then(() => {
      $scope.alert = { type: 'success', msg: 'Password change was successful.' }
      $scope.p = {}
    })
    .catch(() => {
      $scope.alert = { type: 'danger', msg: 'Invalid password.' }
      $scope.p = {}
    })
  }

  $scope.close = () => {
    $scope.alert = null
  }

})

