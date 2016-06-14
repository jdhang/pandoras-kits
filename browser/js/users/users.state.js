app.config(function ($stateProvider) {

  $stateProvider.state('users', {
    url: '/users',
    templateUrl: 'js/users/templates/users.html',
    controller: 'UsersController',
    resolve: {
      users: UsersFactory => UsersFactory.getAllUsers()
    }
  })

  $stateProvider.state('account', {
    url: '/account',
    templateUrl: 'js/user/templates/user-account.html',
    controller: 'AccountCtrl'
  })

  $stateProvider.state('account.reviews', {
    url: '/reviews',
    template: `
      <div>
        <h3>Reviews ({{ user.reviews.length }})</h3>
        <reviews-list reviews='user.reviews' cols='1'></reviews-list>
      </div>`
  })

  $stateProvider.state('account.orders', {
    url: '/orders',
    template: `
      <div>
        <h3>Orders</h3>
        <orders-list orders='user.orders'></orders-list>
      </div>`
  })

})
