'use strict'

app.directive('reviewsList', () => {

  return {
    restrict: 'E',
    scope: { reviews: '=' },
    templateUrl: 'js/reviews/templates/reviews-list.html'
  }

})
