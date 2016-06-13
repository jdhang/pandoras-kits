'use strict'

app.factory('OrderDetailFactory', ($http, $state) => {

  let obj = {}

  let baseUrl = '/api/order-details/'

  let getData = res => res.data

  obj.getAll = () => $http.get(baseUrl).then(getData)

  obj.getById = id => $http.get(baseUrl + id).then(getData)

  obj.delete = id => {
    return $http.delete(baseUrl + id).then(function() {
      return $state.go($state.current, {}, { reload: true })
    })
  }

  return obj

})
