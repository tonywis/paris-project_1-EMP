angular.module('app')
.service('googlePlacesService', function($http,APIKeys) {
    
    //request to get n*nb restaurants for today
	this.get_restaurant = function(nb){
        return text_search("restaurant",nb);
    }
    
    //request to get n*nb bars for today
    this.get_bar = function(nb){
        return text_search("bar",nb);
    }
    
    //request to get n*nb places for today
    function text_search(place,nb) {
        
		return $http.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+place+"+in+Paris&key="+APIKeys.GOOGLEPLACES_ANDROID_TOKEN)
            .then(function success(results){
                return transformResult(only_open(results.data.results),nb);
            },function (error){
                return error;
            });
	}
    
    //function to select randomly n*nb informations in all results from the request
    function transformResult(results,nb){
        
        var formated = [];
        
        //if no results, return nothing
        if(results.length == 0)
            return formated;
            
        //take the minimun between the numbers of data and the numbers asked
        nb = results.length < nb ? results.length : nb;
        for(var i=0; i<nb; i++) {
            var randInt = Math.floor(Math.random()*results.length);
            var dataChoosed= results[randInt];
            var randObject=  {
                "address": dataChoosed.formatted_address,
                "place_name": dataChoosed.name,
                "name": null,
                "small_description": null,
                "description": null,
                "image_thumb": dataChoosed.icon,
                "image": null,
                "price": null,
                "link": null,
                "open": null,
                "end": null,
            };
            formated.push(randObject);
        }
        return formated;
    }
    
    //filter all places who are not open today
    function only_open(results) {
        return results.filter(function(d) {
            if(d.opening_hours)
                return d.opening_hours.open_now;
            else
                return true;
        });
    }  
});