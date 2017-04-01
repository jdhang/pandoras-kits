app.factory('OrderDetailFactory', ($http, $kookies, $state, $q) => {

  let obj = {}

  let baseUrl = '/api/order-details/'

  let getData = res => res.data

  obj.getAll = () => $http.get(baseUrl).then(getData)

  obj.getById = id => $http.get(baseUrl + id).then(getData)

  obj.update = orderDetail => $http.put(baseUrl + orderDetail.id, orderDetail).then(getData)

  obj.delete = orderDetail => {
  	if (orderDetail.id) return $http.delete(baseUrl + orderDetail.id);
  	else {
		let currCart = $kookies.get('cart')

		function indexOfKit() {
			for (let i = 0; i < currCart.length; i++) {
				if (currCart[i].kit.id === orderDetail.kit.id) {
					return i;
				}
			}
			return -1;
		}

		currCart.splice(indexOfKit(), 1)
		$kookies.set('cart', currCart, {path: '/'})
		return $q.resolve(true);
  	}
  }

  return obj

})
