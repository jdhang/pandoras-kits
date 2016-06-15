app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/templates/checkout.html',
        controller: 'OrderDetailController',
        resolve: {
          order: function(AuthService, CartFactory) {
            return AuthService.getLoggedInUser().then(function(user) {
                if (user) {
                    return CartFactory.getUserCart(user.id)
                } else {
                    return CartFactory.getNonUserCart()
                }
            })
          }
        }
    });

    $stateProvider.state('success', {
        url: '/checkout/success',
        templateUrl: 'js/checkout/templates/order-processed.html'
    });

});