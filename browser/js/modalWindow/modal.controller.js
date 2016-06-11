app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, ModalFactory, $log) {

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.post= function(){
    $scope.kit.categories= $scope.kit.categories.split(",");
    ModalFactory.postKit($scope.kit)
    .then(()=> {
     $scope.ok();
     // $scope.$digest();  how do i make the digest work upon adding a new page?
    })
    .catch($log.error);
  }

});