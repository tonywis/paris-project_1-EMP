angular.module("app")
	.service('openDataService', function($http){
		
        function transformResult(results, nb){
            //console.log("format "+results);
            if(results.length == 0)
                return [];
            nb = results.length < nb ? results.length : nb;
            var formated = [];
            for(var i=0; i<nb; i++) {
                var randInt = Math.floor(Math.random()*results.length);
                var dataChoosed= results[randInt].fields;
                var object = {
                    "address": dataChoosed.address,
                    "place_name": dataChoosed.placename,
                    "name": dataChoosed.title,
                    "small_description": dataChoosed.description,
                    "description": dataChoosed.free_text,
                    "image_thumb": dataChoosed.image_thumb,
                    "image": dataChoosed.image,
                    "open": dataChoosed.date_start,
                    "end": dataChoosed.date_end,
                    "price": dataChoosed.pricing_info,
                    "link": dataChoosed.link
                };
                formated.push(object);
                results.splice(randInt, 1);
            }
            console.log(formated);
            return formated;
        }

        function only_open(results) {
            return results.records.filter(function(d) {
                var dateStart = new Date(d.fields.date_start);
                var dateEnd = new Date(d.fields.date_end);
                var dateNow = new Date();
                /*console.log("start : "+dateStart.toDateString());
                console.log("end : "+dateEnd.toDateString());
                console.log("now :" +dateNow.toDateString());*/
                if(dateEnd <= dateNow)
                    return false;
                else if(dateStart <= dateNow || (dateStart.getDay() == dateNow.getDay() && dateStart.getDate() == dateNow.getDate() && dateStart.getFullYear() == dateNow.getFullYear()))
                    return true;
                else
                    return false;
            });
        }
    
        this.get_clubs = function(num) {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=evenements-a-paris&sort=date_start&rows=100&refine.tags=clubbing")
            .then(function success(results){
                console.log(results);
                return transformResult(only_open(results.data), num);
            },function (error){
                return error;
            });
        };
    
        this.get_concerts = function(num) {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=cinemas-a-paris&sort=date_start&rows=100&refine.tags=concert")
            .then(function success(results){
                return transformResult(only_open(results.data), num);
            },function (error){
                return error;
            });
        };
	});

