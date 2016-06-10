app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, ModalFactory) {

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

  $scope.post= function(){
    $scope.kit.categories= $scope.kit.categories.split(",");
    ModalFactory.postKit($scope.kit)
    .then(()=> {
     $scope.ok()
     $scope.digest(); 
    })
    .catch(function (err) {
      console.log('SOMETHING WENT TERRIBLY WRONG');
    });
  }

});