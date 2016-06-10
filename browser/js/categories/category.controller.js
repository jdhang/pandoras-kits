app.controller('CategoryCtrl',function($scope, allCategoryKits, title, AuthService){
	$scope.kits= allCategoryKits;
	$scope.title= title;
	AuthService.getLoggedInUser().then(function(user){
		$scope.user= user;
	})
});