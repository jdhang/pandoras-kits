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
	$scope.initialValue = 0;
	$scope.addToCart = KitsFactory.addToCart;
});