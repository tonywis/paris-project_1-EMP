angular.module('app')
.service('QueFaireService', function($http, APIParisToken){
    
	this.get_categories = function() {
		return $http.get("https://api.paris.fr/api/data/1.2/QueFaire/get_categories/?token="+APIParisToken.token);
	};
    
    this.get_univers =function(){
       return $http.get("https://api.paris.fr/api/data/1.0/QueFaire/get_univers/?token="+APIParisToken.token)
       .then(function success(results){
            return results.data.data;
        },function (error){
            return error;
        });
    };
    
    this.get_activities =function(categorie,univer,limit){
        return $http.get("https://api.paris.fr/api/data/1.4/QueFaire/get_activities/?token="+APIParisToken.token+"&cid="+categorie+"&tag="+univer+"&created=0&start=0&end=0&offset=0&limit="+limit)
        .then(function success(results){
            return results.data.data;
        },function (error){
            return error;
        });
    };
});