'use strict'

app.factory('CartFactory', ($http, $kookies) => {
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

	return obj
})
