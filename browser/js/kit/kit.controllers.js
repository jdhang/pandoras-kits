app.controller('KitsController', function ($scope, allKits, allKitImages) {
	
	$scope.kits = allKits
	$scope.images = allKitImages
	$scope.title= 'All Kits'
});

app.controller('KitController', function ($scope, KitsFactory, AuthService, theKit, $state) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
    });

	$scope.kit = theKit;
	$scope.userQty = 1;
	if ($scope.kit.quantity < 5) $scope.warning = true;
	$scope.addToCart = function(kit, qty, user) {
		return KitsFactory.addToCart(kit, qty, user).then(function() {
			return $state.go('cart');
		})
	}

});