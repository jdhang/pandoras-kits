'use strict'

app.factory('OrderDetailFactory', ($http, $state) => {

  let obj = {}

  let baseUrl = '/api/order-details/'

  let getData = (res) => {
    return res.data
  }

  obj.getAll = () => {
    return $http.get(baseUrl).then(getData)
  }

  obj.getById = (id) => {
    return $http.get(baseUrl + id).then(getData)
  }

  obj.delete = (id) => {
    return $http.delete(baseUrl + id)
  }

  return obj

})
