app.factory('ModalFactory', function($http){
	return {
		postKit: function(kit){
			return $http.post('/api/kits/', kit)
			.then(function(kit){
				return kit;
			});
		}
	}
});