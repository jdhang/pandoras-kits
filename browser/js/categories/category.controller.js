app.controller('CategoryCtrl',function($scope, allCategoryKits, title, AuthService, $uibModal){
	$scope.kits= allCategoryKits;
	$scope.title= title;
	AuthService.getLoggedInUser().then(function(user){
		$scope.user= user;
	})
		$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: './js/modalWindow/modal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    });
	  };
});