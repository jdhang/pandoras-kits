'use strict'

app.factory('ReviewsFactory', ($http) => {

  let reviewObj = {}

  let baseUrl = '/api/reviews/'

  let getData = res => res.data

  reviewObj.create = review => $http.post(baseUrl, review).then(getData)

  return reviewObj

})
