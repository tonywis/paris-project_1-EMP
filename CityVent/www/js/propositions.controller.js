angular.module('app')
.controller('propositionsController', function($ionicLoading, $ionicHistory, dataService){

	var propositionsCtrl = this;
	propositionsCtrl.data = [];

	propositionsCtrl.onFinish = function() {
		if(dataService.loading == 0) {
			dataService.sortData();
			$ionicLoading.hide();
			propositionsCtrl.data = dataService.data;
		}
	}

	propositionsCtrl.startRequest = function() {
		$ionicLoading.show();
		dataService.launch(propositionsCtrl.onFinish);
	}

	propositionsCtrl.startRequest();


	propositionsCtrl.back = function() {
		$ionicHistory.goBack();
	}

});