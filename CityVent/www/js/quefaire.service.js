angular.module('app')
.service('QueFaireService', function($http,APIKeys, locationService){
    
    //request to get num*clubs for today
    this.get_activities =function(categorie,limit,num, callbackDataService){
        var url;
        if(locationService.position.lat != null && locationService.position.lng != null)
            url = "https://api.paris.fr/api/data/1.4/QueFaire/get_geo_activities/?token="+APIKeys.PARIS_TOKEN+"&cid="+categorie+"&tag=&created=0&start=0&end=0&lat="+locationService.position.lat+"&lon="+locationService.position.lng+"&radius=3000&offset=0&limit="+limit;
        else
            url = "https://api.paris.fr/api/data/1.4/QueFaire/get_activities/?token="+APIKeys.PARIS_TOKEN+"&cid="+categorie+"&tag=&created=0&start=0&end=0&offset=0&limit="+limit;
        
        $http.get(url)
        .then(function (results){
            callbackDataService(transformResult(only_open(results.data.data),num));
        },function (error){
            callbackDataService([]);
        });
    };
    
    function mergeDateHours(dateStr, hoursStr) {
        hours_array = hoursStr.split(':');
        dateResult = new Date(dateStr);
        dateResult.setHours(hours_array[0]);
        dateResult.setMinutes(hours_array[1]);
        dateResult.setSeconds(hours_array[2]);
        return dateResult;
    }

    function transformResult(results,num){
        var formated = [];

        //if no results, return nothing
        if(results.length == 0)
            return formated;
        
        //take the minimun between the numbers of data and the numbers asked
        num = results.length < num ? results.length : num;
        
        for(var i=0; i<num; i++) {
            
            var randInt = Math.floor(Math.random()*results.length);
            var dataChoosed= results[randInt];
            var dateOpen_str = dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour;
            var hourOpen_str = dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_start;
            var dateEnd_str = dataChoosed.occurrences[dataChoosed.occurrences.length-1].jour;
            var hourEnd_str = dataChoosed.occurrences[dataChoosed.occurrences.length-1].hour_end;
            var img = null;
            if(dataChoosed.files.length > 0) {
                if(dataChoosed.files[0].file)
                    img = "http://filer.paris.fr/"+dataChoosed.files[0].file;
                else if(dataChoosed.files[0].path)
                    img = dataChoosed.files[0].path;
            }
            var randObject = {
                "address": dataChoosed.adresse,
                "place_name": dataChoosed.lieu,
                "name": dataChoosed.nom,
                "small_description": he.decode(dataChoosed.small_description),
                "description": he.decode(dataChoosed.description),
                "image_thumb": img,
                "image": img,
                "price": null,
                "link": null,
                //merge for good date format
                "open": mergeDateHours(dateOpen_str, hourOpen_str),
                "end": mergeDateHours(dateEnd_str, hourEnd_str)
            };
            formated.push(randObject);
            results.splice(randInt, 1);
        }
        return formated;
    }
    
    //filter all events who don't open today
        function only_open(results) {
            
            return results.filter(function(d) {
                console.log(d)
                //take the date of each event, they are ordered chronologicaly, the latest of the array is the sooner of all
                if(typeof d.occurrences[0] == "undefined"){
                    return false;
                }
                var dateEvent = new Date(d.occurrences[d.occurrences.length-1].jour);
                var dateNow = new Date();
                
                if(dateEvent.getDate() == dateNow.getDate() && dateEvent.getMonth() == dateNow.getMonth() && dateEvent.getFullYear() == dateNow.getFullYear())
                    return true;
                else
                    return false;
            });
        }
});