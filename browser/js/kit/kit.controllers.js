app.controller('KitsController', function ($scope, allKits, allKitImages) {
	
	$scope.kits = allKits
	$scope.images = allKitImages
	
});

app.controller('KitController', function ($scope, KitsFactory, AuthService, theKit) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
    });

	$scope.kit = theKit;
	$scope.initialValue = 1;
	$scope.addToCart = KitsFactory.addToCart;
});