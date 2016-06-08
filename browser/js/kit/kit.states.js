app.config(function ($stateProvider) {

    $stateProvider.state('kits', {
        url: '/kits',
        templateUrl: 'js/kit/templates/kits.html',
        controller: 'KitsController',
        resolve: {
        	allKits: function(KitsFactory) {
        		return KitsFactory.getAll()
        	},
        	allKitImages: function(KitsFactory) {
        		var images = []
        		KitsFactory.getAll().then(function(kits) {
        			kits.forEach(function(kit) {
	        			images.push(kit.imageUrl)
	        		})
        		})
        		return images;
        	}
        }
    });

    $stateProvider.state('kit', {
        url: '/kits/:kitId',
        templateUrl: 'js/kit/templates/kit.html',
        controller: 'KitController',
        resolve: {
        	theKit: function(KitsFactory, $stateParams) {
        		return KitsFactory.getById($stateParams.kitId)
        	}
        }
    });

});