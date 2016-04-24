angular.module('app')
.service('QueFaireService', function($http,APIKeys){
    
    function transformResult(result){
            var randInt = Math.floor(Math.random()*10);

            var dataChoosed= result[randInt];

            return {
                "address": dataChoosed.adresse,
                "place_name": dataChoosed.lieu,
                "name": dataChoosed.nom,
                "small_description": dataChoosed.small_description,
                "description": dataChoosed.description,
                "image_thumb": null,
                "image": null,
                "price": null,
                "link": null,
                
                "open": dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour + dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_start,
                
                "end": dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour + dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_end,
            };
    }
    
	this.get_categories = function() {
		return $http.get("https://api.paris.fr/api/data/1.2/QueFaire/get_categories/?token="+APIKeys.PARIS_TOKEN)
        .then(function success(results){
            return results.data;
        },function (error){
            return error;
        });;
	};
    
    this.get_activities =function(categorie,limit){
        return $http.get("https://api.paris.fr/api/data/1.4/QueFaire/get_activities/?token="+APIKeys.PARIS_TOKEN+"&cid="+categorie+"&tag=&created=0&start=0&end=0&offset=0&limit="+limit)
        .then(function success(results){
            console.log(results.data.data);
            return transformResult(results.data.data);
        },function (error){
            return error;
        });
    };
});