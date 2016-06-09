app.controller('CategoryCtrl',function($scope, allKits,category){
	$scope.kits= allKits;
	$scope.category= category;
	console.log('the kits: ',$scope.kits);
});