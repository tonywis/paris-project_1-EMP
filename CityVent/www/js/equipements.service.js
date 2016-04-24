angular.module('app')
.service('Equipement', function($http, APIParisToken) {
    
	this.get_categories = function() {
		return $http("https://api.paris.fr/api/data/1.0/Equipements/get_categories/?token="+APIParisToken.token);
	}
});