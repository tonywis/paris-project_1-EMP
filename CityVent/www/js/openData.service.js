angular.module("app")
	.service('openDataService', function($http,$filter){
		
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
    
        this.get_evenements = function(tag) {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=evenements-a-paris&rows=100&refine.tags="+tag)
            .then(function success(results){
                return results.data;
            },function (error){
                return error;
            });
        };
    
        this.get_cinemas = function(tag) {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=cinemas-a-paris&rows=100&refine.tags="+tag)
            .then(function success(results){
                return results.data;
            },function (error){
                return error;
            });
        };
	});
