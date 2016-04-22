angular.module('app')
.controller('categoriesController', function($scope, $state, $http, $q, $ionicLoading, locationService, dataService, APIKeys){
	var cV = this;
	var LIMIT_BY_CAT = 10;
	cV.first = true;

	cV.request = dataService.request;

	cV.onClickCategorie = function(id){
		switch(id){
			case 'restaurant' :
				 dataService.request.restaurant += cV.addWithLimit(dataService.request.restaurant);
				 break;
			 case 'bar':
		 	 	 dataService.request.bar += cV.addWithLimit(dataService.request.bar);
			 	 break;
		 	 case 'club' :
		 	 	 dataService.request.club += cV.addWithLimit(dataService.request.club);
		 	 	 break;
	 	 	 case 'spectacle' :
				 dataService.request.spectacle += cV.addWithLimit(dataService.request.spectacle);
				 break;
			 case 'concert' :
			 	 dataService.request.concert += cV.addWithLimit(dataService.request.concert);
				 break;
			 case 'random' :
				 dataService.request.random += cV.addWithLimit(dataService.request.random);
			 break;			 	 
		}
		cV.request = dataService.request;
		cV.first = false;
	}

	cV.addWithLimit = function(nb_now) {
		if((nb_now + 1) <= LIMIT_BY_CAT)
			return 1;
		return 0;
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
		$scope.pressing = true;
	}
	
	cV.imageBkg = function(){
		$ionicLoading.show();
		var promise1 =  $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=restaurant&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':APIKeys.GETTY_IMG_TOKEN}});
		var promise2 = $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=bar&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':APIKeys.GETTY_IMG_TOKEN}});
		var promise3 =  $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=nightclub&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':APIKeys.GETTY_IMG_TOKEN}});
		var promise4 = $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=spectacle&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':APIKeys.GETTY_IMG_TOKEN}});
		var promise5 =  $http({method: 'GET',  url: 'https://api.gettyimages.com/v3/search/images?phrase=concert&fields=preview&page_size=20&exclude_nudity=true&file_types=eps%2Cpng&license_models=royaltyfree', headers:{'Api-Key':APIKeys.GETTY_IMG_TOKEN}});
		var promise6 =[];

		$q.all([promise1,promise2,promise3,promise4,promise5]).then(function(pdata){
			for (var i = 0; i < pdata.length;  i++) {
				for (var j = 0; j < pdata[i].data.images.length;  j++) {
					promise6.push(pdata[i].data.images[j].display_sizes[0].uri);
				}
			}
			var list_part_cat = angular.element(document.querySelector(".card"));
			cV.restaurantBkg = pdata[0].data.images[Math.floor(Math.random()*pdata[0].data.images.length)].display_sizes[0].uri;
			cV.barBkg = pdata[1].data.images[Math.floor(Math.random()*pdata[1].data.images.length)].display_sizes[0].uri;
			cV.clubBkg = pdata[2].data.images[Math.floor(Math.random()*pdata[2].data.images.length)].display_sizes[0].uri;
			cV.spectacleBkg = pdata[3].data.images[Math.floor(Math.random()*pdata[3].data.images.length)].display_sizes[0].uri;
			cV.concertBkg = pdata[4].data.images[Math.floor(Math.random()*pdata[4].data.images.length)].display_sizes[0].uri;
			cV.randomBkg = promise6[Math.floor(Math.random()*promise6.length)];
			$ionicLoading.hide();
		}, function(err) {
			// An error occured. Show a message to the user
			console.log("Error loading categories images");
			$ionicLoading.hide();
		});   
	}

	cV.getNbSelected = function() {
		var nb = cV.request.restaurant + cV.request.bar + cV.request.club + cV.request.spectacle + cV.request.concert + cV.request.random;
		console.log(nb);
		return nb;
	}


});