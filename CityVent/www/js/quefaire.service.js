angular.module('app')
.service('QueFaireService', function($http,APIKeys){
    
    //request to get num*clubs for today
    this.get_activities =function(categorie,limit,num){
        return $http.get("https://api.paris.fr/api/data/1.4/QueFaire/get_activities/?token="+APIKeys.PARIS_TOKEN+"&cid="+categorie+"&tag=&created=0&start=0&end=0&offset=0&limit="+limit)
        .then(function success(results){
            return transformResult(only_open(results.data.data),num);
        },function (error){
            return error;
        });
    };
    
    function transformResult(result,num){
        var formated = [];

        //if no results, return nothing
        if(result.length == 0)
            return formated;

        //take the minimun between the numbers of data and the numbers asked
        num = result.length < num ? result.length : num;

        for(var i=0; i<num; i++) {
            var randInt = Math.floor(Math.random()*result.results.length);
            var dataChoosed= result.results[randInt];
            var randObject = {
                "address": dataChoosed.adresse,
                "place_name": dataChoosed.lieu,
                "name": dataChoosed.nom,
                "small_description": dataChoosed.small_description,
                "description": dataChoosed.description,
                "image_thumb": null,
                "image": null,
                "price": null,
                "link": null,
                //concat for good date format
                "open": dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour + dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_start,
                "end": dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour + dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_end,
            };
            formated.push(randObject);
            results.splice(randInt, 1);
        }
        return formated;
    }
    
    //filter all events who don't open today
        function only_open(results) {
            
            return results.filter(function(d) {
                //take the date of each event, they are ordered chronologicaly, the latest of the array is the sooner of all
                var dateEvent = new Date(d.occurrences[d.occurrences.length-1].jour);
                var dateNow = new Date();
                
                if(dateEvent.getDate() == dateNow.getDate() && dateEvent.getMonth() == dateNow.getMonth() && dateEvent.getFullYear() == dateNow.getFullYear())
                    return true;
                else
                    return false;
            });
        }
});