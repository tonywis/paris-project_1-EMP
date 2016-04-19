angular.module('app')
.controller('categoriesController', function(QueFaireService, locationService, $ionicPlatform,dataService,$state,$http,$q){
	var cV = this;
	
	var gettyimageKey = "q5huf6j8bg8qt3jnmxd536v7";
	cV.request = dataService.request;
	cV.countClickCategorie = function(id){

		switch(id){

			case 'restaurant' :
				 dataService.request.restaurant = dataService.request.restaurant + 1;
				 break;
			 case 'bar':
		 	 	 dataService.request.bar = dataService.request.bar + 1;
			 	 break;
		 	 case 'club' :
		 	 	 dataService.request.club = dataService.request.club + 1;
		 	 	 break;
	 	 	 case 'spectacle' :
				 dataService.request.spectacle = dataService.request.spectacle + 1;
				 break;
			 case 'concert' :
			 	 dataService.request.concert = dataService.request.concert + 1;
				 break;
			 case 'random' :
				 dataService.request.random = dataService.request.random + 1;
			 break;			 	 
		}
		cV.request = dataService.request;

	}
	cV.nextStep = function(){

		$state.go('propositions');
	}
	cV.resetCateg = function (caseCateg){

		switch(caseCateg){

			case 'restaurant' :
				 dataService.request.restaurant =0;
				 break;
			 case 'bar':
		 	 	 dataService.request.bar =0;
			 	 break;
		 	 case 'club' :
		 	 	 dataService.request.club = 0;
		 	 	 break;
	 	 	 case 'spectacle' :
				 dataService.request.spectacle = 0;
				 break;
			 case 'concert' :
			 	 dataService.request.concert = 0;
				 break;
			 case 'random' :
				 dataService.request.random = 0;
			 break;			 	 
		}
		cV.request = dataService.request;

	}
	
	cV.imageBkg = function(){

		var promise1 =  $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=restaurant&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':gettyimageKey}});
		var promise2 = $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=bar&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':gettyimageKey}});
		var promise3 =  $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=nightclub&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':gettyimageKey}});
		var promise4 = $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=spectacle&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':gettyimageKey}});
		var promise5 =  $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=concert&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':gettyimageKey}});
		var promise6 =[];

		$q.all([promise1,promise2,promise3,promise4,promise5]).then(function(pdata){

				for (var i = 0; i < pdata.length;  i++) {
					for (var j = 0; j < pdata[i].data.images.length;  j++) {
					promise6.push(pdata[i].data.images[j].display_sizes[0].uri);
					
					}
				}
			cV.restaurantBkg = pdata[0].data.images[Math.floor(Math.random()*pdata[0].data.images.length)].display_sizes[0].uri;
			cV.barBkg = pdata[1].data.images[Math.floor(Math.random()*pdata[1].data.images.length)].display_sizes[0].uri;
			cV.clubBkg = pdata[2].data.images[Math.floor(Math.random()*pdata[2].data.images.length)].display_sizes[0].uri;
			cV.spectacleBkg = pdata[3].data.images[Math.floor(Math.random()*pdata[3].data.images.length)].display_sizes[0].uri;
			cV.concertBkg = pdata[4].data.images[Math.floor(Math.random()*pdata[4].data.images.length)].display_sizes[0].uri;
			cV.randomBkg = promise6[Math.floor(Math.random()*promise6.length)];
			 
		}, function(err) {
		 	 	 					// An error occured. Show a message to the user
		 	 	 					
		 	 	 				
		 });


	    

           
	}


	

});