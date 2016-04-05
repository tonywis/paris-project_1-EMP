angular.module('app')
.service('QueFaire', function($http, APIParisToken){
	this.get_categories = function() {
		return $http("https://api.paris.fr/api/data/1.2/QueFaire/get_categories/?token="+APIParisToken.token);
	}
});