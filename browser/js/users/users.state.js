app.config(function ($stateProvider) {

    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'js/users/templates/users.html',
        controller: 'UsersController',
        resolve: {
            users: function(UsersFactory){
                return UsersFactory.getAllUsers();
            }
        }
    });
});