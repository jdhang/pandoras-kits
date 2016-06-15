app.controller('KitsController', function ($scope, allKits, allKitImages, AuthService, $uibModal, $log, CategoryFactory) {
	AuthService.getLoggedInUser().then(function(user){
		$scope.user= user;
	})
	$scope.kits = allKits;
	$scope.images = allKitImages;
  $scope.title= 'All Kits';

  $scope.open = (size) => {
	    $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: './js/modalWindow/modal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	    });
	  };

});

app.controller('KitController', function ($scope, CartFactory, KitsFactory, AuthService, kit, $state, $uibModal) {

  if (AuthService.isAuthenticated()) {
    AuthService.getLoggedInUser()
    .then(user => {
      $scope.user = user
      $scope.notReviewed = $scope.kit.reviews.filter(review => {
        return review.userId === $scope.user.id
      }).length === 0
    })
  }

  $scope.kit = kit

  $scope.userQty = 1;

  if ($scope.kit.quantity < 5) $scope.warning = true

	$scope.addToCart = function(qty, user) {
		return CartFactory.addToCart($scope.kit, qty, user).then(function() {
			return $state.go('cart');
		})
	}

	$scope.deleteKit = KitsFactory.deleteKit;

	$scope.$watch('kit', function () {
		if(!Array.isArray($scope.kit.categories))
		$scope.kit.categories= $scope.kit.categories.split(",");
    	KitsFactory.updateKit($scope.kit);
  }, true);

  $scope.open = (size) => {
    $uibModal.open({
      templateUrl: '/js/reviews/templates/review-form.html',
      controller: 'ReviewFormCtrl',
      scope: $scope,
      size: size
    })
  }

});
