app.controller('KitsController', function ($scope, allKits, allKitImages, AuthService, $uibModal, $log, CategoryFactory) {
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
	  };

});

app.controller('KitController', function ($scope, KitsFactory, AuthService, kit) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
    });

	$scope.kit = kit;
	$scope.userQty = 1;
	if ($scope.kit.quantity < 5) $scope.warning = true;
	$scope.addToCart = KitsFactory.addToCart;

	$scope.deleteKit= KitsFactory.deleteKit;

	$scope.$watch('kit', function () {
		if(!Array.isArray($scope.kit.categories))
		$scope.kit.categories= $scope.kit.categories.split(",");
    	KitsFactory.updateKit($scope.kit);
  }, true);

});