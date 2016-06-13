'use strict'

app.directive('reviewsList', ($uibModal) => {

  return {
    restrict: 'E',
    scope: { reviews: '=' },
    templateUrl: 'js/reviews/templates/reviews-list.html',
    link: (scope) => {

      scope.open = (size) => {
        $uibModal.open({
          templateUrl: '/js/reviews/templates/review-form.html',
          controller: 'ReviewFormCtrl',
          size: size
        })
      }

    }
  }

})
