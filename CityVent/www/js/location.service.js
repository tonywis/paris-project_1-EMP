angular.module("app")
	.service('locationService', function($cordovaGeolocation){
		var posOptions = {timeout: 20000, enableHighAccuracy: true};
		locService = this;
		locService.position = {
			lat: null,
			lng: null
		};

		locService.getCurrentLocation = function() {
			$cordovaGeolocation.getCurrentPosition(posOptions)
				.then(function(geoposition) {
						locService.position.lat = geoposition.coords.latitude;
						locService.position.lng = geoposition.coords.longitude;
						//alert(locService.position.lat+" ; "+locService.position.lng);
					}, function(error) {
						//alert(error);
					});
		}

	});