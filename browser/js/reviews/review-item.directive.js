'use strict'

app.directive('reviewItem', () => {

  return {
    restrict: 'E',
    scope: { review: '=' },
    templateUrl: 'js/reviews/templates/review-item.html'
  }

})
