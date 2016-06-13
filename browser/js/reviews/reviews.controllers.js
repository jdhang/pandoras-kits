'use strict'

app.controller('ReviewFormCtrl', ($scope, $uibModalInstance, $state, ReviewsFactory, AuthService) => {

  if (!$scope.review) {
    $scope.review = {
      kitId: $scope.dataid
    }
  }

  $scope.cancel = () => $uibModalInstance.dismiss('cancel')

  $scope.createReview = () => {
    if ($scope.user && $scope.notReviewed) {
      $scope.review.userId = $scope.user.id
      ReviewsFactory.create($scope.review)
      .then(() => {
        $uibModalInstance.close()
        $state.go($state.current, {}, { reload: true })
      })
    }
  }

})
