app.factory('CategoryFactory', function ($http) {
	var obj= {};
	obj.getKits= function(category){
		console.log("IM AT KIts");
		return $http.get('/api/kits/category/' + category)
		.then(res => res.data);
	}
	return obj;
});