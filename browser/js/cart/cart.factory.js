'use strict'

app.factory('CartFactory', ($http, $kookies, $q) => {
	let obj = {};

	obj.getUserCart = function(userId) {
		return $http.get('/api/cart/' + userId).then(function(res){
			let order = {};
			if (!res.data) order.orderDetails = []
			else order = res.data;
			return order
		})
	}

	obj.getNonUserCart = function() {
		let order = {};
		if ($kookies.get('cart')) {
			order.orderDetails = $kookies.get('cart').map(function(e) {
				let subtotal = e.kit.price * e.qty;
				return {
					kit: e.kit,
					unitPrice: e.kit.price,
					quantity: e.qty,
					subtotal: subtotal
				}
			})
		} else {
			order.orderDetails = []
		}

		return order;
	}

	obj.addToCart = function(kit, qty, user) {
		if (user) {
			return $http.post('/api/cart/add/'+user.id, { kit: kit, qty: qty })
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
			return $q.resolve(true);
		}
	}

	return obj
})
