angular.module("app")
	.controller('detailsController', function($cordovaSocialSharing, $ionicHistory ,$stateParams, $filter, dataService){
		mV = this;
    
        mV.data= {};
    
        mV.getData = function (){
            mV.data = dataService.getDataById($stateParams.dataID);
            console.log(mV.data);
        }
    
		mV.socialSharing = function() {
			var message = mV.data.small_description != null ? $filter('htmlToPlaintext')(he.decode(mV.data.small_description)) : null;
			var subject = mV.data.name == null ? mV.data.place_name : mV.data.name;
			var file = mV.data.link == null ? (mV.data.image == null ? mV.data.image_thumb : mV.data.image) : null;
			var link = mV.data.link == null ? null : mV.data.link;
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