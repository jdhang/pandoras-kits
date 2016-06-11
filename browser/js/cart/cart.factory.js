'use strict'

app.factory('CartFactory', ($http, $kookies) => {
	let obj = {};

	obj.getUserCart = function(userId) {
		return $http.get('/api/cart/' + userId).then(function(res){
			return res.data
		})
	}

	obj.getNonUserCart = function() {
		let order = {};
		order.orderDetails = $kookies.get('cart')
		order.orderDetails = order.orderDetails.map(function(e) {
			let subtotal = e.kit.price * e.qty;
			return {
				kit: e.kit,
				unitPrice: e.kit.price,
				quantity: e.qty,
				subtotal: subtotal
			}
		})

		return order;
	}

	return obj
})
