app.factory('KitsFactory', function ($http, $state) {

	var obj = {};

	obj.getAll = function() {
		return $http.get('/api/kits').then(function(res) {
			return res.data
		})
	}

	obj.getById = function(id) {
		return $http.get('/api/kits/' + id).then(function(res) {
			return res.data
		})
	}

	obj.postKit= function(kit){
			return $http.post('/api/kits/', kit)
			.then(function(res){
				return res.data;
			});
		}

	obj.deleteKit= function(kit){
		$http.delete('/api/kits/'+kit.id)
		.then(function(){
			$state.go('kits');
		});
	}

	obj.updateKit= function(kit){
		$http.put('/api/kits/'+kit.id, kit);
	}

	return obj;

});
