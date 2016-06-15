app.controller('ModalInstanceCtrl', function ($rootScope, $scope, $uibModalInstance, KitsFactory, $log, $state, CategoryFactory, UsersFactory) {

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

  $scope.addCategory= function(){
    CategoryFactory.postCategory($scope.category).
    then(function(category){
      //How do I get my navbar to update also?
      $scope.ok();
      $state.go('category', {category: category.name});
    });
  }

  $scope.updatePassword= function(user){
    user.resetPassword= false;
    UsersFactory.updateUser(user)
    .then(function(){
      $scope.ok();
    })
  }



});