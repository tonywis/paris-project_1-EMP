angular.module('app')
.controller('categoriesController', function(QueFaireService, locationService, $ionicPlatform){

    mv=this;
    mv.lat = 0;
    mv.lng = 0;
    
    /*mv.resultsCategories = []; 
    mv.categoriesFictive= [{nom: "yo"},{nom: "yoo"},{nom: "yooo"}]
    
    mv.resultsCategories = QueFaireService.get_categories();
    
    console.log('resultsCategories');
    console.log(mv.resultsCategories);*/

		$ionicPlatform.ready(function() {
	    locationService
	    	.getCurrentLocation()
	    	.then(mv.onSuccess, mv.onError);
	  });

	  mv.onSuccess = function(position) {
	  	mv.lat = position.coords.latitude;
	  	mv.lng = position.coords.longitude;
	  }

	  mv.onError = function(err) {
	  	alert(err);
	  }
});