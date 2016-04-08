angular.module("app")
	.service('dataService', function(QueFaireService) {
		this.data = {};
		this.request = {
			"restaurant": 0,
			"bar": 0,
			"club": 0,
			"spectacle": 0,
			"concert": 0,
			"random": 0
		};
		/*
		this.launch = launch(myFunctionInCtrl) {
			QueFaireService.METHODE_CHE_PAS_QUOI
				.then(function(response) {
					//ici traitement des données / filtrage et ensutie formatage puis ensuite on balance dans this.data, et on tri ?
					
					//et enfin tadaaaam on appelle une méthode de callback dans ctrller
					myFunctionInCtrl();
				});
		};*/

		this.format_APIGoogle = function(response) {}

		this.format_APIParis = function(response) {}

		this.format_APIOpenDataParis = function(response) {}
	});