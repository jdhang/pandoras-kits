app.factory('UsersFactory', function ($http, $q) {

	var obj = {};

  let baseUrl = '/api/users/'

  let getData = res => res.data

  obj.getAllUsers = () => $http.get(baseUrl).then(getData)

  obj.deleteUser= user => $http.delete(baseUrl + user.id).then(() => obj.getAllUsers())

  obj.updateUser= user => $http.put(baseUrl + user.id, user)

  obj.getById = id => $http.get(baseUrl + id).then(getData)

  obj.getReviewsOf = id => $http.get(baseUrl + id + '/reviews').then(getData)

  obj.getOrdersOf = id => $http.get(baseUrl + id + '/orders').then(getData)

  obj.changePw = (id, op, np) => {
    return $http.put(baseUrl + id + '/changepw', { op, np })
    .then(getData)
    .catch(() => {
      return $q.reject({ message: 'Invalid password.' })
    })
  }

	return obj;

});
