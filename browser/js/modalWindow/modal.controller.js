app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});