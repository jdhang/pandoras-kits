 app.factory('CategoryFactory', function ($http) {
	var obj= {};
	obj.getKits= function(category){
		return $http.get('/api/kits/category/' + category)
		.then(res => res.data);
	}
	obj.getCategories= function(){
		return $http.get('/api/categories/')
		.then(res => res.data);
	}
	obj.postCategory= function(categoryName){
		console.log("Did i reach here?", categoryName);
		return $http.post('/api/categories/', {name: categoryName})
		.then(res => res.data);
	}
	return obj;
});