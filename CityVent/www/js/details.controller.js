angular.module("app")
	.controller('detailsController', function($cordovaSocialSharing, $ionicHistory ,$stateParams, dataService){
		mV = this;
    
        mV.data= [];
    
        mV.getData = function (){
            mV.data = dataService.getDataById($stateParams.dataID);
            console.log(mV.data);
        }
    
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