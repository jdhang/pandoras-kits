
app.factory('KitsFactory', function ($http, $kookies, $state) {
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
		if (user) {
			return $http.post('/api/cart/add/'+user.id, { kit: kit, qty: qty }).then(function(res) {

				return $state.go('cart');
			})
		} else {
			let kitToAddToCart = { kit: kit, qty: qty }
			let currCart = $kookies.get('cart')

			function checkForDuplicate() {
				for (let i = 0; i < currCart.length; i++) {
					if (currCart[i].kit.id === kit.id) {
						return i;
					}
				}
				return -1;
			}

		  	if (!currCart) {
		    	$kookies.set('cart', [kitToAddToCart], {path: '/'});
		  	} else {
				let index = checkForDuplicate();
				if (index > -1) {
					currCart[index].qty += qty;
				} else {
					currCart.push(kitToAddToCart);
				}
				$kookies.set('cart', currCart, {path: '/'});
			}

			return $state.go('cart')
		}
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

	return obj;

});