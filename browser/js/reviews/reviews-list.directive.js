app.directive('reviewsList', () => {

  return {
    restrict: 'E',
    scope: {
      reviews: '=',
      dataid: '=?',
      cols: '@'
    },
    templateUrl: 'js/reviews/templates/reviews-list.html',
    link: (scope) => {

      scope.colSize = 12 / scope.cols

    }
  }

})
