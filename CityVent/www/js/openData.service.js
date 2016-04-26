angular.module("app")
	.service('openDataService', function($http){
    
    //request to get n*num clubs for today
        this.get_clubs = function(num) {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=evenements-a-paris&sort=date_start&rows=100&refine.tags=clubbing")
            .then(function success(results){
                console.log(results);
                return transformResult(only_open(results.data), num);
            },function (error){
                return error;
            });
        };
    
    //request to get n*num concerts clubs for today
        this.get_concerts = function(num) {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=cinemas-a-paris&sort=date_start&rows=100&refine.tags=concert")
            .then(function success(results){
                return transformResult(only_open(results.data), num);
            },function (error){
                return error;
            });
        };
    
    //function to select randomly n*num informations in all results from the request
        function transformResult(results, num){
            //console.log("format "+results);
            var formated = [];
            
            //if no results, return nothing
            if(results.length == 0)
                return formated;
            
            //take the minimun between the numbers of data and the numbers asked
            num = results.length < num ? results.length : num;
            for(var i=0; i<num; i++) {
                var randInt = Math.floor(Math.random()*results.length);
                var dataChoosed= results[randInt].fields;
                var randObject = {
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
                formated.push(randObject);
                results.splice(randInt, 1);
            }
            //console.log(formated);
            return formated;
        }

    //filter all places/events who don't open today
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
                //check events started before now || check events will start between now and tonight 
                else if(dateStart <= dateNow || (dateStart.getDate() == dateNow.getDate() && dateStart.getMonth() == dateNow.getMonth() && dateStart.getFullYear() == dateNow.getFullYear()))
                    return true;
                else
                    return false;
            });
        }
	});

