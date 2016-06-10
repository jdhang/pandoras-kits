app.controller('KitsController', function ($scope, allKits, allKitImages, AuthService, $uibModal, $log) {
	AuthService.getLoggedInUser().then(function(user){
		$scope.user= user;
	})
	$scope.kits = allKits
	$scope.images = allKitImages
	$scope.title= 'All Kits'
	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: './js/modalWindow/modal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      // resolve: {
	      //   items: function () {
	      //     return $scope.items;
	      //   }
	      // }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };

});

app.controller('KitController', function ($scope, KitsFactory, AuthService, theKit) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
    });

	$scope.kit = theKit;
	$scope.userQty = 1;
	$scope.addToCart = KitsFactory.addToCart;
});