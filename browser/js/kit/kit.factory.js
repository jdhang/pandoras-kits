app.factory('KitsFactory', function ($http, $kookies) {
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
				return res.data
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

			console.log('kookies done!')
			console.log($kookies.get('cart'))
		}
	}

	return obj;

});