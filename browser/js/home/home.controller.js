app.controller('HomeCtrl', function($scope, AuthService, $uibModal){
	AuthService.getLoggedInUser()
	.then(function(user){
		$scope.user= user;
		$scope.alertReset();
	});

	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: './js/modalWindow/modalForReset.html',
	      scope: $scope,
	      controller: 'ModalInstanceCtrl',
	      size: size,
	    });
	  };

	$scope.alertReset= function(){
		if($scope.user.passwordReset)
		$scope.open();
		}

})