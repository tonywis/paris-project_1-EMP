angular.module("app")
	.service('dataService', function(QueFaireService, openDataService, googlePlacesService) {
		var sD = this;
		sD.data = [];
		sD.request = {
			"restaurant": 0,
			"bar": 0,
			"club": 0,
			"spectacle": 1,
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
				sD.startSpectacle();

			if(sD.request.concert > 0)
				sD.startConcert();

			if(sD.request.random > 0)
				sD.startRandom();
		};

		sD.startRestaurant = function(callbackCtrl) {
			// Google place
			sD.addLoading();
			sD.format_APIGoogle([
					{lieu: "Paris", dateEnd: 2},
					{lieu: "Paris", dateEnd: 3},
					{lieu: "Paris", dateEnd: 5},
					{lieu: "Paris", dateEnd: 4},
					{lieu: "Nantes", dateEnd: 1}
				]);
			sD.subLoading();
			setTimeout(callbackCtrl, 1000);
		}

		sD.startBar = function() {
			// Google place
            sD.addLoading();
            googlePlacesService.get_bar()
				.then(function sucess(results) {
					console.log(results);
                    sD.data.push(results);
                    sD.subLoading();
				}, function error(err) {
					sD.subLoading();
				});
		}

		sD.startClub = function() {
            // openData Clubbing
            sD.addLoading();
			openDataService.get_clubs(sD.request.club)
				.then(function sucess(results) {
                    console.log(results);
                    sD.subLoading();
				});
            sD.subLoading();
		}
        
        sD.startConcert = function() {
			// openData Concerts
            sD.addLoading();
			openDataService.get_clubs(sD.request.concert)
				.then(function (results) {
                    console.log(results);
                    sD.subLoading();
				});
		}

		sD.startSpectacle = function() {
			// Paris API
			sD.addLoading();
			QueFaireService.get_activities("2",10)
				.then(function sucess(results) {
                    console.log(results);
                    sD.subLoading();
				});
            sD.subLoading();
		}

		sD.startRandom = function() {
			// Google place or openDataEvenements
			sD.addLoading();
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