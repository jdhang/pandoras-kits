app.factory('UsersFactory', function ($http, $state) {

	var obj = {};

	obj.getAllUsers = function() {
		return $http.get('/api/users').then(function(res) {
			return res.data
		})
	}

	obj.getById = function(id) {
		return $http.get('/api/kits/' + id).then(function(res) {
			return res.data
		})
	}

	// obj.postKit= function(kit){
	// 		return $http.post('/api/kits/', kit)
	// 		.then(function(res){
	// 			return res.data;
	// 		});
	// 	}

	obj.deleteUser= function(user){
		return $http.delete('/api/users/'+user.id)
		.then(function(res){
			return obj.getAllUsers();
		});
	}

	// obj.updateKit= function(kit){
	// 	$http.put('/api/kits/'+kit.id, kit);
	// }

	return obj;

});