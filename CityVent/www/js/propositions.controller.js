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

	propositionsCtrl.back = function() {
		$ionicHistory.goBack();
	}

	propositionsCtrl.startRequest = function() {
		if(dataService.has_requests()) {
			$ionicLoading.show();
			dataService.launch(propositionsCtrl.onFinish);
		}
		else
			propositionsCtrl.back();
	}

	propositionsCtrl.is_loading = function() {
		return dataService.loading > 0;
	}

	propositionsCtrl.startRequest();

});