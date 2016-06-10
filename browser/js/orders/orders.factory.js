'use strict'

app.factory('OrdersFactory', ($http) => {

  let orderObj = {}

  let baseUrl = '/api/orders/'

  let getData = (res) => {
    return res.data
  }

  orderObj.getAll = () => {
    return $http.get(baseUrl).then(getData)
  }

  orderObj.getById = (id) => {
    return $http.get(baseUrl + id).then(getData)
  }

  orderObj.updateOrder = (id, updates) => {
    return $http.put(baseUrl + id, updates).then(getData)
  }

  return orderObj

})
