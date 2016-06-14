'use strict'

app.factory('AddressFactory', ($http) => {

  let obj = {}

  let baseUrl = '/api/addresses/'

  let getData = res => res.data

  obj.addAddress = (form, order) => $http.post(baseUrl, { form: form, order: order }).then(getData)

  return obj

})
