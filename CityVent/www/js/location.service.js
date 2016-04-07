angular.module("app")
	.service('locationService', function($cordovaGeolocation){
		var posOptions = {timeout: 20000, enableHighAccuracy: true};

		this.getCurrentLocation = function() {
			return $cordovaGeolocation.getCurrentPosition(posOptions);
		}

	});