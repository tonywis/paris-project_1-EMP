angular.module('app')
.service('googlePlacesService', function($http,APIKeys, locationService) {
    
    //request to get n*nb restaurants for today
	this.get_restaurant = function(nb, callbackDataService){
        text_search("restaurant|food",nb, callbackDataService);
    }
    
    //request to get n*nb bars for today
    this.get_bar = function(nb, callbackDataService){
        text_search("bar|cafe",nb, callbackDataService);
    }
    
    //request to get n*nb places for today
    function text_search(place, nb, callbackDataService) {
        var url;
        if(locationService.position.lat != null && locationService.position.lng != null)
            url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+locationService.position.lat+","+locationService.position.lng+"&radius=3000&types="+place+"&opennow=true&rankby=prominence&key="+APIKeys.GOOGLEPLACES_ANDROID_TOKEN;
        else
            url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+place+"+in+Paris&opennow=true&key="+APIKeys.GOOGLEPLACES_ANDROID_TOKEN;
		$http.get(url)
            .then(function (results){
                callbackDataService(transformResult(results.data.results,nb));
            },function (error){
                callbackDataService([]);
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
                "end": null
            };
            formated.push(randObject);
        }
        return formated;
    }
});