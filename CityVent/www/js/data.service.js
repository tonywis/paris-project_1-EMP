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
		// nb request in progress
		sD.loading = 0;
		sD.randomIncrement = 0;;

		sD.onFinish = function(callback, results) {
			sD.data = sD.data.concat(results);
			sD.subLoading();
			callback();
		}
		
		sD.launch = function(callbackCtrl) {
			sD.data = [];
			sD.randomIncrement = 0;
			if(sD.request.restaurant > 0)
				sD.startRestaurant(callbackCtrl, sD.request.restaurant);
            
			if(sD.request.bar > 0)
				sD.startBar(callbackCtrl, sD.request.bar);

			if(sD.request.club > 0)
				sD.startClub(callbackCtrl, sD.request.club);

			if(sD.request.spectacle > 0)
				sD.startSpectacle(callbackCtrl, sD.request.concert);

			if(sD.request.concert > 0)
				sD.startConcert(callbackCtrl, sD.request.spectacle);

			if(sD.request.random > 0)
				sD.startRandom(callbackCtrl);
		};

		sD.startRestaurant = function(callback, nb) {
			// Google place
			sD.addLoading();
			googlePlacesService.get_restaurant(nb, function(results) {
				sD.onFinish(callback, results);
			});
		}

		sD.startBar = function(callback, nb) {
			// Google place
			sD.addLoading();
			googlePlacesService.get_bar(nb, function(results) {
				sD.onFinish(callback, results);
			});
		}

		sD.startClub = function(callback, nb) {
			// openData Clubbing
			sD.addLoading();
			openDataService.get_clubs(nb, function(results) {
				sD.onFinish(callback, results);
			});
		}

		sD.startConcert = function(callback, nb) {
			// openData Concerts
			sD.addLoading();
			openDataService.get_concerts(nb, function(results) {
				sD.onFinish(callback, results);
			});
		}

		sD.startSpectacle = function(callback, nb) {
			// Paris API
			sD.addLoading();
			QueFaireService.get_activities("2",10, nb, function(results) {
				sD.onFinish(callback, results);
			});
		}

		sD.startRandom = function(callback) {
			// Google place or openDataEvenements
			if(sD.randomIncrement >= 15) {
				callback();
				return;
			}
			sD.randomIncrement++;
			var requestRandom = randomizeChoice(sD.request.random);

			if(requestRandom.restaurant > 0)
				sD.startRestaurant(function() {
					if(sD.data.length == 0)
						sD.startRandom(callback);
					else
						callback();
				}, requestRandom.restaurant);
            
			if(requestRandom.bar > 0)
				sD.startBar(function() {
					if(sD.data.length == 0)
						sD.startRandom(callback);
					else
						callback();
				}, requestRandom.bar);

			if(requestRandom.club > 0)
				sD.startClub(function() {
					if(sD.data.length == 0)
						sD.startRandom(callback);
					else
						callback();
				}, requestRandom.club);

			if(requestRandom.spectacle > 0)
				sD.startSpectacle(function() {
					if(sD.data.length == 0)
						sD.startRandom(callback);
					else
						callback();
				}, requestRandom.concert);

			if(requestRandom.concert > 0)
				sD.startConcert(function() {
					if(sD.data.length == 0)
						sD.startRandom(callback);
					else
						callback();
				}, requestRandom.spectacle);
		}

		sD.sortData = function() {
			sD.data.sort(function(a, b) {
				if(a.end == null)
					return 1
				if(b.end == null)
					return -1;
				return a.end < b.end ? -1 : 1;
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

		sD.getNbSelected = function() {
			var nb = sD.request.restaurant + sD.request.bar + sD.request.club + sD.request.spectacle + sD.request.concert + sD.request.random;
			//console.log(nb);
			return nb;
		}

		sD.has_requests = function() {
			return sD.getNbSelected() > 0;
		}

		sD.getDataById = function(id) {
			if(id >= 0 && id < sD.data.length) {
				return sD.data[id];
			}
			return null;
		}

		function randomizeChoice(nbRandom) {
			requestRandom = {
				"restaurant": 0,
				"bar": 0,
				"club": 0,
				"spectacle": 0,
				"concert": 0
			};
			for (var i=0; i<nbRandom; i++) {
				var nb = Math.floor(Math.random() * 5);
				switch (nb) {
					case 0 :
						requestRandom.restaurant = requestRandom.restaurant + 1;
						break;
					case 1:
						requestRandom.bar = requestRandom.bar + 1;
						break;
					case 2 :
						requestRandom.club = requestRandom.club + 1;
						break;
					case 3 :
						requestRandom.spectacle = requestRandom.spectacle + 1;
						break;
					case 4 :
						requestRandom.concert = requestRandom.concert + 1;
						break;
				}
			}
			return requestRandom;
		}

	});