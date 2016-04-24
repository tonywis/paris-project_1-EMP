angular.module('app')
.service('googlePlacesService', function($http,APIKeys) {
    
	this.get_restaurant = function(){
        return text_search("restaurant");
    }
    
    this.get_bar = function(){
        return text_search("bar");
    }
    
    function text_search(place) {
        
		return $http.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+place+"+in+Paris&key="+APIKeys.GOOGLEPLACES_ANDROID_TOKEN)
            .then(function success(results){
                return transformResult(only_open(results.data));
            },function (error){
                return error;
            });
	}
    
    function transformResult(result){
            var randInt = Math.floor(Math.random()*result.length);

            var dataChoosed= result.results[randInt];

            return {
                "address": dataChoosed.formatted_address,
                "place_name": dataChoosed.name,
                "name": null,
                "small_description": null,
                "description": null,
                "image_thumb": dataChoosed.icon,
                "image": null,
                "price": null,
                "link": null,
                
                "open": dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour + dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_start,
                
                "end": dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour + dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_end,
            };
    }
    
    function only_open(results) {
        return results.results.filter(function(d) {
            return d.opening_hours.open_now;
        });
    }  
});