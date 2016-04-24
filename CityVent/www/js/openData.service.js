angular.module("app")
	.service('openDataService', function($http,$filter){
		
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
    
        function transformResult(result){
            var randInt = Math.floor(Math.random()*100);

            var dataChoosed= result.records[randInt].fields;

            return {
                "address": dataChoosed.address,
                "date_end": dataChoosed.date_end,
                "date_start": dataChoosed.date_start,
                "description": dataChoosed.description,
                "free_text": dataChoosed.free_text,
                "image": dataChoosed.image,
                "image_thumb": dataChoosed.image_thumb,
                "placename": dataChoosed.placename,
                "pricing": dataChoosed.pricing_info,
                "link": dataChoosed.link,
                "title": dataChoosed.title
            }
        }
    
        this.get_clubs = function() {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=evenements-a-paris&rows=100&refine.tags=clubbing")
            .then(function success(results){
                return transformResult(results.data);
            },function (error){
                return error;
            });
        };
    
        this.get_concerts = function() {
            return $http.get("http://opendata.paris.fr//api/records/1.0/search/?dataset=cinemas-a-paris&rows=100&refine.tags=concert")
            .then(function success(results){
                return results.data;
            },function (error){
                return error;
            });
        };
	});

