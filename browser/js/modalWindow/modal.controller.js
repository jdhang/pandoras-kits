app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, KitsFactory, $log, $state) {

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.post= function(){
    $scope.kit.categories= $scope.kit.categories.split(",");
    KitsFactory.postKit($scope.kit)
    .then((kit)=> {
     $scope.ok();
     $state.go('kit',{kitId: kit.id});
    })
    .catch($log.error);
  }

});