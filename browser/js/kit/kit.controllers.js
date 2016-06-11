app.controller('KitsController', function ($scope, allKits, allKitImages) {
	
	$scope.kits = allKits
	$scope.images = allKitImages
	$scope.title= 'All Kits'
});

app.controller('KitController', function ($scope, KitsFactory, AuthService, theKit) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
    });

	$scope.kit = theKit;
	$scope.userQty = 1;
	$scope.warning = false;
	$scope.addToCart = function(kit, qty, user) {
		if (kit.quantity >= qty) return KitsFactory.addToCart(kit, qty, user);
		else $scope.warning = true;
	}
});