angular.module("app")
	.controller('detailsController', function($cordovaSocialSharing, $ionicHistory){
		mV = this;

		mV.socialSharing = function() {
			var message = null;
			var subject = null;
			var file = null;
			var link = "http://ngcordova.com/docs/plugins/socialSharing/";
			$cordovaSocialSharing
				.share(message, subject, file, link) // Share via native share sheet
				.then(function(result) {
					// Success!
				}, function(err) {
					// An error occured. Show a message to the user
				});
		}

		mV.back = function() {
			$ionicHistory.goBack();
		}
	});