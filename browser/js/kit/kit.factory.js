app.factory('KitsFactory', function ($http) {
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

	obj.addToCart = function(kit, qty, user) {
		return $http.post('/api/orders/cart/add', { kit: kit, qty: qty, user: user }).then(function(res) {
			return res.data
		})
	}

	return obj;

});