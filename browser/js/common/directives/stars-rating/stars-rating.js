'use strict'

app.directive('starsRating', () => {

  return {
    restrict: 'E',
    scope: {
      ratingValue: '=ngModel',
      readonly: '=?'
    },
    templateUrl: 'js/common/directives/stars-rating/stars-rating.html',
    link: (scope) => {

      scope.max = 5

      if (scope.ratingValue === undefined) {
        scope.ratingValue = 0
        updateStars()
      }

      function updateStars () {
        scope.stars = []
        for (let i = 0; i < scope.max; i ++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          })
        }
      }

      scope.toggle = index => {
        if (scope.readonly === false) {
          scope.ratingValue = index + 1
        }
      }

    scope.$watch('ratingValue', (oldVal, newVal) => {
      if (newVal !== undefined) updateStars()
    })

    }
  }

})
