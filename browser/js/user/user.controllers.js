'use strict'

app.controller('AccountCtrl', ($scope, AuthService) => {

  AuthService.getLoggedInUser()
  .then(user => {
    $scope.user = user
  })

  if ($scope.user) {
  }

})
