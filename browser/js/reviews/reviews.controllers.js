'use strict'

app.controller('ReviewFormCtrl', ($scope, $uibModalInstance, ReviewsFactory) => {

  $scope.cancel = () => $uibModalInstance.dismiss('cancel')

  $scope.createReview = () => {
    console.log($scope.review)
    $uibModalInstance.close()
  }

})
