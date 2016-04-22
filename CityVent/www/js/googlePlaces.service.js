angular.module('app')
.service('googlePlacesService', function($http,APIKeys) {
    
	this.get_restaurant = function(){
        return text_search("restaurant");
    }
    
    this.get_bar = function(){
        return text_search("bar");
    }
        
    function text_search(place) {
        
		return $http.get("http://maps.googleapis.com/maps/api/place/textsearch/json?query="+place+"+in+Paris&key="+APIKeys.GOOGLEPLACES_WEB_TOKEN)
            .then(function success(results){
                return results.data;
            },function (error){
                return error;
            });
	}
});