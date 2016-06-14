'use strict'

app.factory('OrdersFactory', ($http) => {

  let orderObj = {}

  let baseUrl = '/api/orders/'

  let getData = res => res.data

  orderObj.getAll = () => $http.get(baseUrl).then(getData)

  orderObj.getById = id => $http.get(baseUrl + id).then(getData)

  orderObj.updateOrder = (id, updates) =>  $http.put(baseUrl + id, updates).then(getData)

  return orderObj

})
