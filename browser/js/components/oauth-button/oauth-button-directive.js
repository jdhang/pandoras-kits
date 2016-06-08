'use strict';

app.directive('oauthButton', function () {
  return {
    scope: {
      providerName: '@'
    },
    restrict: 'E',
    // templateUrl: '/browser/components/oauth-button/oauth-button.html'
    template: '<a href="/auth/{{ providerName | lowercase }}" class="btn btn-social btn-{{ providerName | lowercase }}"> <i class="fa fa-{{ providerName | lowercase }}"></i> <span>Sign in with {{ providerName }}</span> </a>'
  }
});



// '/browser/components/oauth-button/oauth-button.html'