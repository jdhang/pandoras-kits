app.config(function ($stateProvider) {

  $stateProvider.state('users', {
    url: '/users',
    templateUrl: 'js/users/templates/users.html',
    controller: 'UsersController',
    resolve: {
      users: UsersFactory => UsersFactory.getAllUsers(),
      currUser: AuthService => AuthService.getLoggedInUser()
    }
  })

  $stateProvider.state('account', {
    url: '/account',
    templateUrl: 'js/users/templates/user-account.html',
    controller: 'AccountCtrl'
  })

  $stateProvider.state('account.info', {
    url: '/info',
    template: `
      <h1>Account Management</h1>
      <hr class='separator' />
      <dl class='dl-horizontal'>
        <dt>Email:</dt>
        <dd>{{ user.email }}</dd>
        <dt>Num. of Orders:</dt>
        <dd>{{ user.orders.length }}</dd>
      </dl>`
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


  $stateProvider.state('account.password', {
    url: '/changepassword',
    templateUrl: 'js/users/templates/user-password-form.html'
  })

})
