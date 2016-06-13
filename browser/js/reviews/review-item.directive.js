'use strict'

app.directive('reviewItem', (AuthService, $uibModal) => {

  return {
    restrict: 'E',
    scope: { review: '=' },
    templateUrl: 'js/reviews/templates/review-item.html',
    link: (scope) => {

      AuthService.getLoggedInUser()
      .then(user => {
        scope.user = user
        c
        
      })

      scope.open = (size) => {
        $uibModal.open({
          templateUrl: '/js/reviews/templates/review-form.html',
          controller: 'ReviewFormCtrl',
          scope: scope,
          size: size
        })
      }

    }
  }

})
