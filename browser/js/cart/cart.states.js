app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/templates/cart.html',
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
});