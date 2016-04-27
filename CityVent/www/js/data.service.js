angular.module("app")
	.service('dataService', function(QueFaireService, openDataService, googlePlacesService) {
		var sD = this;
		sD.data = [];
		sD.request = {
			"restaurant": 0,
			"bar": 0,
			"club": 0,
			"spectacle": 0,
			"concert": 0,
			"random": 0
		};
		// nb de requetes en cours
		sD.loading = 0;
		
		sD.launch = function(callbackCtrl) {
			sD.data = [];
			if(sD.request.restaurant > 0)
				sD.startRestaurant(callbackCtrl);
            
			if(sD.request.bar > 0)
				sD.startBar(callbackCtrl);

			if(sD.request.club > 0)
				sD.startClub(callbackCtrl);

			if(sD.request.spectacle > 0)
				sD.startSpectacle(callbackCtrl);

			if(sD.request.concert > 0)
				sD.startConcert(callbackCtrl);

			if(sD.request.random > 0)
				sD.startRandom(callbackCtrl);
		};

		sD.startRestaurant = function(callbackCtrl) {
			// Google place
			sD.addLoading();
			googlePlacesService.get_restaurant(sD.request.restaurant, function(results) {
				sD.data.concat(results);
				sD.subLoading();
				callbackCtrl();
			});
		}

		sD.startBar = function(callbackCtrl) {
			// Google place
			sD.addLoading();
			googlePlacesService.get_bar(sD.request.bar, function(results) {
				sD.data.concat(results);
				sD.subLoading();
				callbackCtrl();
			});
		}

		sD.startClub = function(callbackCtrl) {
			// openData Clubbing
			sD.addLoading();
			openDataService.get_clubs(sD.request.club, function(results) {
				sD.data.concat(results);
				sD.subLoading();
				callbackCtrl();
			});
		}

		sD.startConcert = function(callbackCtrl) {
			// openData Concerts
			sD.addLoading();
			openDataService.get_clubs(sD.request.concert, function(results) {
				sD.data.concat(results);
				sD.subLoading();
				callbackCtrl();
			});
		}

		sD.startSpectacle = function(callbackCtrl) {
			// Paris API
			sD.addLoading();
			QueFaireService.get_activities("2",10, sD.request.spectacle, function(results) {
				sD.data.concat(results);
				sD.subLoading();
				callbackCtrl();
			});
		}

		sD.startRandom = function(callbackCtrl) {
			// Google place or openDataEvenements
			// QU'EST-CE QU'ON FAIT ?
		}

		sD.sortData = function() {
			sD.data.sort(function(a, b) {
				return a.dateEnd < b.dateEnd ? -1 : 1;
			});
		}

		sD.addLoading = function() {
			sD.loading += 1;
		}

		sD.subLoading = function() {
			sD.loading -= 1;
			if(sD.loading < 0)
				sD.loading = 0;
		}

		sD.getDataById = function(id) {
			if(id >= 0 && id < sD.data.length) {
				return sD.data[id];
			}
			return null;
		}

	});