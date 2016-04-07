angular.module("app")
	.service('openDataService', function($http){
		
        this.get_data = function(url) {
		return $http.get(url)
        .then(function success(results){
            return results.data;
        },function (error){
            return error;
        });
            
	};

	});