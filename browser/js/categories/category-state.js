app.config(function ($stateProvider) {

    $stateProvider.state('category', {
        url: '/category/:category',
        templateUrl: 'js/categories/templates/category.html',
        controller: 'CategoryCtrl',
        resolve: {
        	allCategoryKits: function(CategoryFactory, $stateParams) {
        		return CategoryFactory.getKits($stateParams.category);
        	},
            category: function($stateParams){
                return $stateParams.category;
            }
        }
    });

});