app.factory('UsersFactory', function ($http, $state) {

	var obj = {};

	obj.getAllUsers = function() {
		return $http.get('/api/users').then(function(res) {
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

	obj.updateUser= function(user){
		return $http.put('/api/users/'+user.id, user);
	}

	return obj;

});