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


		this.format_APIGoogle = function(response) {}

		this.format_APIParis = function(response) {}

		this.format_APIOpenDataParis = function(response) {}
	});