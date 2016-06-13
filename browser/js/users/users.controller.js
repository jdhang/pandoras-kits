app.controller('UsersController', function ($scope, UsersFactory, users, $state) {

	$scope.users=users;

	$scope.deleteUser= function(user){
		UsersFactory.deleteUser(user)
		.then(function(users){
			$scope.users=users;
		});
	}

	$scope.triggerPasswordReset= function(user){
		user.passwordReset= true;
		UsersFactory.updateUser(user).
		then(function(){
			console.log("Came back!!");
		});

	}

});