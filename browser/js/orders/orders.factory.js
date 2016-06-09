'use strict'

app.factory('OrdersFactory', ($http) => {

  let orderObj = {}

  let getData = (res) => {
    return res.data
  }

  orderObj.getAll = () => {
    return $http.get('/api/orders').then(getData)
  }

  orderObj.getById = (id) => {
    return $http.get('/api/orders/' + id).then(getData)
  }

  return orderObj

})
