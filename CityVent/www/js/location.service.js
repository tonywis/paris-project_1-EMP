angular.module("app")
	.service('locationService', function($cordovaGeolocation){
		var posOptions = {timeout: 10000, enableHighAccuracy: true};

		this.getCurrentLocation = function() {
			return
			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function(position) {
					return position;
				}, function(err) {
					console.log(err);
					return err;
				})
		}

	});