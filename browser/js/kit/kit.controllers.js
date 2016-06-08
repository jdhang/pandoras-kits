app.controller('KitsController', function ($scope, allKits, allKitImages) {
	
	$scope.kits = allKits
	$scope.images = allKitImages
	
});

app.controller('KitController', function ($scope, theKit) {
	$scope.kit = theKit
	$scope.initialValue = 1
});