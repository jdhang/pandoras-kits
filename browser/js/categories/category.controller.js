app.controller('CategoryCtrl',function($scope, allCategoryKits,category){
	$scope.kits= allCategoryKits;
	$scope.category= category;
});