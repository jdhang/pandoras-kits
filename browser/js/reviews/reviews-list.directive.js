'use strict'

app.directive('reviewsList', (AuthService, $uibModal) => {

  return {
    restrict: 'E',
    scope: {
      reviews: '=',
      dataid: '='
    },
    templateUrl: 'js/reviews/templates/reviews-list.html',
    link: (scope) => {

      AuthService.getLoggedInUser()
      .then(user => {
        scope.user = user
        scope.notReviewed = scope.reviews.filter(review => {
          return review.userId === scope.user.id
        }).length === 0
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
