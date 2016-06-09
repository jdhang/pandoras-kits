app.config(function ($stateProvider) {

    $stateProvider.state('category', {
        url: '/:category',
        templateUrl: 'js/categories/templates/category.html',
        controller: 'CategoryCtrl',
        resolve: {
        	allKits: function(CategoryFactory, $stateParams) {
        		return CategoryFactory.getKits($stateParams.category);
        	},
            category: function($stateParams){
                return $stateParams.category;
            }
        	// allKitImages: function(KitsFactory) {
        	// 	var images = []
        	// 	KitsFactory.getAll().then(function(kits) {
        	// 		kits.forEach(function(kit) {
	        // 			images.push(kit.imageUrl)
	        // 		})
        	// 	})
        	// 	return images;
        	// }
        }
    });

});