app.controller('KitsController', function ($scope, allKits, allKitImages, AuthService, $uibModal, $log) {
	AuthService.getLoggedInUser().then(function(user){
		$scope.user= user;
	})
	$scope.kits = allKits;
	$scope.images = allKitImages;
	$scope.title= 'All Kits';
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: './js/modalWindow/modal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    });
	  };

});

app.controller('KitController', function ($scope, KitsFactory, AuthService, theKit) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
    });

	$scope.kit = theKit;
	$scope.userQty = 1;
	if ($scope.kit.quantity < 5) $scope.warning = true;
	$scope.addToCart = KitsFactory.addToCart;

});	