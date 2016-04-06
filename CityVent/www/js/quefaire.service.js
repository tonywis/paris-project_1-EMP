angular.module('app')
.service('QueFaireService', function($http, APIParisToken){
	this.get_categories = function() {
		return $http.get("https://api.paris.fr/api/data/1.2/QueFaire/get_categories/?token="+APIParisToken.token);
	}
});