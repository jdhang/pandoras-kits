app.config(function ($stateProvider) {

    $stateProvider.state('category', {
        url: '/category/:category',
        templateUrl: 'js/kit/templates/kits.html',
        controller: 'CategoryCtrl',
        resolve: {
        	allCategoryKits: function(CategoryFactory, $stateParams) {
        		return CategoryFactory.getKits($stateParams.category);
        	},
            title: function($stateParams){
                return $stateParams.category;
            }
        }
    });

});