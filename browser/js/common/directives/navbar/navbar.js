app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, $uibModal, CategoryFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Kits', state: 'kits' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' },
                { label: 'Members Only', state: 'membersOnly', auth: true },
                { label: 'Orders', state: 'orders', auth: true },
                { label: 'Cart', state: 'cart' },
                { label: 'Users', state: 'users', auth: true },
                { label: 'Account', state: 'account.info', auth: true }
            ];

            CategoryFactory.getCategories()
            .then(function(categories){
                scope.categories= categories;
            });

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            scope.open = function (size) {
            var modalInstance = $uibModal.open({
              animation: scope.animationsEnabled,
              templateUrl: './js/modalWindow/modalForCategory.html',
              scope: scope,
              controller: 'ModalInstanceCtrl',
              size: size
            });

          };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
