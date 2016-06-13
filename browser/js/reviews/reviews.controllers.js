'use strict'

app.controller('ReviewFormCtrl', ($scope, $uibModalInstance, $state, ReviewsFactory) => {

  if (!$scope.review) {
    $scope.review = {
      kitId: $scope.dataid
    }
  }

  if ($scope.user) {
    if ($scope.notReviewed) {
      $scope.review.userId = $scope.user.id
      $scope.mode = 'create'
      $scope.buttonName = 'Post'
    } else if ($scope.userReviewed) {
      $scope.mode = 'update'
      $scope.buttonName = 'Update'
    }
  }

  $uibModalInstance.result
  .then(null, () => $state.go($state.current, {}, { reload: true }))

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.onSubmit = () => {
    if ($scope.user) {
      ReviewsFactory[$scope.mode]($scope.review)
      .then(() => {
        $uibModalInstance.close()
        $state.go($state.current, {}, { reload: true })
      })
    }
  }

})
