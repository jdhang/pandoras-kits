'use strict'

app.config(($stateProvider) => {

  $stateProvider.state('account', {
    url: '/account',
    templateUrl: 'js/user/templates/user-account.html',
    controller: 'AccountCtrl'
  })

})
