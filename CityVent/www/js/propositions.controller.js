angular.module('app')
.controller('propositionsController', function($ionicLoading, dataService){

	var propositionsCtrl = this;
	propositionsCtrl.data = [];

	propositionsCtrl.onFinish = function() {
		propositionsCtrl.data = dataService.data;
		if(dataService.loading == 0)
			$ionicLoading.hide();
	}

	propositionsCtrl.startRequest = function() {
		$ionicLoading.show();
		dataService.launch(propositionsCtrl.onFinish);
	}

	propositionsCtrl.startRequest();

});