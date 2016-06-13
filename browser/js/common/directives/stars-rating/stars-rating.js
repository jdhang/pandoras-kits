'use strict'

app.directive('starsRating', () => {

  return {
    restrict: 'E',
    scope: { stars: '=' },
    templateUrl: 'js/common/directives/stars-rating/stars-rating.html',
    link: (scope) => {

      scope.fiveStars = () => new Array(5)

    }
  }

})
